"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center">
        <h2 className="text-[1.4rem] font-semibold tracking-[-0.03em] text-[#111111]">
          Something went wrong
        </h2>
        <p className="mt-2 text-[0.92rem] text-[#666666]">
          An unexpected error occurred.
        </p>
        <button
          onClick={reset}
          className="mt-5 rounded-[6px] bg-[#111111] px-5 py-2.5 text-[0.88rem] font-medium text-white transition-opacity hover:opacity-90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
