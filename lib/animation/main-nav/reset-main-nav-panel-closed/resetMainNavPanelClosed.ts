import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import { getMainNavPanelTargets } from "@/lib/animation/main-nav/get-main-nav-panel-targets/getMainNavPanelTargets";
import type { MainNavPanelMotion } from "@/lib/animation/main-nav/main-nav-panel-motion/mainNavPanelMotion";

export function resetMainNavPanelClosed(
  panel: HTMLElement | null,
  motion: MainNavPanelMotion,
): Promise<void> {
  if (!panel) {
    return Promise.resolve();
  }

  const targets = getMainNavPanelTargets(panel);

  return runWithGsap((gsap) => {
    gsap.set(targets, { x: motion.closeToX, opacity: 0, scale: 0.9 });
  });
}
