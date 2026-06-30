import type { GsapTween } from "@/lib/animation/gsap/gsapAnimationTypes";
import { createGsapTween } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import {
  MAIN_ROUTE_TRANSITION_EASE,
  MAIN_ROUTE_TRANSITION_OUT_DURATION_SECONDS,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export function runMainRouteFadeOutAnimation(contentRoot: HTMLElement): Promise<GsapTween | null> {
  return runWithGsap((gsap) => {
    if (prefersReducedMotion()) {
      gsap.set(contentRoot, { autoAlpha: 0 });
      return null;
    }

    return createGsapTween(gsap, contentRoot, {
      autoAlpha: 0,
      duration: MAIN_ROUTE_TRANSITION_OUT_DURATION_SECONDS,
      ease: MAIN_ROUTE_TRANSITION_EASE,
      force3D: true,
      overwrite: "auto",
    });
  });
}
