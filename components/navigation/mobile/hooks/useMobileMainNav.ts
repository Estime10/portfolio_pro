"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export type UseMobileMainNavReturn = Readonly<{
  isExpanded: boolean;
  toggle: () => void;
}>;

export function useMobileMainNav(): UseMobileMainNavReturn {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);

  const isExpanded = openPathname === pathname;

  useEffect(() => {
    if (!isExpanded) {
      return;
    }
    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setOpenPathname(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [isExpanded]);

  const toggle = useCallback((): void => {
    if (openPathname === pathname) {
      setOpenPathname(null);
      return;
    }
    setOpenPathname(pathname);
  }, [openPathname, pathname]);

  return {
    isExpanded,
    toggle,
  };
}
