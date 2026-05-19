"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { runMainRouteFadeOutAnimation } from "@/lib/animation/main-route/run-main-route-fade-out-animation/runMainRouteFadeOutAnimation";
import { prefersReducedMotion } from "@/lib/animation/shared/prefers-reduced-motion/prefersReducedMotion";

export type MainRouteTransitionContextValue = Readonly<{
  navigateWithTransition: (href: string) => void;
  registerContentRoot: (node: HTMLDivElement | null) => void;
}>;

const MainRouteTransitionContext = createContext<MainRouteTransitionContextValue | null>(
  null,
);

export type MainRouteTransitionProviderProps = Readonly<{
  children: ReactNode;
}>;

export function MainRouteTransitionProvider({
  children,
}: MainRouteTransitionProviderProps) {
  const router = useRouter();
  const contentRootRef = useRef<HTMLDivElement | null>(null);
  const fadeOutTweenRef = useRef<ReturnType<typeof runMainRouteFadeOutAnimation> | null>(
    null,
  );

  const registerContentRoot = useCallback((node: HTMLDivElement | null): void => {
    contentRootRef.current = node;
  }, []);

  const navigateWithTransition = useCallback(
    (href: string): void => {
      fadeOutTweenRef.current?.kill();
      fadeOutTweenRef.current = null;

      const pushRoute = (): void => {
        router.push(href);
      };

      const contentRoot = contentRootRef.current;
      if (!contentRoot || prefersReducedMotion()) {
        pushRoute();
        return;
      }

      const fadeOutTween = runMainRouteFadeOutAnimation(contentRoot);
      fadeOutTweenRef.current = fadeOutTween;

      if (!fadeOutTween) {
        pushRoute();
        return;
      }

      fadeOutTween.eventCallback("onComplete", pushRoute);
    },
    [router],
  );

  const value = useMemo(
    (): MainRouteTransitionContextValue => ({
      navigateWithTransition,
      registerContentRoot,
    }),
    [navigateWithTransition, registerContentRoot],
  );

  return (
    <MainRouteTransitionContext.Provider value={value}>
      {children}
    </MainRouteTransitionContext.Provider>
  );
}

export function useMainRouteTransition(): MainRouteTransitionContextValue | null {
  return useContext(MainRouteTransitionContext);
}
