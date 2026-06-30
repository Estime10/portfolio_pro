"use client";

import type { GsapTimeline } from "@/lib/animation/gsap/gsapAnimationTypes";
import { runContactFormRevealStepAnimation } from "@/lib/animation/contact-form/run-contact-form-reveal-step-animation/runContactFormRevealStepAnimation";
import { useLayoutEffect, useRef } from "react";

const CONTACT_FORM_FOCUSABLE_SELECTOR = "input, textarea, select";

export function useContactFormFieldRevealAnimation(revealedStepIndex: number): void {
  const previousStepIndexRef = useRef(0);
  const timelineRef = useRef<GsapTimeline | null>(null);

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

    let cancelled = false;

    timelineRef.current?.kill();
    timelineRef.current = null;

    void runContactFormRevealStepAnimation({
      stepElement,
      scrollElement,
      focusElement,
    }).then((timeline) => {
      if (cancelled) {
        timeline.kill();
        return;
      }
      timelineRef.current = timeline;
    });

    previousStepIndexRef.current = revealedStepIndex;

    return () => {
      cancelled = true;
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [revealedStepIndex]);
}
