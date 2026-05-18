"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { useMainNavAnimation } from "@/lib/animation/main-nav/use-main-nav-animation/useMainNavAnimation";

export type UseDesktopMainNavReturn = {
  readonly isExpanded: boolean;
  readonly leftPanelRef: RefObject<HTMLDivElement | null>;
  readonly panelsMounted: boolean;
  readonly rightPanelRef: RefObject<HTMLDivElement | null>;
  readonly rootRef: RefObject<HTMLDivElement | null>;
  readonly close: () => void;
  readonly toggle: () => void;
};

export function useDesktopMainNav(): UseDesktopMainNavReturn {
  const pathname = usePathname();
  const [openPathname, setOpenPathname] = useState<string | null>(null);
  const [panelsMounted, setPanelsMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const isExpanded = openPathname === pathname;

  const handleCloseComplete = useCallback((): void => {
    setPanelsMounted(false);
  }, []);

  useMainNavAnimation(isExpanded, leftPanelRef, rightPanelRef, handleCloseComplete);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setOpenPathname(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [isExpanded]);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }
    const onPointer = (e: PointerEvent): void => {
      if (rootRef.current?.contains(e.target as Node)) {
        return;
      }
      setOpenPathname(null);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [isExpanded]);

  const close = useCallback((): void => {
    setOpenPathname(null);
  }, []);

  const toggle = useCallback((): void => {
    if (openPathname === pathname) {
      setOpenPathname(null);
      return;
    }
    setPanelsMounted(true);
    setOpenPathname(pathname);
  }, [openPathname, pathname]);

  return {
    close,
    isExpanded,
    leftPanelRef,
    panelsMounted,
    rightPanelRef,
    rootRef,
    toggle,
  };
}
