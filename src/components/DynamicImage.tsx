"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getConvexUrlFromEnv } from "@/lib/convex-url";

type Props = {
  section: string;
  slot: string;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

/**
 * Image component that pulls from Convex storage if available,
 * otherwise falls back to the static /public path.
 */
export default function DynamicImage({
  section,
  slot,
  fallbackSrc,
  alt,
  width,
  height,
  className,
  priority,
}: Props) {
  if (!getConvexUrlFromEnv()) {
    return (
      <Image
        src={fallbackSrc}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
      />
    );
  }

  return (
    <DynamicConvexImage
      section={section}
      slot={slot}
      fallbackSrc={fallbackSrc}
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
  fallbackSrc,
  alt,
  width,
  height,
  className,
  priority,
}: Props) {
  const image = useQuery(api.images.getBySlot, { section, slot });

  const src = image?.url ?? fallbackSrc;

  // If using Convex URL (remote), we need unoptimized or use remotePatterns
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

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
