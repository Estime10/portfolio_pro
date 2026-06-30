import type { GsapTween } from "@/lib/animation/gsap/gsapAnimationTypes";
import { createGsapFromToTween } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import {
  MAIN_ROUTE_TRANSITION_EASE,
  MAIN_ROUTE_TRANSITION_IN_DURATION_SECONDS,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export type RunMainRouteFadeInAnimationOptions = Readonly<{
  onFadeComplete?: () => void;
}>;

export function runMainRouteFadeInAnimation(
  contentRoot: HTMLElement,
  options?: RunMainRouteFadeInAnimationOptions,
): Promise<GsapTween | null> {
  return runWithGsap((gsap) => {
    if (prefersReducedMotion()) {
      gsap.set(contentRoot, { autoAlpha: 1 });
      options?.onFadeComplete?.();
      return null;
    }

    return createGsapFromToTween(
      gsap,
      contentRoot,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: MAIN_ROUTE_TRANSITION_IN_DURATION_SECONDS,
        ease: MAIN_ROUTE_TRANSITION_EASE,
        force3D: true,
        overwrite: "auto",
        onComplete: () => {
          gsap.set(contentRoot, { clearProps: "opacity,visibility" });
          options?.onFadeComplete?.();
        },
      },
    );
  });
}
