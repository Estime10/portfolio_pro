"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { animateThemeTransition } from "@/lib/animation";
import { THEME_STORAGE_KEY, type ThemeMode } from "@/lib/constants";
import {
  getServerThemeSnapshot,
  getThemeFromDocument,
  subscribeTheme,
} from "@/lib/theme";

export type UseThemeToggleReturn = {
  readonly cycle: () => void;
  readonly label: string;
  readonly mode: ThemeMode;
};

export function useThemeToggle(): UseThemeToggleReturn {
  const mode = useSyncExternalStore(
    subscribeTheme,
    getThemeFromDocument,
    getServerThemeSnapshot,
  );

  const transitionLock = useRef(false);

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

  const cycle = useCallback((): void => {
    if (transitionLock.current) {
      return;
    }
    const next: ThemeMode = mode === "dark" ? "light" : "dark";
    transitionLock.current = true;
    void animateThemeTransition(next).finally(() => {
      transitionLock.current = false;
    });
  }, [mode]);

  const label =
    mode === "dark" ? "Passer au thème clair" : "Passer au thème sombre";

  return {
    mode,
    cycle,
    label,
  };
}
