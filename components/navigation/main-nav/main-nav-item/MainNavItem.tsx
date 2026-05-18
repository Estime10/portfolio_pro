"use client";

import { NavActiveLabel, NavLink } from "@/components/button";
import { useIsMainNavRouteActive } from "@/components/navigation/desktop/hooks";

export type MainNavItemProps = Readonly<{
  href: string;
  label: string;
  onNavigate: (href: string) => void;
}>;

export function MainNavItem({ href, label, onNavigate }: MainNavItemProps) {
  const isActive = useIsMainNavRouteActive(href);

  if (isActive) {
    return <NavActiveLabel>{label}</NavActiveLabel>;
  }

  return (
    <NavLink
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onNavigate(href);
      }}
    >
      {label}
    </NavLink>
  );
}
