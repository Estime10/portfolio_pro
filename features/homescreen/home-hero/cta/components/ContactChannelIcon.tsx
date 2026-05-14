import type { ReactElement } from "react";
import { Mail, Phone } from "lucide-react";
import { GlyphInstagram, GlyphLinkedin } from "@/features/homescreen/home-hero/cta/components/BrandContactGlyphs";
import type { PublicContactChannelId } from "@/lib/constants/publicContact";

export type ContactChannelIconVariant = "compact" | "strip";

const ICON_CLASS: Record<ContactChannelIconVariant, string> = {
  compact: "size-5 text-white drop-shadow-sm dark:text-slate-900",
  strip: "size-7 text-white drop-shadow-sm sm:size-8 dark:text-slate-900",
};

export function ContactChannelIcon({
  channel,
  variant = "compact",
}: Readonly<{
  channel: PublicContactChannelId;
  variant?: ContactChannelIconVariant;
}>): ReactElement {
  const cls = ICON_CLASS[variant];

  switch (channel) {
    case "instagram":
      return <GlyphInstagram className={cls} />;
    case "linkedin":
      return <GlyphLinkedin className={cls} />;
    case "email":
      return <Mail aria-hidden className={cls} strokeWidth={2} />;
    case "phone":
      return <Phone aria-hidden className={cls} strokeWidth={2} />;
    default: {
      const _exhaustive: never = channel;
      return _exhaustive;
    }
  }
}
