'use client'

import Link from 'next/link'
import { Button, composeButtonClassName } from '@/components/button'
import { CHROME_LOGO_GRADIENT_FILL, CHROME_TOGGLE_OUTLINE } from '@/lib/ui/brandChrome'

/** Desktop : bloc étroit + typo compacte ; padding vertical pour libellés sur 2 lignes (FR). */
const HOME_HERO_CTA_DESKTOP_COMPACT = 'sm:px-3 sm:py-2 sm:text-sm sm:leading-snug sm:gap-1.5'

/** Permet au texte de revenir à la ligne dans les cellules de grille sans déborder. */
const HOME_HERO_CTA_TEXT_WRAP = 'min-w-0 text-center whitespace-normal text-balance'

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
        className={`max-sm:flex-[1_1_0%] max-sm:min-w-0 sm:w-full ${HOME_HERO_CTA_TEXT_WRAP} ${HOME_HERO_CTA_DESKTOP_COMPACT} ${CHROME_LOGO_GRADIENT_FILL} border-0 shadow-none hover:bg-transparent dark:hover:bg-transparent`}
        size="md"
        type="button"
        variant="ghost"
        onClick={onStartProjectClick}
      >
        {startProjectLabel}
      </Button>
      <Link
        className={composeButtonClassName({
          variant: 'outline',
          size: 'md',
          className: `${CHROME_TOGGLE_OUTLINE} ${HOME_HERO_CTA_TEXT_WRAP} ${HOME_HERO_CTA_DESKTOP_COMPACT} max-sm:flex-[1_1_0%] max-sm:min-w-0 sm:w-full`,
        })}
        href={projectHref}
      >
        {viewProjectsLabel}
      </Link>
    </div>
  )
}
