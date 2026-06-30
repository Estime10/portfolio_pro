"use client";

import { useEffect } from "react";

const KEYBOARD_INSET_VAR = "--keyboard-inset";

export function useVisualViewportKeyboardOffset(): void {
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) {
      return undefined;
    }

    const updateInset = (): void => {
      const inset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop);
      document.documentElement.style.setProperty(KEYBOARD_INSET_VAR, `${String(inset)}px`);
    };

    updateInset();
    viewport.addEventListener("resize", updateInset);
    viewport.addEventListener("scroll", updateInset);

    return () => {
      viewport.removeEventListener("resize", updateInset);
      viewport.removeEventListener("scroll", updateInset);
      document.documentElement.style.setProperty(KEYBOARD_INSET_VAR, "0px");
    };
  }, []);
}
