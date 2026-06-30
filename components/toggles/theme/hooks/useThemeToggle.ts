"use client";

import { useCallback, useRef, useSyncExternalStore } from "react";
import { animateThemeTransition } from "@/lib/animation";
import type { ThemeMode } from "@/lib/constants";
import { getServerThemeSnapshot, getThemeFromDocument, subscribeTheme } from "@/lib/theme";
import { useThemeStorageSync } from "@/components/toggles/theme/hooks/use-theme-storage-sync/useThemeStorageSync";

export type UseThemeToggleReturn = {
  readonly cycle: () => void;
  readonly label: string;
  readonly mode: ThemeMode;
};

export function useThemeToggle(): UseThemeToggleReturn {
  const mode = useSyncExternalStore(subscribeTheme, getThemeFromDocument, getServerThemeSnapshot);

  const transitionLock = useRef(false);

  useThemeStorageSync();

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

  const label = mode === "dark" ? "Passer au thème clair" : "Passer au thème sombre";

  return {
    mode,
    cycle,
    label,
  };
}
