"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { Button, composeButtonClassName } from "@/components/button";
import {
  CHROME_LOGO_GRADIENT_FILL,
  CHROME_TOGGLE_OUTLINE,
} from "@/lib/ui/brandChrome";

/** Desktop : bloc étroit + typo compacte ; padding vertical pour libellés sur 2 lignes (FR). */
const HOME_HERO_CTA_DESKTOP_COMPACT =
  "sm:px-3 sm:py-2 sm:text-sm sm:leading-snug sm:gap-1.5";

/** Permet au texte de revenir à la ligne dans les cellules de grille sans déborder. */
const HOME_HERO_CTA_TEXT_WRAP =
  "min-w-0 text-center whitespace-normal text-balance";

export type HomeHeroCtasProps = Readonly<{
  modalCloseLabel: string;
  projectModalPlaceholder: string;
  startProjectLabel: string;
  viewWorkLabel: string;
  workHref: string;
}>;

export function HomeHeroCtas({
  modalCloseLabel,
  projectModalPlaceholder,
  startProjectLabel,
  viewWorkLabel,
  workHref,
}: HomeHeroCtasProps): ReactNode {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <div className="mt-10 flex w-full flex-row flex-wrap gap-2 sm:grid sm:max-w-[21rem] sm:grid-cols-2 sm:items-stretch sm:gap-2">
        <Button
          type="button"
          variant="ghost"
          size="md"
          className={`max-sm:flex-[1_1_0%] max-sm:min-w-0 sm:w-full ${HOME_HERO_CTA_TEXT_WRAP} ${HOME_HERO_CTA_DESKTOP_COMPACT} ${CHROME_LOGO_GRADIENT_FILL} border-0 !shadow-none hover:!bg-transparent dark:hover:!bg-transparent`}
          onClick={() => {
            dialogRef.current?.showModal();
          }}
        >
          {startProjectLabel}
        </Button>
        <Link
          href={workHref}
          className={composeButtonClassName({
            variant: "outline",
            size: "md",
            className: `${CHROME_TOGGLE_OUTLINE} ${HOME_HERO_CTA_TEXT_WRAP} ${HOME_HERO_CTA_DESKTOP_COMPACT} max-sm:flex-[1_1_0%] max-sm:min-w-0 sm:w-full`,
          })}
        >
          {viewWorkLabel}
        </Link>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="home-project-dialog-title"
        className="border-border bg-surface text-foreground fixed top-1/2 left-1/2 z-[100] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border p-6 shadow-lg backdrop:bg-foreground/20 backdrop:backdrop-blur-sm"
      >
        <h2 id="home-project-dialog-title" className="text-h3 text-foreground mb-3">
          {startProjectLabel}
        </h2>
        <p className="text-body text-muted mb-6">{projectModalPlaceholder}</p>
        <form method="dialog" className="flex justify-end">
          <Button
            type="submit"
            variant="outline"
            size="sm"
            className={CHROME_TOGGLE_OUTLINE}
          >
            {modalCloseLabel}
          </Button>
        </form>
      </dialog>
    </>
  );
}
