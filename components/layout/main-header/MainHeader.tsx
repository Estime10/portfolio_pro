import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { HeaderToolbar } from "@/components/layout/main-header/HeaderToolbar";
import { LogoEstimeVangu } from "@/components/logo/logo/LogoEstimeVangu";

export async function MainHeader() {
  const t = await getTranslations("MainHeader");

  return (
    <header className="bg-background/90 supports-backdrop-filter:backdrop-blur-md sticky top-0 z-50 border-border border-b">
      <div className="ui-nav-shell grid grid-cols-[1fr_auto_1fr] items-center gap-4">
        <div className="flex min-w-0 justify-start">
          <Link
            href="/home"
            className="text-foreground ring-offset-background rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <LogoEstimeVangu size="sm" />
          </Link>
        </div>
        <nav className="flex justify-center" aria-label={t("navAria")}>
          <span className="text-label text-muted">{t("navLabel")}</span>
        </nav>
        <div className="flex min-w-0 items-center justify-end">
          <HeaderToolbar />
        </div>
      </div>
    </header>
  );
}
