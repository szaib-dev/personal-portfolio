"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  audienceProfiles as staticProfiles,
  navSections as staticNav,
  projectEntries as staticProjects,
  values as staticValues,
  referenceCards as staticRefs,
  aboutContent as staticAbout,
} from "@/data/site-content";

export function useAudienceProfiles() {
  const db = useQuery(api.content.getAudienceProfiles);
  if (db && db.length > 0) {
    return db.map((p: any) => ({ id: p.profileId, label: p.label, headline: p.headline, summary: p.summary }));
  }
  return staticProfiles;
}

export function useNavSections() {
  const db = useQuery(api.content.getNavSections);
  if (db && db.length > 0) {
    return db.map((n: any) => ({ id: n.sectionId, label: n.label }));
  }
  return staticNav;
}

export function useProjects() {
  const db = useQuery(api.content.getProjects);
  if (db && db.length > 0) {
    const dbBySlug = new Map(db.map((project: any) => [project.slug, project]));
    const mergedStatic = staticProjects.map((staticProject) => {
      const p: any = dbBySlug.get(staticProject.slug);
      if (!p) return staticProject;
      return {
        ...staticProject,
        slug: p.slug,
        kicker: p.kicker,
        title: p.title,
        summary: p.summary,
        metaLeft: p.metaLeft,
        metaRight: p.metaRight,
        accent: p.accent,
        year: p.year,
        role: p.role,
        client: p.client,
        duration: p.duration,
        stack: p.stack,
        reverse: p.reverse,
      };
    });
    const newProjects = db
      .filter((project: any) => !staticProjects.some((staticProject) => staticProject.slug === project.slug))
      .map((p: any) => ({
        slug: p.slug,
        kicker: p.kicker,
        title: p.title,
        summary: p.summary,
        metaLeft: p.metaLeft,
        metaRight: p.metaRight,
        accent: p.accent,
        year: p.year,
        role: p.role,
        client: p.client,
        duration: p.duration,
        stack: p.stack,
        reverse: p.reverse,
        image: "",
        width: 1086,
        height: 633,
        heroImage: {
          src: "",
          alt: `${p.title} project hero`,
          width: 1086,
          height: 633,
        },
        caseStudyBlocks: [],
      }));
    return [...mergedStatic, ...newProjects].sort((a: any, b: any) => {
      const aOrder = dbBySlug.get(a.slug)?.order ?? staticProjects.findIndex((project) => project.slug === a.slug);
      const bOrder = dbBySlug.get(b.slug)?.order ?? staticProjects.findIndex((project) => project.slug === b.slug);
      return aOrder - bOrder;
    });
  }
  return staticProjects;
}

export function useValues() {
  const db = useQuery(api.content.getValues);
  if (db && db.length > 0) {
    return db.map((v: any) => v.text as string);
  }
  return staticValues;
}

export function useReferences() {
  const db = useQuery(api.content.getReferences);
  if (db && db.length > 0) {
    return db.map((r: any) => ({ name: r.name, role: r.role, body: r.body }));
  }
  return staticRefs;
}

export function useAboutContent() {
  const db = useQuery(api.content.getAboutContent);
  if (db && Object.keys(db).length > 0) {
    return {
      heading: db.heading || staticAbout.heading,
      columnTwo: db.columnTwo || staticAbout.columnTwo,
      columnThree: db.columnThree || staticAbout.columnThree,
      bottomText: db.bottomText || staticAbout.bottomText,
      primaryImage: staticAbout.primaryImage,
      secondaryImage: staticAbout.secondaryImage,
    };
  }
  return staticAbout;
}

export function useSiteContent() {
  const db = useQuery(api.content.getAllSiteContent);
  return db || {};
}
