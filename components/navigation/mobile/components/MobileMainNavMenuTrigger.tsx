"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/button";
import { CHROME_TOGGLE_OUTLINE } from "@/lib/ui/brandChrome";

export type MobileMainNavMenuTriggerProps = Readonly<{
  ariaLabel: string;
  isExpanded: boolean;
  onToggle: () => void;
}>;

export function MobileMainNavMenuTrigger({
  ariaLabel,
  isExpanded,
  onToggle,
}: MobileMainNavMenuTriggerProps) {
  const Icon = isExpanded ? X : Menu;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={`${CHROME_TOGGLE_OUTLINE} relative z-10 shrink-0`}
      aria-label={ariaLabel}
      aria-expanded={isExpanded}
      aria-haspopup="true"
      onClick={onToggle}
    >
      <span className="sr-only">{ariaLabel}</span>
      <Icon aria-hidden className="text-foreground size-4 shrink-0" strokeWidth={2} />
    </Button>
  );
}
