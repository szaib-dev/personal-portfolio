import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Get all images for a specific section
export const getBySection = query({
  args: { section: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("images")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .collect();
  },
});

// Get a specific image by section and slot
export const getBySlot = query({
  args: { section: v.string(), slot: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("images")
      .withIndex("by_section_slot", (q) =>
        q.eq("section", args.section).eq("slot", args.slot)
      )
      .first();
  },
});

// Get all images (for admin panel)
export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("images").collect();
  },
});

// Generate upload URL for Convex file storage
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Save image reference after upload
export const saveImage = mutation({
  args: {
    section: v.string(),
    slot: v.string(),
    storageId: v.id("_storage"),
    filename: v.string(),
  },
  handler: async (ctx, args) => {
    // Get the URL for the stored file
    const url = await ctx.storage.getUrl(args.storageId);
    if (!url) throw new Error("Failed to get storage URL");

    // Check if there's already an image in this slot
    const existing = await ctx.db
      .query("images")
      .withIndex("by_section_slot", (q) =>
        q.eq("section", args.section).eq("slot", args.slot)
      )
      .first();

    if (existing) {
      // Delete old file from storage
      await ctx.storage.delete(existing.storageId);
      // Update the record
      await ctx.db.patch(existing._id, {
        storageId: args.storageId,
        url,
        filename: args.filename,
        uploadedAt: Date.now(),
      });
      return existing._id;
    }

    // Create new record
    return await ctx.db.insert("images", {
      section: args.section,
      slot: args.slot,
      storageId: args.storageId,
      url,
      filename: args.filename,
      uploadedAt: Date.now(),
    });
  },
});

// Delete an image
export const deleteImage = mutation({
  args: { id: v.id("images") },
  handler: async (ctx, args) => {
    const image = await ctx.db.get(args.id);
    if (!image) throw new Error("Image not found");

    // Delete from storage
    await ctx.storage.delete(image.storageId);
    // Delete record
    await ctx.db.delete(args.id);
  },
});
