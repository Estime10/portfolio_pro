import type { GsapTimeline } from "@/lib/animation/gsap/gsapAnimationTypes";
import { createGsapTimeline } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import { getMobileHeaderChromeTargets } from "@/lib/animation/mobile-header-chrome/mobile-header-chrome-targets/getMobileHeaderChromeTargets";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

const MOBILE_HEADER_CHROME_HIDE_DURATION_SECONDS = 0.32;

export function runMobileHeaderChromeHideAnimation(
  logoChrome: HTMLElement | null,
  toolbarChrome: HTMLElement | null,
): Promise<GsapTimeline> {
  return runWithGsap((gsap) => {
    const targets = getMobileHeaderChromeTargets(logoChrome, toolbarChrome);
    const tl = createGsapTimeline(gsap);

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
  });
}
