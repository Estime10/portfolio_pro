import gsap from "gsap";
import { useLayoutEffect, useRef, type RefObject } from "react";
import { resetMainNavPanelClosed } from "@/lib/animation/main-nav/reset-main-nav-panel-closed/resetMainNavPanelClosed";
import { runMainNavCloseAnimation } from "@/lib/animation/main-nav/run-main-nav-close-animation/runMainNavCloseAnimation";
import { runMainNavOpenAnimation } from "@/lib/animation/main-nav/run-main-nav-open-animation/runMainNavOpenAnimation";

export function useMainNavAnimation(
  isExpanded: boolean,
  leftPanelRef: RefObject<HTMLDivElement | null>,
  rightPanelRef: RefObject<HTMLDivElement | null>,
  onCloseComplete: () => void,
): void {
  const hasBeenOpenRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const leftPanel = leftPanelRef.current;
    const rightPanel = rightPanelRef.current;

    timelineRef.current?.kill();
    timelineRef.current = null;

    if (!leftPanel && !rightPanel) {
      return;
    }

    if (isExpanded) {
      hasBeenOpenRef.current = true;
      const tl = gsap.timeline();
      if (leftPanel) {
        tl.add(runMainNavOpenAnimation(leftPanel, "leading"), 0);
      }
      if (rightPanel) {
        tl.add(runMainNavOpenAnimation(rightPanel, "trailing"), 0);
      }
      timelineRef.current = tl;
    } else if (hasBeenOpenRef.current) {
      const tl = gsap.timeline();
      if (leftPanel) {
        tl.add(runMainNavCloseAnimation(leftPanel, "leading"), 0);
      }
      if (rightPanel) {
        tl.add(runMainNavCloseAnimation(rightPanel, "trailing"), 0);
      }
      tl.eventCallback("onComplete", () => {
        resetMainNavPanelClosed(leftPanel, "leading");
        resetMainNavPanelClosed(rightPanel, "trailing");
        onCloseComplete();
      });
      timelineRef.current = tl;
    } else {
      resetMainNavPanelClosed(leftPanel, "leading");
      resetMainNavPanelClosed(rightPanel, "trailing");
    }

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [isExpanded, leftPanelRef, onCloseComplete, rightPanelRef]);
}
