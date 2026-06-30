import type gsapNamespace from "gsap";

export type GsapModule = typeof gsapNamespace;

let gsapModulePromise: Promise<GsapModule> | null = null;

export function loadGsap(): Promise<GsapModule> {
  gsapModulePromise ??= import("gsap").then((module) => module.default);
  return gsapModulePromise;
}

/** Précharge GSAP sans bloquer le rendu (ex. après hydratation du shell). */
export function preloadGsap(): void {
  void loadGsap();
}
