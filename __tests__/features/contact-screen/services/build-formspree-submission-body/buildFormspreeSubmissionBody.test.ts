import { describe, expect, it, vi } from "vitest";
import { buildFormspreeSubmissionBody } from "@/features/contact-screen/services/build-formspree-submission-body/buildFormspreeSubmissionBody";
import type { ContactFormSubmissionPayload } from "@/features/contact-screen/types/contactFormSubmissionPayload";

vi.mock(
  "@/features/contact-screen/services/format-contact-form-email-time/formatContactFormEmailTime",
  () => ({
    formatContactFormEmailTime: () => "30 juin 2026, 10:00",
  }),
);

const basePayload: ContactFormSubmissionPayload = {
  intentId: "marketing-site",
  intentLabel: "Site vitrine",
  values: {
    name: "  Estime Vangu  ",
    email: "  estimevangu.pro@gmail.com  ",
    company: "  Acme  ",
    message: "  Bonjour, je souhaite en discuter.  ",
  },
};

describe("buildFormspreeSubmissionBody", () => {
  it("maps trimmed values and metadata for Formspree", () => {
    expect(buildFormspreeSubmissionBody(basePayload)).toEqual({
      _subject: "Nouvelle demande — Site vitrine · Estime Vangu",
      name: "Estime Vangu",
      email: "estimevangu.pro@gmail.com",
      company: "Acme",
      message: "Bonjour, je souhaite en discuter.",
      intent_id: "marketing-site",
      intent_label: "Site vitrine",
      time: "30 juin 2026, 10:00",
    });
  });

  it("uses a placeholder when company is empty", () => {
    expect(
      buildFormspreeSubmissionBody({
        ...basePayload,
        values: {
          ...basePayload.values,
          company: "   ",
        },
      }).company,
    ).toBe("—");
  });
});
