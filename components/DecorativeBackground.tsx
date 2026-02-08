"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Corner = "tl" | "tr" | "bl" | "br";

export function DecorativeBackground({
  src,
  corner = "br",
  size = 260,
  opacity = 0.14,
  blur = 0,
  rotate = 0,
}: {
  src: string;
  corner?: Corner;
  size?: number;
  opacity?: number;
  blur?: number;
  rotate?: number;
}) {
  const pos =
    corner === "tl"
      ? "left-0 top-0"
      : corner === "tr"
        ? "right-0 top-0"
        : corner === "bl"
          ? "left-0 bottom-0"
          : "right-0 bottom-0";

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 0.6 }}
      className={`pointer-events-none absolute ${pos} z-[2]`}
      style={{
        width: size,
        height: size,
        filter: `blur(${blur}px)`,
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-contain"
        sizes="260px"
        priority={false}
      />
    </motion.div>
  );
}


