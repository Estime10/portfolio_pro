'use client'

import { Button } from '@/components/button'
import { useLanguageSwitcher } from '@/components/toggles/language/hooks'
import { CHROME_TOGGLE_OUTLINE } from '@/lib/ui/brandChrome'

export function LanguageSwitcher() {
  const { inactiveLocales, locale, open, panelRef, rootRef, selectLocale, toggle, triggerLabel } =
    useLanguageSwitcher()

  return (
    <div ref={rootRef} className="relative flex items-center justify-end">
      {open ? (
        <div
          ref={panelRef}
          className="pointer-events-auto absolute right-full top-1/2 mr-2 flex -translate-y-1/2 flex-row items-center gap-2"
        >
          {inactiveLocales.map((code) => (
            <Button
              key={code}
              type="button"
              variant="outline"
              size="sm"
              data-locale-option
              className={`${CHROME_TOGGLE_OUTLINE} min-w-10 px-2 font-mono text-[0.65rem] font-semibold tracking-[0.16em]`}
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
      <Button
        type="button"
        variant="outline"
        size="sm"
        className={CHROME_TOGGLE_OUTLINE}
        aria-label={triggerLabel}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={toggle}
      >
        <span className="font-mono text-[0.65rem] font-semibold tracking-[0.16em]">
          {locale.toUpperCase()}
        </span>
      </Button>
    </div>
  )
}
