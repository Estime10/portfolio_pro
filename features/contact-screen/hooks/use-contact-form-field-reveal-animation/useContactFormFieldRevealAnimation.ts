"use client";

import { runContactFormRevealStepAnimation } from "@/lib/animation/contact-form/run-contact-form-reveal-step-animation/runContactFormRevealStepAnimation";
import { useLayoutEffect, useRef } from "react";

const CONTACT_FORM_FOCUSABLE_SELECTOR = "input, textarea, select";

export function useContactFormFieldRevealAnimation(revealedStepIndex: number): void {
  const previousStepIndexRef = useRef(0);
  const timelineRef = useRef<ReturnType<typeof runContactFormRevealStepAnimation> | null>(null);

  useLayoutEffect(() => {
    if (revealedStepIndex <= previousStepIndexRef.current) {
      previousStepIndexRef.current = revealedStepIndex;
      return;
    }

    const stepElement = document.querySelector<HTMLElement>(
      `[data-contact-reveal-step="${String(revealedStepIndex)}"]`,
    );

    if (!stepElement) {
      previousStepIndexRef.current = revealedStepIndex;
      return;
    }

    const focusElement = stepElement.querySelector<HTMLElement>(CONTACT_FORM_FOCUSABLE_SELECTOR);
    const scrollElement = focusElement ?? stepElement;

    timelineRef.current?.kill();
    timelineRef.current = runContactFormRevealStepAnimation({
      stepElement,
      scrollElement,
      focusElement,
    });

    previousStepIndexRef.current = revealedStepIndex;

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [revealedStepIndex]);
}
