"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useEffect } from "react";
import { useMainNavMenuState } from "@/components/navigation/main-nav/use-main-nav-menu-state/useMainNavMenuState";
import { isMobileHeaderViewport } from "@/lib/animation/mobile-header-chrome/is-mobile-header-viewport/isMobileHeaderViewport";
import { getMobileHeaderChromeElement } from "@/lib/animation/mobile-header-chrome/get-mobile-header-chrome-element/getMobileHeaderChromeElement";
import { runMobileHeaderChromeHideAnimation } from "@/lib/animation/mobile-header-chrome/run-mobile-header-chrome-hide-animation/runMobileHeaderChromeHideAnimation";
import { runMobileHeaderChromeShowAnimation } from "@/lib/animation/mobile-header-chrome/run-mobile-header-chrome-show-animation/runMobileHeaderChromeShowAnimation";
import { setMobileHeaderChromeVisible } from "@/lib/animation/mobile-header-chrome/set-mobile-header-chrome-visible/setMobileHeaderChromeVisible";
import { MAIN_NAV_MOBILE_PANEL_MOTION } from "@/lib/animation/main-nav/main-nav-panel-motion/mainNavPanelMotion";
import { useMainNavPanelAnimation } from "@/lib/animation/main-nav/use-main-nav-panel-animation/useMainNavPanelAnimation";
import type { RefObject } from "react";

export type UseMobileMainNavReturn = Readonly<{
  isExpanded: boolean;
  navigateViaClose: (href: string) => void;
  panelRef: RefObject<HTMLDivElement | null>;
  panelsMounted: boolean;
  rootRef: RefObject<HTMLDivElement | null>;
  toggle: () => void;
}>;

export function useMobileMainNav(): UseMobileMainNavReturn {
  const panelRef = useRef<HTMLDivElement>(null);
  const chromeTimelineRef = useRef<ReturnType<typeof runMobileHeaderChromeHideAnimation> | null>(
    null,
  );
  const {
    flushPendingRoute,
    handlePanelsCloseComplete,
    isExpanded,
    navigateViaClose,
    panelsMounted,
    rootRef,
    setOpenPathname,
    setPanelsMounted,
    toggle,
  } = useMainNavMenuState({ mountPanelsWhenOpening: false });

  const handleNavCloseComplete = useCallback((): void => {
    const logoChrome = getMobileHeaderChromeElement(rootRef.current, "logo");
    const toolbarChrome = getMobileHeaderChromeElement(rootRef.current, "toolbar");

    if (!isMobileHeaderViewport()) {
      handlePanelsCloseComplete();
      return;
    }

    chromeTimelineRef.current?.kill();
    const tl = runMobileHeaderChromeShowAnimation(logoChrome, toolbarChrome);
    tl.eventCallback("onComplete", () => {
      handlePanelsCloseComplete();
    });
    chromeTimelineRef.current = tl;
  }, [handlePanelsCloseComplete, rootRef]);

  const isNavAnimationActive = isExpanded && panelsMounted;

  const panelAnimationTargets = useMemo(
    () => [{ ref: panelRef, motion: MAIN_NAV_MOBILE_PANEL_MOTION }],
    [],
  );

  useMainNavPanelAnimation(isNavAnimationActive, panelAnimationTargets, handleNavCloseComplete);

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
    const tl = runMobileHeaderChromeHideAnimation(logoChrome, toolbarChrome);
    tl.eventCallback("onComplete", () => {
      setPanelsMounted(true);
    });
    chromeTimelineRef.current = tl;

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

      setMobileHeaderChromeVisible(
        getMobileHeaderChromeElement(rootRef.current, "logo"),
        getMobileHeaderChromeElement(rootRef.current, "toolbar"),
      );
      setOpenPathname(null);
      setPanelsMounted(false);
      flushPendingRoute();
    };

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    mediaQuery.addEventListener("change", onViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", onViewportChange);
    };
  }, [flushPendingRoute, rootRef, setOpenPathname, setPanelsMounted]);

  useLayoutEffect(() => {
    if (!isMobileHeaderViewport() || isExpanded || panelsMounted) {
      return;
    }

    chromeTimelineRef.current?.kill();
    chromeTimelineRef.current = null;

    setMobileHeaderChromeVisible(
      getMobileHeaderChromeElement(rootRef.current, "logo"),
      getMobileHeaderChromeElement(rootRef.current, "toolbar"),
    );
  }, [isExpanded, panelsMounted, rootRef]);

  return {
    isExpanded,
    navigateViaClose,
    panelRef,
    panelsMounted,
    rootRef,
    toggle,
  };
}
