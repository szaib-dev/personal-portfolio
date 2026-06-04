import { avelonMfgProject } from "./avelon-mfg";
import { dronerolesProject } from "./droneroles";
import { gmbOptimizationProject } from "./gmb-optimization";
import { mediaValleySchoolProject } from "./media-valley-school";

export const projectEntries = [
  avelonMfgProject,
  gmbOptimizationProject,
  mediaValleySchoolProject,
  dronerolesProject,
];

export function getProjectBySlug(slug: string) {
  return projectEntries.find((project) => project.slug === slug);
}
