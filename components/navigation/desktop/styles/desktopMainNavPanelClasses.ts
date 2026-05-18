import type { MainNavPanelSlot } from "@/lib/animation/main-nav/main-nav-panel-slot/mainNavPanelSlot";

const NAV_SIDE_PANEL_OFFSET_CLASS = "top-1/2 -translate-y-1/2";

const NAV_SIDE_PANEL_BASE_CLASS = `pointer-events-none absolute flex items-center gap-6 ${NAV_SIDE_PANEL_OFFSET_CLASS}`;

const PANEL_OFFSET_BY_SIDE: Record<MainNavPanelSlot, string> = {
  leading: "right-full mr-8",
  trailing: "left-full ml-8",
};

export function getDesktopMainNavPanelClassName(side: MainNavPanelSlot): string {
  return `${NAV_SIDE_PANEL_BASE_CLASS} ${PANEL_OFFSET_BY_SIDE[side]}`;
}
