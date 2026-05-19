export const PROFILE_SECTION_IDS = [
  "productMindset",
  "frontendPhilosophy",
  "buildingApplications",
  "technicalApproach",
  "motionInteraction",
  "collaborationExecution",
] as const;

export type ProfileSectionId = (typeof PROFILE_SECTION_IDS)[number];
