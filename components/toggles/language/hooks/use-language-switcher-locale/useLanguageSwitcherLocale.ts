"use client";

import { useLocale } from "next-intl";
import { useCallback } from "react";
import { LOCALES, isAppLocale, type AppLocale } from "@/lib/i18n/config";

export type UseLanguageSwitcherLocaleParams = Readonly<{
  onLocaleSelected: () => void;
  queueLocaleChange: (next: AppLocale) => void;
}>;

export type UseLanguageSwitcherLocaleReturn = Readonly<{
  inactiveLocales: readonly AppLocale[];
  locale: AppLocale;
  selectLocale: (next: AppLocale) => void;
}>;

export function useLanguageSwitcherLocale({
  onLocaleSelected,
  queueLocaleChange,
}: UseLanguageSwitcherLocaleParams): UseLanguageSwitcherLocaleReturn {
  const rawLocale = useLocale();
  const locale: AppLocale = isAppLocale(rawLocale) ? rawLocale : "fr";

  const selectLocale = useCallback(
    (next: AppLocale): void => {
      if (next !== locale) {
        queueLocaleChange(next);
      }

      onLocaleSelected();
    },
    [locale, onLocaleSelected, queueLocaleChange],
  );

  const inactiveLocales = LOCALES.filter((code) => code !== locale);

  return {
    inactiveLocales,
    locale,
    selectLocale,
  };
}
