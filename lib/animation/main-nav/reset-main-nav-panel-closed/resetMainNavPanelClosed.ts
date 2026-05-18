import gsap from "gsap";
import { getMainNavPanelTargets } from "@/lib/animation/main-nav/get-main-nav-panel-targets/getMainNavPanelTargets";
import {
  getMainNavCloseToX,
  type MainNavPanelSlot,
} from "@/lib/animation/main-nav/main-nav-panel-slot/mainNavPanelSlot";

export function resetMainNavPanelClosed(
  panel: HTMLElement | null,
  slot: MainNavPanelSlot,
): void {
  if (!panel) {
    return;
  }

  const targets = getMainNavPanelTargets(panel);
  const x = getMainNavCloseToX(slot);

  gsap.set(targets, { x, opacity: 0, scale: 0.9 });
}
