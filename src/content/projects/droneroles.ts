import type { ProjectEntry } from "@/types";

export const dronerolesProject: ProjectEntry = {
  slug: "droneroles",
  kicker: "DroneRoles",
  title: "DroneRoles",
  summary:
    "A full 7-page redesign of a vibe-coded drone job platform buried under 2,000 lines of duplicate raw CSS. The site went from slow and broken to fast, polished, and animated in under a week. The client said it felt like magic.",
  metaLeft: "Complete Redesign (7 Pages)",
  metaRight: "Full-Stack Web Developer",
  image: "",
  width: 1086,
  height: 633,
  reverse: false,
  accent: "#111111",
  year: "2026",
  role: "Frontend Developer",
  client: "Angus (United States)",
  duration: "7 Days",
  stack: ["Tailwind CSS", "GSAP", "JavaScript"],
  heroImage: {
    src: "",
    alt: "DroneRoles drone job platform redesign hero",
    width: 1086,
    height: 633,
  },
  caseStudyBlocks: [
    {
      type: "overview",
      superLabel: "The project itself :",
      title: "Project Overview",
      body:
        "DroneRoles is a drone-focused job platform for pilots, UAV operators, and companies hiring specialized drone talent. The original project had been vibe-coded with no front-end structure, around 2,000 lines of duplicate raw CSS, inconsistent components, rough UI, broken pages, and noticeable performance issues. The client needed a full redesign across seven pages, rebuilt into a clean Tailwind system with smooth GSAP animations and a professional visual direction.",
      cards: [
        {
          icon: "problem",
          label: "Problem:",
          body:
            "The website had no reliable front-end structure. Duplicate raw CSS had grown out of control, components were inconsistent, the UI felt unfinished, and several pages were slow or visually broken.",
        },
        {
          icon: "goal",
          label: "Goal:",
          body:
            "Redesign all seven pages, migrate the interface to a Tailwind utility system, improve the visual quality, add motion, and clean up the performance and layout problems without slowing the project down.",
        },
        {
          icon: "role",
          label: "My role:",
          body:
            "I handled the frontend redesign and performance cleanup, including visual redesign, CSS migration to Tailwind, GSAP animation implementation, responsive fixes, and bug cleanup across the site.",
        },
        {
          icon: "responsibilities",
          label: "Responsibilities:",
          bullets: [
            "Full visual redesign across 7 pages",
            "Replaced about 2,000 lines of raw CSS with Tailwind utility classes",
            "Built and implemented a consistent theme and component structure",
            "Designed and developed scroll-triggered animations using GSAP",
            "Diagnosed and fixed layout bugs across the codebase",
            "Identified and resolved performance issues as a bonus deliverable",
          ],
        },
      ],
    },
    {
      type: "section",
      label: "App Direction",
      title: "Clean, technical, and built for people who take drones seriously",
      body:
        "The platform needed to feel credible to drone pilots, UAV operators, aerospace teams, and hiring companies. The direction moved away from a generic job-board look and toward a cleaner technical interface with a darker base, sharp contrast, structured page sections, and controlled motion. Every page had to feel organized, modern, and trustworthy without losing the specialized drone industry tone.",
    },
    {
      type: "persona",
      label: "User Personas",
      title: "The drone professional ready to find real work",
      body:
        "DroneRoles is built for certified drone professionals looking for serious opportunities in inspection, mapping, defense, operations, and commercial drone work. They need a platform that understands the industry and helps them find relevant roles quickly without sorting through generic tech or aviation listings.",
      quote:
        "I have the hours and the certifications. I just need a platform that actually knows what BVLOS means without me having to explain it.",
      name: "Marcus",
      role: "UAV Inspection Operator",
      photo: "",
      details: [
        { label: "Age", value: "31" },
        { label: "Company", value: "Self-employed / contract operator" },
        { label: "Location", value: "United States and Europe" },
      ],
      goals: [
        "Find serious drone jobs without filtering through generic listings",
        "Trust that the platform understands UAV skills and certifications",
        "Apply quickly from a clean and reliable interface",
        "Discover companies that are actively hiring drone operators",
      ],
      frustrations: [
        "Job boards that treat drone work like a generic tech category",
        "Messy pages that make companies look less trustworthy",
        "Slow or broken interfaces when trying to browse roles",
        "Unclear role pages that do not explain requirements properly",
      ],
    },
    {
      type: "section",
      label: "Information Architecture",
      title: "Seven pages, one consistent system",
      body:
        "The redesign covered the homepage, job listings, company directory, location directory, role directory, guide pages, and getting-started flow. Instead of letting each page behave like a separate one-off layout, the structure was rebuilt around reusable sections, consistent spacing, clearer hierarchy, and repeated interaction patterns that made the platform easier to understand.",
    },
    {
      type: "section",
      label: "The Migration",
      title: "From 2,000 lines of chaos to a clean utility system",
      body:
        "A major part of the work was replacing the raw CSS mess with Tailwind utility classes. This made the design easier to maintain, removed duplicated styling, improved consistency, and helped the pages respond better across screen sizes. The migration also made future edits faster because components no longer depended on scattered CSS blocks.",
    },
    {
      type: "section",
      label: "Animations",
      title: "GSAP brought the pages to life",
      body:
        "The new interface uses GSAP for scroll-triggered entrance animations, staggered reveals, and cleaner page transitions. The motion is subtle enough to keep the platform professional, but polished enough to make the site feel intentionally designed instead of quickly assembled.",
    },
    {
      type: "section",
      label: "Performance",
      title: "The client felt the difference immediately",
      body:
        "Beyond the redesign, I also found and fixed performance issues that were slowing down the site. The client had not asked for that part directly, but it changed how the product felt in use. The final result loaded faster, moved smoother, and made the redesign feel much more premium.",
    },
    {
      type: "section",
      label: "Final Design",
      title: "Professional, fast, and ready for a real audience",
      body:
        "The final DroneRoles redesign turned a rough, vibe-coded platform into a structured, polished job product. Across all seven pages, the new design feels more credible, the animation system adds energy, the layout issues are cleaned up, and the performance improvements make the whole experience feel sharper. The client finished the project with a five-star review and described the transformation as feeling like magic.",
    },
    {
      type: "gallery",
      columns: 3,
      images: [
        { src: "", alt: "DroneRoles final design - homepage hero", width: 1086, height: 633 },
        { src: "", alt: "DroneRoles final design - job listings page", width: 1086, height: 633 },
        { src: "", alt: "DroneRoles final design - company directory", width: 1086, height: 633 },
        { src: "", alt: "DroneRoles final design - location directory", width: 1086, height: 633 },
        { src: "", alt: "DroneRoles final design - role directory", width: 1086, height: 633 },
        { src: "", alt: "DroneRoles final design - guide page", width: 1086, height: 633 },
      ],
    },
    {
      type: "section",
      label: "Mobile Responsiveness",
      title: "The redesign holds at every screen size",
      body:
        "The responsive pass made sure the job listings, directories, navigation, and content sections worked cleanly on smaller screens. Tailwind utilities made the layouts easier to control, while the GSAP animations were tuned so they did not break or overwhelm the mobile experience.",
    },
    {
      type: "gallery",
      columns: 5,
      images: [
        { src: "", alt: "DroneRoles mobile - homepage", width: 375, height: 812 },
        { src: "", alt: "DroneRoles mobile - jobs page", width: 375, height: 812 },
        { src: "", alt: "DroneRoles mobile - company page", width: 375, height: 812 },
        { src: "", alt: "DroneRoles mobile - role page", width: 375, height: 812 },
        { src: "", alt: "DroneRoles mobile - guide page", width: 375, height: 812 },
      ],
    },
  ],
};
