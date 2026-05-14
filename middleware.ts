import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  DEFAULT_LOCALE,
  isAppLocale,
  LOCALE_COOKIE,
  pickLocaleFromAcceptLanguage,
} from "@/lib/i18n/config";

export function middleware(request: NextRequest): NextResponse {
  const existing = request.cookies.get(LOCALE_COOKIE)?.value;
  if (existing && isAppLocale(existing)) {
    return NextResponse.next();
  }

  const locale =
    pickLocaleFromAcceptLanguage(request.headers.get("accept-language")) ??
    DEFAULT_LOCALE;

  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
