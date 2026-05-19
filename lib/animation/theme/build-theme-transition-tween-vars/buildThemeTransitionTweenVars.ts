import {
  THEME_ANIMATED_CSS_VARS,
  THEME_TRANSITION_DURATION_SECONDS,
  THEME_TRANSITION_EASE,
  type ThemeAnimatedCssVar,
} from "@/lib/constants";
import { createThemeTransitionCompleteHandler } from "@/lib/animation/theme/create-theme-transition-complete-handler/createThemeTransitionCompleteHandler";

export function buildThemeTransitionTweenVars(
  root: HTMLElement,
  targetPalette: Record<ThemeAnimatedCssVar, string>,
  resolve: () => void,
): Record<string, string | number | (() => void)> {
  const tweenVars: Record<string, string | number | (() => void)> = {
    duration: THEME_TRANSITION_DURATION_SECONDS,
    ease: THEME_TRANSITION_EASE,
    onComplete: createThemeTransitionCompleteHandler(root, resolve),
  };
  for (const key of THEME_ANIMATED_CSS_VARS) {
    tweenVars[key] = targetPalette[key];
  }
  return tweenVars;
}
