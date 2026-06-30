"use client";

import { useEffect, type RefObject } from "react";
import {
  getFocusableElements,
  getMenuInitialFocusTarget,
  getOverlayTriggerElement,
} from "@/lib/ui/focus/get-focusable-elements/getFocusableElements";

export function useFocusTrap(isActive: boolean, containerRef: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const trigger = getOverlayTriggerElement(container);
    const initialFocus = getMenuInitialFocusTarget(container);
    initialFocus?.focus();

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== "Tab") {
        return;
      }

      const focusables = getFocusableElements(container);
      if (focusables.length === 0) {
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) {
        return;
      }

      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || (active instanceof Node && !container.contains(active))) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last || (active instanceof Node && !container.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (trigger?.isConnected) {
        trigger.focus();
      }
    };
  }, [containerRef, isActive]);
}
