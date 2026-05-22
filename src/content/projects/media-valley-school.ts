import type { ProjectEntry } from "@/types";

export const mediaValleySchoolProject: ProjectEntry = {
  slug: "media-valley-school",
  kicker: "Media Valley School",
  title: "Media Valley School",
  summary:
    "A full build of a premium online community and school platform for designers, developers, and creators. The hardest challenge was the animation layer — every interaction had to match a detailed design brief exactly, delivered with zero compromise.",
  metaLeft: "Complete Build (Community Platform)",
  metaRight: "Full-Stack Web Developer",
  image: "",
  width: 1086,
  height: 633,
  reverse: false,
  accent: "#CCFF00",
  year: "2026",
  role: "Full-Stack Web Developer",
  client: "Jason (Netherlands)",
  duration: "25 Days",
  stack: ["React", "TypeScript", "Node.js", "Express"],
  heroImage: {
    src: "",
    alt: "Media Valley School community platform hero",
    width: 1086,
    height: 633,
  },
  caseStudyBlocks: [
    {
      type: "overview",
      superLabel: "The project itself :",
      title: "Project Overview",
      body:
        "Media Valley School is an online community and education platform built for designers, developers, and creators who want to scale their income. The client came in with a detailed design brief and needed a developer who could execute it precisely, handling complex animations, a live community feed UI, student testimonials, and a full backend with security features including CAPTCHA protection. The project was deployed on a self-managed Contabo VPS.",
      cards: [
        {
          icon: "problem",
          label: "Problem:",
          body:
            "The client had a clear vision and a detailed design brief but needed a developer who could execute animations and interactions at a high enough level to match it without cutting corners.",
        },
        {
          icon: "goal",
          label: "Goal:",
          body:
            "Build a visually compelling, high-performance community platform that converts visitors into paying school members and communicates the energy and credibility of the Media Valley brand.",
        },
        {
          icon: "role",
          label: "My role:",
          body:
            "Full-stack development with a heavy focus on frontend animation fidelity. I handled the complete build from React component architecture through to backend setup, VPS deployment, and security configuration.",
        },
        {
          icon: "responsibilities",
          label: "Responsibilities:",
          bullets: [
            "Pixel-perfect implementation of a detailed client design brief",
            "Complex animation development across multiple sections",
            "React and TypeScript frontend architecture",
            "Node.js and Express backend setup",
            "CAPTCHA integration for form and signup protection",
            "Deployment and configuration on Contabo VPS",
          ],
        },
      ],
    },
    {
      type: "section",
      label: "App Direction",
      title: "High energy design that matches the brand's ambition",
      body:
        "Media Valley School is not a quiet, corporate product. It targets creators who want to build wealth, and the design needed to reflect that energy. A black base with a sharp acid-green accent creates immediate contrast and attitude. Bold display type, colorful testimonial cards, and a live community feed widget all work together to make the platform feel active, credible, and worth joining right now.",
    },
    {
      type: "persona",
      label: "User Personas",
      title: "The creator ready to scale",
      body:
        "The typical visitor to Media Valley School is a freelance designer or developer who is already working but not yet earning what they know they are capable of. They are drawn to community-led learning and peer accountability over traditional courses. They need to feel like joining is a smart business move, not just another subscription.",
      quote: "I've watched enough free YouTube videos. I need to be around people who are actually making money from their skills and willing to show me how.",
      name: "Jordan",
      role: "Freelance Designer / Developer",
      photo: "/my-personal-2.jpg",
      details: [
        { label: "Age", value: "26" },
        { label: "Company", value: "Self-employed / freelancing" },
        { label: "Location", value: "United States / Europe" },
      ],
      goals: [
        "Find a community of serious creators who share real results",
        "Learn practical strategies for scaling freelance income",
        "Get feedback and accountability from peers on the same path",
        "Access structured learning that actually moves fast",
      ],
      frustrations: [
        "Online courses that feel outdated or overly theoretical",
        "Communities that are full of noise and low-effort posts",
        "Paying for memberships that go dead within a few weeks",
        "Lack of real proof that members are getting tangible results",
      ],
    },
    {
      type: "section",
      label: "Information Architecture",
      title: "Designed to convert the scroll into a signup",
      body:
        "The page flow was built to close a skeptical visitor before they reach the bottom. The hero establishes the offer and proof in seconds. Social proof, student wins, and live community activity are layered in sequence to eliminate objections one by one. The call to action appears multiple times across the page at natural decision points, never feeling forced.",
    },
    {
      type: "section",
      label: "Style System",
      title: "Raw energy with enough polish to feel premium",
      body:
        "The style system balances two things that usually conflict: street-level energy and premium credibility. The acid-green accent on the dark background pulls directly from streetwear and creative culture. The typography is oversized and confident. Colorful testimonial cards in lime, pink, blue, and yellow break up the dark layout and make the social proof section impossible to skip.",
    },
    {
      type: "palette",
      label: "Color Palette",
      title: "A palette built for creators who do not blend in",
      body:
        "The base is near-black to keep the focus sharp and the contrast high. Acid green is the primary accent, used on key headlines, CTAs, and live indicators. The testimonial section deliberately breaks the palette with full-color cards in lime, pink, sky blue, and yellow, creating a visual energy spike exactly where trust needs to be built.",
      swatches: [
        { name: "Void", hex: "#0A0A0A", usage: "Page background, navigation" },
        { name: "Surface", hex: "#141414", usage: "Cards, section containers" },
        { name: "Acid", hex: "#CCFF00", usage: "Primary accent, headlines, CTAs" },
        { name: "Off White", hex: "#F0F0F0", usage: "Body text, headings on dark" },
        { name: "Slate", hex: "#888888", usage: "Labels, metadata, supporting text" },
      ],
    },
    {
      type: "typography",
      label: "Typography",
      title: "Type that earns attention before anyone reads a word",
      body:
        "Display type is set at a scale that commands the entire viewport. The mix of white and acid-green within single headlines creates focal points without needing any other decoration. Body text is clean and compact, keeping the reading experience fast and the page feeling energetic rather than heavy.",
      samples: [
        { name: "Display", family: "Geist", weight: "Bold", sample: "Design your freedom." },
        { name: "Body", family: "Geist", weight: "Regular", sample: "Join the elite community of designers, developers, and creators building wealth and mastering their craft." },
        { name: "Label", family: "Geist", weight: "Medium", sample: "MEDIA VALLEY SCHOOL — SEASON 2 LIVE" },
      ],
    },
    {
      type: "section",
      label: "Final Design",
      title: "Every animation landed. Every section delivered.",
      body:
        "The finished platform matches the client's design brief without compromise. Complex entrance animations, a live community feed section, colorful testimonial cards, and a multi-layered hero all came together as one cohesive experience. The backend handles signups securely with CAPTCHA protection, and the whole thing runs on a self-managed VPS with reliable uptime.",
    },
    {
      type: "gallery",
      columns: 3,
      images: [
        { src: "", alt: "Media Valley School — Homepage hero with acid-green headline and CTA", width: 1086, height: 633 },
        { src: "", alt: "Media Valley School — Student wins testimonial card grid", width: 1086, height: 633 },
        { src: "", alt: "Media Valley School — Live community feed section", width: 1086, height: 633 },
        { src: "", alt: "Media Valley School — Services and work sections", width: 1086, height: 633 },
        { src: "", alt: "Media Valley School — About and founder section", width: 1086, height: 633 },
        { src: "", alt: "Media Valley School — Blog or results page", width: 1086, height: 633 },
      ],
    },
    {
      type: "section",
      label: "Mobile Responsiveness",
      title: "The energy holds on every screen size",
      body:
        "The animation-heavy layout was carefully adapted for mobile without stripping the experience down to nothing. Entrance animations still fire on scroll, the community feed remains visible and legible, and the bold display type scales down proportionally. The \"Join the School\" CTA stays prominent throughout the mobile scroll.",
    },
    {
      type: "gallery",
      columns: 5,
      images: [
        { src: "", alt: "Media Valley School mobile — Homepage hero", width: 375, height: 812 },
        { src: "", alt: "Media Valley School mobile — Student wins section", width: 375, height: 812 },
        { src: "", alt: "Media Valley School mobile — Community feed", width: 375, height: 812 },
        { src: "", alt: "Media Valley School mobile — Services section", width: 375, height: 812 },
        { src: "", alt: "Media Valley School mobile — Contact start project", width: 375, height: 812 },
      ],
    },
  ],
};
