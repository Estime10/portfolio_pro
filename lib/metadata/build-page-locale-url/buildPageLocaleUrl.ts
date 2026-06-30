import type { AppLocale } from "@/lib/i18n/config";
import { LOCALE_SEARCH_PARAM } from "@/lib/i18n/locale-search-param/localeSearchParam";
import { getSiteUrl } from "@/lib/metadata/get-site-url/getSiteUrl";

function normalizePathname(pathname: string): string {
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function buildPageLocaleUrl(pathname: string, locale: AppLocale): URL {
  const pageUrl = new URL(normalizePathname(pathname), getSiteUrl());
  pageUrl.searchParams.set(LOCALE_SEARCH_PARAM, locale);
  return pageUrl;
}
