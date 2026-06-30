import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n/config";
import { buildPageLocaleUrl } from "@/lib/metadata/build-page-locale-url/buildPageLocaleUrl";
import { mapAppLocaleToHreflangLocale } from "@/lib/metadata/map-app-locale-to-hreflang-locale/mapAppLocaleToHreflangLocale";

export function buildPageHreflangAlternates(pathname: string): Record<string, string> {
  const languages: Record<string, string> = {};

  for (const locale of LOCALES) {
    languages[mapAppLocaleToHreflangLocale(locale)] = buildPageLocaleUrl(
      pathname,
      locale,
    ).toString();
  }

  languages["x-default"] = buildPageLocaleUrl(pathname, DEFAULT_LOCALE).toString();

  return languages;
}
