import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, projectEntries } from "@/data/site-content";
import CaseStudyClient from "./CaseStudyClient";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projectEntries.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const otherProjects = projectEntries.filter((p) => p.slug !== slug);

  return <CaseStudyClient project={project} otherProjects={otherProjects} />;
}
