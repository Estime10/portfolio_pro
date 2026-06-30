"use client";

import { MobileMainNavMenuTrigger } from "@/components/navigation/mobile/components/MobileMainNavMenuTrigger";

export type MobileHeaderActionSlotProps = Readonly<{
  isExpanded: boolean;
  menuPanelId: string;
  menuToggleAria: string;
  onToggle: () => void;
}>;

export function MobileHeaderActionSlot({
  isExpanded,
  menuPanelId,
  menuToggleAria,
  onToggle,
}: MobileHeaderActionSlotProps) {
  return (
    <div className="relative z-10 md:hidden">
      <MobileMainNavMenuTrigger
        ariaControls={isExpanded ? menuPanelId : undefined}
        ariaLabel={menuToggleAria}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />
    </div>
  );
}
