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
import { useLocalePickerOpenAnimation } from "@/lib/animation/language-switcher/use-locale-picker-open-animation/useLocalePickerOpenAnimation";
import { LOCALES, isAppLocale, type AppLocale } from "@/lib/i18n/config";

export type UseLanguageSwitcherReturn = {
  readonly inactiveLocales: readonly AppLocale[];
  readonly locale: AppLocale;
  readonly open: boolean;
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
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLocalePickerOpenAnimation(open, panelRef);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onPointer = (e: PointerEvent): void => {
      if (rootRef.current?.contains(e.target as Node)) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const toggle = useCallback((): void => {
    setOpen((prev) => !prev);
  }, []);

  const selectLocale = useCallback(
    (next: AppLocale): void => {
      if (next === locale) {
        setOpen(false);
        return;
      }
      setOpen(false);
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
    locale,
    inactiveLocales,
    open,
    rootRef,
    panelRef,
    selectLocale,
    toggle,
    triggerLabel,
  };
}
