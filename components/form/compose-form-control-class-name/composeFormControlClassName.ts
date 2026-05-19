import { CHROME_OUTLINE_BORDER } from "@/lib/ui/brandChrome";

const FORM_CONTROL_BASE =
  "ui-form-control text-foreground bg-surface w-full min-h-[var(--touch-min)] rounded-xl px-4 py-3 transition-[border-color,box-shadow] outline-none";

const FORM_CONTROL_FOCUS =
  "focus-visible:border-[color:var(--accent)] focus-visible:ring-2 focus-visible:ring-[color:var(--accent-muted)]";

const FORM_CONTROL_INVALID =
  "border-[color:rgb(220_38_38_/0.55)] aria-invalid:border-[color:rgb(220_38_38_/0.55)]";

const FORM_CONTROL_DEFAULT = CHROME_OUTLINE_BORDER;

export function composeFormControlClassName({
  className,
  invalid = false,
}: Readonly<{
  className?: string;
  invalid?: boolean;
}>): string {
  const stateClass = invalid ? FORM_CONTROL_INVALID : FORM_CONTROL_DEFAULT;

  return [FORM_CONTROL_BASE, stateClass, FORM_CONTROL_FOCUS, className]
    .filter(Boolean)
    .join(" ");
}
