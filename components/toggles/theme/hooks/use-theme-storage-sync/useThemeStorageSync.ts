"use client";

import { useEffect } from "react";
import { animateThemeTransition } from "@/lib/animation";
import { THEME_STORAGE_KEY, type ThemeMode } from "@/lib/constants";

export function useThemeStorageSync(): void {
  useEffect(() => {
    const onStorage = (event: StorageEvent): void => {
      if (event.key !== THEME_STORAGE_KEY || event.newValue === null) {
        return;
      }

      const next: ThemeMode = event.newValue === "dark" ? "dark" : "light";
      void animateThemeTransition(next, { skipPersistence: true });
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);
}
