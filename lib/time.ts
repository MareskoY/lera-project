export type ZonedParts = {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
  hour: number; // 0-23
  minute: number; // 0-59
  second: number; // 0-59
};

export function getZonedParts(timeZone: string, date = new Date()): ZonedParts {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  const parts = dtf.formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => {
    const p = parts.find((x) => x.type === type)?.value;
    return p ? Number(p) : 0;
  };
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
    second: get("second"),
  };
}

export function compareParts(a: ZonedParts, b: ZonedParts) {
  const ax = [a.year, a.month, a.day, a.hour, a.minute, a.second];
  const bx = [b.year, b.month, b.day, b.hour, b.minute, b.second];
  for (let i = 0; i < ax.length; i++) {
    if (ax[i] !== bx[i]) return ax[i] < bx[i] ? -1 : 1;
  }
  return 0;
}

export function partsToVirtualUtcMillis(p: ZonedParts) {
  // Treat the zone-local parts as if they were UTC. This is perfect for
  // countdown UX (same zone) and avoids timezone/DST math without deps.
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
}

export function formatCountdown(ms: number) {
  const clamped = Math.max(0, ms);
  const totalSeconds = Math.floor(clamped / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  if (hours > 0) return `${hours}:${pad(minutes)}:${pad(seconds)}`;
  return `${minutes}:${pad(seconds)}`;
}


