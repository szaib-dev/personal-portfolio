export function normalizeConvexUrl(url: string | undefined) {
  const value = url?.trim();
  if (!value) return "";

  return value.replace(".convex.site", ".convex.cloud");
}

export function getConvexUrlFromEnv() {
  return normalizeConvexUrl(
    process.env.NEXT_PUBLIC_CONVEX_URL ??
      process.env.NEXT_PUBLIC_CONVEX_SITE_URL ??
      process.env.CONVEX_URL
  );
}
