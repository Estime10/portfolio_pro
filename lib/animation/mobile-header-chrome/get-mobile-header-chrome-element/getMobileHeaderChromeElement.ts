export type MobileHeaderChromeSlot = "logo" | "toolbar";

export function getMobileHeaderChromeElement(
  root: HTMLDivElement | null,
  slot: MobileHeaderChromeSlot,
): HTMLElement | null {
  return root?.querySelector<HTMLElement>(`[data-mobile-header-chrome='${slot}']`) ?? null;
}
