import { ContactFormEmailSendError } from "@/features/contact/errors/contactFormEmailSendError";

export type EmailJsResponseStatusError = Readonly<{
  status: number;
  text: string;
}>;

export type ContactFormCatchError =
  | ContactFormEmailSendError
  | Error
  | EmailJsResponseStatusError;
