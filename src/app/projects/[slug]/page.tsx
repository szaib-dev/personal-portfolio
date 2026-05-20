import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiGrid, FiLayers, FiPenTool } from "react-icons/fi";
import { getProjectBySlug, projectEntries } from "@/data/site-content";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const detailIcons = [FiLayers, FiPenTool, FiGrid] as const;

export function generateStaticParams() {
  return projectEntries.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.summary,
  };
}

export default async function ProjectCaseStudy({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <div className="mx-auto w-[min(100%-4rem,84rem)] px-0 py-8 max-[700px]:w-[min(100%-2rem,84rem)] max-[700px]:py-5">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.95rem] leading-[1.35] text-[#5f5f5f] transition-colors hover:text-[#111111]"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to portfolio
          </Link>

          <p className="text-[0.95rem] leading-[1.35] text-[#5f5f5f]">
            {project.year}
          </p>
        </div>

        <section className="grid grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] items-start gap-12 pt-12 max-[1024px]:grid-cols-1">
          <div className="max-w-[28rem]">
            <p
              className="text-[0.92rem] font-semibold tracking-[-0.02em]"
              style={{ color: project.accent }}
            >
              {project.kicker}
            </p>

            <h1 className="mt-[0.6rem] text-[clamp(3rem,6vw,5rem)] font-medium leading-[0.94] tracking-[-0.07em]">
              {project.title}
            </h1>

            <p className="mt-6 text-[1.08rem] leading-[1.7] text-[#333333]">
              {project.summary}
            </p>

            <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-black/10 pt-6 max-[700px]:grid-cols-1">
              <div>
                <span className="block text-[0.8rem] text-[#868686]">Role</span>
                <p className="mt-[0.3rem] text-[0.98rem] leading-[1.55]">
                  {project.role}
                </p>
              </div>
              <div>
                <span className="block text-[0.8rem] text-[#868686]">Scope</span>
                <p className="mt-[0.3rem] text-[0.98rem] leading-[1.55]">
                  {project.metaRight}
                </p>
              </div>
              <div>
                <span className="block text-[0.8rem] text-[#868686]">Format</span>
                <p className="mt-[0.3rem] text-[0.98rem] leading-[1.55]">
                  {project.metaLeft}
                </p>
              </div>
              <div>
                <span className="block text-[0.8rem] text-[#868686]">Stack</span>
                <p className="mt-[0.3rem] text-[0.98rem] leading-[1.55]">
                  {project.stack.join(" / ")}
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} case study visual`}
              width={project.width}
              height={project.height}
              className="block h-auto w-full"
              priority
            />
          </div>
        </section>

        <section className="grid grid-cols-3 gap-8 pt-16 max-[1024px]:grid-cols-1">
          {project.caseStudySections.map((section, index) => {
            const Icon = detailIcons[index] ?? FiGrid;

            return (
              <article
                key={section.title}
                className="border-t border-black/10 pt-5"
              >
                <Icon aria-hidden="true" className="text-lg text-[#9d9d9d]" />
                <span className="mt-4 block text-[0.82rem] text-[#8a8a8a]">
                  {section.title}
                </span>
                <p className="mt-3.5 text-base leading-[1.7] text-[#2f2f2f]">
                  {section.body}
                </p>
              </article>
            );
          })}
        </section>

        <section className="pt-16">
          <div className="overflow-hidden">
            <Image
              src={project.image}
              alt={`${project.title} full project preview`}
              width={project.width}
              height={project.height}
              className="block h-auto w-full"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
