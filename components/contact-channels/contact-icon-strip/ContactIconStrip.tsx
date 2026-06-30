"use client";

import { useMemo } from "react";
import { ContactChannelItem } from "@/components/contact-channels/contact-icon-strip/ContactChannelItem";
import { useContactIconStrip } from "@/components/contact-channels/hooks/use-contact-icon-strip/useContactIconStrip";
import {
  getContactStripShellClassName,
  type ContactStripLayout,
} from "@/lib/contact-channels/get-contact-strip-shell-class-name/getContactStripShellClassName";
import { mapContactChannelsForStrip } from "@/lib/contact-channels/map-contact-channels-for-strip/mapContactChannelsForStrip";
import type { ContactStripLabels } from "@/lib/contact-channels/types/contact-strip-labels/contactStripLabels";

export type ContactIconStripProps = Readonly<{
  id: string;
  isOpen: boolean;
  labels: ContactStripLabels;
  layout?: ContactStripLayout;
  marginActive: boolean;
  onCloseComplete: () => void;
}>;

export function ContactIconStrip({
  id,
  isOpen,
  labels,
  layout = "hero",
  marginActive,
  onCloseComplete,
}: ContactIconStripProps) {
  const { shellRef } = useContactIconStrip(isOpen, onCloseComplete);
  const channels = useMemo(() => mapContactChannelsForStrip(labels), [labels]);

  return (
    <div ref={shellRef} className={getContactStripShellClassName(marginActive, isOpen, layout)}>
      <nav
        aria-hidden={!isOpen}
        aria-label={labels.ariaLabel}
        className={isOpen ? undefined : "pointer-events-none"}
        id={id}
        inert={!isOpen ? true : undefined}
      >
        <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-4 p-0 max-sm:gap-x-2 max-sm:gap-y-2.5 sm:gap-x-4 sm:gap-y-5 md:gap-x-4 md:gap-y-4">
          {channels.map((channel) => (
            <ContactChannelItem key={channel.id} channel={channel} />
          ))}
        </ul>
      </nav>
    </div>
  );
}
