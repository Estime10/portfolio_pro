/**
 * Signal en mémoire (même onglet) pour l’entrée `/home` après la splash.
 * Complète `sessionStorage` : en dev (Strict Mode), le flag storage peut rester
 * présent entre deux montages alors qu’une tween a été interrompue.
 */

let pendingSplashToMainFade = false;

export function signalSplashToMainFadePending(): void {
  pendingSplashToMainFade = true;
}

export function consumeSplashToMainFadePending(): boolean {
  if (!pendingSplashToMainFade) {
    return false;
  }
  pendingSplashToMainFade = false;
  return true;
}
