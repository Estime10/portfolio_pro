import type { AppLocale } from "@/lib/i18n/config";

export function getLanguageSwitcherTriggerLabel(locale: AppLocale): string {
  return locale === "fr"
    ? "Choisir la langue (actuellement français)"
    : "Choose language (currently English)";
}
