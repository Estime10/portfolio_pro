'use client'

import { Button } from '@/components/button'
import { useLanguageSwitcher } from '@/components/toggles/language/hooks'

const OUTLINE =
  'text-label !rounded-xl border-solid border-[color:rgb(49_46_129_/0.38)] dark:border-[color:rgb(129_140_248_/0.45)]'

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
              className={`${OUTLINE} min-w-10 px-2 font-mono text-[0.65rem] font-semibold tracking-[0.16em]`}
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
        className={OUTLINE}
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
