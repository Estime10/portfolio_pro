export type ProfilePageHeaderProps = Readonly<{
  introParagraphs: readonly string[];
  title: string;
}>;

export function ProfilePageHeader({ introParagraphs, title }: ProfilePageHeaderProps) {
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
    </header>
  );
}
