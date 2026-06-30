import type { ContactStripLabels } from "@/lib/contact-channels/types/contact-strip-labels/contactStripLabels";
import type { ContactFieldId } from "@/features/contact-screen/types/contact-field-id/contactFieldId";
import type { ContactIntentId } from "@/features/contact-screen/types/contact-intent-id/contactIntentId";
import type { ContactFormSubmissionConfig } from "@/lib/config/contact-form/contactFormApiPath";

export type ContactIntentOptionViewModel = Readonly<{
  description: string;
  id: ContactIntentId;
  label: string;
}>;

export type ContactFieldViewModel = Readonly<{
  autocomplete?: string;
  controlType: "text" | "email" | "textarea";
  enterKeyHint?: "done" | "enter" | "go" | "next" | "previous" | "search" | "send";
  hint?: string;
  id: ContactFieldId;
  inputMode?: "text" | "email" | "numeric";
  label: string;
  placeholder?: string;
  required: boolean;
  rows?: number;
}>;

export type ContactFormLabelsViewModel = Readonly<{
  intentLegend: string;
  intentHint: string;
  back: string;
  cancel: string;
  requiredMark: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errors: Readonly<{
    intentRequired: string;
    fieldRequired: string;
    emailInvalid: string;
    submitFailed: string;
    submitNotConfigured: string;
  }>;
}>;

export type ContactFormViewModel = Readonly<{
  contactStrip: ContactStripLabels;
  submission: ContactFormSubmissionConfig | null;
  fieldsByIntent: Readonly<Record<ContactIntentId, readonly ContactFieldViewModel[]>>;
  intents: readonly ContactIntentOptionViewModel[];
  labels: ContactFormLabelsViewModel;
}>;

export type ContactPageContentViewModel = Readonly<{
  form: ContactFormViewModel;
  introParagraphs: readonly string[];
  title: string;
}>;
