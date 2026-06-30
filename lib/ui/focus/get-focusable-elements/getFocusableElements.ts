import { FOCUSABLE_SELECTOR } from "@/lib/ui/focus/focusable-selector/focusableSelector";

export function isFocusableElement(element: HTMLElement): boolean {
  if (element.closest('[aria-hidden="true"]') !== null) {
    return false;
  }

  if (element.hasAttribute("disabled") || element.getAttribute("aria-hidden") === "true") {
    return false;
  }

  if (element.tabIndex < 0) {
    return false;
  }

  if (element.closest("[inert]") !== null) {
    return false;
  }

  return element.getClientRects().length > 0;
}

export function getFocusableElements(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    isFocusableElement,
  );
}

/** Cible initiale type menu : premier lien, sinon premier focusable. */
export function getMenuInitialFocusTarget(container: HTMLElement): HTMLElement | undefined {
  const focusables = getFocusableElements(container);
  const firstLink = focusables.find((element) => element.tagName === "A");
  return firstLink ?? focusables[0];
}

export function getOverlayTriggerElement(container: HTMLElement): HTMLElement | undefined {
  return container.querySelector<HTMLElement>('[aria-haspopup="true"]') ?? undefined;
}
