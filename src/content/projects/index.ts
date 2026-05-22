import { trendBibleProject } from "./trend-bible";
import { visualPoetryProject } from "./visual-poetry";

export const projectEntries = [trendBibleProject, visualPoetryProject];

export function getProjectBySlug(slug: string) {
  return projectEntries.find((project) => project.slug === slug);
}
