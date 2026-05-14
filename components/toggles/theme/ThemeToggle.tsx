"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/button";
import { animateThemeTransition } from "@/lib/animation";
import { THEME_STORAGE_KEY, type ThemeMode } from "@/lib/constants";
import {
  getServerThemeSnapshot,
  getThemeFromDocument,
  subscribeTheme,
} from "@/lib/theme";

export function ThemeToggle() {
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
      const next: ThemeMode =
        event.newValue === "dark" ? "dark" : "light";
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

  const Icon = mode === "dark" ? Sun : Moon;

  /* Bordure : teintes du dégradé logo (clair : via indigo ; sombre : fin #818cf8). Coins : xl, pas pill. */
  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="text-label !rounded-xl border-solid border-[color:rgb(49_46_129_/0.38)] dark:border-[color:rgb(129_140_248_/0.45)]"
      onClick={cycle}
      aria-label={label}
      aria-pressed={mode === "dark"}
    >
      <span className="sr-only">{label}</span>
      <Icon
        aria-hidden
        className="text-foreground size-4 shrink-0"
        strokeWidth={2}
      />
    </Button>
  );
}
