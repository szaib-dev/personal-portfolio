"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
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

const sections = ["Intro", "Work", "Values", "References", "About"];
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

function getCharacterSequence(character) {
  const lowerCharacter = character.toLowerCase();
  const characterIndex = alphabet.indexOf(lowerCharacter);

  if (character === " ") {
    return {
      targetIndex: 0,
      values: [" "],
    };
  }

  if (characterIndex === -1) {
    return {
      targetIndex: 0,
      values: [character],
    };
  }

  const values = alphabet
    .slice(0, characterIndex + 1)
    .map((letter) => (character === lowerCharacter ? letter : letter.toUpperCase()));

  return {
    targetIndex: values.length - 1,
    values,
  };
}

function RollingText({ as: Tag, className, text, duration, stagger }) {
  const letterRefs = useRef([]);
  const characters = useMemo(
    () => Array.from(text).map((character) => getCharacterSequence(character)),
    [text]
  );

  useEffect(() => {
    const nodes = letterRefs.current.filter(Boolean);

    gsap.set(nodes, { yPercent: 0 });
    gsap.to(nodes, {
      yPercent: (index) => -100 * characters[index].targetIndex,
      duration,
      ease: "power3.out",
      stagger: {
        each: stagger,
        from: "start",
      },
      overwrite: true,
    });
  }, [characters, duration, stagger]);

  return (
    <Tag className={className} aria-label={text}>
      {characters.map((character, index) => (
        <span
          key={`${text}-${index}`}
          className={
            character.values[0] === " "
              ? styles.rollSpace
              : styles.rollCharacter
          }
        >
          <span
            ref={(node) => {
              letterRefs.current[index] = node;
            }}
            className={styles.rollInner}
          >
            {character.values.map((value, valueIndex) => (
              <span key={`${index}-${valueIndex}`} className={styles.rollGlyph}>
                {value}
              </span>
            ))}
          </span>
        </span>
      ))}
    </Tag>
  );
}

export default function Home() {
  const [activeAudience, setActiveAudience] = useState(audienceProfiles[0].id);
  const heroRef = useRef(null);

  const activeProfile =
    audienceProfiles.find((profile) => profile.id === activeAudience) ??
    audienceProfiles[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-item]",
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.07,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className={styles.page} ref={heroRef}>
      <div className={styles.brand} data-hero-item>
        SM.
      </div>

      <aside className={styles.sidebar} data-hero-item>
        {sections.map((section, index) => (
          <a
            key={section}
            href={`#${section.toLowerCase()}`}
            className={index === 0 ? styles.activeNav : styles.navItem}
          >
            {section}
          </a>
        ))}
      </aside>

      <section className={styles.hero} id="intro">
        <div className={styles.audienceRow} data-hero-item>
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
          <RollingText
            as="h1"
            className={styles.headline}
            text={activeProfile.headline}
            duration={1.15}
            stagger={0.012}
          />

          <RollingText
            as="p"
            className={styles.summary}
            text={activeProfile.summary}
            duration={0.95}
            stagger={0.006}
          />
        </div>
      </section>
    </main>
  );
}
