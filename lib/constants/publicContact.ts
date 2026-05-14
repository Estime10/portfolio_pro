/**
 * Coordonnées publiques (hero, bandeau contact — placeholders jusqu’à
 * remplacement par les vraies valeurs).
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
    href: "https://www.instagram.com/xxx/",
    displayValue: "@xxx",
    external: true,
  },
  {
    id: "linkedin",
    href: "https://www.linkedin.com/in/xxx/",
    displayValue: "xxx",
    external: true,
  },
  {
    id: "email",
    href: "mailto:xxx@xxx",
    displayValue: "xxx@xxx",
    external: false,
  },
  {
    id: "phone",
    href: "tel:xxx",
    displayValue: "xxx",
    external: false,
  },
];

const EMAIL_CHANNEL = PUBLIC_CONTACT_CHANNELS.find((c) => c.id === "email");

/** Lien `mailto:` aligné sur l’entrée e-mail du bandeau contact. */
export function getPublicContactEmailHref(): string {
  return EMAIL_CHANNEL?.href ?? "mailto:xxx@xxx";
}
