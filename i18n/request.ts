import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import {
  DEFAULT_LOCALE,
  isAppLocale,
  LOCALE_COOKIE,
  pickLocaleFromAcceptLanguage,
} from "@/lib/i18n/config";
import { parseAppMessages } from "@/lib/i18n/parse-app-messages/parseAppMessages";
import enMessages from "./messages/en.json";
import frMessages from "./messages/fr.json";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !isAppLocale(locale)) {
    const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;
    if (fromCookie && isAppLocale(fromCookie)) {
      locale = fromCookie;
    } else {
      const accept = (await headers()).get("accept-language");
      locale = pickLocaleFromAcceptLanguage(accept) ?? DEFAULT_LOCALE;
    }
  }

  if (!isAppLocale(locale)) {
    locale = DEFAULT_LOCALE;
  }

  if (locale === "en") {
    return {
      locale,
      messages: parseAppMessages(enMessages, "en"),
    };
  }

  return {
    locale: "fr",
    messages: parseAppMessages(frMessages, "fr"),
  };
});
