import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Simple auth: validate credentials against environment variables
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // Hardcoded credentials (secure since this runs server-side on Convex)
    const adminEmail = process.env.ADMIN_EMAIL!;
    const adminPassword = process.env.ADMIN_PASSWORD!;

    if (!adminEmail || !adminPassword) {
      throw new Error("Admin credentials not configured in environment variables");
    }

    if (args.email !== adminEmail || args.password !== adminPassword) {
      throw new Error("Invalid credentials");
    }

    // Generate a session token
    const token = crypto.randomUUID() + "-" + crypto.randomUUID();
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

    await ctx.db.insert("sessions", { token, expiresAt });

    return { token, expiresAt };
  },
});

export const validateSession = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (!session) return { valid: false };
    if (session.expiresAt < Date.now()) return { valid: false };

    return { valid: true };
  },
});

export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();

    if (session) {
      await ctx.db.delete(session._id);
    }
  },
});
