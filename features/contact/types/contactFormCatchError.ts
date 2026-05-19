import { ContactFormEmailSendError } from "@/features/contact/errors/contactFormEmailSendError";

export type EmailJsResponseStatusError = Readonly<{
  status: number;
  text: string;
}>;

export type ContactFormCatchError =
  | ContactFormEmailSendError
  | Error
  | EmailJsResponseStatusError;

function readStringProperty(value: object, key: string): string | null {
  if (!(key in value)) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- getOwnPropertyDescriptor.value
  const propertyValue = Object.getOwnPropertyDescriptor(value, key)?.value;

  return typeof propertyValue === "string" ? propertyValue : null;
}

function readNumberProperty(value: object, key: string): number | null {
  if (!(key in value)) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- getOwnPropertyDescriptor.value
  const propertyValue = Object.getOwnPropertyDescriptor(value, key)?.value;

  return typeof propertyValue === "number" ? propertyValue : null;
}

/** Frontière EmailJS / Promise — seul point d’entrée pour les erreurs externes. */
export function toContactFormCatchError(
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- frontière EmailJS
  value: unknown,
): ContactFormCatchError {
  if (value instanceof ContactFormEmailSendError || value instanceof Error) {
    return value;
  }

  if (typeof value === "object" && value !== null) {
    const text = readStringProperty(value, "text");

    if (text) {
      return {
        status: readNumberProperty(value, "status") ?? 0,
        text,
      };
    }
  }

  return new ContactFormEmailSendError("EMAILJS_SEND_FAILED");
}
