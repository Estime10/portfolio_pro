import { getLocale } from "next-intl/server";
import { DEFAULT_LOCALE, isAppLocale, type AppLocale } from "@/lib/i18n/config";

export async function resolveAppLocale(): Promise<AppLocale> {
  const localeValue = await getLocale();
  return isAppLocale(localeValue) ? localeValue : DEFAULT_LOCALE;
}
