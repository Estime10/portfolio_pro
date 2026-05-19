export type ContactFormEmailSendErrorCode = "EMAILJS_NOT_CONFIGURED" | "EMAILJS_SEND_FAILED";

export class ContactFormEmailSendError extends Error {
  readonly code: ContactFormEmailSendErrorCode;

  constructor(code: ContactFormEmailSendErrorCode, options?: ErrorOptions) {
    super(code, options);
    this.name = "ContactFormEmailSendError";
    this.code = code;
  }
}
