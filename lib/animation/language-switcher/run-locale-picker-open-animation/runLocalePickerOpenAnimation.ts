import type { GsapTimeline } from "@/lib/animation/gsap/gsapAnimationTypes";
import { createGsapTimeline } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export function runLocalePickerOpenAnimation(panel: HTMLElement): Promise<GsapTimeline> {
  return runWithGsap((gsap) => {
    const targets = Array.from(panel.querySelectorAll<HTMLElement>("[data-locale-option]"));

    const tl = createGsapTimeline(gsap);

    if (targets.length === 0) {
      return tl;
    }

    if (prefersReducedMotion()) {
      gsap.set(targets, { x: 0, opacity: 1, scale: 1 });
      return tl;
    }

    gsap.set(targets, { x: 32, opacity: 0, scale: 0.9 });
    tl.to(targets, {
      x: 0,
      opacity: 1,
      scale: 1,
      duration: 0.44,
      stagger: 0.1,
      ease: "power3.out",
    });

    return tl;
  });
}
