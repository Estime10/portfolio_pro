import { buildContactChannelAriaLabel } from "@/lib/contact-channels/build-contact-channel-aria-label/buildContactChannelAriaLabel";
import { getContactChannelLabel } from "@/lib/contact-channels/get-contact-channel-label/getContactChannelLabel";
import type { ContactChannelViewModel } from "@/lib/contact-channels/types/contact-channel-view-model/contactChannelViewModel";
import type { ContactStripLabels } from "@/lib/contact-channels/types/contact-strip-labels/contactStripLabels";
import { PUBLIC_CONTACT_CHANNELS } from "@/lib/constants";

export function mapContactChannelsForStrip(
  labels: ContactStripLabels,
): readonly ContactChannelViewModel[] {
  return PUBLIC_CONTACT_CHANNELS.map((channel) => {
    const label = getContactChannelLabel(labels, channel.id);

    return {
      id: channel.id,
      label,
      displayValue: channel.displayValue,
      href: channel.href,
      external: channel.external,
      linkRel: channel.external ? "noopener noreferrer" : undefined,
      linkTarget: channel.external ? "_blank" : undefined,
      ariaLabel: buildContactChannelAriaLabel(label, channel.displayValue),
    };
  });
}
