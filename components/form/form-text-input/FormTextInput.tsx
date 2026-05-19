"use client";

import { composeFormControlClassName } from "@/components/form/compose-form-control-class-name/composeFormControlClassName";
import { scrollFieldIntoViewOnFocus } from "@/components/form/scroll-field-into-view-on-focus/scrollFieldIntoViewOnFocus";
import type { ComponentProps } from "react";

export type FormTextInputProps = Omit<ComponentProps<"input">, "className"> &
  Readonly<{
    className?: string;
    invalid?: boolean;
  }>;

export function FormTextInput({
  className,
  invalid = false,
  id,
  onFocus,
  ...rest
}: FormTextInputProps) {
  return (
    <input
      {...rest}
      id={id}
      aria-invalid={invalid || undefined}
      className={composeFormControlClassName({ className, invalid })}
      onFocus={(event) => {
        scrollFieldIntoViewOnFocus(event.currentTarget);
        onFocus?.(event);
      }}
    />
  );
}
