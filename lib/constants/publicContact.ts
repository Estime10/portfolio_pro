/**
 * Coordonnées publiques (hero, bandeau contact, liens externes).
 */

export type PublicContactChannelId =
  | "email"
  | "instagram"
  | "linkedin"
  | "phone";

export type PublicContactChannel = Readonly<{
  displayValue: string;
  external: boolean;
  href: string;
  id: PublicContactChannelId;
}>;

export const PUBLIC_CONTACT_CHANNELS: readonly PublicContactChannel[] = [
  {
    id: "instagram",
    href: "https://www.instagram.com/10davinchatcode/",
    displayValue: "@10davinchatcode",
    external: true,
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/estime-vangu/",
    displayValue: "estime-vangu",
    external: true,
  },
  {
    id: "email",
    href: "mailto:estimevangu.pro@gmail.com",
    displayValue: "estimevangu.pro@gmail.com",
    external: false,
  },
  {
    id: "phone",
    href: "tel:+32484030668",
    displayValue: "+32 484 03 06 68",
    external: false,
  },
];

const EMAIL_CHANNEL = PUBLIC_CONTACT_CHANNELS.find((c) => c.id === "email");

/** Lien `mailto:` aligné sur l’entrée e-mail du bandeau contact. */
export function getPublicContactEmailHref(): string {
  return EMAIL_CHANNEL?.href ?? "mailto:estimevangu.pro@gmail.com";
}
