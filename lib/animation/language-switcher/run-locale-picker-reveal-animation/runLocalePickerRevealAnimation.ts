import gsap from "gsap";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export type LocalePickerRevealPhase = "open" | "close";

export function runLocalePickerRevealAnimation(
  panel: HTMLElement,
  phase: LocalePickerRevealPhase,
  onCloseComplete?: () => void,
): gsap.core.Timeline {
  const targets = Array.from(
    panel.querySelectorAll<HTMLElement>("[data-locale-option]"),
  );

  const tl = gsap.timeline();

  if (targets.length === 0) {
    if (phase === "close") {
      onCloseComplete?.();
    }
    return tl;
  }

  if (prefersReducedMotion()) {
    if (phase === "open") {
      gsap.set(targets, { x: 0, opacity: 1, scale: 1 });
    } else {
      gsap.set(targets, { x: 24, opacity: 0, scale: 0.92 });
      onCloseComplete?.();
    }
    return tl;
  }

  if (phase === "open") {
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

  tl.to(targets, {
    x: 40,
    opacity: 0,
    scale: 0.9,
    duration: 0.26,
    stagger: { each: 0.06, from: "end" },
    ease: "power3.in",
  }).eventCallback("onComplete", () => {
    onCloseComplete?.();
  });

  return tl;
}
