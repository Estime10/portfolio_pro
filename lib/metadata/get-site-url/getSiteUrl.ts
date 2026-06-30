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

  /** Domaine de production du projet (Vercel — activer les variables système). */
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProduction) {
    const origin = normalizeOrigin(vercelProduction);
    if (origin) {
      return origin;
    }
  }

  const vercelDeployment = process.env.VERCEL_URL;
  if (vercelDeployment) {
    return normalizeOrigin(vercelDeployment);
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
