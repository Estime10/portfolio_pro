"use client";

import { DesktopMainNavMenuTrigger } from "@/components/navigation/desktop/components/DesktopMainNavMenuTrigger";
import { useDesktopMainNav } from "@/components/navigation/desktop/hooks";
import { MainNavItemsPanel } from "@/components/navigation/main-nav/main-nav-items-panel/MainNavItemsPanel";
import { mapMainNavItems } from "@/components/navigation/main-nav/map-main-nav-items/mapMainNavItems";
import { getMainNavDesktopPanelClassName } from "@/components/navigation/main-nav/styles/mainNavPanelClasses";
import type { MainNavLabels } from "@/components/navigation/main-nav/types/mainNavLabels";

export type DesktopMainNavProps = Readonly<{
  labels: MainNavLabels;
}>;

export function DesktopMainNav({ labels }: DesktopMainNavProps) {
  const panels = mapMainNavItems(labels);
  const {
    isExpanded,
    leftPanelRef,
    navigateViaClose,
    panelsMounted,
    rightPanelRef,
    rootRef,
    toggle,
  } = useDesktopMainNav();

  return (
    <nav
      ref={rootRef}
      className="relative hidden items-center justify-center md:flex"
      aria-label={labels.navAria}
    >
      <DesktopMainNavMenuTrigger
        ariaLabel={labels.menuToggleAria}
        isExpanded={isExpanded}
        label={labels.menu}
        onToggle={toggle}
      />

      {panelsMounted ? (
        <MainNavItemsPanel
          className={getMainNavDesktopPanelClassName("leading")}
          items={panels.leading}
          onNavigate={navigateViaClose}
          panelRef={leftPanelRef}
        />
      ) : null}

      {panelsMounted ? (
        <MainNavItemsPanel
          className={getMainNavDesktopPanelClassName("trailing")}
          items={panels.trailing}
          onNavigate={navigateViaClose}
          panelRef={rightPanelRef}
        />
      ) : null}
    </nav>
  );
}
