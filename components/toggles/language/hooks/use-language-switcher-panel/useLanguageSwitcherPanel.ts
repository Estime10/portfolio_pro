"use client";

import { useCallback, useRef, useState, type RefObject } from "react";
import { useEscapeKeyDismiss } from "@/lib/ui/hooks/use-escape-key-dismiss/useEscapeKeyDismiss";
import { useFocusTrap } from "@/lib/ui/hooks/use-focus-trap/useFocusTrap";
import { usePointerOutsideDismiss } from "@/lib/ui/hooks/use-pointer-outside-dismiss/usePointerOutsideDismiss";
import { useLocalePickerAnimation } from "@/lib/animation/language-switcher/use-locale-picker-animation/useLocalePickerAnimation";

export type UseLanguageSwitcherPanelReturn = Readonly<{
  dismiss: () => void;
  isExpanded: boolean;
  panelMounted: boolean;
  panelRef: RefObject<HTMLDivElement | null>;
  rootRef: RefObject<HTMLDivElement | null>;
  toggle: () => void;
}>;

export function useLanguageSwitcherPanel(): UseLanguageSwitcherPanelReturn {
  const [isExpanded, setIsExpanded] = useState(false);
  const [panelMounted, setPanelMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const dismiss = useCallback((): void => {
    setIsExpanded(false);
  }, []);

  const handleCloseComplete = useCallback((): void => {
    setPanelMounted(false);
  }, []);

  useLocalePickerAnimation(isExpanded, panelRef, handleCloseComplete);
  useEscapeKeyDismiss(isExpanded, dismiss);
  usePointerOutsideDismiss(isExpanded, rootRef, dismiss);
  useFocusTrap(isExpanded, rootRef);

  const toggle = useCallback((): void => {
    setIsExpanded((previous) => {
      if (!previous) {
        setPanelMounted(true);
      }
      return !previous;
    });
  }, []);

  return {
    dismiss,
    isExpanded,
    panelMounted,
    panelRef,
    rootRef,
    toggle,
  };
}
