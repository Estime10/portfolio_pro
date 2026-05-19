import { ContactChannelIcon } from '@/features/homescreen/home-hero/cta/components/ContactChannelIcon'
import type { ContactChannelViewModel } from '@/features/homescreen/home-hero/cta/types/contactChannelViewModel'
import { CHROME_LOGO_GRADIENT_ICON_TILE } from '@/lib/ui/brandChrome'

export type ContactChannelItemProps = Readonly<{
  channel: ContactChannelViewModel
}>

export function ContactChannelItem({ channel }: ContactChannelItemProps) {
  return (
    <li className="min-w-0" data-contact-channel-item>
      <a
        aria-label={channel.ariaLabel}
        className="group border-border bg-background/20 focus-visible:ring-accent flex h-full min-h-0 flex-row items-center gap-2 rounded-xl border p-2 transition-colors hover:border-[rgb(49_46_129_/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-5 sm:rounded-2xl sm:p-4 md:gap-4 md:p-3.5 dark:hover:border-[rgb(129_140_248_/0.55)]"
        href={channel.href}
        rel={channel.linkRel}
        target={channel.linkTarget}
      >
        <span
          className={`${CHROME_LOGO_GRADIENT_ICON_TILE} flex size-10 shrink-0 items-center justify-center rounded-lg transition-[filter] group-hover:brightness-110 group-active:brightness-95 sm:size-16 sm:rounded-xl md:size-14`}
        >
          <ContactChannelIcon channel={channel.id} variant="strip" />
        </span>
        <span className="flex min-w-0 flex-1 flex-col justify-center gap-px sm:gap-0.5">
          <span className="text-xs leading-tight font-medium tracking-wide text-muted uppercase sm:text-label">
            {channel.label}
          </span>
          <span className="text-foreground truncate text-xs leading-tight font-medium sm:text-body">
            {channel.displayValue}
          </span>
        </span>
      </a>
    </li>
  )
}
