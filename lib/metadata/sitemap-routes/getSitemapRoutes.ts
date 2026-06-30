import {
  CONTACT_ROUTE_PATH,
  HOME_ROUTE_PATH,
  PROFILE_ROUTE_PATH,
  PROJECTS_ROUTE_PATH,
} from "@/lib/constants";
import { FEATURED_PROJECT_SLUGS } from "@/lib/projects/project-catalog";

const SPLASH_ROUTE_PATH = "/" as const;

/** Chemins publics indexables (hors assets et API). */
export function getSitemapRoutes(): readonly string[] {
  const caseStudyPaths = FEATURED_PROJECT_SLUGS.map(
    (slug) => `${PROJECTS_ROUTE_PATH}/${slug}`,
  );

  return [
    SPLASH_ROUTE_PATH,
    HOME_ROUTE_PATH,
    PROFILE_ROUTE_PATH,
    PROJECTS_ROUTE_PATH,
    CONTACT_ROUTE_PATH,
    ...caseStudyPaths,
  ];
}
