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
  challenge: string;
  approach: string;
  outcome: string;
  stack: string[];
  caseStudySections: {
    title: string;
    body: string;
  }[];
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

export const audienceProfiles: AudienceProfile[] = [
  {
    id: "everyone",
    label: "For everyone",
    headline:
      "Hello there, I'm Shahzaib Mirza. I build beautiful websites and scalable web systems for businesses that want to grow online.",
    summary:
      "From clean marketing sites to complex platforms, I create web experiences that look sharp, feel smooth, and keep supporting the business as it grows.",
  },
  {
    id: "founders",
    label: "Founders",
    headline:
      "I help founders turn ideas into polished products with websites that earn trust and systems that stay reliable as traction builds.",
    summary:
      "You get a developer who can shape the frontend experience, build the backend foundation, and think beyond launch into long-term scale.",
  },
  {
    id: "startups",
    label: "Startups",
    headline:
      "I build startup-ready products that move fast at the beginning without becoming messy when the product, team, and users expand.",
    summary:
      "My focus is shipping quickly, keeping the UX clean, and setting up architecture that can support iterations, deployments, and future complexity.",
  },
  {
    id: "product-teams",
    label: "Product teams",
    headline:
      "I partner with product teams to build fast, clear, and reliable web experiences that connect strong UI with production-ready systems.",
    summary:
      "That means thoughtful frontend execution, dependable APIs, and features implemented with performance, maintainability, and scale in mind.",
  },
  {
    id: "developers",
    label: "Developers",
    headline:
      "I build with Next.js, React, Node.js, Express, and TypeScript, creating maintainable applications with clean UI, solid architecture, and smooth deployments.",
    summary:
      "My experience includes multi-tenant systems, modular backend design, scalable app structure, and shipping features without letting the codebase drift.",
  },
  {
    id: "ctos",
    label: "CTOs",
    headline:
      "I engineer web platforms with scalable architecture, multi-tenancy patterns, and delivery workflows that support growth without compromising product quality.",
    summary:
      "I can contribute across the stack, from frontend craftsmanship to backend services, deployment pipelines, and the decisions that keep systems maintainable.",
  },
];

export const navSections: NavSection[] = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "values", label: "Values" },
  { id: "references", label: "References" },
  { id: "about", label: "About" },
];

export const projectEntries: ProjectEntry[] = [
  {
    slug: "trend-bible",
    kicker: "Trend Bible",
    title: "Trend Bible",
    summary:
      "A bold subscription-first editorial platform concept built to package market signals into a high-impact landing page with oversized type, strong hierarchy, and a confident conversion flow.",
    metaLeft: "Editorial platform",
    metaRight: "UI / Frontend concept",
    image: "/trend-bible.png",
    width: 1086,
    height: 633,
    reverse: false,
    accent: "#ff8f12",
    year: "2025",
    role: "Full stack concept build",
    challenge:
      "The challenge was to create a homepage that felt immediate, premium, and editorial while still behaving like a product landing page with clear business intent.",
    approach:
      "I built the direction around oversized type, measured spacing, and strong hierarchy so the story feels sharp from the first frame without becoming cluttered.",
    outcome:
      "The concept lands as a clean, bold, and memorable front-end experience that feels premium while still guiding the reader through a clear conversion structure.",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS"],
    caseStudySections: [
      {
        title: "Direction",
        body:
          "This concept explores how a trend platform can feel editorial and product-led at the same time. The visual language is oversized, clean, and high confidence.",
      },
      {
        title: "Structure",
        body:
          "The case study uses a pacing system built around bold typography, spacing discipline, and simplified content grouping so the interface feels readable at every scroll depth.",
      },
      {
        title: "Build",
        body:
          "The implementation is set up as a modern App Router page with reusable content data, responsive layout rules, and motion tuned to support the reading flow rather than distract from it.",
      },
    ],
  },
  {
    slug: "visual-poetry",
    kicker: "Visual Poetry",
    title: "Visual Poetry",
    summary:
      "A cinematic portfolio concept for a visual storyteller, designed to balance gallery energy, warm contrast, and a brand-led first impression that feels immersive from the opening screen.",
    metaLeft: "Creative portfolio",
    metaRight: "Brand-led web concept",
    image: "/visual-poetry.png",
    width: 631,
    height: 423,
    reverse: true,
    accent: "#f2aa38",
    year: "2025",
    role: "Design system and front-end direction",
    challenge:
      "The goal was to build a portfolio experience that feels emotional and cinematic without becoming heavy, noisy, or hard to navigate.",
    approach:
      "I leaned on warmer tones, quieter spacing, and a slower rhythm of information so the work feels immersive while still staying structured and easy to scan.",
    outcome:
      "The result is a brand-led portfolio concept that feels premium, atmospheric, and polished while remaining usable enough for real client presentation.",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS"],
    caseStudySections: [
      {
        title: "Mood",
        body:
          "The visual system is built to feel cinematic first. Typography, color balance, and whitespace work together so the visitor feels a mood before reading details.",
      },
      {
        title: "Portfolio flow",
        body:
          "Instead of a dense gallery, the layout gives each piece more room. That makes the portfolio feel intentional and lets imagery act as the primary storytelling element.",
      },
      {
        title: "Execution",
        body:
          "The page structure is kept flexible so future work blocks, richer case studies, or deeper image stacks can be added without rebuilding the whole visual system.",
      },
    ],
  },
];

export const values = ["Useful", "Considered", "Beautiful", "Well made"];

export const referenceCards: ReferenceCard[] = [
  {
    name: "Areeba Khan",
    role: "Founder at Northlane Studio",
    body:
      "Shahzaib took our rough vision and turned it into a polished site that felt premium, clear, and ready for clients from day one.",
  },
  {
    name: "Usman Tariq",
    role: "Product Manager at FinSolve",
    body:
      "Working with Shahzaib was incredibly smooth. He made smart frontend decisions, kept the backend clean, and shipped features without drama.",
  },
  {
    name: "Zara Hameed",
    role: "Operations Lead at Meditech",
    body:
      "He understood the product quickly, simplified the experience, and built a system that stayed dependable as more users came in.",
  },
  {
    name: "Bilal Saeed",
    role: "Co-founder at LaunchGrid",
    body:
      "Shahzaib blends design sensitivity with engineering discipline. The product looked better, loaded faster, and became easier for our team to maintain.",
  },
  {
    name: "Mariam Ali",
    role: "Marketing Lead at Novacrest",
    body:
      "He did not just make the site look good. He gave us a smoother structure, stronger responsiveness, and a web presence that finally matched our brand.",
  },
  {
    name: "Hassan Raza",
    role: "CTO at Taskmint",
    body:
      "He was comfortable across the stack, thoughtful about architecture, and reliable about turning ambiguous requirements into shippable product work.",
  },
];

export const aboutContent: AboutContent = {
  heading: ["I’m Shahzaib Mirza,", "a PK-based Developer"],
  columnTwo: [
    "I’m a seasoned developer with a",
    "strong passion for creating intuitive",
    "& user-friendly digital experiences.",
  ],
  columnThree: [
    "I love collaborating with founders,",
    "helping them solve UX challenges",
    "and build solutions.",
  ],
  bottomText: ["Let me help with a great visual", "solution for your business."],
  primaryImage: "/my-perosnal.png",
  secondaryImage: "/my-personal-2.jpg",
};

export function getProjectBySlug(slug: string) {
  return projectEntries.find((project) => project.slug === slug);
}
