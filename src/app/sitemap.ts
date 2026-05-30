import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { projectEntries } from "@/content/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = projectEntries.map((project) => ({
    url: `${siteConfig.url}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...projectUrls,
  ];
}
