const LOCAL_DEV_SITE_URL = "http://localhost:3000";

function normalizeOrigin(value: string): string | undefined {
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return undefined;
  }

  try {
    const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    return new URL(withProtocol).origin;
  } catch {
    return undefined;
  }
}

function readSiteUrlFromEnv(): string | undefined {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    const origin = normalizeOrigin(explicit);
    if (origin) {
      return origin;
    }
  }

  const vercel = process.env.VERCEL_URL;
  if (vercel) {
    return normalizeOrigin(vercel);
  }

  if (process.env.NODE_ENV === "development") {
    return LOCAL_DEV_SITE_URL;
  }

  return undefined;
}

/** Origine absolue du site (metadataBase, sitemap, canonical). */
export function getSiteUrl(): URL {
  const origin = readSiteUrlFromEnv();
  return new URL(origin ?? LOCAL_DEV_SITE_URL);
}
