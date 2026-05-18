import gsap from "gsap";
import { useLayoutEffect, useRef, type RefObject } from "react";
import type { MainNavPanelMotion } from "@/lib/animation/main-nav/main-nav-panel-motion/mainNavPanelMotion";
import { resetMainNavPanelClosed } from "@/lib/animation/main-nav/reset-main-nav-panel-closed/resetMainNavPanelClosed";
import { runMainNavPanelCloseAnimation } from "@/lib/animation/main-nav/run-main-nav-panel-close-animation/runMainNavPanelCloseAnimation";
import { runMainNavPanelOpenAnimation } from "@/lib/animation/main-nav/run-main-nav-panel-open-animation/runMainNavPanelOpenAnimation";

export type MainNavPanelAnimationTarget = Readonly<{
  motion: MainNavPanelMotion;
  ref: RefObject<HTMLDivElement | null>;
}>;

export function useMainNavPanelAnimation(
  isExpanded: boolean,
  targets: readonly MainNavPanelAnimationTarget[],
  onCloseComplete: () => void,
): void {
  const hasBeenOpenRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const panels = targets
      .map((target) => ({ motion: target.motion, panel: target.ref.current }))
      .filter(
        (entry): entry is { motion: MainNavPanelMotion; panel: HTMLDivElement } =>
          entry.panel !== null,
      );

    timelineRef.current?.kill();
    timelineRef.current = null;

    if (panels.length === 0) {
      return;
    }

    if (isExpanded) {
      hasBeenOpenRef.current = true;
      const tl = gsap.timeline();
      for (const { motion, panel } of panels) {
        tl.add(runMainNavPanelOpenAnimation(panel, motion), 0);
      }
      timelineRef.current = tl;
    } else if (hasBeenOpenRef.current) {
      const tl = gsap.timeline();
      for (const { motion, panel } of panels) {
        tl.add(runMainNavPanelCloseAnimation(panel, motion), 0);
      }
      tl.eventCallback("onComplete", () => {
        for (const { motion, panel } of panels) {
          resetMainNavPanelClosed(panel, motion);
        }
        onCloseComplete();
      });
      timelineRef.current = tl;
    } else {
      for (const { motion, panel } of panels) {
        resetMainNavPanelClosed(panel, motion);
      }
    }

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [isExpanded, onCloseComplete, targets]);
}
