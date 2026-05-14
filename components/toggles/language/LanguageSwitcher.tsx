"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/button";
import { useLocalePickerPanelAnimation } from "@/lib/animation/language-switcher/use-locale-picker-panel-animation/useLocalePickerPanelAnimation";
import { LOCALES, isAppLocale, type AppLocale } from "@/lib/i18n/config";
import { setLocaleAction } from "@/lib/i18n/set-locale-action";

const OUTLINE =
  "text-label !rounded-xl border-solid border-[color:rgb(49_46_129_/0.38)] dark:border-[color:rgb(129_140_248_/0.45)]";

export function LanguageSwitcher() {
  const rawLocale = useLocale();
  const locale: AppLocale = isAppLocale(rawLocale) ? rawLocale : "fr";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [panelArmed, setPanelArmed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const handleCloseComplete = useCallback(() => {
    setPanelArmed(false);
  }, []);

  useLocalePickerPanelAnimation(open, panelRef, {
    onCloseComplete: handleCloseComplete,
  });

  const openMenu = useCallback(() => {
    setPanelArmed(true);
    setOpen(true);
  }, []);

  const requestClose = useCallback(() => {
    setOpen(false);
  }, []);

  const forceClose = useCallback(() => {
    setOpen(false);
    setPanelArmed(false);
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "Escape") {
        requestClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open, requestClose]);

  useEffect(() => {
    if (!open) {
      return;
    }
    const onPointer = (e: PointerEvent): void => {
      if (rootRef.current?.contains(e.target as Node)) {
        return;
      }
      requestClose();
    };
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, requestClose]);

  const select = useCallback(
    (next: AppLocale): void => {
      if (next === locale) {
        requestClose();
        return;
      }
      void (async (): Promise<void> => {
        forceClose();
        await setLocaleAction(next);
        router.refresh();
      })();
    },
    [forceClose, locale, requestClose, router],
  );

  const toggle = useCallback((): void => {
    if (open) {
      requestClose();
    } else {
      openMenu();
    }
  }, [open, openMenu, requestClose]);

  const triggerLabel =
    locale === "fr" ? "Choisir la langue (actuellement français)" : "Choose language (currently English)";

  const inactiveLocales = LOCALES.filter((code) => code !== locale);

  return (
    <div ref={rootRef} className="relative flex items-center justify-end">
      <div
        ref={panelRef}
        className={
          open && panelArmed
            ? "pointer-events-auto absolute right-full top-1/2 mr-2 flex -translate-y-1/2 flex-row items-center gap-2"
            : "pointer-events-none absolute right-full top-1/2 mr-2 flex -translate-y-1/2 flex-row items-center gap-2"
        }
        aria-hidden={!open && !panelArmed}
      >
        {inactiveLocales.map((code) => (
          <Button
            key={code}
            type="button"
            variant="outline"
            size="sm"
            data-locale-option
            className={`${OUTLINE} min-w-10 px-2 font-mono text-[0.65rem] font-semibold tracking-[0.16em]`}
            aria-label={code === "fr" ? "Français" : "English"}
            onClick={() => {
              select(code);
            }}
          >
            {code.toUpperCase()}
          </Button>
        ))}
      </div>
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
  );
}
