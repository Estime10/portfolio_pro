import { z } from "zod";

/** Construit un `z.object` avec une clé obligatoire par slug (catalogue, intents, etc.). */
export function createSlugRecordSchema(
  slugs: readonly string[],
  valueSchema: z.ZodType,
): z.ZodObject<Record<string, z.ZodType>> {
  const shape: Record<string, z.ZodType> = {};

  for (const slug of slugs) {
    shape[slug] = valueSchema;
  }

  return z.object(shape);
}
