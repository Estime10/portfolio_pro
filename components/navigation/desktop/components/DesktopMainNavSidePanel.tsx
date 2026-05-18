"use client";

import { DesktopMainNavItem } from "@/components/navigation/desktop/components/DesktopMainNavItem";
import { getDesktopMainNavPanelClassName } from "@/components/navigation/desktop/styles/desktopMainNavPanelClasses";
import type { DesktopMainNavItemViewModel } from "@/components/navigation/desktop/types/desktopMainNavItemViewModel";
import type { MainNavPanelSlot } from "@/lib/animation/main-nav/main-nav-panel-slot/mainNavPanelSlot";
import type { RefObject } from "react";

export type DesktopMainNavSidePanelProps = Readonly<{
  items: readonly DesktopMainNavItemViewModel[];
  onNavigate: () => void;
  panelRef: RefObject<HTMLDivElement | null>;
  side: MainNavPanelSlot;
}>;

export function DesktopMainNavSidePanel({
  items,
  onNavigate,
  panelRef,
  side,
}: DesktopMainNavSidePanelProps) {
  return (
    <div
      ref={panelRef}
      className={getDesktopMainNavPanelClassName(side)}
    >
      {items.map((item) => (
        <DesktopMainNavItem
          key={item.href}
          href={item.href}
          label={item.label}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
