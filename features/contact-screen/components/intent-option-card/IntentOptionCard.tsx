"use client";

import {
  CONTACT_INTENT_DEFAULT_SURFACE,
  CONTACT_INTENT_SELECTED_SURFACE,
} from "@/features/contact-screen/lib/contact-intent-surface-classes/contactIntentSurfaceClasses";

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
        "ui-touch-target flex cursor-pointer flex-col gap-2 rounded-xl border border-solid p-4 text-left transition-[border-color,box-shadow,background-color] max-sm:gap-1.5 max-sm:p-3",
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
      <span className="pointer-events-none text-body text-foreground font-medium text-balance max-sm:text-small max-sm:leading-snug">
        {label}
      </span>
      <span className="text-small text-muted pointer-events-none leading-snug text-pretty max-sm:text-xs">
        {description}
      </span>
    </label>
  );
}
