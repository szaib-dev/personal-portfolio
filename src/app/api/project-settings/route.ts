import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { getConvexUrlFromEnv } from "@/lib/convex-url";

export async function GET() {
  const convexUrl = getConvexUrlFromEnv();

  if (!convexUrl) {
    return NextResponse.json({ settings: [] });
  }

  try {
    const client = new ConvexHttpClient(convexUrl);
    const settings = await client.query(api.settings.getAll);
    return NextResponse.json({ settings });
  } catch (error) {
    console.error("Failed to load project settings:", error);
    return NextResponse.json({ settings: [] }, { status: 200 });
  }
}
