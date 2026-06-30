import { runWithGsap } from "@/lib/animation/gsap/runWithGsap";
import { getMobileHeaderChromeTargets } from "@/lib/animation/mobile-header-chrome/mobile-header-chrome-targets/getMobileHeaderChromeTargets";

export function setMobileHeaderChromeVisible(
  logoChrome: HTMLElement | null,
  toolbarChrome: HTMLElement | null,
): Promise<void> {
  const targets = getMobileHeaderChromeTargets(logoChrome, toolbarChrome);

  if (targets.length === 0) {
    return Promise.resolve();
  }

  return runWithGsap((gsap) => {
    for (const target of targets) {
      target.style.removeProperty("opacity");
      target.style.removeProperty("pointer-events");
    }

    gsap.set(targets, { opacity: 1, pointerEvents: "auto", clearProps: "transform" });
  });
}
