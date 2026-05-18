import type { MainNavPanelSlot } from "@/lib/animation/main-nav/main-nav-panel-slot/mainNavPanelSlot";

export type DesktopMainNavItemViewModel = Readonly<{
  href: string;
  label: string;
  side: MainNavPanelSlot;
}>;
