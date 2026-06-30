import { afterEach, describe, expect, it, vi } from "vitest";
import { ContactFormSendError } from "@/features/contact-screen/errors/contactFormSendError";
import { sendContactFormSubmission } from "@/features/contact-screen/services/send-contact-form-submission/sendContactFormSubmission";
import type { ContactFormSubmissionPayload } from "@/features/contact-screen/types/contactFormSubmissionPayload";

vi.mock(
  "@/features/contact-screen/services/format-contact-form-email-time/formatContactFormEmailTime",
  () => ({
    formatContactFormEmailTime: () => "30 juin 2026, 10:00",
  }),
);

const payload: ContactFormSubmissionPayload = {
  intentId: "marketing-site",
  intentLabel: "Site vitrine",
  values: {
    name: "Estime Vangu",
    email: "estimevangu.pro@gmail.com",
    company: "Acme",
    message: "Bonjour",
  },
};

const config = {
  endpoint: "https://formspree.io/f/xjgqewyk",
} as const;

describe("sendContactFormSubmission", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("posts JSON to the Formspree endpoint and resolves on success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await sendContactFormSubmission(payload, config);

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      config.endpoint,
      expect.objectContaining({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: "Nouvelle demande — Site vitrine · Estime Vangu",
          name: "Estime Vangu",
          email: "estimevangu.pro@gmail.com",
          company: "Acme",
          message: "Bonjour",
          intent_id: "marketing-site",
          intent_label: "Site vitrine",
          time: "30 juin 2026, 10:00",
        }),
      }),
    );
  });

  it("throws FORM_SEND_FAILED when Formspree returns an error payload", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ error: "Spam detected" }), {
          status: 422,
          statusText: "Unprocessable Entity",
        }),
      ),
    );

    let caughtError: ContactFormSendError | null = null;

    try {
      await sendContactFormSubmission(payload, config);
    } catch (error) {
      expect(error).toBeInstanceOf(ContactFormSendError);
      if (error instanceof ContactFormSendError) {
        caughtError = error;
      }
    }

    expect(caughtError).not.toBeNull();
    expect(caughtError?.code).toBe("FORM_SEND_FAILED");
    expect(caughtError?.cause).toBeInstanceOf(Error);
    if (caughtError?.cause instanceof Error) {
      expect(caughtError.cause.message).toBe("Spam detected");
    }
  });

  it("throws FORM_SEND_FAILED when fetch rejects", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    await expect(sendContactFormSubmission(payload, config)).rejects.toMatchObject({
      code: "FORM_SEND_FAILED",
    });
  });

  it("uses statusText when the error response is not JSON", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: "Internal Server Error",
        json: () => Promise.reject(new Error("not json")),
      }),
    );

    let caughtError: ContactFormSendError | null = null;

    try {
      await sendContactFormSubmission(payload, config);
    } catch (error) {
      expect(error).toBeInstanceOf(ContactFormSendError);
      if (error instanceof ContactFormSendError) {
        caughtError = error;
      }
    }

    expect(caughtError).not.toBeNull();
    expect(caughtError?.cause).toBeInstanceOf(Error);
    if (caughtError?.cause instanceof Error) {
      expect(caughtError.cause.message).toBe("Internal Server Error");
    }
  });
});
