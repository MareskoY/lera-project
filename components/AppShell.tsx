"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { FloatingMenu } from "@/components/FloatingMenu";
import { useProgressStore } from "@/lib/progressStore";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hydrate = useProgressStore((s) => s.hydrateFromStorage);

  // Hydrate progress once on client.
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div className="relative min-h-dvh bg-[var(--paper)] text-[var(--ink)]">
      <div className="grain-overlay" />

      {/* Route transitions (premium postcard feel) */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 min-h-dvh"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <FloatingMenu />
    </div>
  );
}


