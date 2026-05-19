export type ProjectStackTagsProps = Readonly<{
  stack: readonly string[];
}>;

export function ProjectStackTags({ stack }: ProjectStackTagsProps) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack technique">
      {stack.map((item) => (
        <li
          key={item}
          className="text-label text-secondary bg-bg-muted rounded-full px-3 py-1"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
