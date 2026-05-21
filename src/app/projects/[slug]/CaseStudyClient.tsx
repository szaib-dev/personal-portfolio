"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiArrowRight,
  FiCalendar,
  FiCode,
  FiClock,
  FiUser,
  FiBox,
  FiLayout,
  FiTarget,
  FiUserCheck,
  FiList,
} from "react-icons/fi";
import type { ProjectEntry, CaseStudyBlock, OverviewCard } from "@/data/site-content";

gsap.registerPlugin(ScrollTrigger);

const META_ICONS: Record<string, React.ElementType> = {
  Role: FiUser,
  Client: FiBox,
  Format: FiLayout,
  Duration: FiClock,
  Stack: FiCode,
  Year: FiCalendar,
};

const OVERVIEW_ICONS: Record<OverviewCard["icon"], React.ElementType> = {
  problem: FiAlertCircle,
  goal: FiTarget,
  role: FiUserCheck,
  responsibilities: FiList,
};

function Block({ block, accent, id }: { block: CaseStudyBlock; accent: string; id?: string }) {
  switch (block.type) {
    case "overview":
      return (
        <div id={id} data-reveal className="scroll-mt-16 pt-16 pb-4">
          <div className="grid grid-cols-[32%_1fr] gap-20 max-[768px]:grid-cols-1 max-[768px]:gap-8">

            {/* Left — label + heading only */}
            <div>
              <span className="block text-[0.82rem] leading-[1.4] text-[#aaaaaa]">
                {block.superLabel}
              </span>
              <h2 className="mt-2 text-[clamp(1.85rem,3.4vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.06em] text-[#111111]">
                {block.title}
              </h2>
            </div>

            {/* Right — description + divider + 2×2 grid */}
            <div>
              {/* Description */}
              <p className="text-[0.96rem] font-[450] leading-[1.82] text-[#1a1a1a]">
                {block.body}
              </p>

              {/* Subtle divider */}
              <div className="mt-10 border-t border-black/[0.06]" />

              {/* 2×2 info blocks */}
              <div className="mt-10 grid grid-cols-2 gap-x-16 gap-y-12 max-[600px]:grid-cols-1 max-[600px]:gap-y-10">
                {block.cards.map((card) => {
                  const Icon = OVERVIEW_ICONS[card.icon];
                  return (
                    <div key={card.label}>
                      <Icon
                        aria-hidden="true"
                        className="mb-4 text-[1.35rem] text-[#a0a8d0]"
                        strokeWidth={1.3}
                      />
                      <p className="mb-2.5 text-[0.95rem] font-semibold tracking-[-0.01em] text-[#111111]">
                        {card.label}
                      </p>
                      {card.body && (
                        <p className="max-w-[24rem] text-[0.88rem] leading-[1.75] text-[#666666]">
                          {card.body}
                        </p>
                      )}
                      {card.bullets && card.bullets.length > 0 && (
                        <div className="mt-1 grid grid-cols-2 gap-x-6">
                          {card.bullets.map((b) => (
                            <p key={b} className="text-[0.86rem] leading-[2.1] text-[#666666]">
                              · {b}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      );

    case "section":
      return (
        <div
          id={id}
          data-reveal
          className="scroll-mt-16 grid grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] gap-12 border-t border-black/[0.07] py-12 max-[768px]:grid-cols-1 max-[768px]:gap-5"
        >
          <div className="pt-0.5">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#c0c0c0]">
              {block.label}
            </span>
          </div>
          <div className="max-w-[44rem]">
            <h2 className="text-[1.4rem] font-medium leading-[1.3] tracking-[-0.04em] text-[#111111] max-[768px]:text-[1.2rem]">
              {block.title}
            </h2>
            <p className="mt-5 text-[1rem] leading-[1.82] text-[#444444]">{block.body}</p>
          </div>
        </div>
      );

    case "image":
      return (
        <div
          data-reveal
          className={`py-8 ${block.contained ? "mx-auto max-w-[52rem]" : ""}`}
        >
          <div className="overflow-hidden rounded-[3px] bg-[#f4f4f4]">
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              className="block h-auto w-full"
            />
          </div>
          {block.caption && (
            <p className="mt-3 text-[0.78rem] leading-[1.5] text-[#b0b0b0]">
              {block.caption}
            </p>
          )}
        </div>
      );

    case "gallery": {
      /* 5+ columns = mobile mockup row — actual screenshots in mobile format */
      if (block.columns === 5) {
        return (
          <div data-reveal className="flex items-end justify-center gap-4 py-8 max-[900px]:flex-wrap">
            {block.images.map((img, i) => (
              <div
                key={i}
                className="w-[12rem] flex-shrink-0 shadow-[0_10px_30px_rgba(0,0,0,0.1)] max-[1100px]:w-[11rem] max-[900px]:w-[10rem] max-[560px]:w-[9rem]"
                style={{ aspectRatio: "9/19.5" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  className="block h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        );
      }

      const cols =
        block.columns === 4
          ? "grid-cols-4 max-[900px]:grid-cols-2"
          : block.columns === 3
          ? "grid-cols-3 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1"
          : "grid-cols-2 max-[560px]:grid-cols-1";
      return (
        <div data-reveal className={`grid gap-4 py-8 ${cols}`}>
          {block.images.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-[3px] bg-[#f4f4f4]">
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                className="block h-auto w-full"
              />
              {img.caption && (
                <p className="px-3 pb-3 pt-2 text-[0.72rem] leading-[1.4] text-[#b0b0b0]">
                  {img.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    }

    case "palette":
      return (
        <div
          data-reveal
          className="grid grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] gap-12 border-t border-black/[0.07] py-12 max-[768px]:grid-cols-1 max-[768px]:gap-5"
        >
          <div className="pt-0.5">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#c0c0c0]">
              {block.label}
            </span>
          </div>
          <div className="max-w-[44rem]">
            <h2 className="text-[1.4rem] font-medium leading-[1.3] tracking-[-0.04em] text-[#111111]">
              {block.title}
            </h2>
            {block.body && (
              <p className="mt-4 text-[1rem] leading-[1.82] text-[#444444]">{block.body}</p>
            )}
            <div className="mt-8 flex flex-wrap gap-5">
              {block.swatches.map((s) => (
                <div key={s.hex} className="flex flex-col gap-1.5">
                  <div
                    className="h-12 w-[5rem] rounded-[3px] border border-black/[0.06]"
                    style={{ background: s.hex }}
                  />
                  <span className="text-[0.75rem] font-medium text-[#1a1a1a]">{s.name}</span>
                  <span className="font-mono text-[0.68rem] text-[#aaaaaa]">{s.hex}</span>
                  {s.usage && (
                    <span className="text-[0.66rem] text-[#cccccc]">{s.usage}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "typography":
      return (
        <div
          data-reveal
          className="grid grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] gap-12 border-t border-black/[0.07] py-12 max-[768px]:grid-cols-1 max-[768px]:gap-5"
        >
          <div className="pt-0.5">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#c0c0c0]">
              {block.label}
            </span>
          </div>
          <div className="max-w-[44rem]">
            <h2 className="text-[1.4rem] font-medium leading-[1.3] tracking-[-0.04em] text-[#111111]">
              {block.title}
            </h2>
            {block.body && (
              <p className="mt-4 text-[1rem] leading-[1.82] text-[#444444]">{block.body}</p>
            )}
            <div className="mt-8 flex flex-col divide-y divide-black/[0.06]">
              {block.samples.map((s) => (
                <div key={s.name} className="py-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#c0c0c0]">
                      {s.name}
                    </span>
                    <span className="text-[0.68rem] text-[#dddddd]">
                      {s.family} · {s.weight}
                    </span>
                  </div>
                  <p className="text-[1.35rem] leading-[1.35] tracking-[-0.03em] text-[#111111]">
                    {s.sample}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "quote":
      return (
        <div data-reveal className="border-t border-black/[0.07] py-12">
          <blockquote className="max-w-[40rem]">
            <p className="text-[1.5rem] font-medium leading-[1.45] tracking-[-0.04em] text-[#111111] max-[768px]:text-[1.2rem]">
              &ldquo;{block.body}&rdquo;
            </p>
            {block.attribution && (
              <footer className="mt-5 text-[0.82rem] text-[#aaaaaa]">
                — {block.attribution}
              </footer>
            )}
          </blockquote>
        </div>
      );

    default:
      return null;
  }
}

type Props = {
  project: ProjectEntry;
  otherProjects: ProjectEntry[];
};

export default function CaseStudyClient({ project, otherProjects }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const heroKickerRef = useRef<HTMLParagraphElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSummaryRef = useRef<HTMLParagraphElement>(null);
  const heroMetaRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.05,
    });
    let frame = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  /* ── Hero entrance ── */
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    gsap.set(
      [heroKickerRef.current, heroTitleRef.current, heroSummaryRef.current, heroMetaRef.current],
      { opacity: 0, y: 24 }
    );
    gsap.set(heroImageRef.current, { opacity: 0, y: 20, scale: 0.97 });

    tl.to(heroKickerRef.current, { opacity: 1, y: 0, duration: 0.55 })
      .to(heroTitleRef.current, { opacity: 1, y: 0, duration: 0.7 }, "-=0.32")
      .to(heroSummaryRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.38")
      .to(heroMetaRef.current, { opacity: 1, y: 0, duration: 0.55 }, "-=0.32")
      .to(heroImageRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, []);

  /* ── Scroll reveals ── */
  useEffect(() => {
    if (!wrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              end: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  const metaItems = [
    { label: "Role", value: project.role },
    { label: "Client", value: project.client },
    { label: "Format", value: project.metaLeft },
    { label: "Duration", value: project.duration },
    { label: "Stack", value: project.stack.join(" · ") },
    { label: "Year", value: project.year },
  ];

  return (
    <div ref={wrapRef} className="min-h-screen bg-white px-8 pb-0 pt-7 text-[#111111] max-[1024px]:px-5 max-[560px]:px-4">

      {/* ── Project header / nav ── */}
      <nav className="sticky top-0 z-30 -mx-8 border-b border-black/[0.06] bg-white/95 px-8 backdrop-blur-md max-[1024px]:-mx-5 max-[1024px]:px-5 max-[560px]:-mx-4 max-[560px]:px-4">
        <div className="mx-auto flex max-w-[86rem] items-center justify-between py-3.5">

          {/* Left — Works with grid icon */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-[0.9rem] font-medium text-[#111111] transition-colors hover:text-[#555555]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="text-[#111111] group-hover:text-[#555555] transition-colors"
            >
              <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
            </svg>
            Works
          </Link>

          {/* Center — collapse arrow (hidden on mobile) */}
          <button
            type="button"
            aria-label="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-7 w-7 items-center justify-center text-[#cccccc] transition-colors hover:text-[#111111] max-[560px]:hidden"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M7 2 L12 8 M7 2 L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Right — nav links with hover animation */}
          <div className="flex items-center gap-7 max-[560px]:gap-4">
            {[
              {
                label: "Overview",
                /* 4-square grid icon */
                icon: (
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="#111111" strokeWidth="1.2" />
                    <rect x="8.5" y="1" width="5.5" height="5.5" rx="1" stroke="#111111" strokeWidth="1.2" />
                    <rect x="1" y="8.5" width="5.5" height="5.5" rx="1" stroke="#111111" strokeWidth="1.2" />
                    <rect x="8.5" y="8.5" width="5.5" height="5.5" rx="1" stroke="#111111" strokeWidth="1.2" />
                  </svg>
                ),
              },
              {
                label: "Research",
                /* Magnifier icon */
                icon: (
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <circle cx="6.5" cy="6.5" r="4.5" stroke="#111111" strokeWidth="1.2" />
                    <path d="M10 10l3.5 3.5" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                label: "Outcome",
                /* Checkmark in circle icon */
                icon: (
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <circle cx="7.5" cy="7.5" r="6" stroke="#111111" strokeWidth="1.2" />
                    <path d="M4.5 7.5l2 2 4-4" stroke="#111111" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
            ].map((item) => (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase()}`}
                className="group relative flex h-5 w-max items-center overflow-hidden"
              >
                {/* Text — slides up on hover */}
                <span className="flex h-5 items-center text-[0.85rem] text-[#666666] transition-transform duration-[280ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-5">
                  {item.label}
                </span>
                {/* Icon — rises from below on hover */}
                <span className="absolute inset-0 flex h-5 items-center justify-center translate-y-5 transition-transform duration-[280ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0">
                  {item.icon}
                </span>
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-[86rem] pb-16 pt-14 max-[700px]:pt-10">

        {/* ── Hero ── */}
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] items-start gap-16 max-[960px]:grid-cols-1 max-[960px]:gap-10">

          {/* Left */}
          <div>
            <p
              ref={heroKickerRef}
              className="text-[0.78rem] font-semibold uppercase tracking-[0.16em]"
              style={{ color: project.accent }}
            >
              Case Study
            </p>

            <h1
              ref={heroTitleRef}
              className="mt-4 text-[clamp(3.2rem,6.5vw,5.8rem)] font-medium leading-[0.92] tracking-[-0.07em]"
            >
              {project.title}
            </h1>

            <p
              ref={heroSummaryRef}
              className="mt-6 max-w-[34rem] text-[1.05rem] leading-[1.78] text-[#555555]"
            >
              {project.summary}
            </p>

            {/* Meta */}
            <div
              ref={heroMetaRef}
              className="mt-10 grid grid-cols-3 gap-x-8 gap-y-7 border-t border-black/[0.07] pt-8 max-[480px]:grid-cols-2"
            >
              {metaItems.map((item) => {
                const Icon = META_ICONS[item.label] ?? FiBox;
                return (
                  <div key={item.label}>
                    <div className="mb-2 flex items-center gap-1.5">
                      <Icon
                        aria-hidden="true"
                        className="text-[0.78rem]"
                        style={{ color: project.accent }}
                      />
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#c0c0c0]">
                        {item.label}
                      </span>
                    </div>
                    <p className="text-[0.92rem] leading-[1.5] text-[#1a1a1a]">{item.value}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: hero image */}
          <div ref={heroImageRef} className="overflow-hidden rounded-[4px] bg-[#f4f4f4]">
            <Image
              src={project.heroImage.src}
              alt={project.heroImage.alt}
              width={project.heroImage.width}
              height={project.heroImage.height}
              className="block h-auto w-full"
              priority
            />
          </div>
        </div>

        {/* ── Case study blocks ── */}
        <div className="mt-12">
          {project.caseStudyBlocks.map((block, i) => {
            // Assign IDs for nav anchors
            let blockId: string | undefined;
            if (block.type === "overview") blockId = "overview";

            // "Research" link → Style System section
            if (block.type === "section" || block.type === "palette" || block.type === "typography") {
              const label = "label" in block ? (block.label as string).toLowerCase() : "";
              if (label.includes("style system") || label.includes("color palette")) {
                blockId = "research";
              }
              if (label.includes("final design")) {
                blockId = "outcome";
              }
            }

            return <Block key={i} block={block} accent={project.accent} id={blockId} />;
          })}
        </div>

        {/* ── Footer ── */}
        <footer data-reveal className="mt-32 pb-0">
          <p className="max-w-[44rem] text-[clamp(2.35rem,3.05vw,3.35rem)] font-normal leading-[1.12] tracking-[-0.075em] text-[#2b2b2b] max-[560px]:text-[1.8rem]">
            Let me help with a great visual
            <br />
            solution for your business.
          </p>

          <div className="mt-16 flex items-center justify-between border-t border-black/[0.07] pt-9">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[0.92rem] text-[#888888] transition-colors hover:text-[#111111]"
            >
              <FiArrowLeft
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              Back to portfolio
            </Link>

            {/* Back to top button — mobile only, icon only */}
            <button
              type="button"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hidden h-7 w-7 items-center justify-center text-[#888888] transition-colors hover:text-[#111111] max-[560px]:flex"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M7 2 L12 8 M7 2 L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className="flex flex-wrap gap-6">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projects/${p.slug}`}
                  className="group inline-flex items-center gap-1.5 text-[0.92rem] text-[#aaaaaa] transition-colors hover:text-[#111111]"
                >
                  {p.title}
                  <FiArrowRight
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
