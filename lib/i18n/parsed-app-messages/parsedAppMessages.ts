import enMessages from "@/i18n/messages/en.json";
import frMessages from "@/i18n/messages/fr.json";
import type { AppLocale } from "@/lib/i18n/config";
import type { AppMessages } from "@/lib/i18n/messages-schema/app-messages-schema/appMessagesSchema";
import { parseAppMessages } from "@/lib/i18n/parse-app-messages/parseAppMessages";

const PARSED_APP_MESSAGES: Record<AppLocale, AppMessages> = {
  en: parseAppMessages(enMessages, "en"),
  fr: parseAppMessages(frMessages, "fr"),
};

export function getParsedAppMessages(locale: AppLocale): AppMessages {
  return PARSED_APP_MESSAGES[locale];
}
