import { useLayoutEffect, type RefObject } from "react";
import { runLocalePickerOpenAnimation } from "@/lib/animation/language-switcher/run-locale-picker-open-animation/runLocalePickerOpenAnimation";

export function useLocalePickerOpenAnimation(
  open: boolean,
  panelRef: RefObject<HTMLDivElement | null>,
): void {
  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const tl = runLocalePickerOpenAnimation(panel);

    return () => {
      tl.kill();
    };
  }, [open, panelRef]);
}
