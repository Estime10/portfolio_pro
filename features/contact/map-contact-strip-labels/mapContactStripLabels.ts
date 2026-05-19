import type { ContactStripLabels } from "@/features/homescreen/home-hero/types/contactStripLabels";
import { getTranslations } from "next-intl/server";

type HomeScreenTranslator = Awaited<ReturnType<typeof getTranslations<"HomeScreen">>>;

export function mapContactStripLabels(tHome: HomeScreenTranslator): ContactStripLabels {
  return {
    ariaLabel: tHome("hero.contactStrip.ariaLabel"),
    instagramLabel: tHome("hero.contactStrip.instagramLabel"),
    linkedinLabel: tHome("hero.contactStrip.linkedinLabel"),
    emailLabel: tHome("hero.contactStrip.emailLabel"),
    phoneLabel: tHome("hero.contactStrip.phoneLabel"),
  };
}
