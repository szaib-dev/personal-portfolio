import type { ProjectEntry } from "@/types";

export const gmbOptimizationProject: ProjectEntry = {
  slug: "gmb-optimization",
  kicker: "GMB Optimization",
  title: "GMB Optimization",
  summary:
    "A complete build of a digital marketing agency website, planned and developed from the ground up to position GMB Optimization as a credible, results-driven growth partner for local businesses. Designed to convert visitors into serious inquiries.",
  metaLeft: "Complete Build (New Website)",
  metaRight: "Full-Stack Web Developer",
  image: "",
  width: 1086,
  height: 633,
  reverse: false,
  accent: "#7C3AED",
  year: "2026",
  role: "Full-Stack Web Developer",
  client: "Asif (USA)",
  duration: "30 Days",
  stack: ["Next.js", "TypeScript", "Node.js"],
  heroImage: {
    src: "",
    alt: "GMB Optimization agency website hero",
    width: 1086,
    height: 633,
  },
  caseStudyBlocks: [
    {
      type: "overview",
      superLabel: "The project itself :",
      title: "Project Overview",
      body:
        "GMB Optimization is a digital marketing agency offering services ranging from Google Business Profile management to SEO, web development, PPC, and AI solutions. The client needed a website built from zero that could present these services in a way that felt premium and credible to business owners making real investment decisions. The project required careful planning before a single line of code was written.",
      cards: [
        {
          icon: "problem",
          label: "Problem:",
          body:
            "There was no website to start with. The client needed a complete digital presence that could compete with established agencies and turn cold visitors into qualified leads.",
        },
        {
          icon: "goal",
          label: "Goal:",
          body:
            "Build a high-converting agency website that communicates expertise, backs it up with real case study results, and gives potential clients a clear path to starting a project.",
        },
        {
          icon: "role",
          label: "My role:",
          body:
            "Full-stack development from initial planning through to deployment. I handled site architecture, content structure, frontend design, and all technical build work across every page.",
        },
        {
          icon: "responsibilities",
          label: "Responsibilities:",
          bullets: [
            "10-day planning phase covering site structure, page hierarchy, and content strategy",
            "Full website build in Next.js and TypeScript",
            "Multi-page service architecture covering 8 distinct service offerings",
            "Case study results section with real client metrics",
            "Process and methodology pages built to build trust before the sale",
          ],
        },
      ],
    },
    {
      type: "section",
      label: "App Direction",
      title: "An agency site that looks like it gets results",
      body:
        "The design direction was built around one idea: an agency that claims to generate leads should look like it knows what it's doing. The dark background with a deep purple gradient accent gives the site a tech-forward, confident feel without being cold. Large display type, bold statistics, and a structured layout signal that this is a serious operation, not a freelancer with a template.",
    },
    {
      type: "persona",
      label: "User Personas",
      title: "Decision maker profile",
      body:
        "The typical visitor to GMB Optimization is a small business owner or local service company who has tried some form of digital marketing before and did not see results. They are skeptical, busy, and they make decisions based on proof. The site needed to address that skepticism directly with real numbers and a clear explanation of how the work actually gets done.",
      quote: "I've been burned before by agencies that overpromise. What I need to see is actual results, not just a nice-looking website.",
      name: "Marcus",
      role: "Local Service Business Owner",
      photo: "/my-personal-2.jpg",
      details: [
        { label: "Age", value: "42" },
        { label: "Company", value: "Local service business" },
        { label: "Location", value: "Australia" },
      ],
      goals: [
        "Find a marketing partner who can show real proof of results",
        "Understand exactly what they are paying for before committing",
        "Get more inbound calls and leads without increasing ad spend",
        "Work with a team that communicates clearly and delivers on time",
      ],
      frustrations: [
        "Agencies with impressive websites but no actual case studies or numbers",
        "Vague pricing and unclear scopes of work",
        "Slow response times and poor communication after signing",
        "Marketing strategies that are generic and not built for their specific business type",
      ],
    },
    {
      type: "section",
      label: "Information Architecture",
      title: "Every page earns the next click",
      body:
        "The site was structured to move a skeptical visitor through a logical trust-building journey. The homepage establishes credibility with results and social proof. The services section breaks down each offering in detail. The process page explains the methodology. The results page shows real case studies with hard numbers. By the time a visitor reaches the contact page, the decision is mostly already made.",
    },
    {
      type: "section",
      label: "Style System",
      title: "Dark, bold, and built to signal authority",
      body:
        "The visual system leans into contrast and scale to communicate confidence. Large type commands attention on every section. The purple-to-pink gradient is used sparingly to highlight the most important calls to action, creating a focal point that draws the eye without overwhelming the layout. Supporting text stays muted to keep the hierarchy clean.",
    },
    {
      type: "palette",
      label: "Color Palette",
      title: "A palette that means business",
      body:
        "The palette is anchored by near-black backgrounds that give every page a premium, focused feel. The purple-to-pink gradient is reserved for key headlines and primary CTAs, making them impossible to miss. Subtle dark cards add depth and separate content sections without using harsh borders.",
      swatches: [
        { name: "Pitch", hex: "#0A0A0A", usage: "Page background, navigation" },
        { name: "Surface", hex: "#141414", usage: "Cards, section containers" },
        { name: "Violet", hex: "#7C3AED", usage: "Primary accent, gradient start" },
        { name: "Fuchsia", hex: "#D946EF", usage: "Gradient end, CTA highlights" },
        { name: "Mist", hex: "#A1A1AA", usage: "Body text, labels, metadata" },
      ],
    },
    {
      type: "typography",
      label: "Typography",
      title: "Type that stops the scroll",
      body:
        "The type system is built for impact. Display headings are set large and thin to create contrast against the dark background, giving key messages room to breathe. Body text is compact and readable, keeping long-form service descriptions digestible. Uppercase tracking on labels adds structure without adding visual weight.",
      samples: [
        { name: "Display", family: "Geist", weight: "Bold", sample: "Digital marketing engineered for more leads." },
        { name: "Body", family: "Geist", weight: "Regular", sample: "We build complete digital dominance for serious brands." },
        { name: "Label", family: "Geist", weight: "Medium", sample: "ACCEPTING NEW CLIENTS FOR 2026" },
      ],
    },
    {
      type: "section",
      label: "Final Design",
      title: "A full agency platform built in 30 days",
      body:
        "The finished website covers every touchpoint a potential client needs before making a decision: services, process, results, case studies, and a direct contact path. The dark, gradient-accented design positions GMB Optimization as a premium agency without looking generic. The site launched with live WhatsApp support, a full case study results section, and a structured contact flow ready to handle incoming leads.",
    },
    {
      type: "gallery",
      columns: 3,
      images: [
        { src: "", alt: "GMB Optimization — Homepage hero with gradient headline and dual CTAs", width: 1086, height: 633 },
        { src: "", alt: "GMB Optimization — Services overview section", width: 1086, height: 633 },
        { src: "", alt: "GMB Optimization — How We Work process steps", width: 1086, height: 633 },
        { src: "", alt: "GMB Optimization — Results and case studies page", width: 1086, height: 633 },
        { src: "", alt: "GMB Optimization — Individual service page GBP Optimization", width: 1086, height: 633 },
        { src: "", alt: "GMB Optimization — Contact page", width: 1086, height: 633 },
      ],
    },
    {
      type: "section",
      label: "Mobile Responsiveness",
      title: "Fully functional on the device most clients use",
      body:
        "The majority of local business owners who find an agency website are searching on their phones. Every section was built to work at mobile width without losing the premium feel of the desktop version. The navigation collapses cleanly, the large display type scales down without breaking the layout, and the WhatsApp chat button remains accessible on every page.",
    },
    {
      type: "gallery",
      columns: 5,
      images: [
        { src: "", alt: "GMB Optimization mobile — Homepage hero", width: 375, height: 812 },
        { src: "", alt: "GMB Optimization mobile — Services section", width: 375, height: 812 },
        { src: "", alt: "GMB Optimization mobile — Process page", width: 375, height: 812 },
        { src: "", alt: "GMB Optimization mobile — Results and case studies", width: 375, height: 812 },
        { src: "", alt: "GMB Optimization mobile — Contact page", width: 375, height: 812 },
      ],
    },
  ],
};
