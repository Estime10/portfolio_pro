import type { PublicContactChannelId } from "@/lib/constants/publicContact";

export type ContactChannelViewModel = Readonly<{
  ariaLabel: string;
  displayValue: string;
  external: boolean;
  href: string;
  id: PublicContactChannelId;
  label: string;
  linkRel?: string;
  linkTarget?: string;
}>;
