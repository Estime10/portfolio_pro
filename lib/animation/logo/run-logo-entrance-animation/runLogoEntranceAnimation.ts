import gsap from "gsap";
import { animateThemeTransition } from "@/lib/animation/theme/animate-theme-transition/animateThemeTransition";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";
import { setThemeClass } from "@/lib/theme/actions";

export function runLogoEntranceAnimation(
  root: HTMLElement,
  left: HTMLElement,
  right: HTMLElement,
): () => void {
  let exitTimeline: gsap.core.Timeline | undefined;
  let cancelled = false;

  const ctx = gsap.context(() => {
    if (prefersReducedMotion()) {
      gsap.set([left, right], { x: 0, opacity: 1 });
      return;
    }

    setThemeClass("dark");

    gsap.set(left, { x: -72, opacity: 0 });
    gsap.set(right, { x: 72, opacity: 0 });

    const entranceTl = gsap.timeline();
    entranceTl
      .to(left, { x: 0, opacity: 1, duration: 0.85, ease: "power3.out" }, 0)
      .to(right, { x: 0, opacity: 1, duration: 0.85, ease: "power3.out" }, 0.1)
      .eventCallback("onComplete", () => {
        void animateThemeTransition("light").then(() => {
          if (cancelled) {
            return;
          }
          exitTimeline = gsap.timeline({ defaults: { ease: "power3.in" } });
          exitTimeline
            .to(left, { x: -72, opacity: 0, duration: 0.85 }, 0)
            .to(right, { x: 72, opacity: 0, duration: 0.85 }, 0.1);
        });
      });
  }, root);

  return () => {
    cancelled = true;
    exitTimeline?.kill();
    ctx.revert();
  };
}
