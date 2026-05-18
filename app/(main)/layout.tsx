import type { Metadata } from "next";
import { MainShell } from "@/components/layout/main-shell/MainShell";
import { MainHeader } from "@/components/layout/main-header/MainHeader";

export const metadata: Metadata = {
  title: {
    default: "Estime Vangu — Frontend & Product Engineer",
    template: "%s | Estime Vangu",
  },
  description:
    "Frontend-focused developer building modern web applications with a strong emphasis on product thinking, performance, and user experience.",
};

export default function MainGroupLayout({ children }: LayoutProps<"/">) {
  return (
    <MainShell>
      <MainHeader />
      <main className="flex min-h-0 flex-1 flex-col">{children}</main>
    </MainShell>
  );
}
