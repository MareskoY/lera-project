"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";

export function EnvelopeCard({
  title,
  opened,
  password,
  hint,
  certificateLabel,
  certificateLink,
  onOpened,
}: {
  title: string;
  opened: boolean;
  password: string;
  hint?: string;
  certificateLabel: string;
  certificateLink?: string;
  onOpened: () => void;
}) {
  const { t } = useI18n();
  const [sheet, setSheet] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!sheet) {
      setValue("");
      setError("");
      setShake(false);
    }
  }, [sheet]);

  const normalizedPassword = useMemo(() => password.trim().toLowerCase(), [password]);

  const tryOpen = () => {
    const ok = value.trim().toLowerCase() === normalizedPassword;
    if (!ok) {
      setError(
        hint ? t("envelope.errorWrongWithHint", { hint }) : t("envelope.errorWrong"),
      );
      setShake(true);
      window.setTimeout(() => setShake(false), 420);
      return;
    }
    onOpened();
    setError("");
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setSheet(true)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-full overflow-hidden rounded-[28px] border border-black/10 bg-white/82 backdrop-blur-xl
          shadow-[0_30px_80px_rgba(0,0,0,.14)]"
      >
        <div className="p-5">
          <div className="font-[var(--font-title)] text-2xl text-[var(--ink)]">{title}</div>
          <div className="mt-2 text-sm text-[var(--muted)]">
            {opened ? t("envelope.opened") : t("envelope.tapToOpen")}
          </div>

          <motion.div
            animate={{
              rotate: opened ? 0 : [-1, 1, -1, 0],
            }}
            transition={{ duration: 1.4, repeat: opened ? 0 : Infinity, repeatDelay: 1.2 }}
            className="mt-5 grid place-items-center"
          >
            <div className="grid h-20 w-24 place-items-center rounded-3xl bg-black/10">
              <span className="text-4xl">✉️</span>
            </div>
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(380px 260px at 20% 10%, rgba(255,255,255,.65), transparent 60%), radial-gradient(380px 260px at 90% 90%, rgba(0,0,0,.10), transparent 60%)",
          }}
        />
      </motion.button>

      <AnimatePresence>
        {sheet ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-md safe-px safe-pb py-6 grid place-items-center"
            onClick={() => setSheet(false)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[520px] overflow-hidden rounded-[34px]
                border border-black/10 bg-white/92 shadow-[0_40px_140px_rgba(0,0,0,.28)] backdrop-blur-xl text-[var(--ink)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-[var(--font-title)] text-2xl text-[var(--ink)]">{title}</div>
                    <div className="mt-1 text-sm text-[var(--muted)]">
                      {opened ? t("envelope.alreadyOpened") : t("envelope.enterPassword")}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSheet(false)}
                    className="rounded-2xl border border-black/10 bg-white/85 px-3 py-2 text-sm font-semibold text-[var(--ink)] hover:bg-white/95 transition"
                  >
                    {t("common.close")}
                  </button>
                </div>

                {!opened ? (
                  <motion.div
                    animate={shake ? { x: [-10, 10, -7, 7, 0] } : { x: 0 }}
                    transition={{ duration: 0.42 }}
                    className="mt-5"
                  >
                    <input
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder={t("envelope.passwordPlaceholder")}
                      className="w-full rounded-2xl border border-black/15 bg-white/95 px-4 py-4 text-base text-[var(--ink)] placeholder:text-black/40 outline-none"
                      autoFocus
                    />
                    {error ? (
                      <div className="mt-3 text-sm text-red-600">{error}</div>
                    ) : null}
                    <button
                      type="button"
                      onClick={tryOpen}
                      className="mt-4 w-full rounded-2xl border border-black/10 bg-white/88 px-4 py-4 font-semibold text-[var(--ink)] hover:bg-white/96 transition"
                    >
                      {t("envelope.open")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 rounded-[28px] border border-black/10 bg-white/75 p-6"
                  >
                    <div className="grid place-items-center text-center gap-3">
                      <div className="font-[var(--font-title)] text-2xl text-[var(--ink)]">
                        {t("envelope.done")}
                      </div>
                      <div className="text-sm leading-5 text-[var(--muted)] max-w-[44ch]">
                        {t("envelope.doneText")}
                      </div>
                      <div className="inline-flex rounded-full border border-black/10 bg-white/90 px-4 py-2 font-semibold text-[var(--ink)]">
                        leruakokur@gmail.com
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}


