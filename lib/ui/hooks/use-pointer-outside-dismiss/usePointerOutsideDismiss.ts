"use client";

import { useEffect, type RefObject } from "react";

export function usePointerOutsideDismiss(
  isActive: boolean,
  containerRef: RefObject<HTMLElement | null>,
  onDismiss: () => void,
): void {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const onPointer = (event: PointerEvent): void => {
      if (containerRef.current?.contains(event.target as Node)) {
        return;
      }

      onDismiss();
    };

    document.addEventListener("pointerdown", onPointer);

    return () => {
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [containerRef, isActive, onDismiss]);
}
