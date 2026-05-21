"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useMemo } from "react";
import { getConvexUrlFromEnv } from "@/lib/convex-url";

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(() => {
    const url = getConvexUrlFromEnv();
    if (!url) return null;
    return new ConvexReactClient(url);
  }, []);

  if (!convex) {
    // No Convex URL configured — render children without Convex
    return <>{children}</>;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
