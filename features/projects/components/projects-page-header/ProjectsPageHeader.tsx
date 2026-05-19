export type ProjectsPageHeaderProps = Readonly<{
  introParagraphs: readonly string[];
  selectionNote: string;
  title: string;
}>;

export function ProjectsPageHeader({
  introParagraphs,
  selectionNote,
  title,
}: ProjectsPageHeaderProps) {
  return (
    <header className="max-w-3xl">
      <h1 className="text-h1 text-foreground">{title}</h1>
      <div className="mt-6 flex max-w-prose flex-col gap-5 md:mt-8 md:gap-6" role="doc-introduction">
        {introParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-body-lg text-muted">
            {paragraph}
          </p>
        ))}
      </div>
      <p className="text-small text-tertiary mt-8 max-w-prose border-stroke-default border-t pt-6 md:mt-10">
        {selectionNote}
      </p>
    </header>
  );
}
