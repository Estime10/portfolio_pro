import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  isAppLocale,
  LOCALE_COOKIE,
  pickLocaleFromAcceptLanguage,
} from "@/lib/i18n/config";
import {
  getLocaleCookieOptions,
  isSecureRequestProtocol,
} from "@/lib/i18n/get-locale-cookie-options/getLocaleCookieOptions";
import { LOCALE_REQUEST_HEADER } from "@/lib/i18n/locale-request-header/localeRequestHeader";
import { LOCALE_SEARCH_PARAM } from "@/lib/i18n/locale-search-param/localeSearchParam";

export function proxy(request: NextRequest): NextResponse {
  const cookieOptions = getLocaleCookieOptions(isSecureRequestProtocol(request.nextUrl.protocol));
  const langParam = request.nextUrl.searchParams.get(LOCALE_SEARCH_PARAM);

  if (langParam && isAppLocale(langParam)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(LOCALE_REQUEST_HEADER, langParam);
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });
    response.cookies.set(LOCALE_COOKIE, langParam, cookieOptions);
    return response;
  }

  const response = NextResponse.next();
  const existing = request.cookies.get(LOCALE_COOKIE)?.value;
  if (existing && isAppLocale(existing)) {
    return response;
  }

  const locale =
    pickLocaleFromAcceptLanguage(request.headers.get("accept-language")) ?? DEFAULT_LOCALE;

  response.cookies.set(LOCALE_COOKIE, locale, cookieOptions);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)"],
};
