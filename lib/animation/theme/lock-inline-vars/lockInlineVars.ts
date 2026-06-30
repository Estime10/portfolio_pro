import { THEME_ANIMATED_CSS_VARS, type ThemeAnimatedCssVar } from "@/lib/constants";

export function lockInlineVars(
  root: HTMLElement,
  values: Record<ThemeAnimatedCssVar, string>,
): void {
  for (const key of THEME_ANIMATED_CSS_VARS) {
    root.style.setProperty(key, values[key]);
  }
}
