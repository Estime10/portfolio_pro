"use client";

import { ContactSelectedIntentCard } from "@/features/contact/components/contact-selected-intent-card/ContactSelectedIntentCard";
import { ContactIconStrip } from "@/features/homescreen/home-hero/cta/components/contact-icon-strip/ContactIconStrip";
import type { ContactIntentOptionViewModel } from "@/features/contact/types/contactFormViewModel";
import type { ContactStripLabels } from "@/features/homescreen/home-hero/types/contactStripLabels";
import { useCallback, useRef, useState } from "react";

const CONTACT_FORM_CHANNELS_STRIP_ID = "contact-form-channels";

export type ContactFormDirectChannelsProps = Readonly<{
  cancelLabel: string;
  contactStrip: ContactStripLabels;
  intent: ContactIntentOptionViewModel;
  onBack: () => void;
}>;

export function ContactFormDirectChannels({
  cancelLabel,
  contactStrip,
  intent,
  onBack,
}: ContactFormDirectChannelsProps) {
  const [stripOpen, setStripOpen] = useState(true);
  const isClosingRef = useRef(false);
  const marginActive = true;

  const handleBack = (): void => {
    isClosingRef.current = true;
    setStripOpen(false);
  };

  const handleStripCloseComplete = useCallback((): void => {
    if (!isClosingRef.current) {
      return;
    }

    isClosingRef.current = false;
    onBack();
  }, [onBack]);

  return (
    <div className="flex flex-col gap-6">
      <ContactSelectedIntentCard cancelLabel={cancelLabel} intent={intent} onCancel={handleBack} />

      <ContactIconStrip
        id={CONTACT_FORM_CHANNELS_STRIP_ID}
        isOpen={stripOpen}
        labels={contactStrip}
        layout="embedded"
        marginActive={marginActive}
        onCloseComplete={handleStripCloseComplete}
      />
    </div>
  );
}
