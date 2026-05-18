import gsap from "gsap";
import { getMobileHeaderChromeTargets } from "@/lib/animation/mobile-header-chrome/mobile-header-chrome-targets/getMobileHeaderChromeTargets";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

const MOBILE_HEADER_CHROME_HIDE_DURATION_SECONDS = 0.32;

export function runMobileHeaderChromeHideAnimation(
  logoChrome: HTMLElement | null,
  toolbarChrome: HTMLElement | null,
): gsap.core.Timeline {
  const targets = getMobileHeaderChromeTargets(logoChrome, toolbarChrome);
  const tl = gsap.timeline();

  if (targets.length === 0) {
    return tl;
  }

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 0, pointerEvents: "none" });
    return tl;
  }

  tl.to(targets, {
    opacity: 0,
    duration: MOBILE_HEADER_CHROME_HIDE_DURATION_SECONDS,
    ease: "power2.inOut",
    pointerEvents: "none",
  });

  return tl;
}
