"use client";

import { LanguageSwitcher } from "@/components/toggles/language/LanguageSwitcher";
import { ThemeToggle } from "@/components/toggles/theme/ThemeToggle";

export function HeaderToolbar() {
  return (
    <div className="flex items-center gap-2">
      <LanguageSwitcher />
      <ThemeToggle />
    </div>
  );
}
