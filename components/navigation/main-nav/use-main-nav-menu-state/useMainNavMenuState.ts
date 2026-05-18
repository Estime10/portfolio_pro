"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
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

export function useMainNavMenuState({
  mountPanelsWhenOpening,
}: UseMainNavMenuStateOptions): UseMainNavMenuStateReturn {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const [panelsMounted, setPanelsMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const isExpanded = openPathname === pathname;
  const { flushPendingRoute, navigateOrQueueAfterClose } = usePendingRouteAfterClose();

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setOpenPathname(null);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const onPointer = (event: PointerEvent): void => {
      if (rootRef.current?.contains(event.target as Node)) {
        return;
      }
      setOpenPathname(null);
    };

    document.addEventListener("pointerdown", onPointer);

    return () => {
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [isExpanded]);

  const navigateViaClose = useCallback(
    (href: string): void => {
      navigateOrQueueAfterClose(href, isExpanded);
      if (isExpanded) {
        setOpenPathname(null);
      }
    },
    [isExpanded, navigateOrQueueAfterClose],
  );

  const toggle = useCallback((): void => {
    if (openPathname === pathname) {
      setOpenPathname(null);
      return;
    }

    if (mountPanelsWhenOpening) {
      setPanelsMounted(true);
    }

    setOpenPathname(pathname);
  }, [mountPanelsWhenOpening, openPathname, pathname]);

  const handlePanelsCloseComplete = useCallback((): void => {
    setPanelsMounted(false);
    flushPendingRoute();
  }, [flushPendingRoute]);

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
