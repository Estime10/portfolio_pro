import type { ThemeAnimatedCssVar, ThemeMode } from '@/lib/constants/constants'
import { persistThemePreference } from '@/lib/theme/actions'
import { buildThemeTransitionTweenVars } from '../build-theme-transition-tween-vars/buildThemeTransitionTweenVars'
import { lockInlineVars } from '../lock-inline-vars/lockInlineVars'
import { readAnimatedVarsFromComputed } from '../read-animated-vars-from-computed/readAnimatedVarsFromComputed'
import { runThemeColorTween } from '../run-theme-color-tween/runThemeColorTween'

export function executeAnimatedThemeChange(
  root: HTMLElement,
  nextMode: ThemeMode,
  targetPalette: Record<ThemeAnimatedCssVar, string>,
  skipPersistence: boolean,
  onDone: () => void
): void {
  const fromSnapshot = readAnimatedVarsFromComputed(root)
  lockInlineVars(root, fromSnapshot)

  if (nextMode === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }

  if (!skipPersistence) {
    persistThemePreference(nextMode)
  }

  const tweenVars = buildThemeTransitionTweenVars(root, targetPalette, onDone)
  runThemeColorTween(root, tweenVars)
}
