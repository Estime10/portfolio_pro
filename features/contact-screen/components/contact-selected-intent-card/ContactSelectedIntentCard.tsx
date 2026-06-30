import { CtaOutlineButton } from "@/components/button";
import { CONTACT_INTENT_SELECTED_SURFACE } from "@/features/contact-screen/lib/contact-intent-surface-classes/contactIntentSurfaceClasses";
import type { ContactIntentOptionViewModel } from "@/features/contact-screen/types/contactFormViewModel";

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
      <div
        className={[
          "rounded-xl border border-solid p-4 max-sm:p-3",
          CONTACT_INTENT_SELECTED_SURFACE,
        ].join(" ")}
      >
        <p className="text-body text-foreground font-medium text-balance max-sm:text-small max-sm:leading-snug">
          {intent.label}
        </p>
        <p className="text-small text-muted mt-2 leading-snug text-pretty max-sm:mt-1.5 max-sm:text-xs">
          {intent.description}
        </p>
      </div>
    </div>
  );
}
