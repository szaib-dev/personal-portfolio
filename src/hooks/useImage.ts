"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

/**
 * Hook to get an image URL from Convex with fallback to static path.
 * If no image is uploaded in Convex for this section/slot, returns the fallback.
 */
export function useImage(section: string, slot: string, fallback: string): string {
  const image = useQuery(api.images.getBySlot, { section, slot });
  return image?.url ?? fallback;
}

/**
 * Hook to get all images for a section from Convex.
 * Returns a map of slot -> url, with fallbacks applied.
 */
export function useSectionImages(
  section: string,
  fallbacks: Record<string, string>
): Record<string, string> {
  const images = useQuery(api.images.getBySection, { section });

  const result: Record<string, string> = { ...fallbacks };

  if (images) {
    for (const img of images) {
      result[img.slot] = img.url;
    }
  }

  return result;
}
