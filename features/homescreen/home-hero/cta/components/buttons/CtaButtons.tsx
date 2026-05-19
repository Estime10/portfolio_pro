'use client'

import { Button, CtaLink, composeCtaGradientClassName } from '@/components/button'
import { CTA_LINK_HERO_DESKTOP_COMPACT } from '@/components/button/cta/ctaLinkLayoutClasses'

export type CtaButtonsProps = Readonly<{
  contactExpanded: boolean
  contactStripId: string
  onStartProjectClick: () => void
  startProjectLabel: string
  viewProjectsLabel: string
  projectHref: string
}>

export function CtaButtons({
  contactExpanded,
  contactStripId,
  onStartProjectClick,
  startProjectLabel,
  viewProjectsLabel,
  projectHref,
}: CtaButtonsProps) {
  return (
    <div className="mt-10 flex w-full flex-row flex-wrap gap-2 sm:grid sm:max-w-84 sm:grid-cols-2 sm:items-stretch sm:gap-2 md:mt-6">
      <Button
        aria-controls={contactStripId}
        aria-expanded={contactExpanded}
        className={composeCtaGradientClassName(
          `max-sm:flex-[1_1_0%] max-sm:min-w-0 sm:w-full ${CTA_LINK_HERO_DESKTOP_COMPACT}`,
        )}
        size="md"
        type="button"
        variant="ghost"
        onClick={onStartProjectClick}
      >
        {startProjectLabel}
      </Button>
      <CtaLink
        className={`${CTA_LINK_HERO_DESKTOP_COMPACT} max-sm:flex-[1_1_0%] max-sm:min-w-0 sm:w-full`}
        href={projectHref}
      >
        {viewProjectsLabel}
      </CtaLink>
    </div>
  )
}
