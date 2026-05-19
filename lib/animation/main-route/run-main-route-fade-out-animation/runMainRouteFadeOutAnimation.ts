import gsap from "gsap";
import {
  MAIN_ROUTE_TRANSITION_EASE,
  MAIN_ROUTE_TRANSITION_OUT_DURATION_SECONDS,
} from "@/lib/constants";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export function runMainRouteFadeOutAnimation(
  contentRoot: HTMLElement,
): gsap.core.Tween | null {
  if (prefersReducedMotion()) {
    gsap.set(contentRoot, { autoAlpha: 0 });
    return null;
  }

  return gsap.to(contentRoot, {
    autoAlpha: 0,
    duration: MAIN_ROUTE_TRANSITION_OUT_DURATION_SECONDS,
    ease: MAIN_ROUTE_TRANSITION_EASE,
    force3D: true,
    overwrite: "auto",
  });
}
