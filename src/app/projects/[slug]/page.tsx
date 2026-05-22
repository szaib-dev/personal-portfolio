import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import { getProjectBySlug, projectEntries, type CaseStudyBlock, type ProjectEntry } from "@/data/site-content";
import { getConvexUrlFromEnv } from "@/lib/convex-url";
import CaseStudyClient from "./CaseStudyClient";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectEntries.map((p) => ({ slug: p.slug }));
}

async function getLiveProject(slug: string): Promise<ProjectEntry | null> {
  const staticProject = getProjectBySlug(slug);
  const convexUrl = getConvexUrlFromEnv();

  if (!convexUrl) {
    return staticProject ?? null;
  }

  try {
    const client = new ConvexHttpClient(convexUrl);
    const dbProject = await client.query(api.content.getProjectBySlug, { slug });
    if (!dbProject) return staticProject ?? null;

    const base: ProjectEntry =
      staticProject ??
      ({
        slug: dbProject.slug,
        kicker: dbProject.kicker,
        title: dbProject.title,
        summary: dbProject.summary,
        metaLeft: dbProject.metaLeft,
        metaRight: dbProject.metaRight,
        image: "",
        width: 1086,
        height: 633,
        reverse: dbProject.reverse,
        accent: dbProject.accent,
        year: dbProject.year,
        role: dbProject.role,
        client: dbProject.client,
        duration: dbProject.duration,
        stack: dbProject.stack,
        heroImage: {
          src: "",
          alt: `${dbProject.title} project hero`,
          width: 1086,
          height: 633,
        },
        caseStudyBlocks: [
          {
            type: "section",
            label: "Overview",
            title: dbProject.title,
            body: dbProject.summary,
          },
        ],
      } satisfies ProjectEntry);

    let liveBlocks: CaseStudyBlock[] | null = null;
    if (dbProject.caseStudyBlocksJson) {
      try {
        const parsed = JSON.parse(dbProject.caseStudyBlocksJson);
        if (Array.isArray(parsed) && parsed.length > 0) {
          liveBlocks = parsed as CaseStudyBlock[];
        }
      } catch {
        liveBlocks = null;
      }
    }

    return {
      ...base,
      slug: dbProject.slug,
      kicker: dbProject.kicker,
      title: dbProject.title,
      summary: dbProject.summary,
      metaLeft: dbProject.metaLeft,
      metaRight: dbProject.metaRight,
      reverse: dbProject.reverse,
      accent: dbProject.accent,
      year: dbProject.year,
      role: dbProject.role,
      client: dbProject.client,
      duration: dbProject.duration,
      stack: dbProject.stack,
      caseStudyBlocks: liveBlocks ?? base.caseStudyBlocks,
    };
  } catch {
    return staticProject ?? null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getLiveProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} - Case Study`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = await getLiveProject(slug);
  if (!project) notFound();

  const otherProjects = projectEntries.filter((p) => p.slug !== slug);

  return <CaseStudyClient project={project} otherProjects={otherProjects} />;
}
