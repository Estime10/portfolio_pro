"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { LogoEntrance } from "@/components/logo/logo-entrance/LogoEntrance";
import { SPLASH_TO_MAIN_SESSION_FLAG_KEY } from "@/lib/constants";
import { signalSplashToMainFadePending } from "@/lib/navigation/pending-main-fade-in";

export function SplashScreen() {
  const router = useRouter();

  const handleSplashComplete = useCallback(() => {
    signalSplashToMainFadePending();
    sessionStorage.setItem(SPLASH_TO_MAIN_SESSION_FLAG_KEY, "1");
    router.push("/home");
  }, [router]);

  return (
    <div className="bg-background text-foreground flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      <LogoEntrance onSplashComplete={handleSplashComplete} />
    </div>
  );
}
