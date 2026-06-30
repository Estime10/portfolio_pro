"use client";

import { IntentOptionCard } from "@/features/contact-screen/components/intent-option-card/IntentOptionCard";
import type { ContactIntentOptionViewModel } from "@/features/contact-screen/types/contactFormViewModel";
import type { ContactIntentId } from "@/features/contact-screen/types/contact-intent-id/contactIntentId";

export type ContactFormIntentSelectionProps = Readonly<{
  hint: string;
  intents: readonly ContactIntentOptionViewModel[];
  legend: string;
  onSelectIntent: (intentId: ContactIntentId) => void;
}>;

export function ContactFormIntentSelection({
  hint,
  intents,
  legend,
  onSelectIntent,
}: ContactFormIntentSelectionProps) {
  return (
    <fieldset className="flex flex-col gap-4 border-0 p-0">
      <legend className="text-h3 text-foreground">{legend}</legend>
      <p className="text-small text-muted mt-2">{hint}</p>

      <div className="ui-grid grid-cols-1 gap-3 sm:grid-cols-2">
        {intents.map((intent) => (
          <IntentOptionCard
            key={intent.id}
            description={intent.description}
            isSelected={false}
            label={intent.label}
            name="contact-intent"
            onSelect={() => {
              onSelectIntent(intent.id);
            }}
            value={intent.id}
          />
        ))}
      </div>
    </fieldset>
  );
}
