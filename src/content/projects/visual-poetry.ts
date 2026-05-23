import type { ProjectEntry } from "@/types";

export const visualPoetryProject: ProjectEntry = {
    slug: "visual-poetry",
    kicker: "Visual Poetry",
    title: "Visual Poetry",
    summary:
      "A cinematic portfolio concept for a visual storyteller, designed to balance gallery energy, warm contrast, and a brand-led first impression that feels immersive from the opening screen.",
    metaLeft: "Creative portfolio",
    metaRight: "Brand-led web concept",
    image: "",
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
      src: "",
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
            body: "Design system and front-end direction. Brand, layout, motion, and responsive behavior.",
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
        photo: "",
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
        hideMissing: true,
        images: [
          { src: "", alt: "Visual Poetry final design — opening frame", width: 631, height: 423 },
          { src: "", alt: "Visual Poetry final design — gallery section", width: 631, height: 423 },
          { src: "", alt: "Visual Poetry final design — about section", width: 631, height: 423 },
          { src: "", alt: "Visual Poetry final design — project detail", width: 631, height: 423 },
          { src: "", alt: "Visual Poetry final design — contact section", width: 631, height: 423 },
          { src: "", alt: "Visual Poetry final design — full page view", width: 631, height: 423 },
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
          { src: "", alt: "Visual Poetry mobile — hero view", width: 375, height: 812 },
          { src: "", alt: "Visual Poetry mobile — gallery view", width: 375, height: 812 },
          { src: "", alt: "Visual Poetry mobile — detail view", width: 375, height: 812 },
          { src: "", alt: "Visual Poetry mobile — about section", width: 375, height: 812 },
          { src: "", alt: "Visual Poetry mobile — project page", width: 375, height: 812 },
        ],
      },
    ],
    finalImage: {
      src: "",
      alt: "Visual Poetry final design",
      width: 631,
      height: 423,
    },
  };
