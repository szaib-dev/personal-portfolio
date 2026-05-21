"use client";

export function ImageSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-[3px] bg-[#f0f0f0] ${className}`} />
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
