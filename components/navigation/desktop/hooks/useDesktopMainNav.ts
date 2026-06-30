"use client";

import { useMemo, useRef } from "react";
import { useMainNavMenuState } from "@/components/navigation/main-nav/use-main-nav-menu-state/useMainNavMenuState";
import {
  MAIN_NAV_DESKTOP_LEADING_MOTION,
  MAIN_NAV_DESKTOP_TRAILING_MOTION,
} from "@/lib/animation/main-nav/main-nav-panel-motion/mainNavPanelMotion";
import { useMainNavPanelAnimation } from "@/lib/animation/main-nav/use-main-nav-panel-animation/useMainNavPanelAnimation";
import type { RefObject } from "react";

export type UseDesktopMainNavReturn = Readonly<{
  isExpanded: boolean;
  leftPanelRef: RefObject<HTMLDivElement | null>;
  navigateViaClose: (href: string) => void;
  panelsMounted: boolean;
  rightPanelRef: RefObject<HTMLDivElement | null>;
  rootRef: RefObject<HTMLDivElement | null>;
  toggle: () => void;
}>;

export function useDesktopMainNav(): UseDesktopMainNavReturn {
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const {
    handlePanelsCloseComplete,
    isExpanded,
    navigateViaClose,
    panelsMounted,
    rootRef,
    toggle,
  } = useMainNavMenuState({ mountPanelsWhenOpening: true });

  const panelAnimationTargets = useMemo(
    () => [
      { ref: leftPanelRef, motion: MAIN_NAV_DESKTOP_LEADING_MOTION },
      { ref: rightPanelRef, motion: MAIN_NAV_DESKTOP_TRAILING_MOTION },
    ],
    [],
  );

  useMainNavPanelAnimation(
    isExpanded,
    panelsMounted,
    panelAnimationTargets,
    handlePanelsCloseComplete,
  );

  return {
    isExpanded,
    leftPanelRef,
    navigateViaClose,
    panelsMounted,
    rightPanelRef,
    rootRef,
    toggle,
  };
}
