"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";

export type UsePendingRouteAfterCloseReturn = Readonly<{
  flushPendingRoute: () => void;
  navigateOrQueueAfterClose: (href: string, isMenuExpanded: boolean) => void;
}>;

export function usePendingRouteAfterClose(): UsePendingRouteAfterCloseReturn {
  const router = useRouter();
  const pendingHrefRef = useRef<string | null>(null);

  const flushPendingRoute = useCallback((): void => {
    const href = pendingHrefRef.current;
    if (href === null) {
      return;
    }

    pendingHrefRef.current = null;
    router.push(href);
  }, [router]);

  const navigateOrQueueAfterClose = useCallback(
    (href: string, isMenuExpanded: boolean): void => {
      if (!isMenuExpanded) {
        router.push(href);
        return;
      }

      pendingHrefRef.current = href;
    },
    [router],
  );

  return {
    flushPendingRoute,
    navigateOrQueueAfterClose,
  };
}
