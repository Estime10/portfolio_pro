export type ProfileClosingProps = Readonly<{
  label: string;
  paragraphs: readonly string[];
}>;

export function ProfileClosing({ label, paragraphs }: ProfileClosingProps) {
  return (
    <aside
      aria-labelledby="profile-closing-heading"
      className="border-stroke-default mt-14 pt-14 md:mt-20 md:pt-20"
    >
      <p id="profile-closing-heading" className="text-label text-tertiary">
        {label}
      </p>
      <div className="ui-card-surface border-stroke-strong/60 bg-layer-surface-subtle mt-5 max-w-prose p-6 md:mt-6 md:p-8">
        <div className="flex flex-col gap-5 md:gap-6">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-body-lg text-foreground">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </aside>
  );
}
