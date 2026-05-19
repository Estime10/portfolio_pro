import { describe, expect, it } from "vitest";
import { createWizardContactFieldViewModels } from "@/__tests__/fixtures/contact/createWizardContactFieldViewModels";
import { computeNextContactRevealStepIndex } from "@/features/contact/lib/compute-next-contact-reveal-step-index/computeNextContactRevealStepIndex";

describe("computeNextContactRevealStepIndex", () => {
  const activeFields = createWizardContactFieldViewModels();

  it("does not advance for non-progression fields", () => {
    expect(computeNextContactRevealStepIndex(1, "message", "Hello", activeFields)).toBe(1);
  });

  it("advances after a satisfied name field", () => {
    expect(computeNextContactRevealStepIndex(0, "name", "Estime", activeFields)).toBe(1);
  });

  it("advances after a satisfied email field", () => {
    expect(
      computeNextContactRevealStepIndex(1, "email", "estimevangu.pro@gmail.com", activeFields),
    ).toBe(2);
  });

  it("does not advance when email is invalid", () => {
    expect(computeNextContactRevealStepIndex(1, "email", "not-valid", activeFields)).toBe(1);
  });
});
