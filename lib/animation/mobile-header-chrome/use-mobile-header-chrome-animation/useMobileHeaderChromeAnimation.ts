import { useLayoutEffect, useRef, type RefObject } from "react";
import { isMobileHeaderViewport } from "@/lib/animation/mobile-header-chrome/is-mobile-header-viewport/isMobileHeaderViewport";
import { runMobileHeaderChromeHideAnimation } from "@/lib/animation/mobile-header-chrome/run-mobile-header-chrome-hide-animation/runMobileHeaderChromeHideAnimation";
import { runMobileHeaderChromeShowAnimation } from "@/lib/animation/mobile-header-chrome/run-mobile-header-chrome-show-animation/runMobileHeaderChromeShowAnimation";
import { setMobileHeaderChromeVisible } from "@/lib/animation/mobile-header-chrome/set-mobile-header-chrome-visible/setMobileHeaderChromeVisible";

type MobileHeaderChromeTimeline = ReturnType<typeof runMobileHeaderChromeHideAnimation>;

export function useMobileHeaderChromeAnimation(
  isMenuExpanded: boolean,
  logoChromeRef: RefObject<HTMLDivElement | null>,
  toolbarChromeRef: RefObject<HTMLDivElement | null>,
): void {
  const hasBeenHiddenRef = useRef(false);
  const timelineRef = useRef<MobileHeaderChromeTimeline | null>(null);

  useLayoutEffect(() => {
    const logoChrome = logoChromeRef.current;
    const toolbarChrome = toolbarChromeRef.current;

    timelineRef.current?.kill();
    timelineRef.current = null;

    if (!logoChrome && !toolbarChrome) {
      return;
    }

    if (!isMobileHeaderViewport()) {
      setMobileHeaderChromeVisible(logoChrome, toolbarChrome);
      return;
    }

    if (isMenuExpanded) {
      hasBeenHiddenRef.current = true;
      timelineRef.current = runMobileHeaderChromeHideAnimation(logoChrome, toolbarChrome);
    } else if (hasBeenHiddenRef.current) {
      timelineRef.current = runMobileHeaderChromeShowAnimation(logoChrome, toolbarChrome);
    } else {
      setMobileHeaderChromeVisible(logoChrome, toolbarChrome);
    }

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [isMenuExpanded, logoChromeRef, toolbarChromeRef]);

  useLayoutEffect(() => {
    const onViewportChange = (): void => {
      if (isMobileHeaderViewport()) {
        return;
      }

      timelineRef.current?.kill();
      setMobileHeaderChromeVisible(logoChromeRef.current, toolbarChromeRef.current);
    };

    const mediaQuery = window.matchMedia("(max-width: 767px)");
    mediaQuery.addEventListener("change", onViewportChange);

    return () => {
      mediaQuery.removeEventListener("change", onViewportChange);
    };
  }, [logoChromeRef, toolbarChromeRef]);
}
