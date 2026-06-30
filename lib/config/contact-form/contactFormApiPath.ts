export const CONTACT_FORM_API_PATH = "/api/contact" as const;

export type ContactFormSubmissionConfig = Readonly<{
  endpoint: typeof CONTACT_FORM_API_PATH;
}>;
