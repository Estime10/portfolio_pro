import { CHROME_GRADIENT_CHIP } from "@/lib/ui/brandChrome";

export type ProjectTagVariant = "stack" | "focus";

export type ProjectTagListProps = Readonly<{
  ariaLabel: string;
  className?: string;
  tags: readonly string[];
  variant: ProjectTagVariant;
}>;

const STACK_TAG_CLASS = "text-label text-secondary bg-bg-muted rounded-full px-3 py-1 leading-snug";

const FOCUS_TAG_CLASS = `${CHROME_GRADIENT_CHIP} !px-3 !py-1 text-xs leading-snug`;

export function ProjectTagList({
  ariaLabel,
  className = "mt-4",
  tags,
  variant,
}: ProjectTagListProps) {
  if (tags.length === 0) {
    return null;
  }

  const itemClassName = variant === "focus" ? FOCUS_TAG_CLASS : STACK_TAG_CLASS;

  return (
    <ul className={`${className} flex flex-wrap gap-2`} aria-label={ariaLabel}>
      {tags.map((tag) => (
        <li key={tag} className={itemClassName}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
