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
    client: "Self-initiated concept",
    duration: "4 weeks",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS"],
    heroImage: {
      src: "/trend-bible.png",
      alt: "Trend Bible landing page hero",
      width: 1086,
      height: 633,
    },
    caseStudyBlocks: [
      {
        type: "overview",
        superLabel: "The project itself :",
        title: "Project Overview",
        body:
          "Trend Bible is a subscription-first editorial platform concept that packages market signals into a high-impact reading experience. The goal was to make the homepage feel premium and editorial while still behaving like a product landing page with a clear conversion path.",
        cards: [
          {
            icon: "problem",
            label: "Problem:",
            body:
              "Existing trend platforms often lack a clear editorial voice, strong hierarchy, and a confident conversion path. Visitors leave without understanding the value or taking action.",
          },
          {
            icon: "goal",
            label: "Goal:",
            body:
              "Design a subscription-first homepage that earns trust on first scroll and turns curiosity about trends into a confident subscription decision.",
          },
          {
            icon: "role",
            label: "My role:",
            body: "Full stack concept build — UI direction, content structure, and front-end implementation.",
          },
          {
            icon: "responsibilities",
            label: "Responsibilities:",
            bullets: [
              "Visual direction",
              "Layout architecture",
              "Component build",
              "Motion design",
              "Responsive system",
              "Content structure",
            ],
          },
        ],
      },
      {
        type: "section",
        label: "App Direction",
        title:
          "Build a confident, editorial-first homepage that still converts.",
        body:
          "The direction was set around oversized type, measured spacing, and a strong hierarchy so the story feels sharp from the first frame without becoming cluttered. Every section is shaped to either explain the value or invite the visitor to subscribe.",
      },
      {
        type: "persona",
        label: "User Personas",
        title: "Decision maker profile",
        body:
          "User personas define the target buyer's mindset, goals, and points of friction so the page can make stronger design and content decisions.",
        quote: "Find credible trend insight without wasting hours comparing vague reports.",
        name: "Maya",
        role: "Editorial Strategy Lead",
        photo: "/my-personal-2.jpg",
        details: [
          { label: "Age", value: "32" },
          { label: "Company", value: "Growth-stage brand" },
          { label: "Location", value: "London, UK" },
        ],
        goals: [
          "Understand the value of the subscription quickly",
          "Compare trend categories without feeling lost",
          "Trust the editorial quality before signing up",
          "Find clear pricing and subscription benefits",
        ],
        frustrations: [
          "Vague positioning with no clear buyer outcome",
          "Dense reports that take too long to evaluate",
          "Unclear difference between free and paid content",
          "Weak trust signals before the conversion point",
        ],
      },
      {
        type: "section",
        label: "Information Architecture",
        title:
          "A pacing system that supports reading, scanning, and converting.",
        body:
          "I structured the page into three pacing zones: a bold opening that establishes voice, a middle band that proves credibility through reports and signals, and a closing band that compresses the offer into a clear subscription decision.",
      },
      {
        type: "gallery",
        columns: 2,
        images: [
          {
            src: "/trend-bible.png",
            alt: "Trend Bible content section study",
            width: 1086,
            height: 633,
          },
          {
            src: "/trend-bible.png",
            alt: "Trend Bible subscription block study",
            width: 1086,
            height: 633,
          },
        ],
      },
      {
        type: "section",
        label: "Style System",
        title:
          "Typography does the heavy lifting. Color is used with restraint.",
        body:
          "The visual system is anchored by a single editorial typeface running across display and body, with measured sizing steps and tight tracking. Color is reserved for accents that signal trend signals, status, and conversion paths so attention is never wasted.",
      },
      {
        type: "palette",
        label: "Color Palette",
        title: "A restrained system tuned for editorial confidence.",
        body:
          "Neutrals lead the experience and a single warm accent carries every conversion moment. The palette is intentionally compact so the brand reads quickly across hero blocks, cards, and dense article surfaces.",
        swatches: [
          { name: "Ink", hex: "#121212", usage: "Headlines, body" },
          { name: "Paper", hex: "#FFFFFF", usage: "Surface" },
          { name: "Mist", hex: "#F2F2F2", usage: "Cards, dividers" },
          { name: "Signal", hex: "#FF8F12", usage: "Accents, CTAs" },
          { name: "Slate", hex: "#5F5F5F", usage: "Secondary text" },
        ],
      },
      {
        type: "typography",
        label: "Typography",
        title: "One family. A clear scale. Confident hierarchy.",
        samples: [
          {
            name: "Display",
            family: "Geist",
            weight: "Medium",
            sample: "Trend Bible",
          },
          {
            name: "Heading",
            family: "Geist",
            weight: "Medium",
            sample: "Signals worth reading.",
          },
          {
            name: "Body",
            family: "Geist",
            weight: "Regular",
            sample:
              "A measured editorial voice that respects the reader and earns the subscription.",
          },
        ],
      },
      {
        type: "section",
        label: "Final Design",
        title: "An editorial homepage that feels deliberate end to end.",
        body:
          "The final concept lands as a clean, bold, and memorable front-end experience that feels premium while still guiding the reader through a clear conversion structure. The system is set up so future content blocks can be added without disturbing the rhythm.",
      },
      {
        type: "gallery",
        columns: 3,
        images: [
          { src: "/trend-bible.png", alt: "Trend Bible final design — hero section", width: 1086, height: 633 },
          { src: "/trend-bible.png", alt: "Trend Bible final design — content band", width: 1086, height: 633 },
          { src: "/trend-bible.png", alt: "Trend Bible final design — signal cards", width: 1086, height: 633 },
          { src: "/trend-bible.png", alt: "Trend Bible final design — subscription block", width: 1086, height: 633 },
          { src: "/trend-bible.png", alt: "Trend Bible final design — footer section", width: 1086, height: 633 },
          { src: "/trend-bible.png", alt: "Trend Bible final design — full page overview", width: 1086, height: 633 },
        ],
      },
      {
        type: "section",
        label: "Mobile Responsiveness",
        title: "Every breakpoint considered. Every detail preserved.",
        body:
          "The responsive system was built to maintain the editorial confidence across all screen sizes. Typography scales fluidly, spacing compresses without losing rhythm, and the conversion flow stays clear on mobile without feeling cramped.",
      },
      {
        type: "gallery",
        columns: 5,
        images: [
          { src: "/trend-bible.png", alt: "Trend Bible mobile — hero view", width: 375, height: 812 },
          { src: "/trend-bible.png", alt: "Trend Bible mobile — content section", width: 375, height: 812 },
          { src: "/trend-bible.png", alt: "Trend Bible mobile — signal cards", width: 375, height: 812 },
          { src: "/trend-bible.png", alt: "Trend Bible mobile — subscription CTA", width: 375, height: 812 },
          { src: "/trend-bible.png", alt: "Trend Bible mobile — reports section", width: 375, height: 812 },
          { src: "/trend-bible.png", alt: "Trend Bible mobile — footer", width: 375, height: 812 },
        ],
      },
    ],
    finalImage: {
      src: "/trend-bible.png",
      alt: "Trend Bible final design",
      width: 1086,
      height: 633,
    },
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
    client: "Self-initiated concept",
    duration: "3 weeks",
    stack: ["Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS"],
    heroImage: {
      src: "/visual-poetry.png",
      alt: "Visual Poetry portfolio hero",
      width: 631,
      height: 423,
    },
    caseStudyBlocks: [
      {
        type: "overview",
        superLabel: "The project itself :",
        title: "Project Overview",
        body:
          "Visual Poetry is a cinematic portfolio concept made for a visual storyteller. The goal was to design a brand-led web experience that feels emotional and immersive on the opening screen while staying easy to navigate as visitors browse the work.",
        cards: [
          {
            icon: "problem",
            label: "Problem:",
            body:
              "Creative portfolios often feel generic or over-designed. They fail to communicate a distinct voice and leave visitors without a strong emotional impression of the work.",
          },
          {
            icon: "goal",
            label: "Goal:",
            body:
              "Create a portfolio that feels like a film opening sequence so the work is felt before it is read, and the brand voice is clear from the first frame.",
          },
          {
            icon: "role",
            label: "My role:",
            body: "Design system and front-end direction — brand, layout, motion, and responsive behavior.",
          },
          {
            icon: "responsibilities",
            label: "Responsibilities:",
            bullets: [
              "Brand direction",
              "Design system",
              "Motion design",
              "Layout architecture",
              "Responsive build",
              "Typography system",
            ],
          },
        ],
      },
      {
        type: "section",
        label: "Mood",
        title: "Feel before read. Atmosphere before information.",
        body:
          "The visual system was built mood-first. Typography, color balance, and whitespace work together so visitors feel a cinematic tone before they read a single word. That tone carries through the rest of the experience to keep the work feeling premium.",
      },
      {
        type: "persona",
        label: "User Personas",
        title: "Creative client profile",
        body:
          "The persona keeps the portfolio experience focused on the kind of visitor who needs to feel the work first, then understand how to start a serious conversation.",
        quote: "I need the work to feel cinematic, but the inquiry path must stay simple.",
        name: "Elena",
        role: "Independent Visual Artist",
        photo: "/my-perosnal.png",
        details: [
          { label: "Age", value: "29" },
          { label: "Practice", value: "Visual storytelling" },
          { label: "Location", value: "Berlin, Germany" },
          { label: "Audience", value: "Brands and galleries" },
        ],
        goals: [
          "Make the work feel distinctive from the opening frame",
          "Show projects with enough space and mood",
          "Create confidence for commissions and collaborations",
          "Keep the contact path obvious without breaking the atmosphere",
        ],
        frustrations: [
          "Generic portfolio grids that flatten the work",
          "Too much explanation before the visual impact",
          "Navigation that interrupts the cinematic mood",
          "Beautiful pages that make inquiries harder",
        ],
      },
      {
        type: "section",
        label: "Portfolio Flow",
        title: "Each piece given room to breathe and tell its story.",
        body:
          "Instead of a dense gallery, the layout gives each piece more room. That makes the portfolio feel intentional and lets imagery act as the primary storytelling element while the supporting copy stays quiet and structured.",
      },
      {
        type: "gallery",
        columns: 3,
        images: [
          {
            src: "/visual-poetry.png",
            alt: "Visual Poetry frame one",
            width: 631,
            height: 423,
          },
          {
            src: "/visual-poetry.png",
            alt: "Visual Poetry frame two",
            width: 631,
            height: 423,
          },
          {
            src: "/visual-poetry.png",
            alt: "Visual Poetry frame three",
            width: 631,
            height: 423,
          },
        ],
      },
      {
        type: "palette",
        label: "Color Palette",
        title: "Warm, low contrast, and carefully tuned.",
        body:
          "Earthy tones lead the experience. A single warm accent is used for emphasis and call-to-action moments so the page never feels flat and never feels noisy.",
        swatches: [
          { name: "Bone", hex: "#F7F1EA", usage: "Surface" },
          { name: "Espresso", hex: "#221C18", usage: "Headlines" },
          { name: "Amber", hex: "#F2AA38", usage: "Accents" },
          { name: "Ash", hex: "#8C8378", usage: "Captions" },
        ],
      },
      {
        type: "typography",
        label: "Typography",
        title: "An editorial type pair that supports the mood.",
        samples: [
          {
            name: "Display",
            family: "Geist",
            weight: "Medium",
            sample: "Visual Poetry",
          },
          {
            name: "Body",
            family: "Geist",
            weight: "Regular",
            sample:
              "Cinematic, quiet, and unhurried writing that lets the work lead.",
          },
        ],
      },
      {
        type: "section",
        label: "Final Design",
        title: "A brand-led portfolio that is presentation ready.",
        body:
          "The result is a brand-led portfolio concept that feels premium, atmospheric, and polished while still being usable enough for real client presentation. The structure is kept flexible so future work blocks, deeper case studies, or richer image stacks can be added without rebuilding the visual system.",
      },
      {
        type: "gallery",
        columns: 3,
        images: [
          { src: "/visual-poetry.png", alt: "Visual Poetry final — opening frame", width: 631, height: 423 },
          { src: "/visual-poetry.png", alt: "Visual Poetry final — gallery section", width: 631, height: 423 },
          { src: "/visual-poetry.png", alt: "Visual Poetry final — about section", width: 631, height: 423 },
          { src: "/visual-poetry.png", alt: "Visual Poetry final — project detail", width: 631, height: 423 },
          { src: "/visual-poetry.png", alt: "Visual Poetry final — contact section", width: 631, height: 423 },
          { src: "/visual-poetry.png", alt: "Visual Poetry final — full page view", width: 631, height: 423 },
        ],
      },
      {
        type: "section",
        label: "Mobile Responsiveness",
        title: "Cinematic on every screen. Immersive at every size.",
        body:
          "The responsive approach preserves the atmospheric quality of the design across breakpoints. Images scale gracefully, typography adjusts without losing its editorial weight, and the portfolio flow stays immersive on mobile without sacrificing usability.",
      },
      {
        type: "gallery",
        columns: 5,
        images: [
          { src: "/visual-poetry.png", alt: "Visual Poetry mobile — hero view", width: 375, height: 812 },
          { src: "/visual-poetry.png", alt: "Visual Poetry mobile — gallery view", width: 375, height: 812 },
          { src: "/visual-poetry.png", alt: "Visual Poetry mobile — detail view", width: 375, height: 812 },
          { src: "/visual-poetry.png", alt: "Visual Poetry mobile — about section", width: 375, height: 812 },
          { src: "/visual-poetry.png", alt: "Visual Poetry mobile — project page", width: 375, height: 812 },
          { src: "/visual-poetry.png", alt: "Visual Poetry mobile — contact view", width: 375, height: 812 },
        ],
      },
    ],
    finalImage: {
      src: "/visual-poetry.png",
      alt: "Visual Poetry final design",
      width: 631,
      height: 423,
    },
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
