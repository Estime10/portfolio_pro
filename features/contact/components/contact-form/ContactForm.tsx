"use client";

import { CtaOutlineButton } from "@/components/button";
import { ContactFormDirectChannels } from "@/features/contact/components/contact-form-direct-channels/ContactFormDirectChannels";
import { ContactFormIntentSelection } from "@/features/contact/components/contact-form-intent-selection/ContactFormIntentSelection";
import { ContactFormWizard } from "@/features/contact/components/contact-form-wizard/ContactFormWizard";
import { useContactForm } from "@/features/contact/hooks/use-contact-form/useContactForm";
import { useContactFormIntentSelection } from "@/features/contact/hooks/use-contact-form-intent-selection/useContactFormIntentSelection";
import { useContactFormPhaseAnimation } from "@/features/contact/hooks/use-contact-form-phase-animation/useContactFormPhaseAnimation";
import { useVisualViewportKeyboardOffset } from "@/features/contact/hooks/use-visual-viewport-keyboard-offset/useVisualViewportKeyboardOffset";
import type { ContactFormViewModel } from "@/features/contact/types/contactFormViewModel";

export type ContactFormProps = Readonly<{
  form: ContactFormViewModel;
}>;

export function ContactForm({ form }: ContactFormProps) {
  useVisualViewportKeyboardOffset();

  const {
    activeFields,
    cancelDirectChannels,
    cancelWizard,
    errors,
    getErrorMessage,
    handleFieldBlur,
    handleFieldChange,
    isSubmitEnabled,
    openDirectChannels,
    phase,
    revealedStepIndex,
    selectedIntent,
    startWizard,
    status,
    submit,
    submitError,
    values,
  } = useContactForm(form);

  const { intentPanelRef, selectIntent } = useContactFormIntentSelection({
    onOpenDirectChannels: openDirectChannels,
    onStartWizard: startWizard,
  });

  const phasePanelRef = useContactFormPhaseAnimation(phase);

  if (phase === "success") {
    return (
      <div className="ui-card-surface contact-form-success flex flex-col gap-6" role="status">
        <div>
          <h2 className="text-h2 text-foreground">{form.labels.successTitle}</h2>
          <p className="text-body text-muted mt-4 max-w-prose">{form.labels.successBody}</p>
        </div>
        <CtaOutlineButton onClick={cancelWizard} type="button">
          {form.labels.back}
        </CtaOutlineButton>
      </div>
    );
  }

  return (
    <div className="contact-form ui-card-surface">
      <div ref={phasePanelRef} className="flex flex-col">
        {phase === "intent-selection" ? (
          <div ref={intentPanelRef}>
            <ContactFormIntentSelection
              hint={form.labels.intentHint}
              intents={form.intents}
              legend={form.labels.intentLegend}
              onSelectIntent={selectIntent}
            />
          </div>
        ) : null}

        {phase === "direct-channels" && selectedIntent ? (
          <ContactFormDirectChannels
            cancelLabel={form.labels.cancel}
            contactStrip={form.contactStrip}
            intent={selectedIntent}
            onBack={cancelDirectChannels}
          />
        ) : null}

        {phase === "wizard" && selectedIntent ? (
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
          >
            <ContactFormWizard
              activeFields={activeFields}
              cancelLabel={form.labels.cancel}
              errors={errors}
              getErrorMessage={getErrorMessage}
              handleFieldBlur={handleFieldBlur}
              handleFieldChange={handleFieldChange}
              isSubmitEnabled={isSubmitEnabled}
              labels={form.labels}
              onCancel={cancelWizard}
              revealedStepIndex={revealedStepIndex}
              selectedIntent={selectedIntent}
              status={status}
              submitErrorMessage={submitError ? getErrorMessage(submitError) : ""}
              values={values}
            />
          </form>
        ) : null}
      </div>
    </div>
  );
}
