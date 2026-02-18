"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { useProgressStore } from "@/lib/progressStore";

type MenuItem = {
  label: string;
  href: string;
  enabled: boolean;
};

export function FloatingMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { t } = useI18n();

  const achievementsCompleted = useProgressStore((s) => s.achievementsCompleted);

  const items: MenuItem[] = useMemo(
    () => [
      { label: t("nav.story"), href: "/achievements", enabled: true },
      { label: t("nav.schedule"), href: "/schedule", enabled: achievementsCompleted },
      // Requirement: gifts unlocked right after completing the story.
      { label: t("nav.gifts"), href: "/gifts", enabled: achievementsCompleted },
    ],
    [achievementsCompleted, t],
  );

  // Requirement: menu appears only after Achievements completed.
  if (!achievementsCompleted) return null;

  return (
    <div
      className="fixed right-4 z-50"
      style={{ top: "max(14px, env(safe-area-inset-top))" }}
    >
      <div className="relative">
        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 backdrop-blur-md text-[var(--ink)]
            shadow-[0_18px_60px_rgba(0,0,0,.18)] transition
            ${open ? "border-black/10 bg-white/85" : "border-black/10 bg-white/70"}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          aria-label={t("nav.menuAria")}
        >
          <span className="text-xs font-semibold text-black/90">{t("nav.menu")}</span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.22 }}
            className="text-xs text-black/60"
          >
            ▾
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, x: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 12, filter: "blur(6px)" }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 mt-3 w-56 origin-top-right
                rounded-2xl border border-black/10 bg-white/92 backdrop-blur-2xl text-black/90
                shadow-[0_30px_90px_rgba(0,0,0,.22)] overflow-hidden"
            >
              <div className="p-2">
                {items.map((it) => {
                  const active = pathname === it.href;
                  const base =
                    "block w-full rounded-xl px-3 py-3 text-left transition select-none";
                  const enabled = it.enabled;
                  return (
                    <div key={it.href} className="relative">
                      {enabled ? (
                        <Link
                          href={it.href}
                          onClick={() => setOpen(false)}
                          className={`${base} ${
                            active
                              ? "bg-black/10 border border-black/10"
                              : "hover:bg-black/5 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-black/90">
                              {it.label}
                            </span>
                            <span className="text-xs text-black/50">
                              {active ? "•" : "→"}
                            </span>
                          </div>
                        </Link>
                      ) : (
                        <div
                          className={`${base} cursor-not-allowed bg-black/5 border border-transparent text-black/35`}
                          aria-disabled="true"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{it.label}</span>
                            <span className="text-xs text-black/35">🔒</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


