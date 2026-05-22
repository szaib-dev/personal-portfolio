import { mutation } from "./_generated/server";

/**
 * Run this once to seed the database with the current static content.
 * Execute via: npx convex run seed:seedAll
 */
export const seedAll = mutation({
  handler: async (ctx) => {
    // ─── Audience Profiles ───
    const profiles = [
      { profileId: "everyone", label: "For everyone", headline: "Hello there, I'm Shahzaib Mirza. I build beautiful websites and scalable web systems for businesses that want to grow online.", summary: "From clean marketing sites to complex platforms, I create web experiences that look sharp, feel smooth, and keep supporting the business as it grows.", order: 0 },
      { profileId: "founders", label: "Founders", headline: "I help founders turn ideas into polished products with websites that earn trust and systems that stay reliable as traction builds.", summary: "You get a developer who can shape the frontend experience, build the backend foundation, and think beyond launch into long-term scale.", order: 1 },
      { profileId: "startups", label: "Startups", headline: "I build startup-ready products that move fast at the beginning without becoming messy when the product, team, and users expand.", summary: "My focus is shipping quickly, keeping the UX clean, and setting up architecture that can support iterations, deployments, and future complexity.", order: 2 },
      { profileId: "product-teams", label: "Product teams", headline: "I partner with product teams to build fast, clear, and reliable web experiences that connect strong UI with production-ready systems.", summary: "That means thoughtful frontend execution, dependable APIs, and features implemented with performance, maintainability, and scale in mind.", order: 3 },
      { profileId: "developers", label: "Developers", headline: "I build with Next.js, React, Node.js, Express, and TypeScript, creating maintainable applications with clean UI, solid architecture, and smooth deployments.", summary: "My experience includes multi-tenant systems, modular backend design, scalable app structure, and shipping features without letting the codebase drift.", order: 4 },
      { profileId: "ctos", label: "CTOs", headline: "I engineer web platforms with scalable architecture, multi-tenancy patterns, and delivery workflows that support growth without compromising product quality.", summary: "I can contribute across the stack, from frontend craftsmanship to backend services, deployment pipelines, and the decisions that keep systems maintainable.", order: 5 },
    ];
    for (const p of profiles) {
      await ctx.db.insert("audienceProfiles", p);
    }

    // ─── Nav Sections ───
    const navs = [
      { sectionId: "intro", label: "Intro", order: 0 },
      { sectionId: "work", label: "Work", order: 1 },
      { sectionId: "values", label: "Values", order: 2 },
      { sectionId: "references", label: "References", order: 3 },
      { sectionId: "about", label: "About", order: 4 },
    ];
    for (const n of navs) {
      await ctx.db.insert("navSections", n);
    }

    // ─── Values ───
    const vals = ["Useful", "Considered", "Beautiful", "Well made"];
    for (let i = 0; i < vals.length; i++) {
      await ctx.db.insert("values", { text: vals[i], order: i });
    }

    // ─── References ───
    const refs = [
      { name: "Areeba Khan", role: "Founder at Northlane Studio", body: "Shahzaib took our rough vision and turned it into a polished site that felt premium, clear, and ready for clients from day one.", order: 0 },
      { name: "Usman Tariq", role: "Product Manager at FinSolve", body: "Working with Shahzaib was incredibly smooth. He made smart frontend decisions, kept the backend clean, and shipped features without drama.", order: 1 },
      { name: "Zara Hameed", role: "Operations Lead at Meditech", body: "He understood the product quickly, simplified the experience, and built a system that stayed dependable as more users came in.", order: 2 },
      { name: "Bilal Saeed", role: "Co-founder at LaunchGrid", body: "Shahzaib blends design sensitivity with engineering discipline. The product looked better, loaded faster, and became easier for our team to maintain.", order: 3 },
      { name: "Mariam Ali", role: "Marketing Lead at Novacrest", body: "He did not just make the site look good. He gave us a smoother structure, stronger responsiveness, and a web presence that finally matched our brand.", order: 4 },
      { name: "Hassan Raza", role: "CTO at Taskmint", body: "He was comfortable across the stack, thoughtful about architecture, and reliable about turning ambiguous requirements into shippable product work.", order: 5 },
    ];
    for (const r of refs) {
      await ctx.db.insert("references", r);
    }

    // ─── About Content ───
    await ctx.db.insert("aboutContent", { key: "heading", lines: ["I'm Shahzaib Mirza,", "a PK-based Developer"] });
    await ctx.db.insert("aboutContent", { key: "columnTwo", lines: ["I'm a seasoned developer with a", "strong passion for creating intuitive", "& user-friendly digital experiences."] });
    await ctx.db.insert("aboutContent", { key: "columnThree", lines: ["I love collaborating with founders,", "helping them solve UX challenges", "and build solutions."] });
    await ctx.db.insert("aboutContent", { key: "bottomText", lines: ["Let me help with a great visual", "solution for your business."] });

    // ─── Projects ───
    await ctx.db.insert("projects", {
      slug: "trend-bible", kicker: "Trend Bible", title: "Trend Bible",
      summary: "A bold subscription-first editorial platform concept built to package market signals into a high-impact landing page with oversized type, strong hierarchy, and a confident conversion flow.",
      metaLeft: "Editorial platform", metaRight: "UI / Frontend concept",
      accent: "#ff8f12", year: "2025", role: "Full stack concept build",
      client: "Self-initiated concept", duration: "4 weeks",
      stack: ["Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS"],
      reverse: false, order: 0,
    });

    await ctx.db.insert("projects", {
      slug: "visual-poetry", kicker: "Visual Poetry", title: "Visual Poetry",
      summary: "A cinematic portfolio concept for a visual storyteller, designed to balance gallery energy, warm contrast, and a brand-led first impression that feels immersive from the opening screen.",
      metaLeft: "Creative portfolio", metaRight: "Brand-led web concept",
      accent: "#f2aa38", year: "2025", role: "Design system and front-end direction",
      client: "Self-initiated concept", duration: "3 weeks",
      stack: ["Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS"],
      reverse: true, order: 1,
    });

    // ─── Site Content (key-value) ───
    const siteKV = [
      { key: "site.name", value: "SA" },
      { key: "footer.copyright", value: "© 2025 Shahzaib Mirza" },
      { key: "values.description", value: "These are the core values behind the way I build. I care about digital work that solves a real problem, feels intentional in every detail, and stays strong as products grow. I like thinking big, building fast but carefully, staying practical, and creating systems that are not only beautiful on the surface, but dependable underneath. My goal is always the same: make something useful, well made, and built to last." },
    ];
    for (const kv of siteKV) {
      await ctx.db.insert("siteContent", kv);
    }

    return "Seeded successfully";
  },
});
