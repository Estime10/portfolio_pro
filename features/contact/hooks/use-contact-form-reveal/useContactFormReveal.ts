"use client";

import { computeNextContactRevealStepIndex } from "@/features/contact/lib/compute-next-contact-reveal-step-index/computeNextContactRevealStepIndex";
import type { ContactFieldId } from "@/features/contact/types/contact-field-id/contactFieldId";
import type { ContactFieldViewModel } from "@/features/contact/types/contactFormViewModel";
import { useCallback, useState } from "react";

export type UseContactFormRevealReturn = Readonly<{
  advanceRevealForField: (fieldId: ContactFieldId, fieldValue: string) => void;
  resetReveal: () => void;
  revealedStepIndex: number;
}>;

export function useContactFormReveal(
  activeFields: readonly ContactFieldViewModel[],
): UseContactFormRevealReturn {
  const [revealedStepIndex, setRevealedStepIndex] = useState(0);

  const resetReveal = useCallback(() => {
    setRevealedStepIndex(0);
  }, []);

  const advanceRevealForField = useCallback(
    (fieldId: ContactFieldId, fieldValue: string) => {
      setRevealedStepIndex((current) =>
        computeNextContactRevealStepIndex(current, fieldId, fieldValue, activeFields),
      );
    },
    [activeFields],
  );

  return {
    advanceRevealForField,
    resetReveal,
    revealedStepIndex,
  };
}
