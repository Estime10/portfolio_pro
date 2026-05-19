"use client";

import { useEffect } from "react";

export function useEscapeKeyDismiss(isActive: boolean, onDismiss: () => void): void {
  useEffect(() => {
    if (!isActive) {
      return;
    }

    const onKey = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onDismiss();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [isActive, onDismiss]);
}
