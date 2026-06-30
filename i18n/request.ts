import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import {
  DEFAULT_LOCALE,
  isAppLocale,
  LOCALE_COOKIE,
  pickLocaleFromAcceptLanguage,
  type AppLocale,
} from "@/lib/i18n/config";
import { LOCALE_REQUEST_HEADER } from "@/lib/i18n/locale-request-header/localeRequestHeader";
import { getParsedAppMessages } from "@/lib/i18n/parsed-app-messages/parsedAppMessages";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  const requestHeaders = await headers();
  const fromQueryHeader = requestHeaders.get(LOCALE_REQUEST_HEADER);

  if (fromQueryHeader && isAppLocale(fromQueryHeader)) {
    locale = fromQueryHeader;
  } else if (!locale || !isAppLocale(locale)) {
    const fromCookie = (await cookies()).get(LOCALE_COOKIE)?.value;
    if (fromCookie && isAppLocale(fromCookie)) {
      locale = fromCookie;
    } else {
      const accept = requestHeaders.get("accept-language");
      locale = pickLocaleFromAcceptLanguage(accept) ?? DEFAULT_LOCALE;
    }
  }

  const appLocale: AppLocale = isAppLocale(locale) ? locale : DEFAULT_LOCALE;

  return {
    locale: appLocale,
    messages: getParsedAppMessages(appLocale),
  };
});
