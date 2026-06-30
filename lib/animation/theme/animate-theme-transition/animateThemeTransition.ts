import type { ThemeMode } from "@/lib/constants";
import { DARK_THEME_PALETTE, LIGHT_THEME_PALETTE } from "@/lib/constants";
import { emitThemeChanged, persistThemePreference, setThemeClass } from "@/lib/theme/actions";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";
import { scheduleAnimatedThemeResolution } from "@/lib/animation/theme/schedule-animated-theme-resolution/scheduleAnimatedThemeResolution";
import type { AnimateThemeTransitionOptions } from "./AnimateThemeTransitionOptions";

export function animateThemeTransition(
  nextMode: ThemeMode,
  options?: AnimateThemeTransitionOptions,
): Promise<void> {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  const root = document.documentElement;
  const skipPersistence = options?.skipPersistence === true;

  if (prefersReducedMotion()) {
    setThemeClass(nextMode);
    if (!skipPersistence) {
      persistThemePreference(nextMode);
    }
    emitThemeChanged();
    return Promise.resolve();
  }

  const targetPalette = nextMode === "dark" ? DARK_THEME_PALETTE : LIGHT_THEME_PALETTE;

  return scheduleAnimatedThemeResolution({
    root,
    nextMode,
    targetPalette,
    skipPersistence,
  });
}
