import { z } from "zod";

export const translationStringArraySchema = z.array(z.string().min(1));

export const pageMetaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const contactStripLabelsSchema = z.object({
  ariaLabel: z.string().min(1),
  instagramLabel: z.string().min(1),
  linkedinLabel: z.string().min(1),
  emailLabel: z.string().min(1),
  phoneLabel: z.string().min(1),
});

export const taggedParagraphBlockSchema = z.object({
  tags: translationStringArraySchema,
  paragraphs: translationStringArraySchema,
});

export const caseStudySectionSchema = z.object({
  title: z.string().min(1),
  tags: translationStringArraySchema.optional(),
  paragraphs: translationStringArraySchema,
  bullets: translationStringArraySchema.optional(),
});

export const profileSectionSchema = z.object({
  title: z.string().min(1),
  intro: translationStringArraySchema,
  bullets: translationStringArraySchema.optional(),
  outro: z.string().min(1),
});

export const projectCatalogItemSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  type: z.string().min(1),
  status: z.string().min(1),
  summary: z.string().min(1),
  highlights: translationStringArraySchema,
  tags: translationStringArraySchema.optional(),
  stack: translationStringArraySchema,
});

export const featuredCaseStudyBaseSchema = z.object({
  focusTags: translationStringArraySchema,
  name: z.string().min(1),
  tagline: z.string().min(1),
  type: z.string().min(1),
  status: z.string().min(1),
  year: z.string().min(1),
  role: z.string().min(1),
  stack: translationStringArraySchema,
  meta: pageMetaSchema,
  problem: taggedParagraphBlockSchema,
  approach: taggedParagraphBlockSchema,
});

export const contactFieldCopySchema = z.object({
  label: z.string().min(1),
  placeholder: z.string().min(1),
  hint: z.string().min(1).optional(),
});

export const contactIntentOptionSchema = z.object({
  label: z.string().min(1),
  description: z.string().min(1),
});
