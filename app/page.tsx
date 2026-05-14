import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LogoEntrance } from "@/components/logo/logo-entrance/LogoEntrance";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("SplashScreen.meta");
  return {
    title: {
      absolute: t("title"),
    },
    description: t("description"),
  };
}

export default function Home() {
  return (
    <div className="bg-background text-foreground flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      <LogoEntrance />
    </div>
  );
}
