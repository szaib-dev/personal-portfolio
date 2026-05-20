export const projectEntries = [
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
      "The direction was to create a homepage that felt immediate, premium, and sharp without losing clarity. The structure needed to feel editorial, while still carrying the intent of a product-led landing experience.",
    approach:
      "I focused on a large-type visual system, strong spacing, and a pacing rhythm that makes the page feel confident from the first screen. The layout balances story, hierarchy, and conversion in a way that feels clear rather than crowded.",
    outcome:
      "The result is a concept that feels brand-led, modern, and highly readable. It shows how a strong visual identity can still support practical product communication and user flow.",
    stack: ["Next.js", "React", "GSAP", "CSS Modules"],
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
      "The goal was to build a portfolio experience that felt expressive and cinematic without becoming visually noisy. The work needed room to breathe while still creating a strong first impression.",
    approach:
      "I used warmer tones, tighter composition, and a slower reading rhythm so the page feels immersive. Instead of relying on heavy decoration, the concept lets spacing, typography, and imagery carry the mood.",
    outcome:
      "The final direction feels premium and intentional, with a stronger emotional tone than a standard portfolio layout while staying clean enough to support real client work.",
    stack: ["Next.js", "React", "Responsive Layout", "Motion Design"],
  },
];

export function getProjectBySlug(slug) {
  return projectEntries.find((project) => project.slug === slug);
}
