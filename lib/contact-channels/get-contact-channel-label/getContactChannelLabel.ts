import type { ContactStripLabels } from "@/lib/contact-channels/types/contact-strip-labels/contactStripLabels";
import type { PublicContactChannelId } from "@/lib/constants";

export function getContactChannelLabel(
  labels: ContactStripLabels,
  channelId: PublicContactChannelId,
): string {
  switch (channelId) {
    case "instagram":
      return labels.instagramLabel;
    case "linkedin":
      return labels.linkedinLabel;
    case "email":
      return labels.emailLabel;
    case "phone":
      return labels.phoneLabel;
    default: {
      const _exhaustive: never = channelId;
      return _exhaustive;
    }
  }
}
