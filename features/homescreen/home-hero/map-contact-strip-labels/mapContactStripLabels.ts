import type { ContactStripLabels } from "@/features/homescreen/home-hero/types/contactStripLabels";
import { getTranslations } from "next-intl/server";

type HomeScreenHeroTranslator = Awaited<ReturnType<typeof getTranslations<"HomeScreen.hero">>>;

export function mapContactStripLabels(tHero: HomeScreenHeroTranslator): ContactStripLabels {
  return {
    ariaLabel: tHero("contactStrip.ariaLabel"),
    instagramLabel: tHero("contactStrip.instagramLabel"),
    linkedinLabel: tHero("contactStrip.linkedinLabel"),
    emailLabel: tHero("contactStrip.emailLabel"),
    phoneLabel: tHero("contactStrip.phoneLabel"),
  };
}
