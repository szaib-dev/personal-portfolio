"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { RiDoubleQuotesL } from "react-icons/ri";
import {
  aboutContent,
  audienceProfiles,
  navSections,
  projectEntries,
  referenceCards,
  values,
} from "@/data/site-content";

gsap.registerPlugin(ScrollTrigger);

const TESTIMONIALS_PER_PAGE = 3;

export default function Home() {
  const [activeAudience, setActiveAudience] = useState(audienceProfiles[0].id);
  const [activeSection, setActiveSection] = useState(navSections[0].id);
  const [activeReferencePage, setActiveReferencePage] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [introText, setIntroText] = useState("Shahzaib Mirza");
  const contentRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const introNameRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const referencePages = useMemo(
    () =>
      Array.from(
        { length: Math.ceil(referenceCards.length / TESTIMONIALS_PER_PAGE) },
        (_, index) =>
          referenceCards.slice(
            index * TESTIMONIALS_PER_PAGE,
            index * TESTIMONIALS_PER_PAGE + TESTIMONIALS_PER_PAGE
          )
      ),
    []
  );

  const activeProfile =
    audienceProfiles.find((profile) => profile.id === activeAudience) ??
    audienceProfiles[0];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.05,
    });

    let frame = 0;

    const raf = (time: number) => {
      lenis.raf(time);
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

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(contentRef.current, {
          clearProps: "transform,opacity",
        });
        setShowIntro(false);
        ScrollTrigger.refresh();
      },
    });

    gsap.set(contentRef.current, {
      opacity: 0,
      y: -100,
    });

    timeline
      .fromTo(
        introNameRef.current,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: "power2.out",
        }
      )
      .to(introNameRef.current, {
        opacity: 0,
        y: -18,
        duration: 0.24,
        ease: "power2.in",
        delay: 0.18,
        onComplete: () => {
          setIntroText("5+ years of experience");
        },
      })
      .fromTo(
        introNameRef.current,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.36,
          ease: "power2.out",
        }
      )
      .to(introNameRef.current, {
        opacity: 0,
        y: -18,
        duration: 0.24,
        ease: "power2.in",
        delay: 0.16,
      })
      .to(
        introRef.current,
        {
          opacity: 0,
          duration: 0.16,
          ease: "power1.out",
        },
        "<"
      )
      .to(
        contentRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.82,
          ease: "power3.out",
        },
        "-=0.02"
      );

    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(() => {
    if (!headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      }
    );
  }, [activeAudience]);

  useEffect(() => {
    const syncActiveSection = () => {
      const sections = navSections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean) as HTMLElement[];

      const scrollPoint = window.scrollY + window.innerHeight * 0.38;
      let currentSection = sections[0]?.id ?? "intro";

      sections.forEach((section) => {
        if (section.offsetTop <= scrollPoint) {
          currentSection = section.id;
        }
      });

      setActiveSection(currentSection);
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);

    return () => {
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const groups = gsap.utils.toArray<HTMLElement>("[data-stagger-group]");
      const valueLines = gsap.utils.toArray<HTMLElement>("[data-value-line]");

      reveals.forEach((element) => {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
              once: true,
            },
          }
        );
      });

      groups.forEach((group) => {
        const children = Array.from(group.children) as HTMLElement[];

        gsap.fromTo(
          children,
          {
            opacity: 0,
            y: 22,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
              once: true,
            },
          }
        );
      });

      if (valueLines.length) {
        gsap.fromTo(
          valueLines,
          {
            opacity: 0,
            y: 34,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.82,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valueLines[0].parentElement,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white px-8 pb-24 pt-7 text-[#121212] max-[1024px]:px-5 max-[1024px]:pb-16 max-[560px]:px-4 max-[560px]:pb-14">
      {showIntro && (
        <div
          ref={introRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          <p
            ref={introNameRef}
            className="text-center text-[clamp(2.75rem,6vw,5rem)] font-medium leading-[0.95] tracking-[-0.07em]"
          >
            {introText}
          </p>
        </div>
      )}

      <div ref={contentRef} className="relative">
        <aside className="fixed left-7 top-48 z-20 flex flex-col gap-[0.08rem] max-[1024px]:static max-[1024px]:mb-10 max-[1024px]:mt-16 max-[560px]:hidden">
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`text-[1.32rem] font-normal leading-[1.6rem] tracking-[-0.055em] transition-colors max-[1024px]:text-[1.15rem] max-[1024px]:leading-[1.45rem] max-[560px]:text-[1.05rem] max-[560px]:leading-[1.35rem] ${
                activeSection === section.id ? "text-[#111111]" : "text-[#b8b8b8]"
              }`}
            >
              {section.label}
            </a>
          ))}
        </aside>

        <section
          id="intro"
          data-section
          className="ml-[clamp(16.125rem,28vw,29.125rem)] min-h-screen w-[min(calc(100%-clamp(16.125rem,28vw,29.125rem)-2rem),49rem)] scroll-mt-8 pt-[5.15rem] max-[1024px]:ml-0 max-[1024px]:w-full max-[1024px]:min-h-0 max-[1024px]:pt-0"
        >
          <div className="flex w-[min(100%,43rem)] flex-wrap items-center gap-x-[1.15rem] gap-y-2 max-[1024px]:w-full">
            {audienceProfiles.map((profile) => {
              const isActive = profile.id === activeAudience;

              return (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => setActiveAudience(profile.id)}
                  className={`mt-20 bg-transparent p-0 text-[0.88rem] leading-[1.2] transition-colors ${
                    isActive ? "font-semibold text-[#121212]" : "text-[#a8a8a8]"
                  }`}
                >
                  {profile.label}
                </button>
              );
            })}
          </div>

          <div className="w-[min(100%,43rem)] pt-[1.35rem] max-[1024px]:w-full">
            <h1
              ref={headingRef}
              className="mt-5 max-w-[42rem] text-[clamp(1.78rem,3.6vw,4rem)] font-medium leading-none tracking-[-0.07em] max-[1024px]:text-[clamp(2.1rem,6vw,3.6rem)] max-[560px]:text-[clamp(2rem,9vw,3rem)]"
            >
              {activeProfile.headline}
            </h1>

            <p className="mt-[1.15rem] max-w-[35rem] text-base leading-[1.55] text-[#5f5f5f] max-[560px]:text-[0.95rem]">
              {activeProfile.summary}
            </p>
          </div>
        </section>

        <section
          id="work"
          data-section
          className="ml-[clamp(16.125rem,28vw,29.125rem)] w-[min(calc(100%-clamp(16.125rem,28vw,29.125rem)-2rem),82rem)] scroll-mt-8 pt-12 max-[1024px]:ml-0 max-[1024px]:w-full max-[1024px]:pt-20"
        >
          {projectEntries.map((project) => (
            <article
              key={project.slug}
              data-stagger-group
              className={`grid items-center gap-12 border-t border-black/10 py-[3.25rem] ${
                project.reverse
                  ? "grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] max-[1220px]:grid-cols-1"
                  : "grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] max-[1220px]:grid-cols-1"
              }`}
            >
              <div className={`${project.reverse ? "order-2 max-[1220px]:order-none" : ""} max-w-[26rem]`}>
                <p
                  className="text-[0.92rem] font-semibold tracking-[-0.02em]"
                  style={{ color: project.accent }}
                >
                  {project.kicker}
                </p>
                <h2 className="mt-[0.55rem] text-[clamp(2.8rem,3.9vw,4rem)] font-medium leading-[0.95] tracking-[-0.06em]">
                  {project.title}
                </h2>
                <p className="mt-[1.45rem] text-[1.12rem] leading-[1.68] text-[#454545]">
                  {project.summary}
                </p>

                <div className="mt-7 grid grid-cols-2 gap-4 border-t border-dashed border-black/20 pt-5 text-[#1d1d1d]">
                  <span className="text-base">{project.metaLeft}</span>
                  <span className="text-base">{project.metaRight}</span>
                </div>
              </div>

              <Link
                href={`/projects/${project.slug}`}
                aria-label={`Open ${project.title} case study`}
                className={`${project.reverse ? "order-1 max-[1220px]:order-none" : ""} block cursor-pointer`}
              >
                <Image
                  src={project.image}
                  alt={`${project.title} project preview`}
                  width={project.width}
                  height={project.height}
                  priority={project.slug === "trend-bible"}
                  className="block h-auto w-full transition-transform duration-500 ease-out hover:-translate-y-1"
                />
              </Link>
            </article>
          ))}
        </section>

        <section
          id="values"
          data-section
          className="relative ml-[clamp(16.125rem,28vw,29.125rem)] mt-[60px] min-h-[38rem] w-[min(calc(100%-clamp(16.125rem,28vw,29.125rem)-2rem),82rem)] scroll-mt-8 pb-11 pt-4 max-[1220px]:min-h-0 max-[1220px]:pb-0 max-[1220px]:pt-20 max-[1024px]:ml-0 max-[1024px]:w-full"
        >
          <div
            data-stagger-group
            className="absolute left-[clamp(6.6rem,8.2vw,8.85rem)] top-0 mt-5 max-w-[29rem] max-[1220px]:static max-[1220px]:mt-0 max-[1220px]:max-w-full"
          >
            {values.map((value) => (
              <span
                key={value}
                data-value-line
                className="block text-[clamp(4.65rem,6.35vw,6.65rem)] font-medium leading-[0.9] tracking-[-0.08em] max-[560px]:text-[clamp(3.5rem,16vw,5.2rem)]"
              >
                {value}
              </span>
            ))}
          </div>

          <div
            data-reveal
            className="absolute bottom-16 right-2 w-[min(100%,42rem)] text-[0.95rem] leading-[1.58] text-[#1f1f1f] max-[1220px]:static max-[1220px]:mt-8 max-[1220px]:w-full max-[1220px]:max-w-full max-[560px]:text-base"
          >
            <p>
              These are the core values behind the way I build. I care about
              digital work that solves a real problem, feels intentional in every
              detail, and stays strong as products grow. I like thinking big,
              building fast but carefully, staying practical, and creating
              systems that are not only beautiful on the surface, but dependable
              underneath. My goal is always the same: make something useful, well
              made, and built to last.
            </p>
          </div>
        </section>

        <section
          id="references"
          data-section
          className="ml-[clamp(16.125rem,28vw,29.125rem)] w-[min(calc(100%-clamp(16.125rem,28vw,29.125rem)-2rem),82rem)] scroll-mt-8 border-t border-black/10 pt-8 max-[1024px]:ml-0 max-[1024px]:w-full"
        >
          <div data-reveal className="relative pt-[6.1rem] max-[1024px]:pt-14 max-[560px]:mx-auto max-[560px]:max-w-[22rem]">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-[550ms] ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{
                  transform: `translateX(-${activeReferencePage * 100}%)`,
                }}
              >
                {referencePages.map((page, pageIndex) => (
                  <div
                    key={pageIndex}
                    className="box-border grid min-w-full grid-cols-3 gap-[3.25rem] pr-[9.5rem] max-[1220px]:grid-cols-2 max-[1220px]:gap-9 max-[1220px]:pr-24 max-[768px]:grid-cols-1 max-[768px]:gap-8 max-[768px]:pr-0"
                  >
                    {page.map((card, cardIndex) => (
                      <article key={card.name} className="relative min-h-[13.75rem] max-[768px]:mx-auto max-[768px]:w-full max-[768px]:max-w-[22rem]">
                        {cardIndex > 0 && (
                          <FiPlus
                            aria-hidden="true"
                            className="absolute left-[-2rem] top-[0.15rem] text-[1.5rem] text-[#d2d2d2] max-[1220px]:hidden"
                          />
                        )}

                        <div className="mb-3">
                          <p className="text-[0.8rem] font-semibold leading-[1.2] tracking-[-0.02em]">
                            {card.name}
                          </p>
                          <p className="mt-[0.16rem] text-[0.74rem] leading-[1.3] text-[#8f8f8f]">
                            {card.role}
                          </p>
                        </div>

                        <RiDoubleQuotesL
                          aria-hidden="true"
                          className="text-[1.7rem] text-[#dddddd]"
                        />

                        <p className="mt-[0.08rem] max-w-[18rem] text-[0.92rem] leading-[1.48] tracking-[-0.03em] text-[#242424] max-[560px]:text-base">
                          {card.body}
                        </p>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 right-0 w-60 bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.68)_42%,rgba(255,255,255,0.94)_72%,#ffffff_100%)] transition-opacity duration-200 max-[768px]:hidden ${
                activeReferencePage > -1 ? "opacity-100" : "opacity-0"
              }`}
            />

            <button
              type="button"
              onClick={() =>
                setActiveReferencePage(
                  (currentPage) => (currentPage + 1) % referencePages.length
                )
              }
              aria-label="Show next testimonials"
              className="absolute right-[1.1rem] top-[8.55rem] z-[2] inline-flex h-[1.8rem] w-[1.8rem] items-center justify-center bg-transparent text-[1.35rem] text-[#f12d66] transition hover:translate-x-[2px] hover:text-[#dd1f56] max-[768px]:hidden"
            >
              <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        </section>

        <section
          id="about"
          data-section
          className="relative min-h-screen w-full overflow-hidden bg-white px-0 pb-0 pt-0"
        >
          <div className="relative m-0 block h-screen w-full max-[1280px]:grid max-[1280px]:h-auto max-[1280px]:gap-7 max-[1280px]:px-0 max-[1280px]:py-20 max-[560px]:justify-items-center">
            <div
              data-reveal
              className="absolute left-[34.2%] top-[8.6rem] w-[22rem] max-[1280px]:static max-[1280px]:w-full max-[1280px]:max-w-[28rem] max-[560px]:text-center"
            >
              <h2 className="m-0 text-[1.62rem] font-medium leading-[2.08rem] tracking-[-0.065em] text-[#111111]">
                {aboutContent.heading[0]}
                <br />
                {aboutContent.heading[1]}
              </h2>

              <div className="group relative ml-[0.05rem] mt-8 h-[20.75rem] w-[14.5rem] max-[1280px]:ml-0 max-[1280px]:h-[22.25rem] max-[1280px]:w-[16rem] max-[560px]:mx-auto max-[560px]:h-[23rem] max-[560px]:w-[15rem]">
                <div className="absolute inset-0 z-[1] box-border overflow-hidden bg-white p-[14px] shadow-[0_10px_24px_rgba(0,0,0,0.085)] transition-all duration-500 ease-out translate-x-5 translate-y-2 rotate-[4deg] opacity-100 group-hover:z-[3] group-hover:translate-x-[-0.2rem] group-hover:translate-y-0 group-hover:rotate-[-1.5deg] max-[560px]:translate-x-8 max-[560px]:translate-y-4 max-[560px]:rotate-[6deg] max-[560px]:group-hover:translate-x-[-0.35rem]">
                  <Image
                    src={aboutContent.secondaryImage}
                    alt="Alternate portrait of Shahzaib Mirza"
                    width={1200}
                    height={1600}
                    className="block h-full w-full object-cover object-top"
                  />
                </div>

                <div className="absolute inset-0 z-[2] box-border overflow-hidden bg-white p-[14px] shadow-[0_10px_24px_rgba(0,0,0,0.085)] transition-all duration-500 ease-out translate-x-[-0.35rem] group-hover:z-[1] group-hover:translate-x-[0.95rem] group-hover:translate-y-[0.35rem] group-hover:rotate-[3.2deg] max-[560px]:translate-x-[-0.6rem] max-[560px]:translate-y-0 max-[560px]:rotate-0 max-[560px]:group-hover:translate-x-[1.15rem] max-[560px]:group-hover:translate-y-[0.45rem] max-[560px]:group-hover:rotate-[5deg]">
                  <Image
                    src={aboutContent.primaryImage}
                    alt="Portrait of Shahzaib Mirza"
                    width={608}
                    height={658}
                    className="block h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <div
              data-reveal
              className="absolute left-[56.9%] top-[8.6rem] w-[19rem] max-[1280px]:static max-[1280px]:w-full max-[1280px]:max-w-[28rem] max-[560px]:text-center"
            >
              <p className="m-0 text-[1.08rem] font-normal leading-[1.55rem] tracking-[-0.045em] text-[#111111]">
                {aboutContent.columnTwo[0]}
                <br />
                {aboutContent.columnTwo[1]}
                <br />
                {aboutContent.columnTwo[2]}
              </p>
            </div>

            <div
              data-reveal
              className="absolute left-[78.2%] top-[8.6rem] w-[19rem] max-[1280px]:static max-[1280px]:w-full max-[1280px]:max-w-[28rem] max-[560px]:text-center"
            >
              <p className="m-0 text-[1.08rem] font-normal leading-[1.55rem] tracking-[-0.045em] text-[#111111]">
                {aboutContent.columnThree[0]}
                <br />
                {aboutContent.columnThree[1]}
                <br />
                {aboutContent.columnThree[2]}
              </p>
            </div>
          </div>

          <p
            data-reveal
            className="absolute bottom-0 left-9 m-0 max-w-[44rem] text-[clamp(2.35rem,3.05vw,3.35rem)] font-normal leading-[1.12] tracking-[-0.075em] text-[#2b2b2b] max-[1280px]:static max-[1280px]:mt-16 max-[1280px]:max-w-full max-[1280px]:text-[clamp(2rem,8vw,3rem)] max-[560px]:mt-12 max-[560px]:text-center max-[560px]:text-[1.8rem] max-[560px]:leading-[1.12] max-[560px]:tracking-[-0.06em]"
           >
            {aboutContent.bottomText[0]}
            <br />
            {aboutContent.bottomText[1]}
          </p>
        </section>
      </div>
    </main>
  );
}
