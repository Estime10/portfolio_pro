"use client";

import { MobileMainNavMenuTrigger } from "@/components/navigation/mobile/components/MobileMainNavMenuTrigger";
import { useMobileMainNav } from "@/components/navigation/mobile/hooks";
import { MainNavItemsPanel } from "@/components/navigation/main-nav/main-nav-items-panel/MainNavItemsPanel";
import { mapMainNavItemsFlat } from "@/components/navigation/main-nav/map-main-nav-items/mapMainNavItems";
import { MAIN_NAV_MOBILE_PANEL_CLASS } from "@/components/navigation/main-nav/styles/mainNavPanelClasses";
import type { MainNavLabels } from "@/components/navigation/main-nav/types/mainNavLabels";
import type { ReactNode } from "react";

export type MobileHeaderNavProps = Readonly<{
  desktopNav: ReactNode;
  labels: MainNavLabels;
  logo: ReactNode;
  toolbar: ReactNode;
}>;

export function MobileHeaderNav({
  desktopNav,
  labels,
  logo,
  toolbar,
}: MobileHeaderNavProps) {
  const navItems = mapMainNavItemsFlat(labels);
  const {
    isExpanded,
    navigateViaClose,
    panelRef,
    panelsMounted,
    rootRef,
    toggle,
  } = useMobileMainNav();

  return (
    <div
      ref={rootRef}
      className="ui-nav-shell relative flex items-center justify-between gap-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center"
    >
      <div
        data-mobile-header-chrome="logo"
        className="flex min-w-0 shrink-0 justify-start max-md:will-change-[opacity]"
        aria-hidden={isExpanded ? true : undefined}
      >
        {logo}
      </div>

      <div className="hidden md:flex md:justify-center">{desktopNav}</div>

      <div className="flex shrink-0 items-center justify-end gap-2">
        <div
          data-mobile-header-chrome="toolbar"
          className="flex items-center gap-2 max-md:will-change-[opacity]"
          aria-hidden={isExpanded ? true : undefined}
        >
          {toolbar}
        </div>

        <div className="relative z-10 md:hidden">
          <MobileMainNavMenuTrigger
            ariaLabel={labels.menuToggleAria}
            isExpanded={isExpanded}
            onToggle={toggle}
          />
        </div>
      </div>

      {panelsMounted ? (
        <MainNavItemsPanel
          className={MAIN_NAV_MOBILE_PANEL_CLASS}
          items={navItems}
          onNavigate={navigateViaClose}
          panelRef={panelRef}
        />
      ) : null}
    </div>
  );
}
