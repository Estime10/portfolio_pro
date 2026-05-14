import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export function runLocalePickerOpenAnimation(panel: HTMLElement): gsap.core.Timeline {
  const targets = Array.from(
    panel.querySelectorAll<HTMLElement>("[data-locale-option]"),
  );

  const tl = gsap.timeline();

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
}
