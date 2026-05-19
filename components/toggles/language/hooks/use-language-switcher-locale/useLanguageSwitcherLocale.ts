"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { applyLocaleChange } from "@/components/toggles/language/hooks/applyLocaleChange";
import { LOCALES, isAppLocale, type AppLocale } from "@/lib/i18n/config";

export type UseLanguageSwitcherLocaleParams = Readonly<{
  onLocaleSelected: () => void;
}>;

export type UseLanguageSwitcherLocaleReturn = Readonly<{
  inactiveLocales: readonly AppLocale[];
  locale: AppLocale;
  selectLocale: (next: AppLocale) => void;
}>;

export function useLanguageSwitcherLocale({
  onLocaleSelected,
}: UseLanguageSwitcherLocaleParams): UseLanguageSwitcherLocaleReturn {
  const rawLocale = useLocale();
  const locale: AppLocale = isAppLocale(rawLocale) ? rawLocale : "fr";
  const router = useRouter();

  const selectLocale = useCallback(
    (next: AppLocale): void => {
      if (next === locale) {
        onLocaleSelected();
        return;
      }

      onLocaleSelected();
      void applyLocaleChange(next, () => {
        router.refresh();
      });
    },
    [locale, onLocaleSelected, router],
  );

  const inactiveLocales = LOCALES.filter((code) => code !== locale);

  return {
    inactiveLocales,
    locale,
    selectLocale,
  };
}
