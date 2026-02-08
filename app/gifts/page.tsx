"use client";

import { LockedOverlay } from "@/components/LockedOverlay";
import { PageTitle } from "@/components/PageTitle";
import { EnvelopeCard } from "@/components/EnvelopeCard";
import { GIFTS } from "@/lib/config";
import { useProgressStore } from "@/lib/progressStore";

export default function GiftsPage() {
  const achievementsCompleted = useProgressStore((s) => s.achievementsCompleted);
  const gifts = useProgressStore((s) => s.gifts);
  const openEnvelope = useProgressStore((s) => s.openEnvelope);

  // Requirement: unlocked right after completing the story.
  const locked = !achievementsCompleted;

  return (
    <div
      className="relative min-h-dvh safe-px safe-pb pb-10 overflow-hidden"
      style={
        {
          // Force a light palette locally so input/text stays readable
          // even if OS prefers dark mode.
          ["--ink" as any]: "#1b1b1b",
          ["--muted" as any]: "rgba(27, 27, 27, 0.74)",
          ["--paper" as any]: "#f7f2ea",
          ["--paper-2" as any]: "#fff7f0",
        } as React.CSSProperties
      }
    >
      {/* Background layer */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#f7f2ea]" />

        {/* Square pattern (different palette from schedule) */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="giftsSquarePattern" patternUnits="userSpaceOnUse" width="36" height="36">
              {/* Row 1 */}
              <rect x="0" y="0" width="12" height="12" fill="#D7E7F7" />
              <rect x="12" y="0" width="12" height="12" fill="#F6C4B3" />
              <rect x="24" y="0" width="12" height="12" fill="#C86A7D" />

              {/* Row 2 */}
              <rect x="0" y="12" width="12" height="12" fill="#BFDCCB" />
              <rect x="12" y="12" width="12" height="12" fill="#F7E3C3" />
              <rect x="24" y="12" width="12" height="12" fill="#A8C6E8" />

              {/* Row 3 */}
              <rect x="0" y="24" width="12" height="12" fill="#F6C4B3" />
              <rect x="12" y="24" width="12" height="12" fill="#D7E7F7" />
              <rect x="24" y="24" width="12" height="12" fill="#BFDCCB" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#giftsSquarePattern)" shapeRendering="crispEdges" />
        </svg>

        {/* subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(0,0,0,.08) 0 1px, rgba(0,0,0,0) 1px 20px), repeating-linear-gradient(135deg, rgba(255,255,255,.60) 0 2px, rgba(255,255,255,0) 2px 24px)",
          }}
        />

        {/* tiny wash for readability */}
        <div className="absolute inset-0 bg-[radial-gradient(1000px_700px_at_50%_0%,rgba(255,255,255,.16),rgba(247,242,234,.08)_70%,rgba(247,242,234,0))]" />
      </div>

      <div className="relative z-10">
      <LockedOverlay
        open={locked}
        title="Подарки ждут своего часа"
        description="Сначала досмотри «Твой путь» — и конверты откроются."
        backHref="/achievements"
        backLabel="к истории"
      />

      <PageTitle title="Подарки" subtitle="Один конверт. Один пароль. Один сюрприз." />

      <div className="mx-auto grid w-full max-w-[760px] gap-4">
        <EnvelopeCard
          title={GIFTS.envelope1.title}
          opened={gifts.envelope1Opened}
          password={GIFTS.envelope1.password}
          hint="мой пароль"
          certificateLabel={GIFTS.envelope1.certificate.label}
          certificateLink={GIFTS.envelope1.certificate.link || undefined}
          onOpened={() => openEnvelope("envelope1")}
        />
      </div>
      </div>
    </div>
  );
}


