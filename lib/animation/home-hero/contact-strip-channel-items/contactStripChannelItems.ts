export const CONTACT_STRIP_CHANNEL_ITEM_SELECTOR = "[data-contact-channel-item]";

export function getContactStripChannelItems(shell: HTMLElement): HTMLElement[] {
  return Array.from(
    shell.querySelectorAll<HTMLElement>(CONTACT_STRIP_CHANNEL_ITEM_SELECTOR),
  );
}
