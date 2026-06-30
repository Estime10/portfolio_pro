"use client";

import { MainNavItem } from "@/components/navigation/main-nav/main-nav-item/MainNavItem";
import type { MainNavItemViewModel } from "@/lib/navigation/types/main-nav-item-view-model/mainNavItemViewModel";
import type { RefObject } from "react";

export type MainNavItemsPanelAccessibility = Readonly<{
  id?: string;
  isModalDialog?: boolean;
  label?: string;
}>;

export type MainNavItemsPanelProps = Readonly<{
  accessibility?: MainNavItemsPanelAccessibility;
  className: string;
  items: readonly MainNavItemViewModel[];
  onNavigate: (href: string) => void;
  panelRef: RefObject<HTMLDivElement | null>;
}>;

export function MainNavItemsPanel({
  accessibility,
  className,
  items,
  onNavigate,
  panelRef,
}: MainNavItemsPanelProps) {
  const isModalDialog = accessibility?.isModalDialog === true;

  return (
    <div
      ref={panelRef}
      data-main-nav-panel
      id={accessibility?.id}
      role={isModalDialog ? "dialog" : accessibility?.label ? "region" : undefined}
      aria-modal={isModalDialog ? true : undefined}
      aria-label={accessibility?.label}
      className={className}
    >
      {items.map((item) => (
        <MainNavItem key={item.href} href={item.href} label={item.label} onNavigate={onNavigate} />
      ))}
    </div>
  );
}
