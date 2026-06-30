import { MainHeader } from "@/components/layout/main-header/MainHeader";
import { MainPageTransition } from "@/components/layout/main-page-transition/MainPageTransition";
import { SkipToMainContent } from "@/components/layout/skip-to-main-content/SkipToMainContent";
import { getRootMetadata } from "@/lib/metadata/get-root-metadata/getRootMetadata";
import { MainRouteTransitionProvider } from "@/lib/navigation/main-route-transition-context/MainRouteTransitionContext";
import { MainShell } from "@/components/layout/main-shell/MainShell";
import { MAIN_CONTENT_ID } from "@/lib/constants";

export const metadata = getRootMetadata({
  title: {
    default: "Estime Vangu — Frontend & Product Engineer",
    template: "%s | Estime Vangu",
  },
  description:
    "Frontend-focused developer building modern web applications with a strong emphasis on product thinking, performance, and user experience.",
});

export default function MainGroupLayout({ children }: LayoutProps<"/">) {
  return (
    <MainShell>
      <SkipToMainContent />
      <MainRouteTransitionProvider>
        <MainHeader />
        <main
          id={MAIN_CONTENT_ID}
          tabIndex={-1}
          className="flex min-h-0 flex-1 flex-col outline-none"
        >
          <MainPageTransition>{children}</MainPageTransition>
        </main>
      </MainRouteTransitionProvider>
    </MainShell>
  );
}
