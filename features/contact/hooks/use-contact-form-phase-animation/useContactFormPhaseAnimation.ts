"use client";

import { runContactFormPhaseEnterAnimation } from "@/lib/animation/contact-form/run-contact-form-phase-enter-animation/runContactFormPhaseEnterAnimation";
import { useLayoutEffect, useRef, type RefObject } from "react";

export function useContactFormPhaseAnimation(phaseKey: string): RefObject<HTMLDivElement | null> {
  const panelRef = useRef<HTMLDivElement>(null);
  const previousPhaseRef = useRef(phaseKey);

  useLayoutEffect(() => {
    if (phaseKey === previousPhaseRef.current) {
      return;
    }

    previousPhaseRef.current = phaseKey;

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    runContactFormPhaseEnterAnimation(panel);
  }, [phaseKey]);

  return panelRef;
}
