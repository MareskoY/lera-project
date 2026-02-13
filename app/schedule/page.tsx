"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { LockedOverlay } from "@/components/LockedOverlay";
import { PageTitle } from "@/components/PageTitle";
import { TimelineStep } from "@/components/TimelineStep";
import { EVENT_DATE_LISBON, HOTEL_UNLOCK_LISBON, PORTUGAL_TZ } from "@/lib/config";
import { compareParts, formatCountdown, getZonedParts, partsToVirtualUtcMillis } from "@/lib/time";
import { useProgressStore } from "@/lib/progressStore";

const HOTEL_PHOTOS = [
  "https://z.cdrst.com/foto/hotel-sf/11934529/granderesp/foto-hotel-11933a7f.jpg",
  "https://y.cdrst.com/foto/hotel-sf/1201bfa6/granderesp/foto-hotel-1201b4fc.jpg",
  "https://y.cdrst.com/foto/hotel-sf/1201bfa5/granderesp/foto-hotel-1201b4fb.jpg",
  "https://z.cdrst.com/foto/hotel-sf/1201c065/granderesp/foto-hotel-1201b5bb.jpg",
  "https://x.cdrst.com/foto/hotel-sf/1201bf95/granderesp/foto-hotel-1201b4eb.jpg",
  "https://z.cdrst.com/foto/hotel-sf/1201c05a/granderesp/foto-hotel-1201b5b0.jpg",
  "https://z.cdrst.com/foto/hotel-sf/1201c05d/granderesp/foto-hotel-1201b5b3.jpg",
];

export default function SchedulePage() {
  const achievementsCompleted = useProgressStore((s) => s.achievementsCompleted);
  const schedule = useProgressStore((s) => s.schedule);
  const skipFlowers = useProgressStore((s) => s.skipFlowers);
  const complainFlowers = useProgressStore((s) => s.complainFlowers);
  const confirmReady = useProgressStore((s) => s.confirmReady);
  const hideHotel = useProgressStore((s) => s.hideHotel);

  const [nowTick, setNowTick] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setNowTick((x) => x + 1), 1000);
    return () => window.clearInterval(t);
  }, []);

  // Temporary: add ?preview=1 to the URL to unlock everything for design/content preview.
  const preview = useMemo(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("preview") === "1";
  }, []);

  const now = useMemo(() => getZonedParts(PORTUGAL_TZ), [nowTick]);
  const unlockParts = useMemo(
    () => ({
      year: EVENT_DATE_LISBON.year,
      month: EVENT_DATE_LISBON.month,
      day: EVENT_DATE_LISBON.day,
      hour: HOTEL_UNLOCK_LISBON.hour,
      minute: HOTEL_UNLOCK_LISBON.minute,
      second: 0,
    }),
    [],
  );

  const hotelUnlocked = preview ? true : compareParts(now, unlockParts) >= 0;
  const msLeft = partsToVirtualUtcMillis(unlockParts) - partsToVirtualUtcMillis(now);

  // Step order: (1) flowers must be resolved, (2) ready confirmed, (3) hotel time gate, (4) agenda.
  const flowersResolved = preview ? true : schedule.flowersSkipped || schedule.flowersComplained;
  const readyOk = preview ? true : schedule.readyConfirmed;
  const step3Unlocked = flowersResolved && readyOk && hotelUnlocked;
  const step4Unlocked = step3Unlocked;
  const showHotelBlock = !schedule.hotelHidden;

  const hotelUnlockLabel = useMemo(() => {
    const hh = String(HOTEL_UNLOCK_LISBON.hour).padStart(2, "0");
    const mm = String(HOTEL_UNLOCK_LISBON.minute).padStart(2, "0");
    return `${hh}:${mm}`;
  }, []);

  return (
    <div
      className="relative min-h-dvh safe-px safe-pb pb-8 overflow-hidden"
      style={
        {
          // Force a light palette locally so components using CSS vars remain readable
          // even if OS prefers dark mode.
          ["--ink" as any]: "#1b1b1b",
          ["--muted" as any]: "rgba(27, 27, 27, 0.74)",
          ["--paper" as any]: "#f7f2ea",
          ["--paper-2" as any]: "#fff7f0",
        } as React.CSSProperties
      }
    >
      {/* Background MUST be above the parent's background. Never use negative z here. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* paper base */}
        <div className="absolute inset-0 bg-[#f7f2ea]" />

        {/* Square pattern background */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 600 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Smaller tile => more repeats across the screen */}
            <pattern id="squarePattern" patternUnits="userSpaceOnUse" width="30" height="30">
              {/* Row 1 */}
              <rect x="0" y="0" width="10" height="10" fill="#8FAE8F" />
              <rect x="10" y="0" width="10" height="10" fill="#B7CBB8" />
              <rect x="20" y="0" width="10" height="10" fill="#F6E9D6" />

              {/* Row 2 */}
              <rect x="0" y="10" width="10" height="10" fill="#F4C6B1" />
              <rect x="10" y="10" width="10" height="10" fill="#F1C27D" />
              <rect x="20" y="10" width="10" height="10" fill="#D98A5F" />

              {/* Row 3 */}
              <rect x="0" y="20" width="10" height="10" fill="#B7CBB8" />
              <rect x="10" y="20" width="10" height="10" fill="#8FAE8F" />
              <rect x="20" y="20" width="10" height="10" fill="#F6E9D6" />
            </pattern>
          </defs>

          <rect
            width="100%"
            height="100%"
            fill="url(#squarePattern)"
            shapeRendering="crispEdges"
          />
        </svg>

        {/* crisp texture film (visible on light) */}
        <div
          className="absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(0,0,0,.09) 0 1px, rgba(0,0,0,0) 1px 18px), repeating-linear-gradient(135deg, rgba(255,255,255,.55) 0 2px, rgba(255,255,255,0) 2px 22px)",
          }}
        />

        {/* tiny wash for readability (keeps pattern visible) */}
        <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_50%_0%,rgba(255,255,255,.18),rgba(247,242,234,.10)_70%,rgba(247,242,234,0))]" />
      </div>

      <div className="relative z-10">
        <LockedOverlay
          open={!achievementsCompleted && !preview}
          title="Сначала — история"
          description="Расписание откроется после того, как ты дойдёшь до конца «Твой путь»."
          backHref="/achievements"
          backLabel="к истории"
        />

        <PageTitle title="Расписание" subtitle="Появляется по времени (Португалия)" />

        <div className="mx-auto grid w-full max-w-[760px] gap-4 pb-6">
        {!schedule.flowersSkipped ? (
          <TimelineStep
            title="Цветы"
            icon="🌹"
            locked={false}
          >
            <div className="grid gap-3">
              <button
                type="button"
                onClick={skipFlowers}
                className="rounded-2xl border border-black/10 bg-white/85 px-4 py-3 font-semibold text-[var(--ink)] hover:bg-white/95 transition"
              >
                Я довольна
              </button>
              {!schedule.flowersComplained ? (
                <button
                  type="button"
                  onClick={complainFlowers}
                  className="rounded-2xl border border-black/10 bg-white/75 px-4 py-3 font-semibold text-[var(--ink)] hover:bg-white/90 transition"
                >
                  Оставить жалобу
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl bg-white/55 px-4 py-3 text-sm text-[var(--muted)]"
                >
                  Жалоба принята. Мы срочно повышаем уровень романтики на +12% ✨
                </motion.div>
              )}
            </div>
          </TimelineStep>
        ) : null}

        {!hotelUnlocked ? (
          <TimelineStep
            title="Подготовься"
            icon="👜"
            locked={!flowersResolved}
            lockedLabel="(пока заблокировано)"
          >
            <ul className="grid gap-2 text-sm text-[var(--muted)]">
              <li className="flex items-center gap-2">
                <span>•</span> олд мани повседневная одежда
              </li>
              <li className="flex items-center gap-2">
                <span>•</span> купальник
              </li>
            </ul>
            <div className="mt-4">
              <button
                type="button"
                onClick={confirmReady}
                className="w-full rounded-2xl border border-black/10 bg-white/85 px-4 py-3 font-semibold text-[var(--ink)] hover:bg-white/95 transition disabled:opacity-45"
                disabled={!flowersResolved || readyOk}
              >
                {readyOk ? "Готово ✓" : "Я готова"}
              </button>
            </div>
          </TimelineStep>
        ) : null}

        {/* Gifts block appears after the flowers step is resolved (no spoilers before). */}
        {flowersResolved ? (
          <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/80 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,.14)]">
            <div className="p-5">
              <div className="font-[var(--font-title)] text-[clamp(26px,6vw,44px)] leading-[1.03] tracking-tight text-[var(--ink)]">
                Твои подарки
              </div>
              <div className="mt-2 text-sm text-[var(--muted)]">
                Можно заглянуть, когда захочешь.
              </div>
              <div className="mt-4">
                <Link
                  href="/gifts"
                  className="inline-flex w-full items-center justify-center rounded-2xl border border-black/10 bg-white/88 px-4 py-3 font-semibold text-[var(--ink)] hover:bg-white/96 transition"
                >
                  Посмотреть
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {showHotelBlock ? (
          <TimelineStep
            title="Сегодня ты проведёшь день и ночь тут:"
            icon="🏨"
            locked={!step3Unlocked}
            lockedLabel={
              flowersResolved && readyOk && !hotelUnlocked
                ? `откроется в ${hotelUnlockLabel} (PT) · осталось ${formatCountdown(msLeft)}`
                : "(пока заблокировано)"
            }
          >
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {HOTEL_PHOTOS.slice(0, 6).map((src) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-2xl border border-white/25 bg-white/20"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="200px" />
                </div>
              ))}
            </div>
            {!hotelUnlocked ? (
              <div className="mt-4 rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-sm text-[var(--muted)] text-center">
                Сейчас в Португалии:{" "}
                <span className="font-semibold text-[var(--ink)]">
                  {String(now.hour).padStart(2, "0")}:{String(now.minute).padStart(2, "0")}
                </span>
                {" · "}Откроется:{" "}
                <span className="font-semibold text-[var(--ink)]">{hotelUnlockLabel}</span>
              </div>
            ) : null}

            <div className="mt-4">
              <button
                type="button"
                onClick={hideHotel}
                className="w-full rounded-2xl border border-black/10 bg-white/85 px-4 py-3 font-semibold text-[var(--ink)] hover:bg-white/95 transition"
              >
                Скрыть блок отеля
              </button>
            </div>
          </TimelineStep>
        ) : null}

        <TimelineStep
          title="Расписание"
          icon="📅"
          locked={!step4Unlocked}
          lockedLabel="(пока заблокировано)"
        >
          <div className="grid gap-5">
            <div className="rounded-2xl border border-black/10 bg-white/82 p-4">
              <div className="inline-flex rounded-full border border-black/10 bg-white/95 px-3 py-1 font-[var(--font-title)] text-xl font-black text-[var(--ink)]">
                13 февраля
              </div>
              <div className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
                <AgendaRow icon="🧳" label="Заезд" value="15:00" />
                <AgendaRow icon="♨️" label="Спа" value="баня / сауна / хаммам / джакузи до 18:30" />
                <AgendaRow icon="🍽️" label="Ужин" value="20:00" />
                <AgendaRow icon="📸" label="Прогулка и фотосессия" value="до 22:00" />
              </div>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white/82 p-4">
              <div className="inline-flex rounded-full border border-black/10 bg-white/95 px-3 py-1 font-[var(--font-title)] text-xl font-black text-[var(--ink)]">
                14 февраля
              </div>
              <div className="mt-3 grid gap-2 text-sm text-[var(--muted)]">
                <AgendaRow icon="🥐" label="Завтрак" value="9:30" />
                <AgendaRow icon="🌿" label="Прогулка и утренняя фотосессия" value="10:30" />
                <AgendaRow icon="🚗" label="Выезд" value="12:00" />
              </div>
            </div>
          </div>
        </TimelineStep>

        </div>
      </div>
    </div>
  );
}

function AgendaRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/70 px-3 py-3">
      <div className="mt-0.5">{icon}</div>
      <div className="min-w-0">
        <div className="font-semibold text-[var(--ink)]">{label}</div>
        <div className="text-[var(--muted)]">{value}</div>
      </div>
    </div>
  );
}


