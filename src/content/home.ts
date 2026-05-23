import type { AboutContent, AudienceProfile, NavSection, ReferenceCard } from "@/types";

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
    "I'm a full-stack web developer",
    "who builds scalable architecture,",
    "sharp interfaces, & AI features.",

  ],
  columnThree: [
    "I work with founders and businesses",
    "to build fast, reliable web systems",
    "that grow with them.",

  ],
  bottomText: ["Let me help with a great visual", "solution for your business."],
  primaryImage: "",
  secondaryImage: "",
};
