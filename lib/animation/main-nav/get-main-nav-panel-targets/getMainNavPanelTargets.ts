export function getMainNavPanelTargets(panel: HTMLElement): HTMLElement[] {
  return Array.from(panel.querySelectorAll<HTMLElement>("[data-nav-option]"));
}

export function isMainNavActiveTarget(element: HTMLElement): boolean {
  return element.hasAttribute("data-nav-active");
}
