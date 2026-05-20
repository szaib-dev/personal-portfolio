"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FiArrowRight, FiPlus } from "react-icons/fi";
import { RiDoubleQuotesL } from "react-icons/ri";
import styles from "./page.module.css";

const audienceProfiles = [
  {
    id: "everyone",
    label: "For everyone",
    headline:
      "Hello there, I'm Shahzaib Mirza. I build beautiful websites and scalable web systems for businesses that want to grow online.",
    summary:
      "From clean marketing sites to complex platforms, I create web experiences that look sharp, feel smooth, and keep supporting the business as it grows.",
  },
  {
    id: "founders",
    label: "Founders",
    headline:
      "I help founders turn ideas into polished products with websites that earn trust and systems that stay reliable as traction builds.",
    summary:
      "You get a developer who can shape the frontend experience, build the backend foundation, and think beyond launch into long-term scale.",
  },
  {
    id: "startups",
    label: "Startups",
    headline:
      "I build startup-ready products that move fast at the beginning without becoming messy when the product, team, and users expand.",
    summary:
      "My focus is shipping quickly, keeping the UX clean, and setting up architecture that can support iterations, deployments, and future complexity.",
  },
  {
    id: "product-teams",
    label: "Product teams",
    headline:
      "I partner with product teams to build fast, clear, and reliable web experiences that connect strong UI with production-ready systems.",
    summary:
      "That means thoughtful frontend execution, dependable APIs, and features implemented with performance, maintainability, and scale in mind.",
  },
  {
    id: "developers",
    label: "Developers",
    headline:
      "I build with Next.js, React, Node.js, Express, and TypeScript, creating maintainable applications with clean UI, solid architecture, and smooth deployments.",
    summary:
      "My experience includes multi-tenant systems, modular backend design, scalable app structure, and shipping features without letting the codebase drift.",
  },
  {
    id: "ctos",
    label: "CTOs",
    headline:
      "I engineer web platforms with scalable architecture, multi-tenancy patterns, and delivery workflows that support growth without compromising product quality.",
    summary:
      "I can contribute across the stack, from frontend craftsmanship to backend services, deployment pipelines, and the decisions that keep systems maintainable.",
  },
];

const navSections = [
  { id: "intro", label: "Intro" },
  { id: "work", label: "Work" },
  { id: "values", label: "Values" },
  { id: "references", label: "References" },
  { id: "about", label: "About" },
];

const featuredProjects = [
  {
    id: "trend-bible",
    kicker: "Trend Bible",
    title: "Trend Bible",
    description:
      "A bold subscription-first editorial platform concept built to package market signals into a high-impact landing page with oversized type, strong hierarchy, and a confident conversion flow.",
    metaLeft: "Editorial platform",
    metaRight: "UI / Frontend concept",
    image: "/trend-bible.png",
    href: "/trend-bible.png",
    width: 1086,
    height: 633,
    reverse: false,
    accent: "#ff8f12",
  },
  {
    id: "visual-poetry",
    kicker: "Visual Poetry",
    title: "Visual Poetry",
    description:
      "A cinematic portfolio concept for a visual storyteller, designed to balance gallery energy, warm contrast, and a brand-led first impression that feels immersive from the opening screen.",
    metaLeft: "Creative portfolio",
    metaRight: "Brand-led web concept",
    image: "/visual-poetry.png",
    href: "/visual-poetry.png",
    width: 631,
    height: 423,
    reverse: true,
    accent: "#f2aa38",
  },
];

const values = ["Useful", "Considered", "Beautiful", "Well made"];

const referenceCards = [
  {
    name: "Areeba Khan",
    role: "Founder at Northlane Studio",
    body:
      "Shahzaib took our rough vision and turned it into a polished site that felt premium, clear, and ready for clients from day one.",
  },
  {
    name: "Usman Tariq",
    role: "Product Manager at FinSolve",
    body:
      "Working with Shahzaib was incredibly smooth. He made smart frontend decisions, kept the backend clean, and shipped features without drama.",
  },
  {
    name: "Zara Hameed",
    role: "Operations Lead at Meditech",
    body:
      "He understood the product quickly, simplified the experience, and built a system that stayed dependable as more users came in.",
  },
  {
    name: "Bilal Saeed",
    role: "Co-founder at LaunchGrid",
    body:
      "Shahzaib blends design sensitivity with engineering discipline. The product looked better, loaded faster, and became easier for our team to maintain.",
  },
  {
    name: "Mariam Ali",
    role: "Marketing Lead at Novacrest",
    body:
      "He did not just make the site look good. He gave us a smoother structure, stronger responsiveness, and a web presence that finally matched our brand.",
  },
  {
    name: "Hassan Raza",
    role: "CTO at Taskmint",
    body:
      "He was comfortable across the stack, thoughtful about architecture, and reliable about turning ambiguous requirements into shippable product work.",
  },
];

const aboutTools = ["Next.js", "Node.js", "TypeScript"];
const TESTIMONIALS_PER_PAGE = 3;
const referencePages = Array.from(
  { length: Math.ceil(referenceCards.length / TESTIMONIALS_PER_PAGE) },
  (_, index) =>
    referenceCards.slice(
      index * TESTIMONIALS_PER_PAGE,
      index * TESTIMONIALS_PER_PAGE + TESTIMONIALS_PER_PAGE
    )
);

export default function Home() {
  const [activeAudience, setActiveAudience] = useState(audienceProfiles[0].id);
  const [activeSection, setActiveSection] = useState(navSections[0].id);
  const [activeReferencePage, setActiveReferencePage] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const introRef = useRef(null);
  const introNameRef = useRef(null);
  const contentRef = useRef(null);
  const headingRef = useRef(null);

  const activeProfile =
    audienceProfiles.find((profile) => profile.id === activeAudience) ??
    audienceProfiles[0];
  const referenceTrackOffset =
    activeReferencePage * (100 / referencePages.length);

  const showNextReferencePage = () => {
    setActiveReferencePage((currentPage) => {
      return (currentPage + 1) % referencePages.length;
    });
  };

  useEffect(() => {
    const timeline = gsap.timeline({
      onComplete: () => {
        gsap.set(contentRef.current, {
          clearProps: "transform,opacity",
        });
        setShowIntro(false);
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
        duration: 0.28,
        ease: "power2.in",
        delay: 0.18,
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

    return () => timeline.kill();
  }, []);

  useEffect(() => {
    if (!headingRef.current) {
      return;
    }

    gsap.fromTo(
      headingRef.current,
      {
        opacity: 0,
        scaleX: 1.035,
        scaleY: 0.985,
        y: 6,
        transformOrigin: "50% 100%",
      },
      {
        opacity: 1,
        scaleX: 1,
        scaleY: 1,
        y: 0,
        duration: 0.42,
        ease: "power2.out",
        overwrite: "auto",
      }
    );
  }, [activeAudience]);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-section]"));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((entryA, entryB) => entryB.intersectionRatio - entryA.intersectionRatio);

        if (visibleEntries[0]?.target.id) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -45% 0px",
        threshold: [0.2, 0.45, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.page}>
      {showIntro && (
        <div ref={introRef} className={styles.introScreen}>
          <p ref={introNameRef} className={styles.introName}>
            Shahzaib Mirza
          </p>
        </div>
      )}

      <div ref={contentRef} className={styles.pageContent}>
        <div className={styles.brand}>SM.</div>

        <aside className={styles.sidebar}>
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={
                activeSection === section.id ? styles.activeNav : styles.navItem
              }
            >
              {section.label}
            </a>
          ))}
        </aside>

        <section className={styles.hero} id="intro" data-section>
          <div className={styles.audienceRow}>
            {audienceProfiles.map((profile) => {
              const isActive = profile.id === activeAudience;

              return (
                <button
                  key={profile.id}
                  type="button"
                  className={
                    isActive ? styles.audienceButtonActive : styles.audienceButton
                  }
                  onClick={() => setActiveAudience(profile.id)}
                >
                  {profile.label}
                </button>
              );
            })}
          </div>

          <div className={styles.copyBlock}>
            <h1 ref={headingRef} className={styles.headline}>
              {activeProfile.headline}
            </h1>

            <p className={styles.summary}>{activeProfile.summary}</p>
          </div>
        </section>

        <section
          className={`${styles.contentSection} ${styles.workSection}`}
          id="work"
          data-section
        >
          {featuredProjects.map((project) => (
            <article
              key={project.id}
              className={`${styles.projectCard} ${
                project.reverse ? styles.projectCardReverse : ""
              }`}
            >
              <div className={styles.projectCopy}>
                <p
                  className={styles.projectKicker}
                  style={{ color: project.accent }}
                >
                  {project.kicker}
                </p>
                <h2 className={styles.projectTitle}>{project.title}</h2>
                <p className={styles.projectDescription}>{project.description}</p>

                <div className={styles.projectMeta}>
                  <span>{project.metaLeft}</span>
                  <span>{project.metaRight}</span>
                </div>
              </div>

              <div className={styles.projectVisualWrap}>
                <Image
                  className={styles.projectVisual}
                  src={project.image}
                  alt={`${project.title} project preview`}
                  width={project.width}
                  height={project.height}
                  priority={project.id === "trend-bible"}
                />
              </div>
            </article>
          ))}
        </section>

        <section
          className={`${styles.contentSection} ${styles.valuesSection}`}
          id="values"
          data-section
        >
          <div className={styles.valuesStack}>
            {values.map((value) => (
              <span key={value} className={styles.valuesWord}>
                {value}
              </span>
            ))}
          </div>

          <div className={styles.valuesBody}>
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
          className={`${styles.contentSection} ${styles.referencesSection}`}
          id="references"
          data-section
        >
          <div className={styles.referencesShell}>
            <div className={styles.referencesViewport}>
              <div
                className={styles.referencesTrack}
                style={{
                  transform: `translateX(-${referenceTrackOffset}%)`,
                }}
              >
                {referencePages.map((page, pageIndex) => (
                  <div key={pageIndex} className={styles.referencesPage}>
                    {page.map((card, cardIndex) => (
                      <article key={card.name} className={styles.referenceCard}>
                        {cardIndex > 0 && (
                          <FiPlus
                            aria-hidden="true"
                            className={styles.referencePlus}
                          />
                        )}

                        <div className={styles.referenceMeta}>
                          <p className={styles.referenceName}>{card.name}</p>
                          <p className={styles.referenceRole}>{card.role}</p>
                        </div>

                        <RiDoubleQuotesL
                          aria-hidden="true"
                          className={styles.referenceQuote}
                        />
                        <p className={styles.referenceBody}>{card.body}</p>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div aria-hidden="true" className={styles.referencesFade} />
            <button
              type="button"
              className={styles.referencesNext}
              onClick={showNextReferencePage}
              aria-label="Show next testimonials"
            >
              <FiArrowRight aria-hidden="true" />
            </button>
          </div>
        </section>

        <section
          className={`${styles.contentSection} ${styles.aboutSection}`}
          id="about"
          data-section
        >
          <div className={styles.aboutTop}>
            <h2 className={styles.aboutLead}>
              I&apos;m Shahzaib Mirza, a PK-based full stack developer.
            </h2>

            <p className={styles.aboutBody}>
              I build clean, beautiful websites with the same care I put into the
              systems behind them. I enjoy shaping frontend experiences that feel
              polished and backend structures that stay reliable as products grow.
            </p>

            <p className={styles.aboutBody}>
              I work especially well with founders, startups, and small teams that
              need strong product thinking, modern execution, and a developer who
              can move across the stack without losing clarity.
            </p>
          </div>

          <div className={styles.aboutLower}>
            <div className={styles.aboutCardStack}>
              <div
                className={`${styles.aboutCardPaper} ${styles.aboutCardPaperOne}`}
              />
              <div
                className={`${styles.aboutCardPaper} ${styles.aboutCardPaperTwo}`}
              />
              <div className={`${styles.aboutCardPaper} ${styles.aboutCardFront}`}>
                <p className={styles.aboutCardLabel}>Shahzaib Mirza</p>
                <p className={styles.aboutMonogram}>SM</p>
                <p className={styles.aboutRole}>Full stack web developer</p>

                <div className={styles.aboutTools}>
                  {aboutTools.map((tool) => (
                    <span key={tool} className={styles.aboutToolChip}>
                      {tool}
                    </span>
                  ))}
                </div>

                <p className={styles.aboutCardNote}>
                  Building polished interfaces and systems that scale with time.
                </p>
              </div>
            </div>

            <p className={styles.aboutClosing}>
              Let me help build a web presence and product foundation that looks
              sharp and scales with time.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
