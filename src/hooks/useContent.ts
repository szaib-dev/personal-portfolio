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
    return db.map((p: any) => ({
      slug: p.slug, kicker: p.kicker, title: p.title, summary: p.summary,
      metaLeft: p.metaLeft, metaRight: p.metaRight, accent: p.accent,
      year: p.year, role: p.role, client: p.client, duration: p.duration,
      stack: p.stack, reverse: p.reverse,
      // Keep image/width/height from static for now (images managed separately)
      image: staticProjects.find((sp) => sp.slug === p.slug)?.image ?? "/trend-bible.png",
      width: staticProjects.find((sp) => sp.slug === p.slug)?.width ?? 1086,
      height: staticProjects.find((sp) => sp.slug === p.slug)?.height ?? 633,
    }));
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
