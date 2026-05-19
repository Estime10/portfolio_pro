export type ProfileClosingProps = Readonly<{
  label: string;
  paragraphs: readonly string[];
}>;

export function ProfileClosing({ label, paragraphs }: ProfileClosingProps) {
  return (
    <aside
      aria-labelledby="profile-closing-heading"
      className="ui-card-surface border-stroke-strong/60 bg-layer-surface-subtle max-w-3xl"
    >
      <p id="profile-closing-heading" className="text-label text-tertiary">
        {label}
      </p>
      <div className="mt-4 flex flex-col gap-4 md:mt-5 md:gap-5">
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-body-lg text-foreground">
            {paragraph}
          </p>
        ))}
      </div>
    </aside>
  );
}
