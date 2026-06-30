import type { GsapModule } from "@/lib/animation/gsap/loadGsap";
import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import { getMainNavPanelTargets } from "@/lib/animation/main-nav/get-main-nav-panel-targets/getMainNavPanelTargets";
import type { MainNavPanelMotion } from "@/lib/animation/main-nav/main-nav-panel-motion/mainNavPanelMotion";

export function setMainNavPanelClosedState(
  gsap: GsapModule,
  panel: HTMLElement,
  motion: MainNavPanelMotion,
): void {
  const targets = getMainNavPanelTargets(panel);
  gsap.set(targets, { x: motion.closeToX, opacity: 0, scale: 0.9 });
}

export function resetMainNavPanelClosed(
  panel: HTMLElement | null,
  motion: MainNavPanelMotion,
): Promise<void> {
  if (!panel) {
    return Promise.resolve();
  }

  return runWithGsap((gsap) => {
    setMainNavPanelClosedState(gsap, panel, motion);
  });
}
