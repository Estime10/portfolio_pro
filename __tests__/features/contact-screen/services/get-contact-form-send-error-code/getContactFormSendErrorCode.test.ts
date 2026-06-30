import { describe, expect, it } from "vitest";
import { ContactFormSendError } from "@/features/contact-screen/errors/contactFormSendError";
import { getContactFormSendErrorCode } from "@/features/contact-screen/services/get-contact-form-send-error-code/getContactFormSendErrorCode";

describe("getContactFormSendErrorCode", () => {
  it("maps FORM_NOT_CONFIGURED to submitNotConfigured", () => {
    expect(getContactFormSendErrorCode(new ContactFormSendError("FORM_NOT_CONFIGURED"))).toBe(
      "submitNotConfigured",
    );
  });

  it("maps other failures to submitFailed", () => {
    expect(getContactFormSendErrorCode(new ContactFormSendError("FORM_SEND_FAILED"))).toBe(
      "submitFailed",
    );
    expect(getContactFormSendErrorCode(new Error("boom"))).toBe("submitFailed");
  });
});
