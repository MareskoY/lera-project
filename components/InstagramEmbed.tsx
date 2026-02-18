"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/components/I18nProvider";

declare global {
  interface Window {
    instgrm?: {
      Embeds?: { process: () => void };
    };
  }
}

let instagramScriptPromise: Promise<void> | null = null;

function loadInstagramScriptOnce() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.instgrm?.Embeds?.process) return Promise.resolve();
  if (instagramScriptPromise) return instagramScriptPromise;

  instagramScriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("IG script error")), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://www.instagram.com/embed.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("IG script error"));
    document.body.appendChild(script);
  });

  return instagramScriptPromise;
}

export function InstagramEmbed({
  url,
  active = true,
}: {
  url: string;
  active?: boolean;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const { t } = useI18n();

  const permalink = useMemo(() => url.trim(), [url]);

  useEffect(() => {
    if (!active) return;
    let cancelled = false;

    (async () => {
      try {
        await loadInstagramScriptOnce();
        if (cancelled) return;
        window.instgrm?.Embeds?.process?.();
      } catch {
        if (cancelled) return;
        setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [active, permalink]);

  return (
    <div ref={rootRef} className="w-full">
      {failed ? (
        <div className="mt-4 rounded-3xl border border-white/25 bg-white/50 backdrop-blur-xl p-5">
          <div className="text-sm text-[var(--muted)]">
            {t("instagram.failed.text")}
          </div>
          <div className="mt-4">
            <Link
              href={permalink}
              target="_blank"
              className="inline-flex items-center justify-center rounded-2xl bg-black/10 px-4 py-3 font-semibold hover:bg-black/15 transition"
            >
              {t("instagram.failed.open")}
            </Link>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-4"
        >
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={permalink}
            data-instgrm-version="14"
            style={{
              background: "transparent",
              margin: "0 auto",
              width: "100%",
              borderRadius: "24px",
            }}
          />
        </motion.div>
      )}
    </div>
  );
}


