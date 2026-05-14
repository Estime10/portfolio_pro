import type { ReactNode } from "react";
import { HomeHeroCtas } from "@/features/homescreen/home-hero/HomeHeroCtas";

export type HomeHeroCopy = Readonly<{
  ctaStartProject: string;
  ctaViewWork: string;
  intro: string;
  modalClose: string;
  modalPlaceholder: string;
  name: string;
  role: string;
  workHref: string;
}>;

export function HomeHero({
  ctaStartProject,
  ctaViewWork,
  intro,
  modalClose,
  modalPlaceholder,
  name,
  role,
  workHref,
}: HomeHeroCopy): ReactNode {
  return (
    <section
      className="ui-container ui-section"
      aria-labelledby="home-hero-name"
    >
      <div className="max-w-3xl">
        <h1 id="home-hero-name" className="text-display text-foreground">
          {name}
        </h1>
        <h2 className="text-h2 text-muted mt-4">{role}</h2>
        <h3 className="text-body-lg text-muted mt-6 max-w-prose whitespace-pre-line font-normal">
          {intro}
        </h3>
        <HomeHeroCtas
          modalCloseLabel={modalClose}
          projectModalPlaceholder={modalPlaceholder}
          startProjectLabel={ctaStartProject}
          viewWorkLabel={ctaViewWork}
          workHref={workHref}
        />
      </div>
    </section>
  );
}
