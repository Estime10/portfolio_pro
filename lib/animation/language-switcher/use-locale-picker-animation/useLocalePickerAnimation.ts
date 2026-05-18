import { useLayoutEffect, useRef, type RefObject } from "react";
import { resetLocalePickerClosed } from "@/lib/animation/language-switcher/reset-locale-picker-closed/resetLocalePickerClosed";
import { runLocalePickerCloseAnimation } from "@/lib/animation/language-switcher/run-locale-picker-close-animation/runLocalePickerCloseAnimation";
import { runLocalePickerOpenAnimation } from "@/lib/animation/language-switcher/run-locale-picker-open-animation/runLocalePickerOpenAnimation";

export function useLocalePickerAnimation(
  isExpanded: boolean,
  panelRef: RefObject<HTMLDivElement | null>,
  onCloseComplete: () => void,
): void {
  const hasBeenOpenRef = useRef(false);
  const timelineRef = useRef<ReturnType<typeof runLocalePickerOpenAnimation> | null>(
    null,
  );

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    timelineRef.current?.kill();
    timelineRef.current = null;

    if (isExpanded) {
      hasBeenOpenRef.current = true;
      timelineRef.current = runLocalePickerOpenAnimation(panel);
    } else if (hasBeenOpenRef.current) {
      const tl = runLocalePickerCloseAnimation(panel);
      tl.eventCallback("onComplete", () => {
        resetLocalePickerClosed(panel);
        onCloseComplete();
      });
      timelineRef.current = tl;
    } else {
      resetLocalePickerClosed(panel);
    }

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [isExpanded, onCloseComplete, panelRef]);
}
