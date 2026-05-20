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
const alphabet = "abcdefghijklmnopqrstuvwxyz";

function getAnimatedFrames(text) {
  const characters = Array.from(text);

  return characters.map((character) => {
    const lowerCharacter = character.toLowerCase();
    const targetIndex = alphabet.indexOf(lowerCharacter);

    if (targetIndex === -1) {
      return [character];
    }

    const sequence = alphabet.slice(0, targetIndex + 1).split("");

    if (character === lowerCharacter) {
      return sequence;
    }

    return sequence.map((letter) => letter.toUpperCase());
  });
}

function useRollingText(text, speed = 20) {
  const frames = useMemo(() => getAnimatedFrames(text), [text]);
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let frameIndex = 0;
    const longestSequence = Math.max(...frames.map((sequence) => sequence.length));

    setDisplayText(
      frames
        .map((sequence) => sequence[0] ?? "")
        .join("")
    );

    const interval = window.setInterval(() => {
      const nextText = frames
        .map((sequence) => {
          const characterIndex = Math.min(frameIndex, sequence.length - 1);
          return sequence[characterIndex];
        })
        .join("");

      setDisplayText(nextText);

      if (frameIndex >= longestSequence - 1) {
        window.clearInterval(interval);
      }

      frameIndex += 1;
    }, speed);

    return () => window.clearInterval(interval);
  }, [frames, speed]);

  return displayText;
}

export default function Home() {
  const [activeAudience, setActiveAudience] = useState(audienceProfiles[0].id);
  const heroRef = useRef(null);

  const activeProfile =
    audienceProfiles.find((profile) => profile.id === activeAudience) ??
    audienceProfiles[0];
  const animatedHeadline = useRollingText(activeProfile.headline, 12);
  const animatedSummary = useRollingText(activeProfile.summary, 7);

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
          <h1 className={styles.headline}>
            {animatedHeadline}
          </h1>

          <p className={styles.summary}>
            {animatedSummary}
          </p>
        </div>
      </section>
    </main>
  );
}
