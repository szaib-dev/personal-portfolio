import { avelonMfgProject } from "./avelon-mfg";
import { dronerolesProject } from "./droneroles";
import { gmbOptimizationProject } from "./gmb-optimization";
import { mediaValleySchoolProject } from "./media-valley-school";
import { minutetasteProject } from "./minutetaste";

export const projectEntries = [
  avelonMfgProject,
  gmbOptimizationProject,
  dronerolesProject,
  minutetasteProject,
  mediaValleySchoolProject,
];

export function getProjectBySlug(slug: string) {
  return projectEntries.find((project) => project.slug === slug);
}
