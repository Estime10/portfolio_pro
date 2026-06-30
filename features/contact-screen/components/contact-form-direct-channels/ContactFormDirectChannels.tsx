"use client";

import { ContactSelectedIntentCard } from "@/features/contact-screen/components/contact-selected-intent-card/ContactSelectedIntentCard";
import { ContactIconStrip } from "@/components/contact-channels/contact-icon-strip/ContactIconStrip";
import { useClosingContactIconStrip } from "@/components/contact-channels/hooks/use-closing-contact-icon-strip/useClosingContactIconStrip";
import type { ContactIntentOptionViewModel } from "@/features/contact-screen/types/contactFormViewModel";
import type { ContactStripLabels } from "@/lib/contact-channels/types/contact-strip-labels/contactStripLabels";

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
  const { handleCloseComplete, isOpen, marginActive, requestClose } =
    useClosingContactIconStrip(onBack);

  return (
    <div className="flex flex-col gap-6">
      <ContactSelectedIntentCard
        cancelLabel={cancelLabel}
        intent={intent}
        onCancel={requestClose}
      />

      <ContactIconStrip
        id={CONTACT_FORM_CHANNELS_STRIP_ID}
        isOpen={isOpen}
        labels={contactStrip}
        layout="embedded"
        marginActive={marginActive}
        onCloseComplete={handleCloseComplete}
      />
    </div>
  );
}
