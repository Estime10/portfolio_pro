import type { Metadata } from "next";
import type { AppLocale } from "@/lib/i18n/config";
import { getSiteUrl } from "@/lib/metadata/get-site-url/getSiteUrl";
import { mapAppLocaleToOpenGraphLocale } from "@/lib/metadata/map-app-locale-to-open-graph-locale/mapAppLocaleToOpenGraphLocale";
import {
  OPEN_GRAPH_IMAGE_ALT,
  OPEN_GRAPH_IMAGE_HEIGHT,
  OPEN_GRAPH_IMAGE_PATH,
  OPEN_GRAPH_IMAGE_WIDTH,
} from "@/lib/metadata/open-graph-image/openGraphImage";
import { SITE_NAME } from "@/lib/metadata/site-name/siteName";

export type CreatePageMetadataInput = Readonly<{
  title: string;
  description: string;
  /** Chemin applicatif, ex. `/home` ou `/projects/fleetscan`. */
  pathname: string;
  locale: AppLocale;
  /** Titre pleine page sans template (splash `/`). */
  titleAbsolute?: boolean;
}>;

function resolvePageUrl(pathname: string): URL {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return new URL(normalizedPath, getSiteUrl());
}

function resolveOpenGraphTitle(title: string, titleAbsolute: boolean): string {
  if (titleAbsolute) {
    return title;
  }
  return `${title} | ${SITE_NAME}`;
}

export function createPageMetadata(input: CreatePageMetadataInput): Metadata {
  const pageUrl = resolvePageUrl(input.pathname);
  const openGraphTitle = resolveOpenGraphTitle(input.title, input.titleAbsolute === true);
  const openGraphLocale = mapAppLocaleToOpenGraphLocale(input.locale);

  return {
    title: input.titleAbsolute === true ? { absolute: input.title } : input.title,
    description: input.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      locale: openGraphLocale,
      url: pageUrl,
      siteName: SITE_NAME,
      title: openGraphTitle,
      description: input.description,
      images: [
        {
          url: OPEN_GRAPH_IMAGE_PATH,
          width: OPEN_GRAPH_IMAGE_WIDTH,
          height: OPEN_GRAPH_IMAGE_HEIGHT,
          alt: OPEN_GRAPH_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: input.description,
      images: [OPEN_GRAPH_IMAGE_PATH],
    },
  };
}
