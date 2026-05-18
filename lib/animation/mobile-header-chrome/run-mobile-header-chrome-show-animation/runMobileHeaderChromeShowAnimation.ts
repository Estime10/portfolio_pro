import gsap from "gsap";
import { getMobileHeaderChromeTargets } from "@/lib/animation/mobile-header-chrome/mobile-header-chrome-targets/getMobileHeaderChromeTargets";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

const MOBILE_HEADER_CHROME_SHOW_DURATION_SECONDS = 0.32;

export function runMobileHeaderChromeShowAnimation(
  logoChrome: HTMLElement | null,
  toolbarChrome: HTMLElement | null,
): gsap.core.Timeline {
  const targets = getMobileHeaderChromeTargets(logoChrome, toolbarChrome);
  const tl = gsap.timeline();

  if (targets.length === 0) {
    return tl;
  }

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, pointerEvents: "auto" });
    return tl;
  }

  tl.to(targets, {
    opacity: 1,
    duration: MOBILE_HEADER_CHROME_SHOW_DURATION_SECONDS,
    ease: "power2.inOut",
    pointerEvents: "auto",
  });

  return tl;
}
