"use client";

import { useLayoutEffect, useRef } from "react";
import type { GsapTween } from "@/lib/animation/gsap/gsapAnimationTypes";
import { runMainShellFadeIn } from "@/lib/animation/main-shell/run-main-shell-fade-in/runMainShellFadeIn";
import { SPLASH_TO_MAIN_SESSION_FLAG_KEY } from "@/lib/constants";
import { consumeSplashToMainFadePending } from "@/lib/navigation/pending-main-fade-in";

export type MainShellProps = Readonly<Pick<LayoutProps<"/">, "children">>;

export function MainShell({ children }: MainShellProps) {
  const shellRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const shell = shellRef.current;
    if (!shell) {
      return;
    }

    const fromStorage = sessionStorage.getItem(SPLASH_TO_MAIN_SESSION_FLAG_KEY) === "1";
    const fromMemory = consumeSplashToMainFadePending();

    if (!fromMemory && !fromStorage) {
      return;
    }

    let cancelled = false;
    let tween: GsapTween | null = null;

    void runMainShellFadeIn(shell, {
      onFadeComplete: () => {
        sessionStorage.removeItem(SPLASH_TO_MAIN_SESSION_FLAG_KEY);
      },
    }).then((activeTween) => {
      if (cancelled) {
        activeTween?.kill();
        return;
      }
      tween = activeTween;
    });

    return () => {
      cancelled = true;
      tween?.kill();
    };
  }, []);

  return (
    <div ref={shellRef} className="bg-background text-foreground flex min-h-dvh flex-col">
      {children}
    </div>
  );
}
