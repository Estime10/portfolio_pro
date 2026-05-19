const SCROLL_BLOCK: ScrollLogicalPosition = "center";

export function scrollFieldIntoViewOnFocus(element: HTMLElement): void {
  window.requestAnimationFrame(() => {
    element.scrollIntoView({ behavior: "smooth", block: SCROLL_BLOCK });
  });
}
