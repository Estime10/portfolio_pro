import { THEME_CHANGE_EVENT, THEME_STORAGE_KEY, type ThemeMode } from '../constants/constants'

export function getThemeInitInlineScript(): string {
  return `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var r=document.documentElement;var s=localStorage.getItem(k);if(s==="dark"){r.classList.add("dark");}else if(s==="light"){r.classList.remove("dark");}else if(window.matchMedia("(prefers-color-scheme: dark)").matches){r.classList.add("dark");}else{r.classList.remove("dark");}}catch(e){document.documentElement.classList.remove("dark");}})();`
}

export function subscribeTheme(listener: () => void): () => void {
  if (typeof window === 'undefined') {
    return () => {}
  }
  window.addEventListener(THEME_CHANGE_EVENT, listener)
  window.addEventListener('storage', listener)
  const observer = new MutationObserver(listener)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, listener)
    window.removeEventListener('storage', listener)
    observer.disconnect()
  }
}

export function getThemeFromDocument(): ThemeMode {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function getServerThemeSnapshot(): ThemeMode {
  return 'light'
}
