export type AudienceProfile = {
  id: string;
  label: string;
  headline: string;
  summary: string;
};

export type NavSection = {
  id: string;
  label: string;
};

export type OverviewCard = {
  icon: "problem" | "goal" | "role" | "responsibilities";
  label: string;
  body?: string;
  bullets?: string[];
};

export type CaseStudyBlock =
  | {
      type: "overview";
      superLabel: string;
      title: string;
      body: string;
      cards: OverviewCard[];
    }
  | {
      type: "section";
      label: string;
      title: string;
      body: string;
    }
  | {
      type: "image";
      src: string;
      alt: string;
      width: number;
      height: number;
      caption?: string;
      contained?: boolean;
    }
  | {
      type: "persona";
      label: string;
      title: string;
      body: string;
      quote: string;
      name: string;
      role: string;
      photo: string;
      details: { label: string; value: string }[];
      goals: string[];
      frustrations: string[];
    }
  | {
      type: "gallery";
      columns?: 2 | 3 | 4 | 5;
      hideMissing?: boolean;
      images: {
        src: string;
        alt: string;
        width: number;
        height: number;
        caption?: string;
      }[];
    }
  | {
      type: "palette";
      label: string;
      title: string;
      body?: string;
      swatches: { name: string; hex: string; usage?: string }[];
    }
  | {
      type: "typography";
      label: string;
      title: string;
      body?: string;
      samples: {
        name: string;
        family: string;
        weight: string;
        sample: string;
      }[];
    }
  | {
      type: "quote";
      body: string;
      attribution?: string;
    };

export type ProjectEntry = {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  metaLeft: string;
  metaRight: string;
  image: string;
  width: number;
  height: number;
  reverse: boolean;
  accent: string;
  year: string;
  role: string;
  client: string;
  duration: string;
  stack: string[];
  heroImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  caseStudyBlocks: CaseStudyBlock[];
  finalImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export type ReferenceCard = {
  name: string;
  role: string;
  body: string;
};

export type AboutContent = {
  heading: string[];
  columnTwo: string[];
  columnThree: string[];
  bottomText: string[];
  primaryImage: string;
  secondaryImage: string;
};
