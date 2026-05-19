import type { ReactNode } from "react";

export type FormFieldProps = Readonly<{
  children: ReactNode;
  error?: string;
  fieldId: string;
  hint?: string;
  label: string;
  required?: boolean;
  requiredMark: string;
}>;

export function FormField({
  children,
  error,
  fieldId,
  hint,
  label,
  required = false,
  requiredMark,
}: FormFieldProps) {
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  return (
    <div className="form-field flex flex-col gap-2">
      <label htmlFor={fieldId} className="text-label text-secondary">
        {label}
        {required ? (
          <span className="text-accent ml-1" aria-hidden>
            {requiredMark}
          </span>
        ) : null}
      </label>
      {children}
      {hint ? (
        <p id={hintId} className="text-small text-tertiary">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-small text-[color:rgb(220_38_38)]" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
