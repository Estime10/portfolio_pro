"use client";

import { isGeneralContactIntent } from "@/features/contact/domain/is-general-contact-intent/isGeneralContactIntent";
import { transitionFromIntentPanelToDirectChannels } from "@/features/contact/lib/transition-from-intent-panel-to-direct-channels/transitionFromIntentPanelToDirectChannels";
import type { ContactIntentId } from "@/features/contact/types/contact-intent-id/contactIntentId";
import { useCallback, useRef, type RefObject } from "react";

export type UseContactFormIntentSelectionParams = Readonly<{
  onOpenDirectChannels: (intentId: ContactIntentId) => void;
  onStartWizard: (intentId: ContactIntentId) => void;
}>;

export type UseContactFormIntentSelectionReturn = Readonly<{
  intentPanelRef: RefObject<HTMLDivElement | null>;
  selectIntent: (intentId: ContactIntentId) => void;
}>;

export function useContactFormIntentSelection({
  onOpenDirectChannels,
  onStartWizard,
}: UseContactFormIntentSelectionParams): UseContactFormIntentSelectionReturn {
  const intentPanelRef = useRef<HTMLDivElement>(null);

  const selectIntent = useCallback(
    (intentId: ContactIntentId) => {
      if (isGeneralContactIntent(intentId)) {
        transitionFromIntentPanelToDirectChannels(intentPanelRef.current, () => {
          onOpenDirectChannels(intentId);
        });
        return;
      }

      onStartWizard(intentId);
    },
    [onOpenDirectChannels, onStartWizard],
  );

  return { intentPanelRef, selectIntent };
}
