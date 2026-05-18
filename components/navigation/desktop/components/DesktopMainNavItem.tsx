"use client";

import { NavActiveLabel, NavLink } from "@/components/button";
import { useIsMainNavRouteActive } from "@/components/navigation/desktop/hooks";

export type DesktopMainNavItemProps = Readonly<{
  href: string;
  label: string;
  onNavigate: () => void;
}>;

export function DesktopMainNavItem({ href, label, onNavigate }: DesktopMainNavItemProps) {
  const isActive = useIsMainNavRouteActive(href);

  if (isActive) {
    return <NavActiveLabel>{label}</NavActiveLabel>;
  }

  return (
    <NavLink href={href} onClick={onNavigate}>
      {label}
    </NavLink>
  );
}
