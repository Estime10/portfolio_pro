import {
  CONTACT_ROUTE_PATH,
  HOME_ROUTE_PATH,
  PROFILE_ROUTE_PATH,
  PROJECTS_ROUTE_PATH,
} from "@/lib/constants";

export const MAIN_NAV_ROUTE_SEGMENT_BY_PATH = {
  [HOME_ROUTE_PATH]: "home",
  [PROFILE_ROUTE_PATH]: "profile",
  [PROJECTS_ROUTE_PATH]: "projects",
  [CONTACT_ROUTE_PATH]: "contact",
} as const;

export type MainNavRouteSegment =
  (typeof MAIN_NAV_ROUTE_SEGMENT_BY_PATH)[keyof typeof MAIN_NAV_ROUTE_SEGMENT_BY_PATH];

export function getMainNavRouteSegmentFromHref(href: string): MainNavRouteSegment | null {
  if (href === HOME_ROUTE_PATH) {
    return "home";
  }
  if (href === PROFILE_ROUTE_PATH) {
    return "profile";
  }
  if (href === PROJECTS_ROUTE_PATH) {
    return "projects";
  }
  if (href === CONTACT_ROUTE_PATH) {
    return "contact";
  }
  return null;
}
