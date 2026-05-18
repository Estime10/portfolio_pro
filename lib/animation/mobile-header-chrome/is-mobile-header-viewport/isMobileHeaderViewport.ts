/** Aligné sur le breakpoint Tailwind `md` (768px). */
const MOBILE_HEADER_MAX_WIDTH_PX = 767;

export function isMobileHeaderViewport(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(`(max-width: ${String(MOBILE_HEADER_MAX_WIDTH_PX)}px)`).matches;
}
