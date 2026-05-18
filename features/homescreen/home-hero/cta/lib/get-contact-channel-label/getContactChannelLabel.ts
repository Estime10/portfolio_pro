import type { ContactStripCopy } from "@/features/homescreen/home-hero/types/contactStripCopy";
import type { PublicContactChannelId } from "@/lib/constants/publicContact";

export function getContactChannelLabel(
  copy: ContactStripCopy,
  channelId: PublicContactChannelId,
): string {
  switch (channelId) {
    case "instagram":
      return copy.instagramLabel;
    case "linkedin":
      return copy.linkedinLabel;
    case "email":
      return copy.emailLabel;
    case "phone":
      return copy.phoneLabel;
    default: {
      const _exhaustive: never = channelId;
      return _exhaustive;
    }
  }
}
