// ─── Shared types used across server and client ───

export type AudienceProfile = {
  profileId: string;
  label: string;
  headline: string;
  summary: string;
  order: number;
};

export type NavSection = {
  sectionId: string;
  label: string;
  order: number;
};

export type Project = {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  metaLeft: string;
  metaRight: string;
  accent: string;
  year: string;
  role: string;
  client: string;
  duration: string;
  stack: string[];
  reverse: boolean;
  order: number;
};

export type ValueItem = {
  text: string;
  order: number;
};

export type ReferenceCard = {
  name: string;
  role: string;
  body: string;
  order: number;
};

export type AboutContent = {
  heading: string[];
  columnTwo: string[];
  columnThree: string[];
  bottomText: string[];
};

export type SiteContent = Record<string, string>;

export type HomePageData = {
  profiles: AudienceProfile[];
  navSections: NavSection[];
  projects: Project[];
  values: ValueItem[];
  references: ReferenceCard[];
  about: AboutContent;
  siteContent: SiteContent;
};
