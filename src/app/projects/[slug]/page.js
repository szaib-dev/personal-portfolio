import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projectEntries } from "../projectData";
import styles from "./project.module.css";

export function generateStaticParams() {
  return projectEntries.map((project) => ({
    slug: project.slug,
  }));
}

export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
  };
}

export default function ProjectCaseStudy({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <div className={styles.topbar}>
          <Link href="/" className={styles.backLink}>
            Back to portfolio
          </Link>
          <p className={styles.projectYear}>{project.year}</p>
        </div>

        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.kicker} style={{ color: project.accent }}>
              {project.kicker}
            </p>
            <h1 className={styles.title}>{project.title}</h1>
            <p className={styles.summary}>{project.summary}</p>

            <div className={styles.metaGrid}>
              <div>
                <span className={styles.metaLabel}>Role</span>
                <p className={styles.metaValue}>{project.role}</p>
              </div>
              <div>
                <span className={styles.metaLabel}>Scope</span>
                <p className={styles.metaValue}>{project.metaRight}</p>
              </div>
              <div>
                <span className={styles.metaLabel}>Format</span>
                <p className={styles.metaValue}>{project.metaLeft}</p>
              </div>
              <div>
                <span className={styles.metaLabel}>Stack</span>
                <p className={styles.metaValue}>{project.stack.join(" / ")}</p>
              </div>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <Image
              src={project.image}
              alt={`${project.title} case study visual`}
              width={project.width}
              height={project.height}
              className={styles.image}
              priority
            />
          </div>
        </section>

        <section className={styles.detailsGrid}>
          <article className={styles.detailBlock}>
            <span className={styles.blockLabel}>Challenge</span>
            <p className={styles.blockText}>{project.challenge}</p>
          </article>
          <article className={styles.detailBlock}>
            <span className={styles.blockLabel}>Approach</span>
            <p className={styles.blockText}>{project.approach}</p>
          </article>
          <article className={styles.detailBlock}>
            <span className={styles.blockLabel}>Outcome</span>
            <p className={styles.blockText}>{project.outcome}</p>
          </article>
        </section>

        <section className={styles.gallerySection}>
          <div className={styles.galleryFrame}>
            <Image
              src={project.image}
              alt={`${project.title} full project preview`}
              width={project.width}
              height={project.height}
              className={styles.galleryImage}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
