export function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function canUseDOM() {
  return typeof window !== "undefined" && typeof document !== "undefined";
}

export function lsGetString(key: string): string | null {
  if (!canUseDOM()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function lsSetString(key: string, value: string) {
  if (!canUseDOM()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

export function lsGetBoolean(key: string, defaultValue = false): boolean {
  const raw = lsGetString(key);
  if (raw === null) return defaultValue;
  return raw === "true";
}

export function lsSetBoolean(key: string, value: boolean) {
  lsSetString(key, value ? "true" : "false");
}

export function lsGetNumber(key: string, defaultValue = 0): number {
  const raw = lsGetString(key);
  if (raw === null) return defaultValue;
  const n = Number(raw);
  return Number.isFinite(n) ? n : defaultValue;
}

export function lsSetNumber(key: string, value: number) {
  lsSetString(key, String(value));
}


