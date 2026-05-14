import type { ReactElement } from "react";
import { LogoEntrance } from "@/components/logo/logo-entrance/LogoEntrance";

export default function Home(): ReactElement {
  return (
    <div className="bg-background text-foreground flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      <LogoEntrance />
    </div>
  );
}
