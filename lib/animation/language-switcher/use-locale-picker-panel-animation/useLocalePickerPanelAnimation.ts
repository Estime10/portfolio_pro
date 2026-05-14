import gsap from "gsap";
import { useLayoutEffect, useRef, type RefObject } from "react";
import { runLocalePickerRevealAnimation } from "@/lib/animation/language-switcher/run-locale-picker-reveal-animation/runLocalePickerRevealAnimation";

type UseLocalePickerPanelAnimationOptions = {
  readonly onCloseComplete?: () => void;
};

export function useLocalePickerPanelAnimation(
  open: boolean,
  panelRef: RefObject<HTMLDivElement | null>,
  options?: UseLocalePickerPanelAnimationOptions,
): void {
  const firstOpenCycle = useRef(true);
  const onCloseCompleteRef = useRef<
    UseLocalePickerPanelAnimationOptions["onCloseComplete"]
  >(undefined);

  useLayoutEffect(() => {
    onCloseCompleteRef.current = options?.onCloseComplete;

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    if (!open && firstOpenCycle.current) {
      const targets = panel.querySelectorAll<HTMLElement>("[data-locale-option]");
      gsap.set(targets, { opacity: 0, x: 32, scale: 0.9 });
      firstOpenCycle.current = false;
      return;
    }

    firstOpenCycle.current = false;

    const tl = runLocalePickerRevealAnimation(
      panel,
      open ? "open" : "close",
      open ? undefined : () => {
        onCloseCompleteRef.current?.();
      },
    );

    return () => {
      tl.kill();
    };
  }, [open, panelRef, options?.onCloseComplete]);
}
