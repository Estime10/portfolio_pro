import { describe, expect, it } from "vitest";
import { ContactFormSendError } from "@/features/contact-screen/errors/contactFormSendError";
import { parseFormspreeResponseError } from "@/features/contact-screen/services/parse-formspree-response-error/parseFormspreeResponseError";

describe("parseFormspreeResponseError", () => {
  it("returns the message from a native Error", () => {
    expect(parseFormspreeResponseError(new Error("Network down"))).toBe("Network down");
  });

  it("returns the message from a Formspree-shaped object", () => {
    expect(
      parseFormspreeResponseError({
        status: 422,
        message: "Validation failed",
      }),
    ).toBe("Validation failed");
  });

  it("returns legacy text when message is absent", () => {
    expect(
      parseFormspreeResponseError({
        status: 500,
        text: "Server error",
      }),
    ).toBe("Server error");
  });

  it("falls back to a generic message", () => {
    expect(parseFormspreeResponseError(new ContactFormSendError("FORM_SEND_FAILED"))).toBe(
      "FORM_SEND_FAILED",
    );
    expect(
      parseFormspreeResponseError({
        status: 400,
        message: "",
      }),
    ).toBe("Form submission failed");
  });
});
