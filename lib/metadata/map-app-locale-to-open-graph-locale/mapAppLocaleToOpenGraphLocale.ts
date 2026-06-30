import type { AppLocale } from "@/lib/i18n/config";

const OPEN_GRAPH_LOCALE_BY_APP_LOCALE: Record<AppLocale, string> = {
  fr: "fr_FR",
  en: "en_US",
};

export function mapAppLocaleToOpenGraphLocale(locale: AppLocale): string {
  return OPEN_GRAPH_LOCALE_BY_APP_LOCALE[locale];
}
