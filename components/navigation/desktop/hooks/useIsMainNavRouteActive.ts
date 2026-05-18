"use client";

import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import { isMainNavRouteActive } from "@/lib/navigation/is-main-nav-route-active/isMainNavRouteActive";

export function useIsMainNavRouteActive(href: string): boolean {
  const pathname = usePathname();
  const layoutSegment = useSelectedLayoutSegment();

  return isMainNavRouteActive(pathname, href, layoutSegment);
}
