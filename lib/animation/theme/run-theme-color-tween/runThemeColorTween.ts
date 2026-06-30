import type { GsapModule } from "@/lib/animation/gsap/loadGsap";

export function runThemeColorTween(
  gsap: GsapModule,
  root: HTMLElement,
  tweenVars: Record<string, string | number | (() => void)>,
): void {
  gsap.killTweensOf(root);
  gsap.to(root, tweenVars);
}
