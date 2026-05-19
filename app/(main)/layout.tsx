import { MainHeader } from "@/components/layout/main-header/MainHeader";
import { MainPageTransition } from "@/components/layout/main-page-transition/MainPageTransition";
import { getRootMetadata } from "@/lib/metadata/get-root-metadata/getRootMetadata";
import { MainRouteTransitionProvider } from "@/lib/navigation/main-route-transition-context/MainRouteTransitionContext";
import { MainShell } from "@/components/layout/main-shell/MainShell";

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
      <MainRouteTransitionProvider>
        <MainHeader />
        <main className="flex min-h-0 flex-1 flex-col">
          <MainPageTransition>{children}</MainPageTransition>
        </main>
      </MainRouteTransitionProvider>
    </MainShell>
  );
}
