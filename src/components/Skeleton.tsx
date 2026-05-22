"use client";

import type { CSSProperties } from "react";

export function ImageSkeleton({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[3px] bg-[#f1f1f1] ${className}`}
      style={style}
    >
      <div className="absolute inset-0 animate-pulse bg-[linear-gradient(180deg,#f6f6f6_0%,#ececec_100%)]" />
      <div className="absolute left-4 top-4 h-2 w-20 rounded-full bg-white/70" />
      <div className="absolute bottom-4 left-4 h-2 w-32 rounded-full bg-white/60" />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse space-y-3 rounded-[6px] border border-[#f0f0f0] p-4">
      <div className="h-40 rounded-[3px] bg-[#f0f0f0]" />
      <div className="h-3 w-2/3 rounded bg-[#f0f0f0]" />
      <div className="h-3 w-1/2 rounded bg-[#f0f0f0]" />
    </div>
  );
}

export function AdminImageSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[4/3] rounded-[5px] bg-[#f0f0f0]" />
      <div className="mt-2 h-8 rounded-[5px] bg-[#f5f5f5]" />
    </div>
  );
}
