import gsap from "gsap";
import { getMobileHeaderChromeTargets } from "@/lib/animation/mobile-header-chrome/mobile-header-chrome-targets/getMobileHeaderChromeTargets";

export function setMobileHeaderChromeVisible(
  logoChrome: HTMLElement | null,
  toolbarChrome: HTMLElement | null,
): void {
  const targets = getMobileHeaderChromeTargets(logoChrome, toolbarChrome);

  if (targets.length === 0) {
    return;
  }

  gsap.set(targets, { opacity: 1, pointerEvents: "auto", clearProps: "transform" });
}
