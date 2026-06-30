import type { GsapTimeline } from "@/lib/animation/gsap/gsapAnimationTypes";
import { createGsapTimeline } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

const LOCALE_PICKER_EXIT_X_PX = 32;

export function runLocalePickerCloseAnimation(panel: HTMLElement): Promise<GsapTimeline> {
  return runWithGsap((gsap) => {
    const targets = Array.from(panel.querySelectorAll<HTMLElement>("[data-locale-option]"));

    const tl = createGsapTimeline(gsap);

    if (targets.length === 0) {
      return tl;
    }

    if (prefersReducedMotion()) {
      gsap.set(targets, {
        x: LOCALE_PICKER_EXIT_X_PX,
        opacity: 0,
        scale: 0.9,
      });
      return tl;
    }

    tl.to(targets, {
      x: LOCALE_PICKER_EXIT_X_PX,
      opacity: 0,
      scale: 0.9,
      duration: 0.36,
      stagger: 0.08,
      ease: "power2.in",
    });

    return tl;
  });
}
