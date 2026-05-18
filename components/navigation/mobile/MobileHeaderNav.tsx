"use client";

import { Button } from "@/components/button";
import { useMobileMainNav } from "@/components/navigation/mobile/hooks";
import { useMobileHeaderChromeAnimation } from "@/lib/animation/mobile-header-chrome/use-mobile-header-chrome-animation/useMobileHeaderChromeAnimation";
import { useRef, type ReactNode } from "react";

export type MobileHeaderNavProps = Readonly<{
  desktopNav: ReactNode;
  logo: ReactNode;
  menuLabel: string;
  menuToggleAria: string;
  toolbar: ReactNode;
}>;

export function MobileHeaderNav({
  desktopNav,
  logo,
  menuLabel,
  menuToggleAria,
  toolbar,
}: MobileHeaderNavProps) {
  const { isExpanded, toggle } = useMobileMainNav();
  const logoChromeRef = useRef<HTMLDivElement>(null);
  const toolbarChromeRef = useRef<HTMLDivElement>(null);

  useMobileHeaderChromeAnimation(isExpanded, logoChromeRef, toolbarChromeRef);

  return (
    <div className="ui-nav-shell grid grid-cols-[1fr_auto_1fr] items-center gap-4">
      <div
        ref={logoChromeRef}
        className="flex min-w-0 justify-start max-md:will-change-[opacity]"
        aria-hidden={isExpanded ? true : undefined}
      >
        {logo}
      </div>

      <div className="flex justify-center">
        <div className="hidden md:contents">{desktopNav}</div>
        <Button
          type="button"
          variant="nav"
          className="relative z-10 shrink-0 md:hidden"
          aria-label={menuToggleAria}
          aria-expanded={isExpanded}
          onClick={toggle}
        >
          {menuLabel}
        </Button>
      </div>

      <div
        ref={toolbarChromeRef}
        className="flex min-w-0 items-center justify-end max-md:will-change-[opacity]"
        aria-hidden={isExpanded ? true : undefined}
      >
        {toolbar}
      </div>
    </div>
  );
}
