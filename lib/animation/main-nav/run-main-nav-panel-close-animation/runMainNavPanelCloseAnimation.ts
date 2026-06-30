import type { GsapTimeline } from "@/lib/animation/gsap/gsapAnimationTypes";
import type { GsapModule } from "@/lib/animation/gsap/loadGsap";
import { createGsapTimeline } from "@/lib/animation/gsap/gsapRuntimeHelpers";
import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import { getMainNavPanelTargets } from "@/lib/animation/main-nav/get-main-nav-panel-targets/getMainNavPanelTargets";
import type { MainNavPanelMotion } from "@/lib/animation/main-nav/main-nav-panel-motion/mainNavPanelMotion";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export function buildMainNavPanelCloseTimeline(
  gsap: GsapModule,
  panel: HTMLElement,
  motion: MainNavPanelMotion,
): GsapTimeline {
  const targets = getMainNavPanelTargets(panel);

  const tl = createGsapTimeline(gsap);

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

export function runMainNavPanelCloseAnimation(
  panel: HTMLElement,
  motion: MainNavPanelMotion,
): Promise<GsapTimeline> {
  return runWithGsap((gsap) => buildMainNavPanelCloseTimeline(gsap, panel, motion));
}
