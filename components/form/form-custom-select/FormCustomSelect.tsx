"use client";

import { composeFormControlClassName } from "@/components/form/compose-form-control-class-name/composeFormControlClassName";
import { scrollFieldIntoViewOnFocus } from "@/components/form/scroll-field-into-view-on-focus/scrollFieldIntoViewOnFocus";
import type { FormSelectOption } from "@/components/form/form-select/FormSelect";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

export type FormCustomSelectProps = Readonly<{
  "aria-describedby"?: string;
  className?: string;
  id?: string;
  invalid?: boolean;
  name?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: readonly FormSelectOption[];
  placeholder?: string;
  required?: boolean;
  value: string;
}>;

export function FormCustomSelect({
  "aria-describedby": ariaDescribedBy,
  className,
  id,
  invalid = false,
  name,
  onChange,
  onBlur,
  options,
  placeholder,
  required = false,
  value,
}: FormCustomSelectProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((option) => option.value === value);
  const displayLabel = selectedOption?.label ?? placeholder ?? "";

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isOpen, onBlur]);

  return (
    <div ref={rootRef} className="relative">
      <button
        aria-describedby={ariaDescribedBy}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={listboxId}
        className={composeFormControlClassName({
          className: `relative flex w-full items-center pr-11 text-left ${className ?? ""}`,
          invalid,
        })}
        id={id}
        onBlur={() => {
          if (!isOpen) {
            onBlur?.();
          }
        }}
        onClick={() => {
          setIsOpen((current) => !current);
        }}
        onFocus={(event) => {
          scrollFieldIntoViewOnFocus(event.currentTarget);
        }}
        type="button"
      >
        <span className={selectedOption ? "text-foreground min-w-0 truncate" : "text-tertiary min-w-0 truncate"}>
          {displayLabel}
        </span>
        <ChevronDown
          aria-hidden
          className={`text-tertiary pointer-events-none absolute top-1/2 right-4 size-4 shrink-0 -translate-y-1/2 transition-transform ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      {name ? <input name={name} required={required} type="hidden" value={value} readOnly /> : null}

      {isOpen ? (
        <ul
          className="border-stroke-default bg-surface absolute z-50 mt-2 max-h-56 w-full list-none overflow-y-auto rounded-xl border p-1 shadow-lg"
          id={listboxId}
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li key={option.value} role="presentation">
                <button
                  aria-selected={isSelected}
                  className={`text-body ui-touch-target hover:bg-[color:var(--layer-surface-subtle)] w-full rounded-lg px-3 py-2.5 text-left transition-colors ${isSelected ? "bg-[color:var(--accent-muted)] text-foreground font-medium" : "text-foreground"}`}
                  role="option"
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    onBlur?.();
                  }}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
