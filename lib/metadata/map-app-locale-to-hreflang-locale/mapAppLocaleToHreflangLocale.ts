import type { AppLocale } from "@/lib/i18n/config";

const HREFLANG_LOCALE_BY_APP_LOCALE: Record<AppLocale, string> = {
  fr: "fr-FR",
  en: "en-US",
};

export function mapAppLocaleToHreflangLocale(locale: AppLocale): string {
  return HREFLANG_LOCALE_BY_APP_LOCALE[locale];
}
