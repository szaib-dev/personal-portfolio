import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectEntries, getProjectBySlug } from "@/content/projects";
import { siteConfig } from "@/config/site";
import CaseStudyClient from "./CaseStudyClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projectEntries.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
    alternates: {
      canonical: `${siteConfig.url}/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} | Case Study`,
      description: project.summary,
      url: `${siteConfig.url}/projects/${slug}`,
      type: "article",
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Case Study`,
      description: project.summary,
    },
  };
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const otherProjects = projectEntries.filter((p) => p.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.summary,
            url: `${siteConfig.url}/projects/${slug}`,
            author: {
              "@type": "Person",
              name: siteConfig.name,
              url: siteConfig.url,
            },
            creator: {
              "@type": "Person",
              name: siteConfig.name,
            },
          }),
        }}
      />
      <CaseStudyClient project={project} otherProjects={otherProjects} />
    </>
  );
}
