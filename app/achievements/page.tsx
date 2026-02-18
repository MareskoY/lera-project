"use client";

import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { DecorativeBackground } from "@/components/DecorativeBackground";
import { InstagramEmbed } from "@/components/InstagramEmbed";
import { PhotoStack } from "@/components/PhotoStack";
import { ProgressDots } from "@/components/ProgressDots";
import { useI18n } from "@/components/I18nProvider";
import { readableTextOn } from "@/lib/color";
import { ACHIEVEMENT_SLIDES } from "@/lib/achievementsSlides";
import { useProgressStore } from "@/lib/progressStore";

export default function AchievementsPage() {
  const router = useRouter();
  const { t, lang } = useI18n();
  const slideIndex = useProgressStore((s) => s.achievementsSlideIndex);
  const setSlideIndex = useProgressStore((s) => s.setAchievementsSlideIndex);
  const completeAchievements = useProgressStore((s) => s.completeAchievements);

  const [dir, setDir] = useState<1 | -1>(1);
  const [dragHint, setDragHint] = useState(true);
  const touchStartX = useRef<number | null>(null);
  const [videoMuted, setVideoMuted] = useState(true);
  const hintTimerRef = useRef<number | null>(null);

  const slide = ACHIEVEMENT_SLIDES[slideIndex] ?? ACHIEVEMENT_SLIDES[0];
  const textColor = useMemo(() => readableTextOn(slide.bg), [slide.bg]);
  const isIntro = slideIndex <= 2;

  // (eslint rule) Don't set state synchronously inside effects.
  // We handle "reset on navigation" inside `go()` instead.

  const go = (next: number) => {
    const clamped = Math.max(0, Math.min(ACHIEVEMENT_SLIDES.length - 1, next));
    setDir(clamped > slideIndex ? 1 : -1);
    setSlideIndex(clamped);
    setVideoMuted(true);

    if (clamped === 0) {
      setDragHint(true);
      if (hintTimerRef.current) window.clearTimeout(hintTimerRef.current);
      hintTimerRef.current = window.setTimeout(() => setDragHint(false), 5000);
    }
  };

  const goNext = () => go(slideIndex + 1);
  const goPrev = () => go(slideIndex - 1);

  const content = (
    <div className="relative z-10 flex h-dvh flex-col overflow-hidden safe-px safe-pb">
      {/* Header: fixes overlap on content slides by moving title up */}
      <div className="pt-3 pb-2">
        <div className="mx-auto flex w-full max-w-[760px] items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/20 px-3 py-2 backdrop-blur-md">
            <span className="text-xs font-semibold opacity-90" style={{ color: textColor }}>
              {t("ach.header")}
            </span>
            <span className="text-[10px] opacity-70" style={{ color: textColor }}>
              •
            </span>
            <span className="text-[10px] opacity-70" style={{ color: textColor }}>
              {slideIndex + 1}/{ACHIEVEMENT_SLIDES.length}
            </span>
          </div>

          <div className="hidden sm:block">
            <ProgressDots count={ACHIEVEMENT_SLIDES.length} index={slideIndex} accent="rgba(255,255,255,.85)" />
          </div>
        </div>

        <div className="mx-auto mt-3 w-full max-w-[760px]">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="text-center font-[var(--font-title)] title-stroke text-[clamp(28px,7vw,52px)] leading-[1.02] tracking-tight"
            style={{ color: textColor }}
          >
            {t(slide.titleKey).split("\n").map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </motion.h1>

          {"subtitleKey" in slide && slide.subtitleKey ? (
            <p
              className="mx-auto mt-2 max-w-[52ch] text-center text-[12px] leading-5 opacity-85"
              style={{ color: textColor }}
            >
              {t(slide.subtitleKey)}
            </p>
          ) : null}
        </div>
      </div>

      <div
        className={
          isIntro
            ? "flex-1 min-h-0 flex items-start justify-center pt-2"
            : "flex-1 min-h-0 flex items-center justify-center"
        }
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchStartX.current;
          touchStartX.current = null;
          const end = e.changedTouches[0]?.clientX ?? null;
          if (start === null || end === null) return;
          const dx = end - start;
          if (Math.abs(dx) < 55) return;
          if (dx < 0) goNext();
          if (dx > 0) goPrev();
        }}
      >
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.section
            key={slideIndex}
            custom={dir}
            variants={{
              enter: (d: 1 | -1) => ({
                opacity: 0,
                x: d === 1 ? 32 : -32,
                y: 8,
                filter: "blur(10px)",
              }),
              center: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
              exit: (d: 1 | -1) => ({
                opacity: 0,
                x: d === 1 ? -24 : 24,
                y: -6,
                filter: "blur(10px)",
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[540px] max-h-full"
          >
            {/* Slide body */}
            {slide.kind === "photos" ? (
              <div className="mt-0">
                <PhotoStack photos={slide.photos} frame="postcard" />
              </div>
            ) : null}

            {slide.kind === "video" ? (
              <div className="mt-4">
                <div className="mx-auto w-full max-w-[520px] overflow-hidden rounded-[28px] border border-white/35 bg-white/25 backdrop-blur-xl shadow-[0_30px_90px_rgba(0,0,0,.22)]">
                  <div className="relative h-[min(44dvh,420px)]">
                    <video
                      src={slide.video.src}
                      poster={slide.video.poster}
                      className="block h-full w-full object-contain"
                      autoPlay
                      loop
                      playsInline
                      muted={videoMuted}
                      controls={false}
                      preload="metadata"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/12" />
                    <div className="absolute left-3 top-3">
                      <div className="rounded-full border border-white/25 bg-white/35 px-3 py-2 text-xs font-semibold backdrop-blur-2xl">
                        {t("ach.videoBadge")}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVideoMuted((v) => !v)}
                      className="absolute right-3 top-3 rounded-full border border-white/25 bg-white/35 px-3 py-2 text-xs font-semibold backdrop-blur-2xl hover:bg-white/45 transition"
                      style={{ color: textColor }}
                    >
                      {videoMuted ? t("ach.soundOff") : t("ach.soundOn")}
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-center text-[11px] leading-4 opacity-80" style={{ color: textColor }}>
                  {videoMuted ? t("ach.soundHint.off") : t("ach.soundHint.on")}
                </div>
              </div>
            ) : null}

            {slide.kind === "instagram" ? (
              <div className="mt-2">
                {slide.photo ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.985, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="mx-auto w-full max-w-[420px] overflow-hidden rounded-[26px] border border-white/30 bg-white/15 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,.22)]"
                  >
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={slide.photo}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 420px) 86vw, 420px"
                      />
                    </div>
                  </motion.div>
                ) : null}

                {slide.url.includes("PLACEHOLDER") ? (
                  <div className="mt-5 rounded-3xl border border-white/25 bg-white/40 backdrop-blur-xl p-5 text-center">
                    <div className="text-sm text-[var(--muted)]">
                      {t("ach.placeholderReel")}
                    </div>
                  </div>
                ) : (
                  <div className="instagram-skin mt-5">
                    <InstagramEmbed url={slide.url} active />
                  </div>
                )}
              </div>
            ) : null}

            {slide.kind === "blogger" ? (
              <div className="mt-6 mx-auto w-full max-w-[520px]">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <BloggerCard
                  href="https://www.instagram.com/leruakokur/"
                  image="/assets/blog1.jpg"
                  title="@leruakokur"
                  steps={[0, 125_000, 1_000_000]}
                  textColor={textColor}
                  lang={lang}
                />
                  <BloggerCard
                  href="https://www.instagram.com/valeriakokur/"
                  image="/assets/blog2.jpg"
                  title="@valeriakokur"
                  steps={[0, 56_700, 10_000_000]}
                  textColor={textColor}
                  lang={lang}
                />
                </div>
              </div>
            ) : null}

            {slide.kind === "final" ? (
              <div className="mt-8 grid gap-3">
                <motion.button
                  type="button"
                  onClick={() => {
                    completeAchievements();
                    router.push("/schedule");
                  }}
                  className="w-full rounded-3xl bg-white/70 px-5 py-4 text-center font-semibold shadow-[0_30px_80px_rgba(0,0,0,.22)]
                    backdrop-blur-xl hover:bg-white/80 transition"
                >
                  {t("ach.continue")}
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => go(0)}
                  className="w-full rounded-3xl border border-white/35 bg-white/25 px-5 py-4 text-center font-semibold
                    backdrop-blur-xl hover:bg-white/30 transition"
                  style={{ color: textColor }}
                >
                  {t("ach.watchAgain")}
                </motion.button>
              </div>
            ) : null}

          </motion.section>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="pb-3 relative z-20">
        {/* Swipe hint moved lower (closer to buttons) */}
        <AnimatePresence>
          {dragHint && slideIndex === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="mb-3 text-center text-xs opacity-85"
              style={{ color: textColor }}
            >
              {t("ach.swipeHint")}
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="sm:hidden">
          <ProgressDots count={ACHIEVEMENT_SLIDES.length} index={slideIndex} accent="rgba(255,255,255,.85)" />
        </div>
        <div className="mt-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={goPrev}
            disabled={slideIndex === 0}
            className="rounded-2xl border border-white/35 bg-white/35 px-4 py-3 text-sm font-semibold backdrop-blur-2xl
              shadow-[0_18px_60px_rgba(0,0,0,.20)] hover:bg-white/45 transition
              disabled:opacity-40 disabled:hover:bg-white/35"
            style={{ color: textColor }}
          >
            {t("ach.back")}
          </button>
          {slideIndex < ACHIEVEMENT_SLIDES.length - 1 ? (
            <button
              type="button"
              onClick={goNext}
              className="rounded-2xl border border-white/35 bg-white/35 px-4 py-3 text-sm font-semibold backdrop-blur-2xl
                shadow-[0_18px_60px_rgba(0,0,0,.20)] hover:bg-white/45 transition"
              style={{ color: textColor }}
            >
              {t("ach.next")}
            </button>
          ) : (
            <Link
              href="/schedule"
              onClick={() => completeAchievements()}
              className="rounded-2xl border border-white/35 bg-white/35 px-4 py-3 text-sm font-semibold backdrop-blur-2xl
                shadow-[0_18px_60px_rgba(0,0,0,.20)] hover:bg-white/45 transition"
              style={{ color: textColor }}
            >
              {t("ach.toSchedule")}
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="relative min-h-dvh overflow-hidden"
      style={{
        backgroundColor: slide.bg,
        color: textColor,
      }}
    >
      {/* Hero as a BACKGROUND layer (seamless, no visible square edges) */}
      {"hero" in slide && slide.hero ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1]">
          <div className="absolute inset-0 grid place-items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="seamless-fade relative aspect-square w-[min(96vw,560px)]"
              style={{ opacity: slide.hero.opacity ?? 1 }}
            >
              <Image
                src={slide.hero.src}
                alt=""
                fill
                priority
                sizes="(max-width: 520px) 88vw, 460px"
                className="object-contain"
                style={{
                  // slight softening so the edge fade blends perfectly
                  filter: "saturate(1.02) contrast(1.02)",
                }}
              />
            </motion.div>
          </div>
        </div>
      ) : null}

      {/* Optional pattern texture */}
      {"pattern" in slide && slide.pattern ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-[2]"
          style={{
            backgroundImage: `url(${slide.pattern.src})`,
            backgroundSize: `${(slide.pattern.scale ?? 1) * 520}px`,
            backgroundRepeat: "repeat",
            opacity: slide.pattern.opacity ?? 0.12,
            // Make patterns actually visible on light backgrounds.
            mixBlendMode: textColor === "#0f1115" ? "multiply" : "soft-light",
          }}
        />
      ) : null}

      {"decor" in slide && slide.decor ? (
        <DecorativeBackground
          src={slide.decor.src}
          corner={slide.decor.corner ?? "br"}
          opacity={slide.decor.opacity ?? 0.14}
          rotate={slide.decor.rotate ?? 0}
          blur={0}
          size={320}
        />
      ) : null}

      {/* Subtle vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 20%, rgba(255,255,255,.14), transparent 62%), radial-gradient(900px 600px at 50% 110%, rgba(0,0,0,.10), transparent 55%)",
        }}
      />

      {content}
    </div>
  );
}

function BloggerCard({
  href,
  image,
  title,
  steps,
  textColor,
  lang,
}: {
  href: string;
  image: string;
  title: string;
  steps: number[];
  textColor: string;
  lang: "ru" | "en";
}) {
  const mv = useMotionValue(steps[0] ?? 0);
  const [shown, setShown] = useState<number>(steps[0] ?? 0);

  useMotionValueEvent(mv, "change", (v) => {
    setShown(Math.round(v));
  });

  useEffect(() => {
    let cancelled = false;
    const controls: Array<{ stop: () => void; finished: Promise<void> }> = [];

    async function run() {
      mv.set(steps[0] ?? 0);

      for (let i = 1; i < steps.length; i++) {
        const target = steps[i]!;
        const firstLeg = i === 1;

        const ctrl = animate(mv, target, {
          duration: firstLeg ? 1.35 : 1.55,
          ease: firstLeg ? [0.16, 1, 0.3, 1] : [0.22, 1, 0.36, 1],
        });
        controls.push(ctrl);
        await ctrl.finished;
        if (cancelled) return;

        // Pause on the "milestones" (125k / 56.7k) for a couple seconds.
        if (i === 1 && steps.length > 2) {
          await new Promise((r) => window.setTimeout(r, 2100));
          if (cancelled) return;
        }
      }
    }

    run();
    return () => {
      cancelled = true;
      controls.forEach((c) => c.stop());
    };
  }, [steps.join("|")]);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group flex flex-col items-center"
    >
      {/* Circle card */}
      <div className="relative aspect-square w-full max-w-[200px] sm:max-w-[220px] overflow-hidden rounded-full border border-white/40 bg-white/25 backdrop-blur-xl shadow-[0_26px_70px_rgba(0,0,0,.22)]">
        <Image src={image} alt="" fill className="object-cover" sizes="240px" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/35" />
        <div className="absolute inset-x-3 bottom-3">
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/25 px-3 py-2 text-xs font-semibold backdrop-blur-2xl"
            style={{ color: "white" }}
          >
            {title}
            <span className="opacity-80">↗</span>
          </div>
        </div>
      </div>

      {/* Bold count under each blogger */}
      <motion.div
        key={shown}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="mt-3 text-center font-[var(--font-title)] text-[20px] sm:text-[22px] font-black tracking-tight"
        style={{ color: textColor }}
      >
        {shown.toLocaleString(lang === "ru" ? "ru-RU" : "en-US")}
      </motion.div>
    </motion.a>
  );
}


