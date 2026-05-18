"use client";

import { useMemo, type ReactElement } from "react";
import { ContactChannelItem } from "@/features/homescreen/home-hero/cta/components/contact-icon-strip/ContactChannelItem";
import { useContactIconStrip } from "@/features/homescreen/home-hero/cta/hooks/use-contact-icon-strip/useContactIconStrip";
import { getContactStripShellClassName } from "@/features/homescreen/home-hero/cta/lib/get-contact-strip-shell-class-name/getContactStripShellClassName";
import { mapContactChannelsForStrip } from "@/features/homescreen/home-hero/cta/lib/map-contact-channels-for-strip/mapContactChannelsForStrip";
import type { ContactStripCopy } from "@/features/homescreen/home-hero/types/contactStripCopy";

export type ContactIconStripProps = Readonly<{
  copy: ContactStripCopy;
  id: string;
  isOpen: boolean;
  marginActive: boolean;
  onCloseComplete: () => void;
}>;

export function ContactIconStrip({
  copy,
  id,
  isOpen,
  marginActive,
  onCloseComplete,
}: ContactIconStripProps): ReactElement {
  const { shellRef } = useContactIconStrip(isOpen, onCloseComplete);
  const channels = useMemo(() => mapContactChannelsForStrip(copy), [copy]);

  return (
    <div ref={shellRef} className={getContactStripShellClassName(marginActive)}>
      <nav
        aria-hidden={!isOpen}
        aria-label={copy.ariaLabel}
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
