export type ContactPageHeaderProps = Readonly<{
  introParagraphs: readonly string[];
  title: string;
}>;

export function ContactPageHeader({ introParagraphs, title }: ContactPageHeaderProps) {
  return (
    <header className="max-w-3xl">
      <h1 className="text-h1 text-foreground">{title}</h1>
      <div className="mt-4 flex max-w-prose flex-col gap-4 md:mt-5 lg:mt-4" role="doc-introduction">
        {introParagraphs.map((paragraph) => (
          <p key={paragraph} className="text-body-lg text-muted">
            {paragraph}
          </p>
        ))}
      </div>
    </header>
  );
}
