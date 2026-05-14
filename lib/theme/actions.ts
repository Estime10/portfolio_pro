import { THEME_CHANGE_EVENT, THEME_STORAGE_KEY, type ThemeMode } from '../constants/constants'

export function setThemeClass(mode: ThemeMode): void {
  document.documentElement.classList.toggle('dark', mode === 'dark')
}

export function persistThemePreference(mode: ThemeMode): void {
  localStorage.setItem(THEME_STORAGE_KEY, mode)
}

export function emitThemeChanged(): void {
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT))
}

/** Application immédiate (ex. `prefers-reduced-motion`, init). */
export function applyTheme(mode: ThemeMode): void {
  setThemeClass(mode)
  persistThemePreference(mode)
  emitThemeChanged()
}
