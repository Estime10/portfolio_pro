export type PageIntroProps = Readonly<{
  description: string;
  title: string;
}>;

export function PageIntro({ description, title }: PageIntroProps) {
  return (
    <div className="ui-container ui-section">
      <h1 className="text-h1 text-foreground">{title}</h1>
      <p className="text-body text-muted mt-4 max-w-prose">{description}</p>
    </div>
  );
}
