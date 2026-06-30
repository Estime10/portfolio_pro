import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/metadata/get-site-url/getSiteUrl";
import {
  OPEN_GRAPH_IMAGE_ALT,
  OPEN_GRAPH_IMAGE_HEIGHT,
  OPEN_GRAPH_IMAGE_PATH,
  OPEN_GRAPH_IMAGE_WIDTH,
} from "@/lib/metadata/open-graph-image/openGraphImage";
import { SITE_NAME } from "@/lib/metadata/site-name/siteName";

export type RootMetadataOverrides = Readonly<{
  title: Metadata["title"];
  description: string;
}>;

/** Métadonnées racine partagées : metadataBase, OG/Twitter par défaut, robots indexables. */
export function getRootMetadata(overrides: RootMetadataOverrides): Metadata {
  return {
    metadataBase: getSiteUrl(),
    ...overrides,
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
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
      images: [OPEN_GRAPH_IMAGE_PATH],
    },
  };
}
