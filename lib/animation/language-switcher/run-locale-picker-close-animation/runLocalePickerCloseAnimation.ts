import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

const LOCALE_PICKER_EXIT_X_PX = 32;

export function runLocalePickerCloseAnimation(panel: HTMLElement): gsap.core.Timeline {
  const targets = Array.from(
    panel.querySelectorAll<HTMLElement>("[data-locale-option]"),
  );

  const tl = gsap.timeline();

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
}
