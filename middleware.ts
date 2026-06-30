import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  isAppLocale,
  LOCALE_COOKIE,
  pickLocaleFromAcceptLanguage,
} from "@/lib/i18n/config";
import { LOCALE_SEARCH_PARAM } from "@/lib/i18n/locale-search-param/localeSearchParam";

const LOCALE_COOKIE_OPTIONS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export function middleware(request: NextRequest): NextResponse {
  const response = NextResponse.next();
  const langParam = request.nextUrl.searchParams.get(LOCALE_SEARCH_PARAM);

  if (langParam && isAppLocale(langParam)) {
    response.cookies.set(LOCALE_COOKIE, langParam, LOCALE_COOKIE_OPTIONS);
    return response;
  }

  const existing = request.cookies.get(LOCALE_COOKIE)?.value;
  if (existing && isAppLocale(existing)) {
    return response;
  }

  const locale =
    pickLocaleFromAcceptLanguage(request.headers.get("accept-language")) ?? DEFAULT_LOCALE;

  response.cookies.set(LOCALE_COOKIE, locale, LOCALE_COOKIE_OPTIONS);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)"],
};
