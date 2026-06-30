import { z } from "zod";
import type { AppLocale } from "@/lib/i18n/config";
import {
  appMessagesSchema,
  type AppMessages,
} from "@/lib/i18n/messages-schema/app-messages-schema/appMessagesSchema";

function formatZodIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length > 0 ? issue.path.join(".") : "(root)";
      return `${path}: ${issue.message}`;
    })
    .join("; ");
}

/** Données JSON importées — validées immédiatement via Zod. */
// eslint-disable-next-line @typescript-eslint/no-restricted-types -- frontière JSON i18n
export function parseAppMessages(raw: unknown, locale: AppLocale): AppMessages {
  const result = appMessagesSchema.safeParse(raw);

  if (!result.success) {
    throw new Error(`Invalid i18n messages (${locale}): ${formatZodIssues(result.error)}`);
  }

  return result.data;
}
