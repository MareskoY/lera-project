"use client";

import { motion } from "framer-motion";

export function PageTitle({
  title,
  subtitle,
  color = "var(--ink)",
}: {
  title: string;
  subtitle?: string;
  color?: string;
}) {
  return (
    <div className="safe-px pt-10 pb-6">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-[22ch] text-center font-[var(--font-title)] title-stroke
          text-4xl leading-[1.05] tracking-tight sm:text-5xl"
        style={{ color }}
      >
        {title}
      </motion.h1>
      {subtitle ? (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-3 max-w-[50ch] text-center text-[15px] leading-6 text-[var(--muted)]"
        >
          {subtitle}
        </motion.p>
      ) : null}
    </div>
  );
}


