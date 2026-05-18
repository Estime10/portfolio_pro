"use client";

import { useMemo } from "react";
import { ContactChannelItem } from "@/features/homescreen/home-hero/cta/components/contact-icon-strip/ContactChannelItem";
import { useContactIconStrip } from "@/features/homescreen/home-hero/cta/hooks/use-contact-icon-strip/useContactIconStrip";
import { getContactStripShellClassName } from "@/features/homescreen/home-hero/cta/lib/get-contact-strip-shell-class-name/getContactStripShellClassName";
import { mapContactChannelsForStrip } from "@/features/homescreen/home-hero/cta/lib/map-contact-channels-for-strip/mapContactChannelsForStrip";
import type { ContactStripLabels } from "@/features/homescreen/home-hero/types/contactStripLabels";

export type ContactIconStripProps = Readonly<{
  id: string;
  isOpen: boolean;
  labels: ContactStripLabels;
  marginActive: boolean;
  onCloseComplete: () => void;
}>;

export function ContactIconStrip({
  id,
  isOpen,
  labels,
  marginActive,
  onCloseComplete,
}: ContactIconStripProps) {
  const { shellRef } = useContactIconStrip(isOpen, onCloseComplete);
  const channels = useMemo(() => mapContactChannelsForStrip(labels), [labels]);

  return (
    <div
      ref={shellRef}
      className={getContactStripShellClassName(marginActive, isOpen)}
    >
      <nav
        aria-hidden={!isOpen}
        aria-label={labels.ariaLabel}
        className={isOpen ? undefined : "pointer-events-none"}
        id={id}
        inert={!isOpen ? true : undefined}
      >
        <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-4 p-0 sm:gap-x-4 sm:gap-y-5 md:gap-x-4 md:gap-y-4">
          {channels.map((channel) => (
            <ContactChannelItem key={channel.id} channel={channel} />
          ))}
        </ul>
      </nav>
    </div>
  );
}
