"use client";

import { useMemo, useRef } from "react";
import { useMainNavMenuState } from "@/components/navigation/main-nav/use-main-nav-menu-state/useMainNavMenuState";
import { useMobileMainNavChrome } from "@/components/navigation/mobile/hooks/use-mobile-main-nav-chrome/useMobileMainNavChrome";
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
  const {
    handlePanelsCloseComplete,
    isExpanded,
    navigateViaClose,
    panelsMounted,
    rootRef,
    setOpenPathname,
    setPanelsMounted,
    toggle,
  } = useMainNavMenuState({ mountPanelsWhenOpening: false });

  const { handleNavCloseComplete } = useMobileMainNavChrome({
    handlePanelsCloseComplete,
    isExpanded,
    panelsMounted,
    rootRef,
    setOpenPathname,
    setPanelsMounted,
  });

  const panelAnimationTargets = useMemo(
    () => [{ ref: panelRef, motion: MAIN_NAV_MOBILE_PANEL_MOTION }],
    [],
  );

  useMainNavPanelAnimation(
    isExpanded && panelsMounted,
    panelsMounted,
    panelAnimationTargets,
    handleNavCloseComplete,
  );

  return {
    isExpanded,
    navigateViaClose,
    panelRef,
    panelsMounted,
    rootRef,
    toggle,
  };
}
