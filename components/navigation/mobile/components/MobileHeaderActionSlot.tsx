"use client";

import { MobileMainNavMenuTrigger } from "@/components/navigation/mobile/components/MobileMainNavMenuTrigger";

export type MobileHeaderActionSlotProps = Readonly<{
  isExpanded: boolean;
  menuToggleAria: string;
  onToggle: () => void;
}>;

export function MobileHeaderActionSlot({
  isExpanded,
  menuToggleAria,
  onToggle,
}: MobileHeaderActionSlotProps) {
  return (
    <div className="relative z-10 md:hidden">
      <MobileMainNavMenuTrigger
        ariaLabel={menuToggleAria}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />
    </div>
  );
}
