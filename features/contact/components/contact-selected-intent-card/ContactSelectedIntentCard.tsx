import { CtaOutlineButton } from "@/components/button";
import { CONTACT_INTENT_SELECTED_SURFACE } from "@/features/contact/lib/contact-intent-surface-classes/contactIntentSurfaceClasses";
import type { ContactIntentOptionViewModel } from "@/features/contact/types/contactFormViewModel";

export type ContactSelectedIntentCardProps = Readonly<{
  cancelLabel: string;
  intent: ContactIntentOptionViewModel;
  onCancel: () => void;
}>;

export function ContactSelectedIntentCard({
  cancelLabel,
  intent,
  onCancel,
}: ContactSelectedIntentCardProps) {
  return (
    <div className="border-stroke-default flex flex-col gap-4 border-b pb-6">
      <div className="flex justify-end">
        <CtaOutlineButton onClick={onCancel} size="sm" type="button">
          {cancelLabel}
        </CtaOutlineButton>
      </div>
      <div className={["rounded-xl border border-solid p-3 sm:p-4", CONTACT_INTENT_SELECTED_SURFACE].join(" ")}>
        <p className="text-small text-foreground font-medium leading-snug text-balance sm:text-body">{intent.label}</p>
        <p className="text-xs text-muted mt-1.5 leading-snug text-pretty sm:mt-2 sm:text-small">{intent.description}</p>
      </div>
    </div>
  );
}
