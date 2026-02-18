"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";

export function LockedOverlay({
  open,
  title,
  description,
  backHref = "/achievements",
  backLabel,
}: {
  open: boolean;
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}) {
  const { t } = useI18n();
  const resolvedTitle = title ?? t("overlay.locked.title");
  const resolvedBackLabel = backLabel ?? t("common.back");

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="lock"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] grid place-items-center bg-black/40 backdrop-blur-md safe-px"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-sm rounded-3xl border border-white/25 bg-white/70 shadow-[0_40px_120px_rgba(0,0,0,.35)]
              backdrop-blur-xl p-6"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-black/10">
                <span className="text-xl">🔒</span>
              </div>
              <div>
                <div className="font-[var(--font-title)] text-2xl leading-[1.1]">
                  {resolvedTitle}
                </div>
                {description ? (
                  <div className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {description}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Link
                href={backHref}
                className="flex-1 rounded-2xl border border-black/10 bg-white/60 px-4 py-3 text-center font-semibold
                  hover:bg-white/75 transition"
              >
                ← {resolvedBackLabel}
              </Link>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}


