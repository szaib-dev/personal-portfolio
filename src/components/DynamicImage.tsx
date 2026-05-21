"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getConvexUrlFromEnv } from "@/lib/convex-url";
import { ImageSkeleton } from "@/components/Skeleton";

type Props = {
  section: string;
  slot: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

/**
 * Image component that pulls from Convex storage if available.
 * Missing or loading images render as skeletons instead of static fallbacks.
 */
export default function DynamicImage({
  section,
  slot,
  alt,
  width,
  height,
  className,
  priority,
}: Props) {
  if (!getConvexUrlFromEnv()) {
    return <ImageSkeleton className={className} style={{ aspectRatio: `${width} / ${height}` }} />;
  }

  return (
    <DynamicConvexImage
      section={section}
      slot={slot}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}

function DynamicConvexImage({
  section,
  slot,
  alt,
  width,
  height,
  className,
  priority,
}: Props) {
  const image = useQuery(api.images.getBySlot, { section, slot });

  if (image?.url) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image.url}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return <ImageSkeleton className={className} style={{ aspectRatio: `${width} / ${height}` }} />;
}
