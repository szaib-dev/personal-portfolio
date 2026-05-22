import type { ProjectEntry } from "@/types";

export const trendBibleProject: ProjectEntry = {
    slug: "trend-bible",
    kicker: "Gible Bible",
    title: "Trend Bible",
    summary:
      "A bold subscription-first editorial platform concept built to package market signals into a high-impact landing page with oversized type, strong hierarchy, and a confident conversion flow.",
    metaLeft: "Editorial platform",
    metaRight: "UI / Frontend concept",
    image: "",
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
      src: "",
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
        photo: "",
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
        hideMissing: true,
        images: [
          { src: "", alt: "Trend Bible final design — hero section", width: 1086, height: 633 },
          { src: "", alt: "Trend Bible final design — content band", width: 1086, height: 633 },
          { src: "", alt: "Trend Bible final design — signal cards", width: 1086, height: 633 },
          { src: "", alt: "Trend Bible final design — subscription block", width: 1086, height: 633 },
          { src: "", alt: "Trend Bible final design — footer section", width: 1086, height: 633 },
          { src: "", alt: "Trend Bible final design — full page overview", width: 1086, height: 633 },
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
          { src: "", alt: "Trend Bible mobile — hero view", width: 375, height: 812 },
          { src: "", alt: "Trend Bible mobile — content section", width: 375, height: 812 },
          { src: "", alt: "Trend Bible mobile — signal cards", width: 375, height: 812 },
          { src: "", alt: "Trend Bible mobile — subscription CTA", width: 375, height: 812 },
          { src: "", alt: "Trend Bible mobile — reports section", width: 375, height: 812 },
        ],
      },
    ],
    finalImage: {
      src: "",
      alt: "Trend Bible final design",
      width: 1086,
      height: 633,
    },
  };
