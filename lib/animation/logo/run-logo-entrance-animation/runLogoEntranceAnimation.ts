import gsap from "gsap";
import { animateThemeTransition } from "@/lib/animation/theme/animate-theme-transition/animateThemeTransition";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";
import {
  LOGO_ENTRANCE_DURATION_SECONDS,
  LOGO_ENTRANCE_EASE,
  LOGO_ENTRANCE_OFFSET_PX,
  LOGO_ENTRANCE_STAGGER_SECONDS,
  LOGO_EXIT_DURATION_SECONDS,
  LOGO_EXIT_EASE,
  LOGO_EXIT_STAGGER_SECONDS,
} from "@/lib/constants";
import { setThemeClass } from "@/lib/theme/actions";

export type RunLogoEntranceAnimationOptions = Readonly<{
  onSplashComplete?: () => void;
}>;

export function runLogoEntranceAnimation(
  root: HTMLElement,
  left: HTMLElement,
  right: HTMLElement,
  options?: RunLogoEntranceAnimationOptions,
): () => void {
  let exitTimeline: gsap.core.Timeline | undefined;
  let cancelled = false;
  const { onSplashComplete } = options ?? {};

  const ctx = gsap.context(() => {
    if (prefersReducedMotion()) {
      gsap.set([left, right], { x: 0, opacity: 1 });
      queueMicrotask(() => {
        if (!cancelled) {
          onSplashComplete?.();
        }
      });
      return;
    }

    setThemeClass("dark");

    gsap.set(left, { x: -LOGO_ENTRANCE_OFFSET_PX, opacity: 0 });
    gsap.set(right, { x: LOGO_ENTRANCE_OFFSET_PX, opacity: 0 });

    const entranceTl = gsap.timeline();
    entranceTl
      .to(
        left,
        {
          x: 0,
          opacity: 1,
          duration: LOGO_ENTRANCE_DURATION_SECONDS,
          ease: LOGO_ENTRANCE_EASE,
        },
        0,
      )
      .to(
        right,
        {
          x: 0,
          opacity: 1,
          duration: LOGO_ENTRANCE_DURATION_SECONDS,
          ease: LOGO_ENTRANCE_EASE,
        },
        LOGO_ENTRANCE_STAGGER_SECONDS,
      )
      .eventCallback("onComplete", () => {
        void animateThemeTransition("light").then(() => {
          if (cancelled) {
            return;
          }
          exitTimeline = gsap.timeline({
            defaults: { ease: LOGO_EXIT_EASE },
            onComplete: () => {
              if (!cancelled) {
                onSplashComplete?.();
              }
            },
          });
          exitTimeline
            .to(
              left,
              {
                x: -LOGO_ENTRANCE_OFFSET_PX,
                opacity: 0,
                duration: LOGO_EXIT_DURATION_SECONDS,
              },
              0,
            )
            .to(
              right,
              {
                x: LOGO_ENTRANCE_OFFSET_PX,
                opacity: 0,
                duration: LOGO_EXIT_DURATION_SECONDS,
              },
              LOGO_EXIT_STAGGER_SECONDS,
            );
        });
      });
  }, root);

  return () => {
    cancelled = true;
    exitTimeline?.kill();
    ctx.revert();
  };
}
