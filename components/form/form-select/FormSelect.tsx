"use client";

import { composeFormControlClassName } from "@/components/form/compose-form-control-class-name/composeFormControlClassName";
import { scrollFieldIntoViewOnFocus } from "@/components/form/scroll-field-into-view-on-focus/scrollFieldIntoViewOnFocus";
import type { ComponentProps } from "react";

export type FormSelectOption = Readonly<{
  label: string;
  value: string;
}>;

export type FormSelectProps = Omit<ComponentProps<"select">, "className" | "children"> &
  Readonly<{
    className?: string;
    invalid?: boolean;
    options: readonly FormSelectOption[];
    placeholder?: string;
  }>;

export function FormSelect({
  className,
  invalid = false,
  id,
  onFocus,
  options,
  placeholder,
  ...rest
}: FormSelectProps) {
  return (
    <select
      {...rest}
      id={id}
      aria-invalid={invalid || undefined}
      className={composeFormControlClassName({
        className: `ui-form-select ${className ?? ""}`,
        invalid,
      })}
      onFocus={(event) => {
        scrollFieldIntoViewOnFocus(event.currentTarget);
        onFocus?.(event);
      }}
    >
      {placeholder ? (
        <option disabled value="">
          {placeholder}
        </option>
      ) : null}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
