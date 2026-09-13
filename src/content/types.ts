export type LocalizedText = {
  en: string;
  pt: string;
};

export type TeamMember = {
  id: string;
  name: string;
  flag: string;
  roleTag: LocalizedText;
  descriptor: LocalizedText;
  href?: string;
};

export type BoardMember = {
  id: string;
  name: string;
  flag: string;
  photo: string;
  linkedin: string;
  roleTitle: LocalizedText;
  roleDescription: LocalizedText;
};

export type Leader = {
  id: string;
  name: string;
  photo: string;
  roleTitle: LocalizedText;
  bio: LocalizedText;
};

export type Article = {
  id: string;
  slug: string;
  title: LocalizedText;
  dek: LocalizedText;
  href?: string;
};

export type Exhibition = {
  id: string;
  slug: string;
  name: string;
  artist: string;
  concept: LocalizedText;
  watchHref?: string;
};

export type Teaser = {
  id: string;
  slug: string;
  projectName: string;
  context: LocalizedText;
  href?: string;
};

export type Interview = {
  id: string;
  slug: string;
  title: LocalizedText;
  participants: string;
  description: LocalizedText;
  href?: string;
};

export type VideoClip = {
  id: string;
  slug: string;
  title: string;
  artist: string;
  href?: string;
};
