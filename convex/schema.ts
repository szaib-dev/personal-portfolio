import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Store image references organized by section
  images: defineTable({
    section: v.string(), // e.g. "homepage-about", "trend-bible-hero", "trend-bible-gallery", etc.
    slot: v.string(), // e.g. "primary", "secondary", "gallery-0", "mobile-0", etc.
    storageId: v.id("_storage"),
    url: v.string(),
    filename: v.string(),
    uploadedAt: v.number(),
  }).index("by_section", ["section"])
    .index("by_section_slot", ["section", "slot"]),

  // Admin sessions for authentication
  sessions: defineTable({
    token: v.string(),
    expiresAt: v.number(),
  }).index("by_token", ["token"]),

  settings: defineTable({
    key: v.string(),
    value: v.string(),
    updatedAt: v.number(),
  }).index("by_key", ["key"]),
});
