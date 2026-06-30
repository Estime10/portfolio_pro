"use client";

import { useId } from "react";
import { MobileHeaderActionSlot } from "@/components/navigation/mobile/components/MobileHeaderActionSlot";
import { MobileHeaderLogoSlot } from "@/components/navigation/mobile/components/MobileHeaderLogoSlot";
import { useMobileMainNav } from "@/components/navigation/mobile/hooks";
import { MainNavItemsPanel } from "@/components/navigation/main-nav/main-nav-items-panel/MainNavItemsPanel";
import { mapMainNavItemsFlat } from "@/lib/navigation/map-main-nav-items/mapMainNavItemsFlat";
import { MAIN_NAV_MOBILE_PANEL_CLASS } from "@/components/navigation/main-nav/styles/mainNavPanelClasses";
import type { MainNavLabels } from "@/lib/navigation/types/main-nav-labels/mainNavLabels";
import type { ReactNode } from "react";

export type MobileHeaderNavProps = Readonly<{
  backLabel: string;
  desktopNav: ReactNode;
  labels: MainNavLabels;
  logo: ReactNode;
  toolbar: ReactNode;
}>;

export function MobileHeaderNav({
  backLabel,
  desktopNav,
  labels,
  logo,
  toolbar,
}: MobileHeaderNavProps) {
  const menuPanelId = useId();
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
      role={isExpanded ? "dialog" : undefined}
      aria-modal={isExpanded ? true : undefined}
      aria-label={isExpanded ? labels.navAria : undefined}
    >
      <div
        data-mobile-header-chrome="logo"
        className="flex min-w-0 shrink-0 justify-start max-md:will-change-[opacity]"
        aria-hidden={isExpanded ? true : undefined}
      >
        <MobileHeaderLogoSlot backLabel={backLabel} logo={logo} />
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

        <MobileHeaderActionSlot
          isExpanded={isExpanded}
          menuPanelId={menuPanelId}
          menuToggleAria={labels.menuToggleAria}
          onToggle={toggle}
        />
      </div>

      {panelsMounted ? (
        <MainNavItemsPanel
          accessibility={{ id: menuPanelId }}
          className={MAIN_NAV_MOBILE_PANEL_CLASS}
          items={navItems}
          onNavigate={navigateViaClose}
          panelRef={panelRef}
        />
      ) : null}
    </div>
  );
}
