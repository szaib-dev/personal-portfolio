import { ConvexHttpClient } from "convex/browser";
import { NextResponse } from "next/server";
import { api } from "../../../../convex/_generated/api";
import { getConvexUrlFromEnv } from "@/lib/convex-url";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const convexUrl = getConvexUrlFromEnv();

  if (!convexUrl) {
    return NextResponse.json(
      { settings: [] },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }

  try {
    const client = new ConvexHttpClient(convexUrl);
    const settings = await client.query(api.settings.list);
    return NextResponse.json(
      { settings },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("Failed to load project settings:", error);
    return NextResponse.json(
      { settings: [] },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  }
}
