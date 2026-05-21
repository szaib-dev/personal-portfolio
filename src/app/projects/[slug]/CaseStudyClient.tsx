"use client";

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
  FiUsers,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { ProjectEntry, CaseStudyBlock, OverviewCard } from "@/data/site-content";
import { getConvexUrlFromEnv } from "@/lib/convex-url";
import { ImageSkeleton } from "@/components/Skeleton";

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

function Block({
  block,
  accent,
  id,
  getImageUrl,
  personaPhotoUrl,
  imagesLoading = false,
}: {
  block: CaseStudyBlock;
  accent: string;
  id?: string;
  getImageUrl?: (index: number, type: "gallery" | "mobile") => string | null;
  personaPhotoUrl?: string | null;
  imagesLoading?: boolean;
}) {

  // Unified two-column grid — 260px left label, right content
  const ROW = "grid grid-cols-[260px_1fr] gap-x-20 border-t border-black/[0.07] py-12 max-[900px]:grid-cols-1 max-[900px]:gap-y-5 max-[900px]:py-8";
  const LABEL = "pt-0.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#888888]";

  switch (block.type) {
    case "overview":
      return (
        <div id={id} data-reveal className={`${ROW} scroll-mt-16`}>
          <div>
            <span className="block text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[#888888]">
              {block.superLabel}
            </span>
            <h2 className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.1] tracking-[-0.05em] text-[#111111]">
              {block.title}
            </h2>
          </div>
          <div>
            <p className="text-[0.96rem] font-[450] leading-[1.82] text-[#1a1a1a]">{block.body}</p>
            <div className="mt-10 border-t border-black/[0.06]" />
            <div className="mt-10 grid grid-cols-2 gap-x-12 gap-y-10 max-[600px]:grid-cols-1">
              {block.cards.map((card) => {
                const Icon = OVERVIEW_ICONS[card.icon];
                return (
                  <div key={card.label}>
                    <Icon aria-hidden="true" className="mb-3 text-[1.2rem] text-[#a0a8d0]" strokeWidth={1.3} />
                    <p className="mb-2 text-[0.9rem] font-semibold tracking-[-0.01em] text-[#111111]">{card.label}</p>
                    {card.body && <p className="text-[0.86rem] leading-[1.75] text-[#666666]">{card.body}</p>}
                    {card.bullets && card.bullets.length > 0 && (
                      <div className="mt-1 grid grid-cols-2 gap-x-4">
                        {card.bullets.map((b) => (
                          <p key={b} className="text-[0.84rem] leading-[2.1] text-[#666666]">· {b}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );

    case "section":
      return (
        <div id={id} data-reveal className={`${ROW} scroll-mt-16`}>
          <div className={LABEL}>{block.label}</div>
          <div>
            <h2 className="text-[1.35rem] font-medium leading-[1.3] tracking-[-0.04em] text-[#111111] max-[768px]:text-[1.2rem]">
              {block.title}
            </h2>
            <p className="mt-5 text-[1rem] leading-[1.82] text-[#444444]">{block.body}</p>
          </div>
        </div>
      );

    case "image":
      return (
        <div data-reveal className={`border-t border-black/[0.07] py-12 ${block.contained ? "max-w-[44rem]" : ""}`}>
          <div className="overflow-hidden rounded-[3px] bg-[#f4f4f4]">
            <ImageSkeleton className="w-full" style={{ aspectRatio: `${block.width} / ${block.height}` }} />
            {block.caption && <p className="px-3 pb-3 pt-2 text-[0.72rem] leading-[1.4] text-[#b0b0b0]">{block.caption}</p>}
          </div>
        </div>
      );

    case "persona":
      return (
        <section id={id} data-reveal className={`${ROW} scroll-mt-16`}>
          <div>
            <FiUsers aria-hidden="true" className="mb-5 text-[1.6rem]" style={{ color: accent }} strokeWidth={1.45} />
            <span className={LABEL}>{block.label}</span>
            <h2 className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)] font-medium leading-[1.1] tracking-[-0.05em] text-[#111111]">{block.title}</h2>
            <p className="mt-4 text-[0.92rem] leading-[1.72] text-[#6a6a6a]">{block.body}</p>
          </div>
          <div className="overflow-hidden rounded-[6px] border border-black/[0.1] bg-[#f3f4f4]">
            <div className="grid grid-cols-[1fr_220px] max-[820px]:grid-cols-1">
              <div className="border-r border-black/[0.1] p-7 max-[820px]:order-2 max-[820px]:border-r-0 max-[820px]:border-t max-[560px]:p-5">
                <p className="text-[clamp(1.15rem,1.8vw,1.6rem)] font-medium leading-[1.25] tracking-[-0.04em] text-[#080808]">
                  <span className="text-[2rem] leading-none text-[#d0d0d0]">&ldquo;</span>{block.quote}<span className="text-[2rem] leading-none text-[#d0d0d0]">&rdquo;</span>
                </p>
                <div className="mt-10 grid grid-cols-2 gap-8 border-t border-dashed border-black/15 pt-8 max-[700px]:grid-cols-1">
                  <div>
                    <div className="mb-5 flex items-center gap-2.5">
                      <FiCheckCircle aria-hidden="true" className="text-[1.1rem]" style={{ color: accent }} />
                      <h3 className="text-[1.1rem] font-semibold tracking-[-0.04em]" style={{ color: accent }}>Goals</h3>
                    </div>
                    <ul className="space-y-4 text-[0.88rem] font-medium leading-[1.55] text-[#343434]">
                      {block.goals.map((goal) => (
                        <li key={goal} className="flex gap-2.5">
                          <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#333333]" />
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-5 flex items-center gap-2.5">
                      <FiAlertTriangle aria-hidden="true" className="text-[1.1rem] text-[#e03030]" />
                      <h3 className="text-[1.1rem] font-semibold tracking-[-0.04em] text-[#e03030]">Frustration</h3>
                    </div>
                    <ul className="space-y-4 text-[0.88rem] font-medium leading-[1.55] text-[#343434]">
                      {block.frustrations.map((f) => (
                        <li key={f} className="flex gap-2.5">
                          <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#333333]" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <aside className="flex flex-col justify-center p-6 max-[820px]:order-1 max-[820px]:items-center max-[820px]:text-center">
                <div className="relative mx-auto h-[10rem] w-[10rem] overflow-hidden rounded-full bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                  {personaPhotoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={personaPhotoUrl} alt={`${block.name} persona portrait`} className="h-full w-full object-cover object-top" />
                  ) : (
                    <ImageSkeleton className="h-full w-full rounded-full" />
                  )}
                </div>
                <div className="mt-6">
                  <h3 className="text-[1.6rem] font-semibold leading-none tracking-[-0.05em] text-[#080808]">{block.name}</h3>
                  <p className="mt-2 text-[0.88rem] font-medium leading-[1.45] text-[#555555]">{block.role}</p>
                </div>
                <dl className="mt-6 grid gap-4 text-[0.85rem] leading-[1.45] max-[820px]:justify-items-center">
                  {block.details.map((detail) => (
                    <div key={detail.label} className="grid grid-cols-[6rem_1fr] gap-3 max-[560px]:grid-cols-1 max-[560px]:gap-0.5">
                      <dt className="text-[#aaaaaa]">{detail.label}:</dt>
                      <dd className="font-semibold text-[#2c2c2c]">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </div>
        </section>
      );

    case "gallery": {
      if (block.columns === 5) {
        const mobileItems = block.images.map((img, i) => ({
          img,
          url: getImageUrl ? getImageUrl(i, "mobile") : null,
          index: i,
        })).filter((item) => imagesLoading || item.url);

        if (mobileItems.length === 0) return null;

        return (
          <div data-reveal className="border-t border-black/[0.07] py-12 overflow-hidden">
            <div className="flex items-end justify-center gap-3 max-[700px]:flex-wrap">
              {mobileItems.map((item) => (
                <div
                  key={item.index}
                  data-project-image
                  className="w-[14rem] flex-shrink-0 max-[1100px]:w-[12.5rem] max-[700px]:w-[10.5rem]"
                  style={{ aspectRatio: "9/19.5", overflow: "hidden" }}
                >
                  {item.url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url as string} alt={item.img.alt} className="block h-full w-full object-cover" />
                  ) : (
                    <ImageSkeleton className="h-full w-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      const cols =
        block.columns === 4 ? "grid-cols-4 max-[900px]:grid-cols-2" :
        block.columns === 3 ? "grid-cols-3 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1" :
        "grid-cols-2 max-[560px]:grid-cols-1";

      const galleryItems = block.images.map((img, i) => ({
        img,
        url: getImageUrl ? getImageUrl(i, "gallery") : null,
        index: i,
      })).filter((item) => imagesLoading || item.url || !block.hideMissing);

      if (galleryItems.length === 0) return null;

      return (
        <div data-reveal className={`grid gap-4 border-t border-black/[0.07] py-12 ${cols}`}>
          {galleryItems.map((item) => (
            <div key={item.index} data-project-image className="aspect-[4/3] overflow-hidden rounded-[3px] bg-[#f4f4f4]">
              {item.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.url as string} alt={item.img.alt} className="block h-full w-full object-cover" />
              ) : (
                <ImageSkeleton className="h-full w-full" />
              )}
              {item.img.caption && <p className="px-3 pb-3 pt-2 text-[0.72rem] leading-[1.4] text-[#b0b0b0]">{item.img.caption}</p>}
            </div>
          ))}
        </div>
      );
    }

    case "palette":
      return (
        <div data-reveal className={ROW}>
          <div className={LABEL}>{block.label}</div>
          <div>
            <h2 className="text-[1.35rem] font-medium leading-[1.3] tracking-[-0.04em] text-[#111111]">{block.title}</h2>
            {block.body && <p className="mt-4 text-[1rem] leading-[1.82] text-[#444444]">{block.body}</p>}
            <div className="mt-8 flex flex-wrap gap-5">
              {block.swatches.map((s) => (
                <div key={s.hex} className="flex flex-col gap-1.5">
                  <div className="h-12 w-[5rem] rounded-[3px] border border-black/[0.06]" style={{ background: s.hex }} />
                  <span className="text-[0.75rem] font-medium text-[#1a1a1a]">{s.name}</span>
                  <span className="font-mono text-[0.68rem] text-[#aaaaaa]">{s.hex}</span>
                  {s.usage && <span className="text-[0.66rem] text-[#cccccc]">{s.usage}</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "typography":
      return (
        <div data-reveal className={ROW}>
          <div className={LABEL}>{block.label}</div>
          <div>
            <h2 className="text-[1.35rem] font-medium leading-[1.3] tracking-[-0.04em] text-[#111111]">{block.title}</h2>
            {block.body && <p className="mt-4 text-[1rem] leading-[1.82] text-[#444444]">{block.body}</p>}
            <div className="mt-8 flex flex-col divide-y divide-black/[0.06]">
              {block.samples.map((s) => (
                <div key={s.name} className="py-6">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-[#c0c0c0]">{s.name}</span>
                    <span className="text-[0.68rem] text-[#dddddd]">{s.family} · {s.weight}</span>
                  </div>
                  <p className="text-[1.35rem] leading-[1.35] tracking-[-0.03em] text-[#111111]">{s.sample}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "quote":
      return (
        <div data-reveal className={ROW}>
          <div />
          <blockquote>
            <p className="text-[1.5rem] font-medium leading-[1.45] tracking-[-0.04em] text-[#111111] max-[768px]:text-[1.2rem]">
              &ldquo;{block.body}&rdquo;
            </p>
            {block.attribution && <footer className="mt-5 text-[0.82rem] text-[#aaaaaa]">— {block.attribution}</footer>}
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

type ConvexImages = {
  heroImageUrl?: string | null;
  galleryImages?: { slot: string; url: string }[];
  mobileImages?: { slot: string; url: string }[];
  personaImageUrl?: string | null;
  imagesLoading?: boolean;
};

export default function CaseStudyClient(props: Props) {
  if (!getConvexUrlFromEnv()) {
    return <CaseStudyContent {...props} />;
  }

  return <CaseStudyWithConvexImages {...props} />;
}

function CaseStudyWithConvexImages({ project, otherProjects }: Props) {
  const heroImage = useQuery(api.images.getBySlot, { section: `${project.slug}-hero`, slot: "hero" });
  const galleryImages = useQuery(api.images.getBySection, { section: `${project.slug}-gallery` });
  const mobileImages = useQuery(api.images.getBySection, { section: `${project.slug}-mobile` });
  const personaImage = useQuery(api.images.getBySlot, { section: `${project.slug}-persona`, slot: "persona" });
  const imagesLoading =
    heroImage === undefined ||
    galleryImages === undefined ||
    mobileImages === undefined ||
    personaImage === undefined;

  return (
    <CaseStudyContent
      project={project}
      otherProjects={otherProjects}
      convexImages={{
        heroImageUrl: heroImage?.url,
        galleryImages,
        mobileImages,
        personaImageUrl: personaImage?.url,
        imagesLoading,
      }}
    />
  );
}

function CaseStudyContent({ project, otherProjects, convexImages }: Props & { convexImages?: ConvexImages }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const heroKickerRef = useRef<HTMLParagraphElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSummaryRef = useRef<HTMLParagraphElement>(null);
  const heroMetaRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  const imagesLoading = convexImages?.imagesLoading ?? false;

  const getGalleryUrl = (index: number) => {
    if (!convexImages?.galleryImages) return null;
    const img = convexImages.galleryImages.find((i) => i.slot === `gallery-${index}`);
    return img?.url ?? null;
  };

  const getMobileUrl = (index: number) => {
    if (!convexImages?.mobileImages) return null;
    const img = convexImages.mobileImages.find((i) => i.slot === `mobile-${index}`);
    return img?.url ?? null;
  };

  /* ── Lenis smooth scroll ── */
  useEffect(() => {
    // Scroll to top on page load/reload
    window.scrollTo(0, 0);
    
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
          { opacity: 0, y: 32, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              end: "bottom 12%",
              toggleActions: "restart none restart reverse",
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-project-image]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 36, scale: 0.94, clipPath: "inset(8% 8% 8% 8%)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              end: "bottom 10%",
              toggleActions: "restart none restart reverse",
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

  const blockImageStarts = project.caseStudyBlocks.reduce<
    { galleryStart: number; mobileStart: number; galleryCount: number; mobileCount: number }[]
  >((starts, block) => {
    const previous = starts[starts.length - 1];
    const galleryStart = previous ? previous.galleryCount : 0;
    const mobileStart = previous ? previous.mobileCount : 0;
    const galleryCount =
      block.type === "gallery" && block.columns !== 5
        ? galleryStart + block.images.length
        : galleryStart;
    const mobileCount =
      block.type === "gallery" && block.columns === 5
        ? mobileStart + block.images.length
        : mobileStart;

    return [...starts, { galleryStart, mobileStart, galleryCount, mobileCount }];
  }, []);

  return (
    <div ref={wrapRef} className="min-h-screen bg-white text-[#111111]">

      {/* ── Project header / nav ── */}
      <nav className="sticky top-0 z-30 border-b border-black/[0.06] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-16 py-3.5 max-[1024px]:px-10 max-[560px]:px-5">

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

      <div className="mx-auto max-w-[1280px] px-16 pb-16 pt-14 max-[1024px]:px-10 max-[700px]:px-6 max-[700px]:pt-10 max-[560px]:px-5">

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
          <div
            ref={heroImageRef}
            className="overflow-hidden rounded-[4px] bg-[#f4f4f4]"
            style={{ aspectRatio: `${project.heroImage.width} / ${project.heroImage.height}` }}
          >
            {convexImages?.heroImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={convexImages.heroImageUrl}
                alt={project.heroImage.alt}
                className="block h-full w-full object-cover"
              />
            ) : (
              <ImageSkeleton className="h-full w-full" />
            )}
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

              const imageStart = blockImageStarts[i];

              const imageUrlGetter = (index: number, type: "gallery" | "mobile") => {
                if (type === "mobile") {
                  return getMobileUrl(imageStart.mobileStart + index);
                }
                return getGalleryUrl(imageStart.galleryStart + index);
              };

              return (
                <Block
                  key={i}
                  block={block}
                  accent={project.accent}
                  id={blockId}
                  getImageUrl={imageUrlGetter}
                  personaPhotoUrl={convexImages?.personaImageUrl}
                  imagesLoading={imagesLoading}
                />
              );
            })}
        </div>

        {/* ── Footer ── */}
        <footer className="mt-32 pb-0">
          <p data-reveal className="max-w-[44rem] text-[clamp(2.35rem,3.05vw,3.35rem)] font-normal leading-[1.12] tracking-[-0.075em] text-[#2b2b2b] max-[560px]:text-[1.8rem]">
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
