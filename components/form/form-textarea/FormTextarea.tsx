"use client";

import { composeFormControlClassName } from "@/components/form/compose-form-control-class-name/composeFormControlClassName";
import { scrollFieldIntoViewOnFocus } from "@/components/form/scroll-field-into-view-on-focus/scrollFieldIntoViewOnFocus";
import type { ComponentProps } from "react";

export type FormTextareaProps = Omit<ComponentProps<"textarea">, "className"> &
  Readonly<{
    className?: string;
    invalid?: boolean;
  }>;

export function FormTextarea({
  className,
  invalid = false,
  id,
  onFocus,
  rows = 5,
  ...rest
}: FormTextareaProps) {
  return (
    <textarea
      {...rest}
      id={id}
      rows={rows}
      aria-invalid={invalid || undefined}
      className={composeFormControlClassName({
        className: `min-h-[8.5rem] resize-y ${className ?? ""}`,
        invalid,
      })}
      onFocus={(event) => {
        scrollFieldIntoViewOnFocus(event.currentTarget);
        onFocus?.(event);
      }}
    />
  );
}
