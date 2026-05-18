"use client";

import { Button } from "@/components/button";

export type DesktopMainNavMenuTriggerProps = Readonly<{
  ariaLabel: string;
  isExpanded: boolean;
  label: string;
  onToggle: () => void;
}>;

export function DesktopMainNavMenuTrigger({
  ariaLabel,
  isExpanded,
  label,
  onToggle,
}: DesktopMainNavMenuTriggerProps) {
  return (
    <Button
      type="button"
      variant="nav"
      className="relative z-10 shrink-0"
      aria-label={ariaLabel}
      aria-expanded={isExpanded}
      aria-haspopup="true"
      onClick={onToggle}
    >
      {label}
    </Button>
  );
}
