import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// ─── Site Content (key-value pairs) ───
export const getAllSiteContent = query({
  handler: async (ctx) => {
    const items = await ctx.db.query("siteContent").collect();
    const map: Record<string, string> = {};
    for (const item of items) {
      map[item.key] = item.value;
    }
    return map;
  },
});

export const setSiteContent = mutation({
  args: { key: v.string(), value: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("siteContent")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value });
    } else {
      await ctx.db.insert("siteContent", { key: args.key, value: args.value });
    }
  },
});

// ─── Audience Profiles ───
export const getAudienceProfiles = query({
  handler: async (ctx) => {
    return await ctx.db.query("audienceProfiles").withIndex("by_order").collect();
  },
});

export const upsertAudienceProfile = mutation({
  args: {
    profileId: v.string(),
    label: v.string(),
    headline: v.string(),
    summary: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("audienceProfiles")
      .filter((q) => q.eq(q.field("profileId"), args.profileId))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("audienceProfiles", args);
    }
  },
});

// ─── Nav Sections ───
export const getNavSections = query({
  handler: async (ctx) => {
    return await ctx.db.query("navSections").withIndex("by_order").collect();
  },
});

export const upsertNavSection = mutation({
  args: {
    sectionId: v.string(),
    label: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("navSections")
      .filter((q) => q.eq(q.field("sectionId"), args.sectionId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("navSections", args);
    }
  },
});

// ─── Projects ───
export const getProjects = query({
  handler: async (ctx) => {
    return await ctx.db.query("projects").withIndex("by_order").collect();
  },
});

export const getProjectBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const upsertProject = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("projects", args);
    }
  },
});

export const deleteProject = mutation({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    const project = await ctx.db
      .query("projects")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
    if (project) await ctx.db.delete(project._id);
  },
});

// ─── Values ───
export const getValues = query({
  handler: async (ctx) => {
    return await ctx.db.query("values").withIndex("by_order").collect();
  },
});

export const upsertValue = mutation({
  args: {
    text: v.string(),
    order: v.number(),
    previousText: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const lookupText = args.previousText || args.text;
    const existing = await ctx.db
      .query("values")
      .filter((q) => q.eq(q.field("text"), lookupText))
      .first();

    const value = { text: args.text, order: args.order };
    if (existing) {
      await ctx.db.patch(existing._id, value);
    } else {
      await ctx.db.insert("values", value);
    }
  },
});

// ─── References ───
export const getReferences = query({
  handler: async (ctx) => {
    return await ctx.db.query("references").withIndex("by_order").collect();
  },
});

export const upsertReference = mutation({
  args: {
    name: v.string(),
    role: v.string(),
    body: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("references")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
    } else {
      await ctx.db.insert("references", args);
    }
  },
});

// ─── About Content ───
export const getAboutContent = query({
  handler: async (ctx) => {
    const items = await ctx.db.query("aboutContent").collect();
    const map: Record<string, string[]> = {};
    for (const item of items) {
      map[item.key] = item.lines;
    }
    return map;
  },
});

export const setAboutContent = mutation({
  args: { key: v.string(), lines: v.array(v.string()) },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("aboutContent")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, { lines: args.lines });
    } else {
      await ctx.db.insert("aboutContent", { key: args.key, lines: args.lines });
    }
  },
});
