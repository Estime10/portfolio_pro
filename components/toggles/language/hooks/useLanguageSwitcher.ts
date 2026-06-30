"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { applyLocaleChange } from "@/components/toggles/language/hooks/applyLocaleChange";
import { getLanguageSwitcherTriggerLabel } from "@/components/toggles/language/lib/get-language-switcher-trigger-label/getLanguageSwitcherTriggerLabel";
import { useLanguageSwitcherLocale } from "@/components/toggles/language/hooks/use-language-switcher-locale/useLanguageSwitcherLocale";
import { useLanguageSwitcherPanel } from "@/components/toggles/language/hooks/use-language-switcher-panel/useLanguageSwitcherPanel";
import type { AppLocale } from "@/lib/i18n/config";

export type UseLanguageSwitcherReturn = {
  readonly inactiveLocales: ReturnType<typeof useLanguageSwitcherLocale>["inactiveLocales"];
  readonly isExpanded: boolean;
  readonly locale: ReturnType<typeof useLanguageSwitcherLocale>["locale"];
  readonly panelMounted: boolean;
  readonly panelRef: ReturnType<typeof useLanguageSwitcherPanel>["panelRef"];
  readonly rootRef: ReturnType<typeof useLanguageSwitcherPanel>["rootRef"];
  readonly selectLocale: ReturnType<typeof useLanguageSwitcherLocale>["selectLocale"];
  readonly toggle: () => void;
  readonly triggerLabel: string;
};

export function useLanguageSwitcher(): UseLanguageSwitcherReturn {
  const router = useRouter();
  const pendingLocaleRef = useRef<AppLocale | null>(null);

  const applyPendingLocaleChange = useCallback((): void => {
    const pendingLocale = pendingLocaleRef.current;
    if (pendingLocale === null) {
      return;
    }

    pendingLocaleRef.current = null;
    void applyLocaleChange(pendingLocale, () => {
      router.refresh();
    });
  }, [router]);

  const queueLocaleChange = useCallback((next: AppLocale): void => {
    pendingLocaleRef.current = next;
  }, []);

  const panel = useLanguageSwitcherPanel({ onCloseComplete: applyPendingLocaleChange });
  const localeState = useLanguageSwitcherLocale({
    onLocaleSelected: panel.dismiss,
    queueLocaleChange,
  });

  return {
    inactiveLocales: localeState.inactiveLocales,
    isExpanded: panel.isExpanded,
    locale: localeState.locale,
    panelMounted: panel.panelMounted,
    panelRef: panel.panelRef,
    rootRef: panel.rootRef,
    selectLocale: localeState.selectLocale,
    toggle: panel.toggle,
    triggerLabel: getLanguageSwitcherTriggerLabel(localeState.locale),
  };
}
