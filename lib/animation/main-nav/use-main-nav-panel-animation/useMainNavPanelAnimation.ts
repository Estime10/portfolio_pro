import type { GsapTimeline } from "@/lib/animation/gsap/gsapAnimationTypes";
import { createGsapTimeline } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { loadGsap } from "@/lib/animation/gsap/loadGsap";
import { useLayoutEffect, useRef, type RefObject } from "react";
import type { MainNavPanelMotion } from "@/lib/animation/main-nav/main-nav-panel-motion/mainNavPanelMotion";
import { resetMainNavPanelClosed } from "@/lib/animation/main-nav/reset-main-nav-panel-closed/resetMainNavPanelClosed";
import { runMainNavPanelCloseAnimation } from "@/lib/animation/main-nav/run-main-nav-panel-close-animation/runMainNavPanelCloseAnimation";
import { runMainNavPanelOpenAnimation } from "@/lib/animation/main-nav/run-main-nav-panel-open-animation/runMainNavPanelOpenAnimation";

export type MainNavPanelAnimationTarget = Readonly<{
  motion: MainNavPanelMotion;
  ref: RefObject<HTMLDivElement | null>;
}>;

function isAnimationAborted(abortRef: { current: boolean }): boolean {
  return abortRef.current;
}

export function useMainNavPanelAnimation(
  isExpanded: boolean,
  targets: readonly MainNavPanelAnimationTarget[],
  onCloseComplete: () => void,
): void {
  const hasBeenOpenRef = useRef(false);
  const timelineRef = useRef<GsapTimeline | null>(null);

  useLayoutEffect(() => {
    const abortRef = { current: false };

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

    void (async () => {
      const gsap = await loadGsap();
      if (isAnimationAborted(abortRef)) {
        return;
      }

      if (isExpanded) {
        hasBeenOpenRef.current = true;
        const tl = createGsapTimeline(gsap);
        for (const { motion, panel } of panels) {
          tl.add(await runMainNavPanelOpenAnimation(panel, motion), 0);
          if (isAnimationAborted(abortRef)) {
            tl.kill();
            return;
          }
        }
        timelineRef.current = tl;
        return;
      }

      if (hasBeenOpenRef.current) {
        const tl = createGsapTimeline(gsap);
        for (const { motion, panel } of panels) {
          tl.add(await runMainNavPanelCloseAnimation(panel, motion), 0);
          if (isAnimationAborted(abortRef)) {
            tl.kill();
            return;
          }
        }
        tl.eventCallback("onComplete", () => {
          void Promise.all(
            panels.map(({ motion, panel }) => resetMainNavPanelClosed(panel, motion)),
          ).then(() => {
            if (!isAnimationAborted(abortRef)) {
              onCloseComplete();
            }
          });
        });
        timelineRef.current = tl;
        return;
      }

      await Promise.all(panels.map(({ motion, panel }) => resetMainNavPanelClosed(panel, motion)));
    })();

    return () => {
      abortRef.current = true;
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [isExpanded, onCloseComplete, targets]);
}
