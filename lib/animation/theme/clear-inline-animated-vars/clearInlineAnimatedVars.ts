import { THEME_ANIMATED_CSS_VARS } from "@/lib/constants/constants";

export function clearInlineAnimatedVars(root: HTMLElement): void {
  for (const key of THEME_ANIMATED_CSS_VARS) {
    root.style.removeProperty(key);
  }
}
