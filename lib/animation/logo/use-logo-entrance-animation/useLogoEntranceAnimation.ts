import type { RefObject } from "react";
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  runLogoEntranceAnimation,
  type RunLogoEntranceAnimationOptions,
} from "@/lib/animation/logo/run-logo-entrance-animation/runLogoEntranceAnimation";

export function useLogoEntranceAnimation(animationOptions?: RunLogoEntranceAnimationOptions): {
  rootRef: RefObject<HTMLDivElement | null>;
  leftRef: RefObject<HTMLSpanElement | null>;
  rightRef: RefObject<HTMLSpanElement | null>;
} {
  const rootRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLSpanElement>(null);
  const rightRef = useRef<HTMLSpanElement>(null);
  const onSplashCompleteRef = useRef(animationOptions?.onSplashComplete);

  useEffect(() => {
    onSplashCompleteRef.current = animationOptions?.onSplashComplete;
  }, [animationOptions?.onSplashComplete]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!root || !left || !right) {
      return;
    }
    return runLogoEntranceAnimation(root, left, right, {
      onSplashComplete: () => {
        onSplashCompleteRef.current?.();
      },
    });
  }, []);

  return { rootRef, leftRef, rightRef };
}
