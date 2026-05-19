"use client";

import {
  CONTACT_INTENT_DEFAULT_SURFACE,
  CONTACT_INTENT_SELECTED_SURFACE,
} from "@/features/contact/lib/contact-intent-surface-classes/contactIntentSurfaceClasses";

export type IntentOptionCardProps = Readonly<{
  description: string;
  isSelected: boolean;
  label: string;
  name: string;
  onSelect: () => void;
  value: string;
}>;

export function IntentOptionCard({
  description,
  isSelected,
  label,
  name,
  onSelect,
  value,
}: IntentOptionCardProps) {
  return (
    <label
      className={[
        "ui-touch-target flex cursor-pointer flex-col gap-1.5 rounded-xl border border-solid p-3 text-left transition-[border-color,box-shadow,background-color] sm:gap-2 sm:p-4",
        isSelected ? CONTACT_INTENT_SELECTED_SURFACE : CONTACT_INTENT_DEFAULT_SURFACE,
      ].join(" ")}
    >
      <input
        checked={isSelected}
        className="sr-only"
        name={name}
        onChange={onSelect}
        type="radio"
        value={value}
      />
      <span className="text-small text-foreground font-medium leading-snug text-balance sm:text-body">
        {label}
      </span>
      <span className="text-xs text-muted leading-snug text-pretty sm:text-small">{description}</span>
    </label>
  );
}
