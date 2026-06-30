import {
  contactSubmissionApiSchema,
  type ContactSubmissionApiBody,
} from "@/features/contact-screen/validation/contact-submission-api-schema/contactSubmissionApiSchema";

export type ParseContactSubmissionRequestResult =
  | Readonly<{ success: true; body: ContactSubmissionApiBody }>
  | Readonly<{ success: false; message: string }>;

export function parseContactSubmissionRequest(
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- frontière JSON HTTP
  payload: unknown,
): ParseContactSubmissionRequestResult {
  const parsed = contactSubmissionApiSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid contact submission payload",
    };
  }

  return {
    success: true,
    body: parsed.data,
  };
}
