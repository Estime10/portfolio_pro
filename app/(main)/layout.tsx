import type { ReactNode } from "react";
import { MainHeader } from "@/components/layout/main-header/MainHeader";

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
