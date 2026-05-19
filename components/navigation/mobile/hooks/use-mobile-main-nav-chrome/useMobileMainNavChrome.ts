"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { isMobileHeaderViewport } from "@/lib/animation/mobile-header-chrome/is-mobile-header-viewport/isMobileHeaderViewport";
import { getMobileHeaderChromeElement } from "@/lib/animation/mobile-header-chrome/get-mobile-header-chrome-element/getMobileHeaderChromeElement";
import { runMobileHeaderChromeHideAnimation } from "@/lib/animation/mobile-header-chrome/run-mobile-header-chrome-hide-animation/runMobileHeaderChromeHideAnimation";
import { runMobileHeaderChromeShowAnimation } from "@/lib/animation/mobile-header-chrome/run-mobile-header-chrome-show-animation/runMobileHeaderChromeShowAnimation";
import { setMobileHeaderChromeVisible } from "@/lib/animation/mobile-header-chrome/set-mobile-header-chrome-visible/setMobileHeaderChromeVisible";

export type UseMobileMainNavChromeParams = Readonly<{
  flushPendingRoute: () => void;
  handlePanelsCloseComplete: () => void;
  isExpanded: boolean;
  panelsMounted: boolean;
  rootRef: RefObject<HTMLDivElement | null>;
  setOpenPathname: (pathname: string | null) => void;
  setPanelsMounted: (mounted: boolean) => void;
}>;

export type UseMobileMainNavChromeReturn = Readonly<{
  handleNavCloseComplete: () => void;
}>;

export function useMobileMainNavChrome({
  flushPendingRoute,
  handlePanelsCloseComplete,
  isExpanded,
  panelsMounted,
  rootRef,
  setOpenPathname,
  setPanelsMounted,
}: UseMobileMainNavChromeParams): UseMobileMainNavChromeReturn {
  const chromeTimelineRef = useRef<ReturnType<typeof runMobileHeaderChromeHideAnimation> | null>(
    null,
  );

  const restoreChrome = useCallback((): void => {
    setMobileHeaderChromeVisible(
      getMobileHeaderChromeElement(rootRef.current, "logo"),
      getMobileHeaderChromeElement(rootRef.current, "toolbar"),
    );
  }, [rootRef]);

  const handleNavCloseComplete = useCallback((): void => {
    const logoChrome = getMobileHeaderChromeElement(rootRef.current, "logo");
    const toolbarChrome = getMobileHeaderChromeElement(rootRef.current, "toolbar");

    if (!isMobileHeaderViewport()) {
      handlePanelsCloseComplete();
      return;
    }

    chromeTimelineRef.current?.kill();
    const timeline = runMobileHeaderChromeShowAnimation(logoChrome, toolbarChrome);
    timeline.eventCallback("onComplete", () => {
      handlePanelsCloseComplete();
    });
    chromeTimelineRef.current = timeline;
  }, [handlePanelsCloseComplete, rootRef]);

  useLayoutEffect(() => {
    if (!isMobileHeaderViewport()) {
      chromeTimelineRef.current?.kill();
      return;
    }

    if (!isExpanded || panelsMounted) {
      return;
    }

    const logoChrome = getMobileHeaderChromeElement(rootRef.current, "logo");
    const toolbarChrome = getMobileHeaderChromeElement(rootRef.current, "toolbar");

    chromeTimelineRef.current?.kill();
    const timeline = runMobileHeaderChromeHideAnimation(logoChrome, toolbarChrome);
    timeline.eventCallback("onComplete", () => {
      setPanelsMounted(true);
    });
    chromeTimelineRef.current = timeline;

    return () => {
      chromeTimelineRef.current?.kill();
      chromeTimelineRef.current = null;
    };
  }, [isExpanded, panelsMounted, rootRef, setPanelsMounted]);

  useEffect(() => {
    const onViewportChange = (): void => {
      if (isMobileHeaderViewport()) {
        return;
      }

      chromeTimelineRef.current?.kill();
      chromeTimelineRef.current = null;
      restoreChrome();
      setOpenPathname(null);
      setPanelsMounted(false);
      flushPendingRoute();
    };

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    mediaQuery.addEventListener("change", onViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", onViewportChange);
    };
  }, [flushPendingRoute, restoreChrome, setOpenPathname, setPanelsMounted]);

  useLayoutEffect(() => {
    if (!isMobileHeaderViewport() || isExpanded || panelsMounted) {
      return;
    }

    chromeTimelineRef.current?.kill();
    chromeTimelineRef.current = null;
    restoreChrome();
  }, [isExpanded, panelsMounted, restoreChrome]);

  return { handleNavCloseComplete };
}
