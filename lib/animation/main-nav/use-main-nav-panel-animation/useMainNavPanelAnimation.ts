import type { GsapTimeline } from "@/lib/animation/gsap/gsapAnimationTypes";
import { createGsapTimeline } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { loadGsap, preloadGsap } from "@/lib/animation/gsap/loadGsap";
import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import type { MainNavPanelMotion } from "@/lib/animation/main-nav/main-nav-panel-motion/mainNavPanelMotion";
import { buildMainNavPanelCloseTimeline } from "@/lib/animation/main-nav/run-main-nav-panel-close-animation/runMainNavPanelCloseAnimation";
import { buildMainNavPanelOpenTimeline } from "@/lib/animation/main-nav/run-main-nav-panel-open-animation/runMainNavPanelOpenAnimation";
import { setMainNavPanelClosedState } from "@/lib/animation/main-nav/reset-main-nav-panel-closed/resetMainNavPanelClosed";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export type MainNavPanelAnimationTarget = Readonly<{
  motion: MainNavPanelMotion;
  ref: RefObject<HTMLDivElement | null>;
}>;

function isAnimationAborted(abortRef: { current: boolean }): boolean {
  return abortRef.current;
}

export function useMainNavPanelAnimation(
  isExpanded: boolean,
  arePanelsMounted: boolean,
  targets: readonly MainNavPanelAnimationTarget[],
  onCloseComplete: () => void,
): void {
  const hasBeenOpenRef = useRef(false);
  const timelineRef = useRef<GsapTimeline | null>(null);
  const onCloseCompleteRef = useRef(onCloseComplete);
  const effectGenerationRef = useRef(0);

  useEffect(() => {
    onCloseCompleteRef.current = onCloseComplete;
  }, [onCloseComplete]);

  useEffect(() => {
    preloadGsap();
  }, []);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const effectGeneration = ++effectGenerationRef.current;
    const abortRef = { current: false };

    if (isExpanded) {
      hasBeenOpenRef.current = true;
    }

    const panels = targets
      .map((target) => ({ motion: target.motion, panel: target.ref.current }))
      .filter(
        (entry): entry is { motion: MainNavPanelMotion; panel: HTMLDivElement } =>
          entry.panel !== null,
      );

    if (panels.length === 0) {
      return;
    }

    const isCurrentEffect = (): boolean => effectGeneration === effectGenerationRef.current;

    const finishClose = (gsap: Awaited<ReturnType<typeof loadGsap>>): void => {
      for (const { motion, panel } of panels) {
        setMainNavPanelClosedState(gsap, panel, motion);
      }
      onCloseCompleteRef.current();
    };

    void (async () => {
      const gsap = await loadGsap();
      if (!isCurrentEffect() || isAnimationAborted(abortRef)) {
        return;
      }

      timelineRef.current?.kill();
      timelineRef.current = null;

      if (isExpanded) {
        const tl = createGsapTimeline(gsap);
        for (const { motion, panel } of panels) {
          tl.add(buildMainNavPanelOpenTimeline(gsap, panel, motion), 0);
        }
        timelineRef.current = tl;
        return;
      }

      if (hasBeenOpenRef.current) {
        const runFinishClose = (): void => {
          if (!isCurrentEffect() || isAnimationAborted(abortRef)) {
            return;
          }
          finishClose(gsap);
        };

        if (prefersReducedMotion()) {
          runFinishClose();
          return;
        }

        const tl = createGsapTimeline(gsap);
        for (const { motion, panel } of panels) {
          tl.add(buildMainNavPanelCloseTimeline(gsap, panel, motion), 0);
        }
        tl.eventCallback("onComplete", runFinishClose);
        timelineRef.current = tl;
        return;
      }

      for (const { motion, panel } of panels) {
        setMainNavPanelClosedState(gsap, panel, motion);
      }
    })();

    return () => {
      abortRef.current = true;
    };
  }, [arePanelsMounted, isExpanded, targets]);
}
