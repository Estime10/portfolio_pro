"use client";

import { usePathname } from "next/navigation";
import { useCallback, useRef, useState, type RefObject } from "react";
import { useEscapeKeyDismiss } from "@/lib/ui/hooks/use-escape-key-dismiss/useEscapeKeyDismiss";
import { useFocusTrap } from "@/lib/ui/hooks/use-focus-trap/useFocusTrap";
import { usePointerOutsideDismiss } from "@/lib/ui/hooks/use-pointer-outside-dismiss/usePointerOutsideDismiss";
import { usePendingRouteAfterClose } from "@/lib/navigation/use-pending-route-after-close/usePendingRouteAfterClose";

export type UseMainNavMenuStateOptions = Readonly<{
  mountPanelsWhenOpening: boolean;
}>;

export type UseMainNavMenuStateReturn = Readonly<{
  flushPendingRoute: () => void;
  handlePanelsCloseComplete: () => void;
  isExpanded: boolean;
  navigateViaClose: (href: string) => void;
  panelsMounted: boolean;
  rootRef: RefObject<HTMLDivElement | null>;
  setOpenPathname: (pathname: string | null) => void;
  setPanelsMounted: (mounted: boolean) => void;
  toggle: () => void;
}>;

type MainNavMenuSnapshot = Readonly<{
  openPathname: string | null;
  panelsMounted: boolean;
}>;

export function useMainNavMenuState({
  mountPanelsWhenOpening,
}: UseMainNavMenuStateOptions): UseMainNavMenuStateReturn {
  const pathname = usePathname();
  const [menuSnapshot, setMenuSnapshot] = useState<MainNavMenuSnapshot>({
    openPathname: null,
    panelsMounted: false,
  });
  const rootRef = useRef<HTMLDivElement>(null);

  const { openPathname, panelsMounted } = menuSnapshot;
  const isExpanded = openPathname !== null && openPathname === pathname;
  const { flushPendingRoute, navigateOrQueueAfterClose } = usePendingRouteAfterClose();

  const dismiss = useCallback((): void => {
    setMenuSnapshot((prev) => ({ ...prev, openPathname: null }));
  }, []);

  useEscapeKeyDismiss(isExpanded, dismiss);
  usePointerOutsideDismiss(isExpanded, rootRef, dismiss);
  useFocusTrap(isExpanded, rootRef);

  const navigateViaClose = useCallback(
    (href: string): void => {
      if (isExpanded) {
        setMenuSnapshot((prev) => ({ ...prev, openPathname: null }));
      }

      // Navigation immédiate — ne pas dépendre du onComplete GSAP (lazy-load / reduced-motion).
      navigateOrQueueAfterClose(href, false);
    },
    [isExpanded, navigateOrQueueAfterClose],
  );

  const toggle = useCallback((): void => {
    setMenuSnapshot((prev) => {
      if (prev.openPathname !== null && prev.openPathname === pathname) {
        return { ...prev, openPathname: null };
      }

      return {
        openPathname: pathname,
        panelsMounted: mountPanelsWhenOpening ? true : false,
      };
    });
  }, [mountPanelsWhenOpening, pathname]);

  const setOpenPathname = useCallback((nextOpenPathname: string | null): void => {
    setMenuSnapshot((prev) => ({ ...prev, openPathname: nextOpenPathname }));
  }, []);

  const setPanelsMounted = useCallback((mounted: boolean): void => {
    setMenuSnapshot((prev) => ({ ...prev, panelsMounted: mounted }));
  }, []);

  const handlePanelsCloseComplete = useCallback((): void => {
    setMenuSnapshot((prev) => ({ ...prev, panelsMounted: false }));
  }, []);

  return {
    flushPendingRoute,
    handlePanelsCloseComplete,
    isExpanded,
    navigateViaClose,
    panelsMounted,
    rootRef,
    setOpenPathname,
    setPanelsMounted,
    toggle,
  };
}
