import type { Metadata } from "next";
import type { ReactNode } from "react";
import { MainHeader } from "@/components/layout/main-header/MainHeader";

export const metadata: Metadata = {
  title: {
    default: "Estime Vangu — Frontend & Product Engineer",
    template: "%s | Estime Vangu",
  },
  description:
    "Frontend-focused developer building modern web applications with a strong emphasis on product thinking, performance, and user experience.",
};

export default function MainGroupLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="bg-background text-foreground flex min-h-dvh flex-col">
      <MainHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
