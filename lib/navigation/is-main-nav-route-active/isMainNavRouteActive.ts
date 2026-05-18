import { getMainNavRouteSegmentFromHref } from "@/lib/navigation/main-nav-route-segment/mainNavRouteSegment";
import { normalizeAppPathname } from "@/lib/navigation/normalize-app-pathname/normalizeAppPathname";

function getMainNavRouteSegmentFromPathname(pathname: string): string | null {
  const normalized = normalizeAppPathname(pathname);
  const segment = normalized.split("/").filter(Boolean)[0];
  return segment ?? null;
}

export function isMainNavRouteActive(
  pathname: string,
  href: string,
  layoutSegment: string | null,
): boolean {
  const targetSegment = getMainNavRouteSegmentFromHref(href);
  if (!targetSegment) {
    return false;
  }

  if (layoutSegment === targetSegment) {
    return true;
  }

  const pathSegment = getMainNavRouteSegmentFromPathname(pathname);
  return pathSegment === targetSegment;
}
