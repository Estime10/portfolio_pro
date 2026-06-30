import { describe, expect, it } from "vitest";
import {
  createWizardContactFieldViewModels,
  validWizardFormValues,
} from "@/__tests__/fixtures/contact/createWizardContactFieldViewModels";
import { isContactFormSubmitEnabled } from "@/features/contact-screen/lib/is-contact-form-submit-enabled/isContactFormSubmitEnabled";

describe("isContactFormSubmitEnabled", () => {
  const activeFields = createWizardContactFieldViewModels();

  it("is false outside wizard phase", () => {
    expect(
      isContactFormSubmitEnabled({
        activeFields,
        intentId: "marketing-site",
        phase: "intent-selection",
        revealedStepIndex: 2,
        values: { ...validWizardFormValues },
      }),
    ).toBe(false);
  });

  it("is false when not all reveal steps are shown", () => {
    expect(
      isContactFormSubmitEnabled({
        activeFields,
        intentId: "marketing-site",
        phase: "wizard",
        revealedStepIndex: 0,
        values: { ...validWizardFormValues },
      }),
    ).toBe(false);
  });

  it("is true when wizard is complete and valid", () => {
    expect(
      isContactFormSubmitEnabled({
        activeFields,
        intentId: "marketing-site",
        phase: "wizard",
        revealedStepIndex: 2,
        values: { ...validWizardFormValues },
      }),
    ).toBe(true);
  });
});
