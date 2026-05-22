import { trendBibleProject } from "./trend-bible";
import { avelonMfgProject } from "./avelon-mfg";
import { gmbOptimizationProject } from "./gmb-optimization";

export const projectEntries = [avelonMfgProject, gmbOptimizationProject, trendBibleProject];

export function getProjectBySlug(slug: string) {
  return projectEntries.find((project) => project.slug === slug);
}
