export type ProfileBulletPresentation = "chips" | "list";

export type ProfileSectionViewModel = Readonly<{
  bulletPresentation?: ProfileBulletPresentation;
  bullets?: readonly string[];
  id: string;
  paragraphs: readonly string[];
  title: string;
}>;

export type ProfileContentViewModel = Readonly<{
  closingLabel: string;
  closingParagraphs: readonly string[];
  introParagraphs: readonly string[];
  navLabel: string;
  sections: readonly ProfileSectionViewModel[];
  title: string;
}>;
