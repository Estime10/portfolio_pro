import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { HeaderToolbar } from "@/components/layout/main-header/HeaderToolbar";
import { LogoEstimeVangu } from "@/components/logo/logo/LogoEstimeVangu";
import { DesktopMainNav } from "@/components/navigation/desktop/DesktopMainNav";
import { MobileHeaderNav } from "@/components/navigation/mobile/MobileHeaderNav";
import { HOME_ROUTE_PATH } from "@/lib/constants";

export async function MainHeader() {
  const t = await getTranslations("MainHeader");

  const navLabels = {
    navAria: t("navAria"),
    menu: t("navLabel"),
    menuToggleAria: t("menuToggleAriaLabel"),
    home: t("menu.home"),
    profile: t("menu.profile"),
    projects: t("menu.projects"),
    contact: t("menu.contact"),
  };

  return (
    <header className="bg-background/90 supports-backdrop-filter:backdrop-blur-md sticky top-0 z-50 border-border border-b">
      <MobileHeaderNav
        labels={navLabels}
        logo={
          <Link
            href={HOME_ROUTE_PATH}
            className="text-foreground ring-offset-background rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <LogoEstimeVangu size="sm" />
          </Link>
        }
        desktopNav={<DesktopMainNav labels={navLabels} />}
        toolbar={<HeaderToolbar />}
      />
    </header>
  );
}
