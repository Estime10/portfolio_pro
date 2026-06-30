/** Slugs stables pour i18n, routes et assets futurs. */
export const FEATURED_PROJECT_SLUGS = [
  "fleetscan",
  "shadow",
  "1v1-streetball",
  "spill-crumb",
] as const;

export const SECONDARY_PROJECT_SLUGS = [
  "jikowood",
  "enna",
  "maxweljones",
  "folio-photo",
  "purpose-sport",
] as const;

export const PROJECT_SLUGS = [...FEATURED_PROJECT_SLUGS, ...SECONDARY_PROJECT_SLUGS] as const;

export type FeaturedProjectSlug = (typeof FEATURED_PROJECT_SLUGS)[number];
export type SecondaryProjectSlug = (typeof SECONDARY_PROJECT_SLUGS)[number];
export type ProjectSlug = (typeof PROJECT_SLUGS)[number];

export type ProjectTier = "featured" | "secondary";

export type ProjectCatalogEntry = Readonly<{
  slug: ProjectSlug;
  tier: ProjectTier;
  year: number;
  hasCaseStudy: boolean;
  liveUrl?: string;
}>;

export const PROJECT_CATALOG: readonly ProjectCatalogEntry[] = [
  { slug: "fleetscan", tier: "featured", year: 2026, hasCaseStudy: true },
  { slug: "shadow", tier: "featured", year: 2026, hasCaseStudy: true },
  { slug: "1v1-streetball", tier: "featured", year: 2026, hasCaseStudy: true },
  { slug: "spill-crumb", tier: "featured", year: 2026, hasCaseStudy: true },
  { slug: "jikowood", tier: "secondary", year: 2026, hasCaseStudy: false },
  {
    slug: "enna",
    tier: "secondary",
    year: 2026,
    hasCaseStudy: false,
    liveUrl: "https://www.ennabv.be",
  },
  {
    slug: "maxweljones",
    tier: "secondary",
    year: 2026,
    hasCaseStudy: false,
    liveUrl: "https://www.maxweljones.com",
  },
  {
    slug: "folio-photo",
    tier: "secondary",
    year: 2026,
    hasCaseStudy: false,
    liveUrl: "https://photovibesbyshana.vercel.app/",
  },
  {
    slug: "purpose-sport",
    tier: "secondary",
    year: 2025,
    hasCaseStudy: false,
    liveUrl: "https://purpose-sport.com",
  },
] as const;

export function isProjectSlug(value: string): value is ProjectSlug {
  return (PROJECT_SLUGS as readonly string[]).includes(value);
}

export function getFeaturedProjects(): readonly ProjectCatalogEntry[] {
  return PROJECT_CATALOG.filter((item) => item.tier === "featured");
}

export function getSecondaryProjects(): readonly ProjectCatalogEntry[] {
  return PROJECT_CATALOG.filter((item) => item.tier === "secondary");
}
