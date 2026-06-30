import { z } from "zod";
import { CONTACT_FIELD_IDS } from "@/features/contact-screen/types/contact-field-id/contactFieldId";
import { CONTACT_INTENT_IDS } from "@/features/contact-screen/types/contact-intent-id/contactIntentId";
import { CASE_STUDY_SECTION_IDS } from "@/features/projects-screen/map-project-case-study/caseStudySectionIds";
import { PROFILE_SECTION_IDS } from "@/features/profile-screen/map-profile-content/profileSectionIds";
import { FEATURED_PROJECT_SLUGS, PROJECT_SLUGS } from "@/lib/projects/project-catalog";
import { createSlugRecordSchema } from "@/lib/i18n/messages-schema/create-slug-record-schema/createSlugRecordSchema";
import {
  caseStudySectionSchema,
  contactFieldCopySchema,
  contactIntentOptionSchema,
  contactStripLabelsSchema,
  featuredCaseStudyBaseSchema,
  pageMetaSchema,
  profileSectionSchema,
  projectCatalogItemSchema,
  translationStringArraySchema,
} from "@/lib/i18n/messages-schema/message-schema-primitives/messageSchemaPrimitives";

const caseStudySectionsSchema = createSlugRecordSchema(
  CASE_STUDY_SECTION_IDS,
  caseStudySectionSchema,
);

const featuredCaseStudyWithSectionsSchema = featuredCaseStudyBaseSchema.extend({
  sections: caseStudySectionsSchema,
});

const caseStudiesSchema = z
  .object({
    backToProjects: z.string().min(1),
    nav: z.object({
      label: z.string().min(1),
    }),
    labels: z.object({
      problem: z.string().min(1),
      approach: z.string().min(1),
    }),
  })
  .extend(
    createSlugRecordSchema(FEATURED_PROJECT_SLUGS, featuredCaseStudyWithSectionsSchema).shape,
  );

export const appMessagesSchema = z.object({
  SplashScreen: z.object({
    meta: pageMetaSchema,
  }),
  SkipLink: z.object({
    label: z.string().min(1),
  }),
  MainHeader: z.object({
    navLabel: z.string().min(1),
    navAria: z.string().min(1),
    menuToggleAriaLabel: z.string().min(1),
    menu: z.object({
      home: z.string().min(1),
      profile: z.string().min(1),
      projects: z.string().min(1),
      contact: z.string().min(1),
    }),
  }),
  HomeScreen: z.object({
    hero: z.object({
      name: z.string().min(1),
      role: z.string().min(1),
      intro: z.string().min(1),
      ctaStartProject: z.string().min(1),
      ctaViewProjects: z.string().min(1),
      contactStrip: contactStripLabelsSchema,
    }),
    meta: pageMetaSchema,
  }),
  ProjectsScreen: z.object({
    title: z.string().min(1),
    intro: z.object({
      paragraphs: translationStringArraySchema,
    }),
    selectionNote: z.string().min(1),
    tags: z.object({
      focus: z.string().min(1),
      stack: z.string().min(1),
      section: z.string().min(1),
    }),
    sections: z.object({
      featured: z.string().min(1),
      secondary: z.string().min(1),
    }),
    card: z.object({
      readCaseStudy: z.string().min(1),
      viewLive: z.string().min(1),
    }),
    meta: pageMetaSchema,
    items: createSlugRecordSchema(PROJECT_SLUGS, projectCatalogItemSchema),
    caseStudies: caseStudiesSchema,
  }),
  ProfileScreen: z.object({
    title: z.string().min(1),
    nav: z.object({
      label: z.string().min(1),
    }),
    intro: z.object({
      paragraphs: translationStringArraySchema,
    }),
    sections: createSlugRecordSchema(PROFILE_SECTION_IDS, profileSectionSchema),
    closing: z.object({
      label: z.string().min(1),
      paragraphs: translationStringArraySchema,
    }),
    meta: pageMetaSchema,
  }),
  ContactScreen: z.object({
    title: z.string().min(1),
    intro: z.object({
      paragraphs: translationStringArraySchema,
    }),
    form: z.object({
      intent: z.object({
        legend: z.string().min(1),
        hint: z.string().min(1),
        options: createSlugRecordSchema(CONTACT_INTENT_IDS, contactIntentOptionSchema),
      }),
      requiredMark: z.string().min(1),
      back: z.string().min(1),
      cancel: z.string().min(1),
      submit: z.string().min(1),
      submitting: z.string().min(1),
      success: z.object({
        title: z.string().min(1),
        body: z.string().min(1),
      }),
      errors: z.object({
        intentRequired: z.string().min(1),
        fieldRequired: z.string().min(1),
        emailInvalid: z.string().min(1),
        submitFailed: z.string().min(1),
        submitNotConfigured: z.string().min(1),
      }),
      fields: createSlugRecordSchema(CONTACT_FIELD_IDS, contactFieldCopySchema),
    }),
    meta: pageMetaSchema,
  }),
});

export type AppMessages = z.infer<typeof appMessagesSchema>;
