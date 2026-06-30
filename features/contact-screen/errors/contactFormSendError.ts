export type ContactFormSendErrorCode = "FORM_NOT_CONFIGURED" | "FORM_SEND_FAILED";

export class ContactFormSendError extends Error {
  readonly code: ContactFormSendErrorCode;

  constructor(code: ContactFormSendErrorCode, options?: ErrorOptions) {
    super(code, options);
    this.name = "ContactFormSendError";
    this.code = code;
  }
}
