"use client";

import { useCallback, useState, type ReactNode } from "react";
import { CtaButtons } from "./components/buttons/CtaButtons";
import { ContactIconStrip } from "./components/ContactIconStrip";
import type { ContactStripCopy } from "../types/contactStripCopy";

const HERO_CONTACT_STRIP_ID = "hero-contact-strip";

export type HomeHeroCtasProps = Readonly<{
  contactStrip: ContactStripCopy;
  startProjectLabel: string;
  viewWorkLabel: string;
  workHref: string;
}>;

export function HomeHeroCtas({
  contactStrip,
  startProjectLabel,
  viewWorkLabel,
  workHref,
}: HomeHeroCtasProps): ReactNode {
  const [contactOpen, setContactOpen] = useState(false);

  const toggleContact = useCallback(() => {
    setContactOpen((open) => !open);
  }, []);

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
        copy={contactStrip}
        id={HERO_CONTACT_STRIP_ID}
        isOpen={contactOpen}
      />
    </div>
  );
}
