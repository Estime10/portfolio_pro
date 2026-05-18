"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { applyLocaleChange } from "./applyLocaleChange";
import { useLocalePickerAnimation } from "@/lib/animation/language-switcher/use-locale-picker-animation/useLocalePickerAnimation";
import { LOCALES, isAppLocale, type AppLocale } from "@/lib/i18n/config";

export type UseLanguageSwitcherReturn = {
  readonly inactiveLocales: readonly AppLocale[];
  readonly isExpanded: boolean;
  readonly locale: AppLocale;
  readonly panelMounted: boolean;
  readonly panelRef: RefObject<HTMLDivElement | null>;
  readonly rootRef: RefObject<HTMLDivElement | null>;
  readonly selectLocale: (next: AppLocale) => void;
  readonly toggle: () => void;
  readonly triggerLabel: string;
};

export function useLanguageSwitcher(): UseLanguageSwitcherReturn {
  const rawLocale = useLocale();
  const locale: AppLocale = isAppLocale(rawLocale) ? rawLocale : "fr";
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleCloseComplete = useCallback((): void => {
    setPanelMounted(false);
  }, []);

  useLocalePickerAnimation(isExpanded, panelRef, handleCloseComplete);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setIsExpanded(false);
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
      setIsExpanded(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [isExpanded]);

  const toggle = useCallback((): void => {
    setIsExpanded((prev) => {
      if (!prev) {
        setPanelMounted(true);
      }
      return !prev;
    });
  }, []);

  const selectLocale = useCallback(
    (next: AppLocale): void => {
      if (next === locale) {
        setIsExpanded(false);
        return;
      }
      setIsExpanded(false);
      void applyLocaleChange(next, () => {
        router.refresh();
      });
    },
    [locale, router],
  );

  const inactiveLocales = LOCALES.filter((code) => code !== locale);

  const triggerLabel =
    locale === "fr"
      ? "Choisir la langue (actuellement français)"
      : "Choose language (currently English)";

  return {
    inactiveLocales,
    isExpanded,
    locale,
    panelMounted,
    panelRef,
    rootRef,
    selectLocale,
    toggle,
    triggerLabel,
  };
}
