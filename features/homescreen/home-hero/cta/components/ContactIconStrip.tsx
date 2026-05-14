import type { ReactElement } from 'react'
import { ContactChannelIcon } from '@/features/homescreen/home-hero/cta/components/ContactChannelIcon'
import type { ContactStripCopy } from '@/features/homescreen/home-hero/types/contactStripCopy'
import { PUBLIC_CONTACT_CHANNELS, type PublicContactChannelId } from '@/lib/constants/publicContact'
import { CHROME_LOGO_GRADIENT_ICON_TILE } from '@/lib/ui/brandChrome'

export type ContactIconStripProps = Readonly<{
  copy: ContactStripCopy
  id: string
  isOpen: boolean
}>

function channelLabel(copy: ContactStripCopy, id: PublicContactChannelId): string {
  switch (id) {
    case 'instagram':
      return copy.instagramLabel
    case 'linkedin':
      return copy.linkedinLabel
    case 'email':
      return copy.emailLabel
    case 'phone':
      return copy.phoneLabel
    default: {
      const _exhaustive: never = id
      return _exhaustive
    }
  }
}

export function ContactIconStrip({ copy, id, isOpen }: ContactIconStripProps): ReactElement {
  const shellClass = [
    'grid w-full transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none',
    isOpen ? 'grid-rows-[1fr] mt-12 sm:mt-16 md:mt-20' : 'grid-rows-[0fr] mt-0',
  ].join(' ')

  return (
    <div className={shellClass}>
      <div className="min-h-0 overflow-hidden">
        <nav
          aria-hidden={!isOpen}
          aria-label={copy.ariaLabel}
          className={isOpen ? undefined : 'pointer-events-none'}
          id={id}
          inert={!isOpen ? true : undefined}
        >
          <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-4 p-0 sm:gap-x-4 sm:gap-y-5 md:gap-x-5 md:gap-y-6">
            {PUBLIC_CONTACT_CHANNELS.map((channel, index) => {
              const label = channelLabel(copy, channel.id)
              const rowIndex = Math.floor(index / 2)
              const openMotion =
                'motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:delay-0'
              const itemMotion = isOpen
                ? `translate-y-0 opacity-100 ${openMotion}`
                : '-translate-y-3 opacity-0 motion-reduce:-translate-y-0'

              return (
                <li
                  key={channel.id}
                  className={[
                    'min-w-0 transition duration-500 ease-out motion-reduce:transition-none',
                    itemMotion,
                  ].join(' ')}
                  style={{
                    transitionDelay: isOpen ? `${String(rowIndex * 100)}ms` : '0ms',
                  }}
                >
                  <a
                    aria-label={`${label}, ${channel.displayValue}`}
                    className="group border-border bg-background/20 focus-visible:ring-accent flex h-full min-h-0 flex-row items-center gap-3 rounded-2xl border p-3 transition-colors hover:border-[rgb(49_46_129_/0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:gap-5 sm:p-4 md:p-5 dark:hover:border-[rgb(129_140_248_/0.55)]"
                    href={channel.href}
                    rel={channel.external ? 'noopener noreferrer' : undefined}
                    target={channel.external ? '_blank' : undefined}
                  >
                    <span
                      className={`${CHROME_LOGO_GRADIENT_ICON_TILE} flex size-14 shrink-0 items-center justify-center rounded-xl transition-[filter] group-hover:brightness-110 group-active:brightness-95 sm:size-16`}
                    >
                      <ContactChannelIcon channel={channel.id} variant="strip" />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col justify-center gap-0.5">
                      <span className="text-label text-muted">{label}</span>
                      <span className="text-body text-foreground truncate font-medium">
                        {channel.displayValue}
                      </span>
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </div>
  )
}
