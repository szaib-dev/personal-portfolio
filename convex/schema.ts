import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ─── Site-wide content ───
  siteContent: defineTable({
    key: v.string(), // unique key like "nav.siteName", "footer.copyright"
    value: v.string(),
  }).index("by_key", ["key"]),

  // ─── Audience profiles (hero section tabs) ───
  audienceProfiles: defineTable({
    profileId: v.string(),
    label: v.string(),
    headline: v.string(),
    summary: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),

  // ─── Nav sections (sidebar links) ───
  navSections: defineTable({
    sectionId: v.string(),
    label: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),

  // ─── Projects ───
  projects: defineTable({
    slug: v.string(),
    kicker: v.string(),
    title: v.string(),
    summary: v.string(),
    metaLeft: v.string(),
    metaRight: v.string(),
    accent: v.string(),
    year: v.string(),
    role: v.string(),
    client: v.string(),
    duration: v.string(),
    stack: v.array(v.string()),
    reverse: v.boolean(),
    order: v.number(),
  }).index("by_slug", ["slug"])
    .index("by_order", ["order"]),

  // ─── Values section ───
  values: defineTable({
    text: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),

  // ─── References/testimonials ───
  references: defineTable({
    name: v.string(),
    role: v.string(),
    body: v.string(),
    order: v.number(),
  }).index("by_order", ["order"]),

  // ─── About section ───
  aboutContent: defineTable({
    key: v.string(), // "heading", "columnTwo", "columnThree", "bottomText"
    lines: v.array(v.string()),
  }).index("by_key", ["key"]),

  // ─── Images (already exists) ───
  images: defineTable({
    section: v.string(),
    slot: v.string(),
    storageId: v.id("_storage"),
    url: v.string(),
    filename: v.string(),
    uploadedAt: v.number(),
  }).index("by_section", ["section"])
    .index("by_section_slot", ["section", "slot"]),

  // ─── Admin sessions ───
  sessions: defineTable({
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),
});
