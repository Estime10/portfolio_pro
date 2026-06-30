import { afterEach, describe, expect, it, vi } from "vitest";
import { getContactFormSubmissionConfig } from "@/lib/config/contact-form/getContactFormSubmissionConfig";
import { CONTACT_FORM_API_PATH } from "@/lib/config/contact-form/contactFormApiPath";

describe("getContactFormSubmissionConfig", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns null when the server form id is missing", () => {
    vi.stubEnv("FORMSPREE_FORM_ID", "");

    expect(getContactFormSubmissionConfig()).toBeNull();
  });

  it("exposes the internal contact API route when Formspree is configured", () => {
    vi.stubEnv("FORMSPREE_FORM_ID", "xjgqewyk");

    expect(getContactFormSubmissionConfig()).toEqual({
      endpoint: CONTACT_FORM_API_PATH,
    });
  });
});
