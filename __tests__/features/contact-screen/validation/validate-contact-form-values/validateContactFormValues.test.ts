import { describe, expect, it } from "vitest";
import {
  createWizardContactFieldViewModels,
  validWizardFormValues,
} from "@/__tests__/fixtures/contact/createWizardContactFieldViewModels";
import { validateContactFormValues } from "@/features/contact-screen/validation/validate-contact-form-values/validateContactFormValues";

describe("validateContactFormValues", () => {
  const fields = createWizardContactFieldViewModels();

  it("requires an intent", () => {
    expect(validateContactFormValues(null, fields, validWizardFormValues)).toEqual({
      intent: "intentRequired",
    });
  });

  it("returns no errors for valid wizard values", () => {
    expect(
      validateContactFormValues("marketing-site", fields, validWizardFormValues),
    ).toEqual({});
  });

  it("flags required fields when empty", () => {
    expect(
      validateContactFormValues("marketing-site", fields, {
        name: "",
        email: "estimevangu.pro@gmail.com",
        company: "",
        message: "",
      }),
    ).toEqual({
      name: "fieldRequired",
      message: "fieldRequired",
    });
  });

  it("flags invalid email", () => {
    expect(
      validateContactFormValues("marketing-site", fields, {
        ...validWizardFormValues,
        email: "invalid-email",
      }),
    ).toEqual({
      email: "emailInvalid",
    });
  });
});
