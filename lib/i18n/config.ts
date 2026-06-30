export const LOCALE_COOKIE = "portfolio-locale" as const;

export const DEFAULT_LOCALE = "fr" as const;

export const LOCALES = ["fr", "en"] as const;

export type AppLocale = (typeof LOCALES)[number];

export function isAppLocale(value: string): value is AppLocale {
  return (LOCALES as readonly string[]).includes(value);
}

export function pickLocaleFromAcceptLanguage(header: string | null): AppLocale | undefined {
  if (header === null || header === "") {
    return undefined;
  }
  for (const part of header.split(",")) {
    const tag = part.split(";")[0]?.trim().toLowerCase();
    if (!tag) {
      continue;
    }
    if (tag === "fr" || tag.startsWith("fr-")) {
      return "fr";
    }
    if (tag === "en" || tag.startsWith("en-")) {
      return "en";
    }
  }
  return undefined;
}
