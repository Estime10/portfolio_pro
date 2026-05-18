import gsap from "gsap";
import {
  getMainNavCloseStaggerFrom,
  getMainNavCloseToX,
  type MainNavPanelSlot,
} from "@/lib/animation/main-nav/main-nav-panel-slot/mainNavPanelSlot";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export function runMainNavCloseAnimation(
  panel: HTMLElement,
  slot: MainNavPanelSlot,
): gsap.core.Timeline {
  const targets = Array.from(
    panel.querySelectorAll<HTMLElement>("[data-nav-option]"),
  );

  const tl = gsap.timeline();

  if (targets.length === 0) {
    return tl;
  }

  const toX = getMainNavCloseToX(slot);

  if (prefersReducedMotion()) {
    gsap.set(targets, { x: toX, opacity: 0, scale: 0.9 });
    return tl;
  }

  tl.to(targets, {
    x: toX,
    opacity: 0,
    scale: 0.9,
    duration: 0.36,
    stagger: {
      each: 0.08,
      from: getMainNavCloseStaggerFrom(slot),
    },
    ease: "power2.in",
  });

  return tl;
}
