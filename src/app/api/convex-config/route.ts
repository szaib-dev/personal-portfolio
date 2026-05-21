import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export function GET() {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL ?? process.env.CONVEX_URL ?? "";

  return NextResponse.json(
    { url },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
