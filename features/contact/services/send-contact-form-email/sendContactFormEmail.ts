import emailjs from "@emailjs/browser";
import { initEmailJsClient } from "@/features/contact/services/init-email-js-client/initEmailJsClient";
import { buildContactFormEmailTemplateParams } from "@/features/contact/services/build-contact-form-email-template-params/buildContactFormEmailTemplateParams";
import type { ContactFormSubmissionPayload } from "@/features/contact/types/contactFormSubmissionPayload";
import { ContactFormEmailSendError } from "@/features/contact/errors/contactFormEmailSendError";
import { toContactFormCatchError } from "@/features/contact/types/to-contact-form-catch-error/toContactFormCatchError";
import type { EmailJsClientConfig } from "@/lib/config/emailjs/getEmailJsClientConfig";

export async function sendContactFormEmail(
  payload: ContactFormSubmissionPayload,
  config: EmailJsClientConfig,
): Promise<void> {
  initEmailJsClient(config);

  const templateParams = buildContactFormEmailTemplateParams(payload);

  try {
    const response = await emailjs.send(config.serviceId, config.templateId, templateParams, {
      publicKey: config.publicKey,
    });

    if (response.status !== 200) {
      throw new ContactFormEmailSendError("EMAILJS_SEND_FAILED", {
        cause: new Error(response.text),
      });
    }
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- frontière EmailJS
  } catch (value: unknown) {
    const error = toContactFormCatchError(value);

    if (error instanceof ContactFormEmailSendError) {
      throw error;
    }

    throw new ContactFormEmailSendError("EMAILJS_SEND_FAILED", {
      cause: error instanceof Error ? error : undefined,
    });
  }
}
