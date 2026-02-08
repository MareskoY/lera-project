"use client";

import { motion } from "framer-motion";

export function ProgressDots({
  count,
  index,
  accent = "rgba(255,255,255,.8)",
}: {
  count: number;
  index: number;
  accent?: string;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => {
        const active = i === index;
        return (
          <motion.div
            key={i}
            className="h-2.5 rounded-full"
            animate={{
              width: active ? 26 : 10,
              opacity: active ? 1 : 0.45,
              backgroundColor: active ? accent : "rgba(255,255,255,.45)",
            }}
            transition={{ duration: 0.25 }}
          />
        );
      })}
    </div>
  );
}


