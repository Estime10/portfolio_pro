"use client";

import { getLanguageSwitcherTriggerLabel } from "@/components/toggles/language/lib/get-language-switcher-trigger-label/getLanguageSwitcherTriggerLabel";
import { useLanguageSwitcherLocale } from "@/components/toggles/language/hooks/use-language-switcher-locale/useLanguageSwitcherLocale";
import { useLanguageSwitcherPanel } from "@/components/toggles/language/hooks/use-language-switcher-panel/useLanguageSwitcherPanel";

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
  const panel = useLanguageSwitcherPanel();
  const localeState = useLanguageSwitcherLocale({ onLocaleSelected: panel.dismiss });

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
