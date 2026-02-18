"use client";

import React, { createContext, useContext, useMemo } from "react";
import type { Lang, MessageKey } from "@/lib/i18n";
import { t as translate } from "@/lib/i18n";

type I18nContextValue = {
  lang: Lang;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({
  lang,
  children,
}: {
  lang: Lang;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      t: (key, vars) => translate(lang, key, vars),
    }),
    [lang],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const v = useContext(I18nContext);
  if (!v) {
    // Safe fallback if provider isn't mounted yet.
    return {
      lang: "ru",
      t: (key) => String(key),
    };
  }
  return v;
}

