"use client";

import type { ContactFormPhase } from "@/features/contact/hooks/use-contact-form/types/contactFormPhase";
import type { ContactIntentId } from "@/features/contact/types/contact-intent-id/contactIntentId";
import { useState } from "react";

export type UseContactFormPhaseReturn = Readonly<{
  intentId: ContactIntentId | null;
  phase: ContactFormPhase;
  setIntentId: (intentId: ContactIntentId | null) => void;
  setPhase: (phase: ContactFormPhase) => void;
}>;

export function useContactFormPhase(): UseContactFormPhaseReturn {
  const [phase, setPhase] = useState<ContactFormPhase>("intent-selection");
  const [intentId, setIntentId] = useState<ContactIntentId | null>(null);

  return {
    intentId,
    phase,
    setIntentId,
    setPhase,
  };
}
