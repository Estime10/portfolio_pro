"use client";

import { DesktopMainNavMenuTrigger } from "@/components/navigation/desktop/components/DesktopMainNavMenuTrigger";
import { DesktopMainNavSidePanel } from "@/components/navigation/desktop/components/DesktopMainNavSidePanel";
import { useDesktopMainNav } from "@/components/navigation/desktop/hooks";
import { mapDesktopMainNavItems } from "@/components/navigation/desktop/map-desktop-main-nav-items/mapDesktopMainNavItems";
import type { DesktopMainNavLabels } from "@/components/navigation/desktop/types/desktopMainNavLabels";

export type DesktopMainNavProps = Readonly<{
  labels: DesktopMainNavLabels;
}>;

export function DesktopMainNav({ labels }: DesktopMainNavProps) {
  const panels = mapDesktopMainNavItems(labels);
  const {
    close,
    isExpanded,
    leftPanelRef,
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
        <DesktopMainNavSidePanel
          items={panels.leading}
          onNavigate={close}
          panelRef={leftPanelRef}
          side="leading"
        />
      ) : null}

      {panelsMounted ? (
        <DesktopMainNavSidePanel
          items={panels.trailing}
          onNavigate={close}
          panelRef={rightPanelRef}
          side="trailing"
        />
      ) : null}
    </nav>
  );
}
