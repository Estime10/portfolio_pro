import type { GsapTween } from "@/lib/animation/gsap/gsapAnimationTypes";
import { createGsapFromToTween } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";
import { MAIN_SHELL_FADE_IN_DURATION_SECONDS, MAIN_SHELL_FADE_IN_EASE } from "@/lib/constants";

export type RunMainShellFadeInOptions = Readonly<{
  onFadeComplete?: () => void;
}>;

export function runMainShellFadeIn(
  shell: HTMLElement,
  options?: RunMainShellFadeInOptions,
): Promise<GsapTween | null> {
  return runWithGsap((gsap) => {
    if (prefersReducedMotion()) {
      gsap.set(shell, { autoAlpha: 1 });
      options?.onFadeComplete?.();
      return null;
    }

    return createGsapFromToTween(
      gsap,
      shell,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        duration: MAIN_SHELL_FADE_IN_DURATION_SECONDS,
        ease: MAIN_SHELL_FADE_IN_EASE,
        force3D: true,
        overwrite: "auto",
        onComplete: () => {
          gsap.set(shell, { clearProps: "opacity,visibility" });
          options?.onFadeComplete?.();
        },
      },
    );
  });
}
