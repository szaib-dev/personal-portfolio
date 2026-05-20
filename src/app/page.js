"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./page.module.css";

const audience = [
  "Founders",
  "Startups",
  "Product Teams",
  "SaaS Brands",
  "Agencies",
  "Growing Businesses",
];

const sections = ["Intro", "Work", "Values", "References", "About"];

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-item]",
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
          stagger: 0.08,
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
          <span className={styles.audienceLabel}>Built for</span>
          <div className={styles.audienceList}>
            {audience.map((item) => (
              <span key={item} className={styles.audienceItem}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <h1 className={styles.headline} data-hero-item>
          Hello there, I&apos;m Shahzaib Mirza, a full stack developer who
          builds beautiful websites and the systems behind them that scale with
          the business.
        </h1>

        <p className={styles.summary} data-hero-item>
          I design and develop polished websites, multi-tenant platforms, and
          production-ready architectures with React, Next.js, Node.js, Express,
          and TypeScript.
        </p>
      </section>
    </main>
  );
}
