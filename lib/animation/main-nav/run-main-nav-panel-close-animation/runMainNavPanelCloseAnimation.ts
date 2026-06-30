import gsap from "gsap";
import type { MainNavPanelMotion } from "@/lib/animation/main-nav/main-nav-panel-motion/mainNavPanelMotion";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export function runMainNavPanelCloseAnimation(
  panel: HTMLElement,
  motion: MainNavPanelMotion,
): gsap.core.Timeline {
  const targets = Array.from(panel.querySelectorAll<HTMLElement>("[data-nav-option]"));

  const tl = gsap.timeline();

  if (targets.length === 0) {
    return tl;
  }

  if (prefersReducedMotion()) {
    gsap.set(targets, { x: motion.closeToX, opacity: 0, scale: 0.9 });
    return tl;
  }

  tl.to(targets, {
    x: motion.closeToX,
    opacity: 0,
    scale: 0.9,
    duration: 0.36,
    stagger: {
      each: 0.08,
      from: motion.closeStaggerFrom,
    },
    ease: "power2.in",
  });

  return tl;
}
