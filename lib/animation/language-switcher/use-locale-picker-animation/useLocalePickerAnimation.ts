import type { GsapTimeline } from "@/lib/animation/gsap/gsapAnimationTypes";
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
  const timelineRef = useRef<GsapTimeline | null>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const abortRef = { current: false };

    timelineRef.current?.kill();
    timelineRef.current = null;

    void (async () => {
      if (isExpanded) {
        hasBeenOpenRef.current = true;
        const tl = await runLocalePickerOpenAnimation(panel);
        if (abortRef.current) {
          tl.kill();
          return;
        }
        timelineRef.current = tl;
        return;
      }

      if (hasBeenOpenRef.current) {
        const tl = await runLocalePickerCloseAnimation(panel, () => {
          void resetLocalePickerClosed(panel).then(() => {
            if (!abortRef.current) {
              onCloseComplete();
            }
          });
        });
        if (abortRef.current) {
          tl.kill();
          return;
        }
        timelineRef.current = tl;
        return;
      }

      await resetLocalePickerClosed(panel);
    })();

    return () => {
      abortRef.current = true;
      timelineRef.current?.kill();
      timelineRef.current = null;
    };
  }, [isExpanded, onCloseComplete, panelRef]);
}
