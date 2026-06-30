import { z } from "zod";
import { CONTACT_INTENT_IDS } from "@/features/contact-screen/types/contact-intent-id/contactIntentId";

export const contactSubmissionApiSchema = z.object({
  _subject: z.string().trim().min(1).max(300),
  name: z.string().trim().min(1).max(200),
  email: z.email().max(320),
  company: z.string().trim().max(200),
  message: z.string().trim().min(1).max(5000),
  intent_id: z.enum(CONTACT_INTENT_IDS),
  intent_label: z.string().trim().min(1).max(200),
  time: z.string().trim().min(1).max(80),
});

export type ContactSubmissionApiBody = z.infer<typeof contactSubmissionApiSchema>;
