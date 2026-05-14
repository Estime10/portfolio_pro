import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";
import {
  MAIN_SHELL_FADE_IN_DURATION_SECONDS,
  MAIN_SHELL_FADE_IN_EASE,
} from "@/lib/constants";

export type RunMainShellFadeInOptions = Readonly<{
  onFadeComplete?: () => void;
}>;

export function runMainShellFadeIn(
  shell: HTMLElement,
  options?: RunMainShellFadeInOptions,
): gsap.core.Tween | null {
  if (prefersReducedMotion()) {
    gsap.set(shell, { autoAlpha: 1 });
    options?.onFadeComplete?.();
    return null;
  }

  return gsap.fromTo(
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
}
