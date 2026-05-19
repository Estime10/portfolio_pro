import { HomeHeroCtas } from '@/features/homescreen/home-hero/cta/HomeHeroCtas'
import { HeroLowerFade } from '@/features/homescreen/home-hero/components/HeroLowerFade'
import type { ContactStripLabels } from '@/features/homescreen/home-hero/types/contactStripLabels'

export type HomeHeroProps = Readonly<{
  contactStrip: ContactStripLabels
  ctaStartProject: string
  ctaViewProjects: string
  intro: string
  name: string
  projectHref: string
  role: string
}>

export function HomeHero({
  contactStrip,
  ctaStartProject,
  ctaViewProjects,
  intro,
  name,
  projectHref,
  role,
}: HomeHeroProps) {
  return (
    <section
      className="flex flex-1 flex-col min-h-[calc(100dvh-var(--nav-height))]"
      aria-labelledby="home-hero-name"
    >
      <div className="ui-hero-upper ui-container ui-container-sm ui-section shrink-0 pb-0! md:pb-0 md:pt-(--space-12)! lg:pt-(--space-16)!">
        <div className="max-w-3xl">
          <h1 id="home-hero-name" className="text-display text-foreground">
            {name}
          </h1>
          <h2 className="text-h2 text-muted mt-4">{role}</h2>
          <h3 className="text-body-lg text-muted mt-6 max-w-prose whitespace-pre-line font-normal md:mt-4">
            {intro}
          </h3>
          <HomeHeroCtas
            contactStrip={contactStrip}
            startProjectLabel={ctaStartProject}
            viewProjectsLabel={ctaViewProjects}
            projectHref={projectHref}
          />
        </div>
      </div>

      <HeroLowerFade portraitSrc="/image/myself.webp" />
    </section>
  )
}
