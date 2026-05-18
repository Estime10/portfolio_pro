import gsap from "gsap";
import {
  getMainNavPanelTargets,
  isMainNavActiveTarget,
} from "@/lib/animation/main-nav/get-main-nav-panel-targets/getMainNavPanelTargets";
import { MAIN_NAV_ACTIVE_OPACITY } from "@/lib/animation/main-nav/main-nav-active-opacity/mainNavActiveOpacity";
import type { MainNavPanelMotion } from "@/lib/animation/main-nav/main-nav-panel-motion/mainNavPanelMotion";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export function runMainNavPanelOpenAnimation(
  panel: HTMLElement,
  motion: MainNavPanelMotion,
): gsap.core.Timeline {
  const targets = getMainNavPanelTargets(panel);
  const activeTargets = targets.filter((target) => isMainNavActiveTarget(target));
  const inactiveTargets = targets.filter((target) => !isMainNavActiveTarget(target));

  const tl = gsap.timeline();
  const stagger = {
    each: 0.1,
    from: motion.openStaggerFrom,
  };

  if (targets.length === 0) {
    return tl;
  }

  if (prefersReducedMotion()) {
    if (inactiveTargets.length > 0) {
      gsap.set(inactiveTargets, { x: 0, opacity: 1, scale: 1 });
    }
    if (activeTargets.length > 0) {
      gsap.set(activeTargets, { x: 0, opacity: MAIN_NAV_ACTIVE_OPACITY, scale: 1 });
    }
    return tl;
  }

  gsap.set(targets, { x: motion.openFromX, opacity: 0, scale: 0.9 });

  if (inactiveTargets.length > 0) {
    tl.to(
      inactiveTargets,
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.44,
        stagger,
        ease: "power3.out",
      },
      0,
    );
  }

  if (activeTargets.length > 0) {
    tl.to(
      activeTargets,
      {
        x: 0,
        opacity: MAIN_NAV_ACTIVE_OPACITY,
        scale: 1,
        duration: 0.44,
        stagger,
        ease: "power3.out",
      },
      0,
    );
  }

  return tl;
}
