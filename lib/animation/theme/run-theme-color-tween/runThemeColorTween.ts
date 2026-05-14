import gsap from "gsap";

export function runThemeColorTween(
  root: HTMLElement,
  tweenVars: Record<string, string | number | (() => void)>,
): void {
  gsap.killTweensOf(root);
  gsap.to(root, tweenVars);
}
