import {
  THEME_ANIMATED_CSS_VARS,
  type ThemeAnimatedCssVar,
} from "@/lib/constants/constants";

export function readAnimatedVarsFromComputed(
  root: HTMLElement,
): Record<ThemeAnimatedCssVar, string> {
  const style = getComputedStyle(root);
  const out = {} as Record<ThemeAnimatedCssVar, string>;
  for (const key of THEME_ANIMATED_CSS_VARS) {
    out[key] = style.getPropertyValue(key).trim();
  }
  return out;
}
