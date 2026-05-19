'use client'

import { Button } from '@/components/button'
import { useLanguageSwitcher } from '@/components/toggles/language/hooks'
import { CHROME_TOGGLE_OUTLINE } from '@/lib/ui/brandChrome'
import { CHROME_HEADER_TOGGLE_CHROME_CLASSES } from '@/lib/ui/chromeHeaderToggleButton'

export function LanguageSwitcher() {
  const {
    inactiveLocales,
    isExpanded,
    locale,
    panelMounted,
    panelRef,
    rootRef,
    selectLocale,
    toggle,
    triggerLabel,
  } = useLanguageSwitcher()

  return (
    <div ref={rootRef} className="relative flex items-center justify-end">
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={CHROME_HEADER_TOGGLE_CHROME_CLASSES}
        aria-label={triggerLabel}
        aria-expanded={isExpanded}
        aria-haspopup="true"
        onClick={toggle}
      >
        <span className="font-mono text-[0.65rem] font-semibold tracking-[0.16em]">
          {locale.toUpperCase()}
        </span>
      </Button>
      {panelMounted ? (
        <div
          ref={panelRef}
          className="pointer-events-none absolute right-full top-1/2 mr-2 flex -translate-y-1/2 flex-row items-center gap-2"
        >
          {inactiveLocales.map((code) => (
            <Button
              key={code}
              type="button"
              variant="outline"
              size="sm"
              data-locale-option
              className={`${CHROME_TOGGLE_OUTLINE} pointer-events-auto min-w-10 px-2 font-mono text-[0.65rem] font-semibold tracking-[0.16em]`}
              aria-label={code === 'fr' ? 'Français' : 'English'}
              onClick={() => {
                selectLocale(code)
              }}
            >
              {code.toUpperCase()}
            </Button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
