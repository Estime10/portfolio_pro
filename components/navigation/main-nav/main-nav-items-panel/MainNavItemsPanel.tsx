"use client";

import { MainNavItem } from "@/components/navigation/main-nav/main-nav-item/MainNavItem";
import type { MainNavItemViewModel } from "@/components/navigation/main-nav/types/mainNavItemViewModel";
import type { RefObject } from "react";

export type MainNavItemsPanelProps = Readonly<{
  className: string;
  items: readonly MainNavItemViewModel[];
  onNavigate: (href: string) => void;
  panelRef: RefObject<HTMLDivElement | null>;
}>;

export function MainNavItemsPanel({
  className,
  items,
  onNavigate,
  panelRef,
}: MainNavItemsPanelProps) {
  return (
    <div ref={panelRef} className={className}>
      {items.map((item) => (
        <MainNavItem
          key={item.href}
          href={item.href}
          label={item.label}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
