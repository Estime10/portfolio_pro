import { ContactFormSendError } from "@/features/contact-screen/errors/contactFormSendError";

export type FormspreeResponseError = Readonly<{
  message: string;
  status: number;
}>;

export type LegacyResponseStatusError = Readonly<{
  status: number;
  text: string;
}>;

export type ContactFormCatchError =
  ContactFormSendError | Error | FormspreeResponseError | LegacyResponseStatusError;
