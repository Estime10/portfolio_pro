import type { AppLocale } from "@/lib/i18n/config";
import { setLocaleAction } from "@/lib/i18n/set-locale-action";

export async function applyLocaleChange(locale: AppLocale, refresh: () => void): Promise<void> {
  await setLocaleAction(locale);
  refresh();
}
