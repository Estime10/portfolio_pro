"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/button";
import { CHROME_TOGGLE_OUTLINE } from "@/lib/ui/brandChrome";
import { useThemeToggle } from "./hooks";

export function ThemeToggle() {
  const { cycle, label, mode } = useThemeToggle();
  const Icon = mode === "dark" ? Sun : Moon;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={CHROME_TOGGLE_OUTLINE}
      onClick={cycle}
      aria-label={label}
      aria-pressed={mode === "dark"}
    >
      <span className="sr-only">{label}</span>
      <Icon aria-hidden className="text-foreground size-4 shrink-0" strokeWidth={2} />
    </Button>
  );
}
