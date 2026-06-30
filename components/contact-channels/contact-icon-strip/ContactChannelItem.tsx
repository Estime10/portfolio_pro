import { ContactChannelIcon } from "@/components/contact-channels/contact-channel-icon/ContactChannelIcon";
import type { ContactChannelViewModel } from "@/lib/contact-channels/types/contact-channel-view-model/contactChannelViewModel";
import { CHROME_LOGO_GRADIENT_ICON_TILE } from "@/lib/ui/brandChrome";

export type ContactChannelItemProps = Readonly<{
  channel: ContactChannelViewModel;
}>;

export function ContactChannelItem({ channel }: ContactChannelItemProps) {
  return (
    <li className="min-w-0" data-contact-channel-item>
      <a
        aria-label={channel.ariaLabel}
        className="group border-border bg-background/20 focus-visible:ring-accent flex h-full min-h-0 flex-row items-center gap-3 rounded-2xl border p-3 transition-colors hover:border-[rgb(49_46_129_/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-5 sm:p-4 md:gap-4 md:p-3.5 dark:hover:border-[rgb(129_140_248_/0.55)]"
        href={channel.href}
        rel={channel.linkRel}
        target={channel.linkTarget}
      >
        <span
          className={`${CHROME_LOGO_GRADIENT_ICON_TILE} flex size-14 shrink-0 items-center justify-center rounded-xl transition-[filter] group-hover:brightness-110 group-active:brightness-95 sm:size-16 md:size-14`}
        >
          <ContactChannelIcon channel={channel.id} variant="strip" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
          <span className="text-label text-muted">{channel.label}</span>
          <span className="text-body text-foreground truncate font-medium">
            {channel.displayValue}
          </span>
        </span>
      </a>
    </li>
  );
}
