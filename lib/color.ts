export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.trim().replace("#", "");
  if (![3, 6].includes(normalized.length)) return null;
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const r = Number.parseInt(full.slice(0, 2), 16);
  const g = Number.parseInt(full.slice(2, 4), 16);
  const b = Number.parseInt(full.slice(4, 6), 16);
  if (![r, g, b].every((n) => Number.isFinite(n))) return null;
  return { r, g, b };
}

// Relative luminance heuristic; good enough for solid slide backgrounds.
export function readableTextOn(bgHex: string): "#0f1115" | "#fff7f0" {
  const rgb = hexToRgb(bgHex);
  if (!rgb) return "#0f1115";
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 160 ? "#0f1115" : "#fff7f0";
}


