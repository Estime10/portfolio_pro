"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/button";
import { useThemeToggle } from "./hooks";

const OUTLINE =
  "text-label !rounded-xl border-solid border-[color:rgb(49_46_129_/0.38)] dark:border-[color:rgb(129_140_248_/0.45)]";

export function ThemeToggle() {
  const { cycle, label, mode } = useThemeToggle();
  const Icon = mode === "dark" ? Sun : Moon;

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className={OUTLINE}
      onClick={cycle}
      aria-label={label}
      aria-pressed={mode === "dark"}
    >
      <span className="sr-only">{label}</span>
      <Icon aria-hidden className="text-foreground size-4 shrink-0" strokeWidth={2} />
    </Button>
  );
}
