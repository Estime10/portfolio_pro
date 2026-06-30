import type { AppLocale } from "@/lib/i18n/config";

export function getLanguageSwitcherPanelLabel(locale: AppLocale): string {
  return locale === "fr" ? "Sélection de la langue" : "Language selection";
}
