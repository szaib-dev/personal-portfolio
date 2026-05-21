import { NextResponse } from "next/server";
import { getConvexUrlFromEnv } from "@/lib/convex-url";

export const dynamic = "force-dynamic";

export function GET() {
  const url = getConvexUrlFromEnv();

  return NextResponse.json(
    { url },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
