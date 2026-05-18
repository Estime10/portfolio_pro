"use client";

import { CtaButtons } from "./components/buttons/CtaButtons";
import { ContactIconStrip } from "./components/contact-icon-strip/ContactIconStrip";
import { useHeroContactPanel } from "./hooks/use-hero-contact-panel/useHeroContactPanel";
import type { ContactStripLabels } from "@/features/homescreen/home-hero/types/contactStripLabels";

const HERO_CONTACT_STRIP_ID = "hero-contact-strip";

export type HomeHeroCtasProps = Readonly<{
  contactStrip: ContactStripLabels;
  startProjectLabel: string;
  viewWorkLabel: string;
  workHref: string;
}>;

export function HomeHeroCtas({
  contactStrip,
  startProjectLabel,
  viewWorkLabel,
  workHref,
}: HomeHeroCtasProps) {
  const { contactOpen, marginActive, toggleContact, onContactCloseComplete } =
    useHeroContactPanel();

  return (
    <div>
      <CtaButtons
        contactExpanded={contactOpen}
        contactStripId={HERO_CONTACT_STRIP_ID}
        onStartProjectClick={toggleContact}
        startProjectLabel={startProjectLabel}
        viewWorkLabel={viewWorkLabel}
        workHref={workHref}
      />
      <ContactIconStrip
        labels={contactStrip}
        id={HERO_CONTACT_STRIP_ID}
        isOpen={contactOpen}
        marginActive={marginActive}
        onCloseComplete={onContactCloseComplete}
      />
    </div>
  );
}
