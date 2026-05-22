import type { ProjectEntry } from "@/types";

export const avelonMfgProject: ProjectEntry = {
  slug: "avelon-mfg",
  kicker: "Avelon MFG",
  title: "Avelon MFG",
  summary:
    "A complete rebuild of a wholesale distribution website that was losing customers due to slow load times and a confusing experience. The new site cut load time by 70% and increased trade account conversions by 80%.",
  metaLeft: "Website Redesign / Complete Rebuild",
  metaRight: "Full-Stack Web Developer",
  image: "",
  width: 1086,
  height: 633,
  reverse: true,
  accent: "#C9A84C",
  year: "2026",
  role: "Full-Stack Web Developer",
  client: "Chris (UK)",
  duration: "20 Days",
  stack: ["Next.js", "TypeScript", "Convex DB", "GSAP"],
  heroImage: {
    src: "",
    alt: "Avelon MFG wholesale website hero",
    width: 1086,
    height: 633,
  },
  caseStudyBlocks: [
    {
      type: "overview",
      superLabel: "The project itself :",
      title: "Project Overview",
      body:
        "Avelon MFG is a wholesale distribution company based in Pittsburgh, PA, supplying tools, toys, and general merchandise to trade buyers worldwide. The original website was slow, unpolished, and failing to convert visitors into wholesale customers. The goal was a full rebuild that would fix performance, clean up the experience, and give serious buyers a reason to open a trade account.",
      cards: [
        {
          icon: "problem",
          label: "Problem:",
          body:
            "The existing site loaded slowly and had no clear path for trade buyers to take action. Visitors were leaving before they ever browsed a product.",
        },
        {
          icon: "goal",
          label: "Goal:",
          body:
            "Build a fast, professional distribution platform that converts wholesale buyers into registered trade accounts and makes the product catalog easy to navigate.",
        },
        {
          icon: "role",
          label: "My role:",
          body:
            "Full-stack development from planning to deployment. I handled the complete rebuild including frontend design, backend setup, product catalog, trade account form, and a custom AI chatbot trained on Avelon's products and business.",
        },
        {
          icon: "responsibilities",
          label: "Responsibilities:",
          bullets: [
            "Full website redesign and rebuild in Next.js and TypeScript",
            "Product catalog development with search and filtering",
            "Multi-step trade account application form",
            "Custom AI chatbot trained on Avelon MFG products and information",
            "Performance optimization resulting in 70% faster load times",
            "Full mobile responsiveness across all pages",
          ],
        },
      ],
    },
    {
      type: "section",
      label: "App Direction",
      title: "Built for wholesale buyers who mean business",
      body:
        "The design direction was intentional from the start. Wholesale buyers are not impulse shoppers. They are evaluating suppliers, so every part of the experience needed to communicate credibility and professionalism. A dark, structured layout with a warm gold accent color gave the site a premium, reliable feel without looking like a retail store. GSAP animations were used carefully to add polish without slowing things down.",
    },
    {
      type: "persona",
      label: "User Personas",
      title: "Decision maker profile",
      body:
        "The primary user of this site is a small retail shop owner sourcing wholesale products. They are not browsing for fun. They need clear pricing information, fast load times, and a straightforward way to open a trade account. Andrew represents the kind of buyer Avelon needs to convert, someone with a real business need and limited patience for a confusing website.",
      quote: "I've checked a few suppliers online and most of them feel dated or take forever to load. If a site doesn't look professional, I start wondering if the company is serious.",
      name: "Andrew",
      role: "Independent Retail Shop Owner",
      photo: "/my-personal-2.jpg",
      details: [
        { label: "Age", value: "48" },
        { label: "Company", value: "Independent retail shop" },
        { label: "Location", value: "United Kingdom" },
      ],
      goals: [
        "Find a reliable wholesale supplier with a clear product range",
        "Open a trade account quickly without unnecessary back and forth",
        "Get accurate product information before placing a bulk order",
        "Work with a supplier who looks and feels like a serious operation",
      ],
      frustrations: [
        "Wholesale websites that are slow or hard to navigate on a phone",
        "No clear way to apply for a trade account or ask a product question",
        "Product pages with vague descriptions and no pricing guidance",
        "Companies that look unprofessional online regardless of how good their products are",
      ],
    },
    {
      type: "section",
      label: "Information Architecture",
      title: "A clear path from first visit to trade account",
      body:
        "The site structure was designed around one goal: move a wholesale buyer from landing on the homepage to submitting a trade account application. The navigation was kept minimal and purposeful, with the product catalog, trade account page, and contact information all reachable in one click. The multi-step trade form reduced friction by breaking a long application into manageable steps.",
    },
    {
      type: "section",
      label: "Style System",
      title: "Premium and functional from the first glance",
      body:
        "The visual system needed to work for two different audiences at once: trade buyers judging the company by how it looks, and returning customers who just want to find products fast. The typography is bold and readable, built for scanning. The color system uses high contrast to guide attention to the actions that matter most.",
    },
    {
      type: "palette",
      label: "Color Palette",
      title: "Dark authority with a warm trade accent",
      body:
        "The palette is built around a near-black background that gives the site a premium, serious tone. Warm gold is used exclusively for calls to action and key highlights, making it immediately clear where to click. White sections appear on content-heavy pages to keep long reads from feeling heavy.",
      swatches: [
        { name: "Void", hex: "#0A0A0A", usage: "Page background, navigation" },
        { name: "Gunmetal", hex: "#1A1A1A", usage: "Cards, section backgrounds" },
        { name: "Trade Gold", hex: "#C9A84C", usage: "CTA buttons, highlights, accents" },
        { name: "Bone White", hex: "#F5F5F0", usage: "Light section backgrounds" },
        { name: "Smoke", hex: "#888888", usage: "Subtext, labels, metadata" },
      ],
    },
    {
      type: "typography",
      label: "Typography",
      title: "Type that reads fast and looks sharp",
      body:
        "The type system prioritizes speed reading for buyers who are scanning and not reading. Display headings are large and bold to anchor each section. Body text is set at a comfortable reading size with generous line height. Uppercase tracking is used sparingly for labels and metadata to add structure without adding noise.",
      samples: [
        { name: "Display", family: "Geist", weight: "Bold", sample: "Wholesale. Built different." },
        { name: "Body", family: "Geist", weight: "Regular", sample: "Apply for a trade account and get access to bulk pricing." },
        { name: "Label", family: "Geist", weight: "Medium", sample: "TRADE ACCOUNTS AVAILABLE" },
      ],
    },
    {
      type: "section",
      label: "Final Design",
      title: "A site that finally matches the quality of the business",
      body:
        "The finished product is a fast, professional wholesale platform that gives trade buyers everything they need to make a decision. The product catalog is easy to browse, the trade account form is clear and frictionless, and the AI chatbot handles product questions instantly. Load time dropped by 70% and trade account conversions increased by 80% in the period following launch.",
    },
    {
      type: "gallery",
      columns: 3,
      images: [
        { src: "", alt: "Avelon MFG — Homepage hero with dark layout and gold CTA", width: 1086, height: 633 },
        { src: "", alt: "Avelon MFG — Product catalog page with search and filter", width: 1086, height: 633 },
        { src: "", alt: "Avelon MFG — Single product detail page", width: 1086, height: 633 },
        { src: "", alt: "Avelon MFG — Trade account multi-step form", width: 1086, height: 633 },
        { src: "", alt: "Avelon MFG — Contact page with form and map", width: 1086, height: 633 },
        { src: "", alt: "Avelon MFG — Privacy legal page dark editorial layout", width: 1086, height: 633 },
      ],
    },
    {
      type: "section",
      label: "Mobile Responsiveness",
      title: "Full experience on every screen size",
      body:
        "A large share of wholesale buyers check supplier sites on their phone before committing to a desktop session. Every page was built mobile-first, with the product catalog, trade form, and chatbot all fully functional on small screens. Navigation collapses cleanly and touch targets are sized for real use.",
    },
    {
      type: "gallery",
      columns: 5,
      images: [
        { src: "", alt: "Avelon MFG mobile — Homepage", width: 375, height: 812 },
        { src: "", alt: "Avelon MFG mobile — Product catalog", width: 375, height: 812 },
        { src: "", alt: "Avelon MFG mobile — Trade form step 1", width: 375, height: 812 },
        { src: "", alt: "Avelon MFG mobile — Product detail page", width: 375, height: 812 },
        { src: "", alt: "Avelon MFG mobile — Contact page", width: 375, height: 812 },
      ],
    },
  ],
};
