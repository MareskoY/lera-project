"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

export function PhotoStack({
  photos,
  frame = "postcard",
}: {
  photos: string[];
  frame?: "postcard" | "polaroid";
}) {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const cards = useMemo(() => {
    const rot = [(-6 + Math.random() * 4) | 0, (2 + Math.random() * 5) | 0, (-2 + Math.random() * 4) | 0, (6 + Math.random() * 4) | 0];
    return photos.map((src, i) => ({
      src,
      rotate: rot[i % rot.length],
      z: i,
    }));
  }, [photos]);

  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div
        className="relative h-[min(44dvh,360px)]"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0]?.clientX ?? null;
        }}
        onTouchEnd={(e) => {
          const start = touchStartX.current;
          touchStartX.current = null;
          const end = e.changedTouches[0]?.clientX ?? null;
          if (start === null || end === null) return;
          const dx = end - start;
          if (Math.abs(dx) < 45) return;
          if (dx < 0) setActive((v) => (v + 1) % photos.length);
          if (dx > 0) setActive((v) => (v - 1 + photos.length) % photos.length);
        }}
      >
        {cards.map((c, i) => {
          const isTop = i === active;
          return (
            <motion.button
              key={c.src}
              type="button"
              onClick={() => setActive(i)}
              className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2"
              style={{ zIndex: isTop ? 30 : 10 + i }}
              initial={false}
              animate={{
                rotate: isTop ? 0 : c.rotate,
                scale: isTop ? 1 : 0.92,
                y: isTop ? -6 : 10 + i * 6,
                opacity: isTop ? 1 : 0.9,
              }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
            >
              <div
                className={`relative overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,.25)]
                  ${frame === "polaroid" ? "rounded-[28px] bg-[#fffaf2] p-3" : "rounded-[26px] border border-white/35 bg-white/25 backdrop-blur-md p-2"}`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[20px]">
                  <Image
                    src={c.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 420px) 86vw, 420px"
                    priority={false}
                  />
                </div>
                {frame === "polaroid" ? (
                  <div className="pt-3 pb-1 text-center text-xs text-black/60">
                    {i + 1} / {photos.length}
                  </div>
                ) : null}
              </div>
            </motion.button>
          );
        })}

        {/* Switcher overlay: above photo cards (so blur/glass never covers it) */}
        {photos.length > 1 ? (
          <div className="absolute inset-x-0 -bottom-28 z-[120] flex items-center justify-center">
            <div
              className="pointer-events-auto inline-flex items-center gap-3 rounded-full border border-white/45 bg-white/45 px-3 py-2
                backdrop-blur-2xl shadow-[0_18px_60px_rgba(0,0,0,.20)]"
            >
              <button
                type="button"
                onClick={() => setActive((v) => (v - 1 + photos.length) % photos.length)}
                className="rounded-full border border-white/25 bg-white/35 px-4 py-2 text-sm font-semibold backdrop-blur-2xl
                  hover:bg-white/45 transition"
                aria-label="Предыдущее фото"
              >
                ←
              </button>
              <div className="flex items-center gap-1 px-1">
                {photos.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-white/95" : "w-2 bg-white/65"}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActive((v) => (v + 1) % photos.length)}
                className="rounded-full border border-white/25 bg-white/35 px-4 py-2 text-sm font-semibold backdrop-blur-2xl
                  hover:bg-white/45 transition"
                aria-label="Следующее фото"
              >
                →
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Spacer so overlay doesn't visually crash into next content (and keeps no-scroll layout) */}
      {photos.length > 1 ? <div className="h-1" /> : null}
    </div>
  );
}


