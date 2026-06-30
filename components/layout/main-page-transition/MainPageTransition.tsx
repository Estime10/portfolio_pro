"use client";

import { useMainRouteTransition } from "@/lib/navigation/main-route-transition-context/MainRouteTransitionContext";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import type { GsapTween } from "@/lib/animation/gsap/gsapAnimationTypes";
import { runMainRouteFadeInAnimation } from "@/lib/animation/main-route/run-main-route-fade-in-animation/runMainRouteFadeInAnimation";

export type MainPageTransitionProps = Readonly<{
  children: ReactNode;
}>;

export function MainPageTransition({ children }: MainPageTransitionProps) {
  const pathname = usePathname();
  const routeTransition = useMainRouteTransition();
  const contentRef = useRef<HTMLDivElement>(null);
  const fadeInTweenRef = useRef<GsapTween | null>(null);
  const previousPathnameRef = useRef(pathname);

  useLayoutEffect(() => {
    routeTransition?.registerContentRoot(contentRef.current);

    return () => {
      routeTransition?.registerContentRoot(null);
    };
  }, [routeTransition]);

  useLayoutEffect(() => {
    if (pathname === previousPathnameRef.current) {
      return;
    }

    previousPathnameRef.current = pathname;

    const contentRoot = contentRef.current;
    if (!contentRoot) {
      return;
    }

    let cancelled = false;

    fadeInTweenRef.current?.kill();
    fadeInTweenRef.current = null;

    void runMainRouteFadeInAnimation(contentRoot).then((tween) => {
      if (cancelled) {
        tween?.kill();
        return;
      }
      fadeInTweenRef.current = tween;
    });

    return () => {
      cancelled = true;
      fadeInTweenRef.current?.kill();
      fadeInTweenRef.current = null;
    };
  }, [pathname, routeTransition]);

  return (
    <div ref={contentRef} className="flex min-h-0 flex-1 flex-col">
      {children}
    </div>
  );
}
