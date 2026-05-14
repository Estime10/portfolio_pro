import type { ThemeAnimatedCssVar, ThemeMode } from "@/lib/constants/constants";
import { executeAnimatedThemeChange } from "@/lib/animation/theme/execute-animated-theme-change/executeAnimatedThemeChange";

export function scheduleAnimatedThemeResolution(params: {
  root: HTMLElement;
  nextMode: ThemeMode;
  targetPalette: Record<ThemeAnimatedCssVar, string>;
  skipPersistence: boolean;
}): Promise<void> {
  const { root, nextMode, targetPalette, skipPersistence } = params;
  return new Promise<void>((resolve) => {
    executeAnimatedThemeChange(root, nextMode, targetPalette, skipPersistence, resolve);
  });
}
