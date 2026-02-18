"use client";

import { useI18n } from "@/components/I18nProvider";

export function TimelineStep({
  title,
  icon,
  locked,
  lockedLabel,
  children,
}: {
  title: string;
  icon: string;
  locked: boolean;
  lockedLabel?: string;
  children: React.ReactNode;
}) {
  const { t } = useI18n();

  if (locked) {
    return (
      <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/80 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,.14)]">
        <div className="grid min-h-[160px] place-items-center p-6">
          <div className="mx-auto max-w-[36ch] rounded-[999px] bg-black/10 px-5 py-3 text-center text-sm font-semibold leading-5 text-[var(--muted)] whitespace-normal break-words">
            {lockedLabel ?? t("timeline.locked")}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-white/80 backdrop-blur-xl shadow-[0_30px_80px_rgba(0,0,0,.14)]">
      <div className="p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-black/10">
              <span className="text-xl">{icon}</span>
            </div>
            <div className="min-w-0">
              <div className="font-[var(--font-title)] text-[clamp(26px,6vw,44px)] leading-[1.03] tracking-tight text-[var(--ink)]">
                {title}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 relative">
          {children}
        </div>
      </div>
    </div>
  );
}


