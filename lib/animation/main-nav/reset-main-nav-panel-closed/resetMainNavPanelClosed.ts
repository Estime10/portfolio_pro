import gsap from "gsap";
import { getMainNavPanelTargets } from "@/lib/animation/main-nav/get-main-nav-panel-targets/getMainNavPanelTargets";
import type { MainNavPanelMotion } from "@/lib/animation/main-nav/main-nav-panel-motion/mainNavPanelMotion";

export function resetMainNavPanelClosed(
  panel: HTMLElement | null,
  motion: MainNavPanelMotion,
): void {
  if (!panel) {
    return;
  }

  const targets = getMainNavPanelTargets(panel);
  gsap.set(targets, { x: motion.closeToX, opacity: 0, scale: 0.9 });
}
