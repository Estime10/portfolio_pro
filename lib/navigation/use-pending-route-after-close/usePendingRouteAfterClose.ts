"use client";

import { useMainRouteTransition } from "@/lib/navigation/main-route-transition-context/MainRouteTransitionContext";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

export type UsePendingRouteAfterCloseReturn = Readonly<{
  flushPendingRoute: () => void;
  navigateOrQueueAfterClose: (href: string, isMenuExpanded: boolean) => void;
}>;

export function usePendingRouteAfterClose(): UsePendingRouteAfterCloseReturn {
  const router = useRouter();
  const routeTransition = useMainRouteTransition();
  const pendingHrefRef = useRef<string | null>(null);

  const pushRoute = useCallback(
    (href: string): void => {
      if (routeTransition) {
        routeTransition.navigateWithTransition(href);
        return;
      }

      router.push(href);
    },
    [routeTransition, router],
  );

  const flushPendingRoute = useCallback((): void => {
    const href = pendingHrefRef.current;
    if (href === null) {
      return;
    }

    pendingHrefRef.current = null;
    pushRoute(href);
  }, [pushRoute]);

  const navigateOrQueueAfterClose = useCallback(
    (href: string, isMenuExpanded: boolean): void => {
      if (!isMenuExpanded) {
        pushRoute(href);
        return;
      }

      pendingHrefRef.current = href;
    },
    [pushRoute],
  );

  return {
    flushPendingRoute,
    navigateOrQueueAfterClose,
  };
}
