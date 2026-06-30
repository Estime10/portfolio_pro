import { describe, expect, it } from "vitest";
import { parseContactSubmissionRequest } from "@/lib/api/contact/parse-contact-submission-request/parseContactSubmissionRequest";

describe("parseContactSubmissionRequest", () => {
  it("accepts a valid contact submission payload", () => {
    const result = parseContactSubmissionRequest({
      _subject: "Nouvelle demande — Site vitrine · Estime",
      name: "Estime",
      email: "estime@example.com",
      company: "Acme",
      message: "Bonjour",
      intent_id: "marketing-site",
      intent_label: "Site vitrine",
      time: "30 juin 2026, 10:00",
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid payloads", () => {
    const result = parseContactSubmissionRequest({
      name: "",
      email: "invalid",
      message: "",
      intent_id: "unknown",
    });

    expect(result).toEqual({
      success: false,
      message: "Invalid contact submission payload",
    });
  });
});
