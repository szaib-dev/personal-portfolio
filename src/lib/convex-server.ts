import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import type { HomePageData, AudienceProfile, NavSection, Project, ValueItem, ReferenceCard, AboutContent, SiteContent } from "@/types";

// Fallback data from static content (used when Convex is unavailable)
import {
  audienceProfiles as staticProfiles,
  navSections as staticNav,
  projectEntries as staticProjects,
  values as staticValues,
  referenceCards as staticRefs,
  aboutContent as staticAbout,
} from "@/data/site-content";

function getClient(): ConvexHttpClient | null {
  const url = process.env.NEXT_PUBLIC_CONVEX_URL;
  if (!url) return null;
  return new ConvexHttpClient(url);
}

export async function fetchHomePageData(): Promise<HomePageData> {
  const client = getClient();

  if (!client) {
    // Fallback to static data
    return {
      profiles: staticProfiles.map((p, i) => ({ profileId: p.id, label: p.label, headline: p.headline, summary: p.summary, order: i })),
      navSections: staticNav.map((n, i) => ({ sectionId: n.id, label: n.label, order: i })),
      projects: staticProjects.map((p, i) => ({
        slug: p.slug, kicker: p.kicker, title: p.title, summary: p.summary,
        metaLeft: p.metaLeft, metaRight: p.metaRight, accent: p.accent,
        year: p.year, role: p.role, client: p.client, duration: p.duration,
        stack: p.stack, reverse: p.reverse, order: i,
      })),
      values: staticValues.map((v, i) => ({ text: v, order: i })),
      references: staticRefs.map((r, i) => ({ name: r.name, role: r.role, body: r.body, order: i })),
      about: {
        heading: staticAbout.heading,
        columnTwo: staticAbout.columnTwo,
        columnThree: staticAbout.columnThree,
        bottomText: staticAbout.bottomText,
      },
      siteContent: { "site.name": "SA", "values.description": "These are the core values behind the way I build. I care about digital work that solves a real problem, feels intentional in every detail, and stays strong as products grow. I like thinking big, building fast but carefully, staying practical, and creating systems that are not only beautiful on the surface, but dependable underneath. My goal is always the same: make something useful, well made, and built to last." },
    };
  }

  try {
    const [dbProfiles, dbNav, dbProjects, dbValues, dbRefs, dbAbout, dbSite] = await Promise.all([
      client.query(api.content.getAudienceProfiles),
      client.query(api.content.getNavSections),
      client.query(api.content.getProjects),
      client.query(api.content.getValues),
      client.query(api.content.getReferences),
      client.query(api.content.getAboutContent),
      client.query(api.content.getAllSiteContent),
    ]);

    const profiles: AudienceProfile[] = dbProfiles && dbProfiles.length > 0
      ? dbProfiles.map((p: any) => ({ profileId: p.profileId, label: p.label, headline: p.headline, summary: p.summary, order: p.order }))
      : staticProfiles.map((p, i) => ({ profileId: p.id, label: p.label, headline: p.headline, summary: p.summary, order: i }));

    const navSections: NavSection[] = dbNav && dbNav.length > 0
      ? dbNav.map((n: any) => ({ sectionId: n.sectionId, label: n.label, order: n.order }))
      : staticNav.map((n, i) => ({ sectionId: n.id, label: n.label, order: i }));

    const projects: Project[] = dbProjects && dbProjects.length > 0
      ? dbProjects.map((p: any) => ({
          slug: p.slug, kicker: p.kicker, title: p.title, summary: p.summary,
          metaLeft: p.metaLeft, metaRight: p.metaRight, accent: p.accent,
          year: p.year, role: p.role, client: p.client, duration: p.duration,
          stack: p.stack, reverse: p.reverse, order: p.order,
        }))
      : staticProjects.map((p, i) => ({
          slug: p.slug, kicker: p.kicker, title: p.title, summary: p.summary,
          metaLeft: p.metaLeft, metaRight: p.metaRight, accent: p.accent,
          year: p.year, role: p.role, client: p.client, duration: p.duration,
          stack: p.stack, reverse: p.reverse, order: i,
        }));

    const values: ValueItem[] = dbValues && dbValues.length > 0
      ? dbValues.map((v: any) => ({ text: v.text, order: v.order }))
      : staticValues.map((v, i) => ({ text: v, order: i }));

    const references: ReferenceCard[] = dbRefs && dbRefs.length > 0
      ? dbRefs.map((r: any) => ({ name: r.name, role: r.role, body: r.body, order: r.order }))
      : staticRefs.map((r, i) => ({ name: r.name, role: r.role, body: r.body, order: i }));

    const about: AboutContent = dbAbout && Object.keys(dbAbout).length > 0
      ? {
          heading: dbAbout.heading || staticAbout.heading,
          columnTwo: dbAbout.columnTwo || staticAbout.columnTwo,
          columnThree: dbAbout.columnThree || staticAbout.columnThree,
          bottomText: dbAbout.bottomText || staticAbout.bottomText,
        }
      : {
          heading: staticAbout.heading,
          columnTwo: staticAbout.columnTwo,
          columnThree: staticAbout.columnThree,
          bottomText: staticAbout.bottomText,
        };

    const siteContent: SiteContent = dbSite && Object.keys(dbSite).length > 0
      ? dbSite
      : { "site.name": "SA", "values.description": "These are the core values behind the way I build. I care about digital work that solves a real problem, feels intentional in every detail, and stays strong as products grow. I like thinking big, building fast but carefully, staying practical, and creating systems that are not only beautiful on the surface, but dependable underneath. My goal is always the same: make something useful, well made, and built to last." };

    return { profiles, navSections, projects, values, references, about, siteContent };
  } catch {
    // Fallback to static on any error
    return {
      profiles: staticProfiles.map((p, i) => ({ profileId: p.id, label: p.label, headline: p.headline, summary: p.summary, order: i })),
      navSections: staticNav.map((n, i) => ({ sectionId: n.id, label: n.label, order: i })),
      projects: staticProjects.map((p, i) => ({
        slug: p.slug, kicker: p.kicker, title: p.title, summary: p.summary,
        metaLeft: p.metaLeft, metaRight: p.metaRight, accent: p.accent,
        year: p.year, role: p.role, client: p.client, duration: p.duration,
        stack: p.stack, reverse: p.reverse, order: i,
      })),
      values: staticValues.map((v, i) => ({ text: v, order: i })),
      references: staticRefs.map((r, i) => ({ name: r.name, role: r.role, body: r.body, order: i })),
      about: {
        heading: staticAbout.heading,
        columnTwo: staticAbout.columnTwo,
        columnThree: staticAbout.columnThree,
        bottomText: staticAbout.bottomText,
      },
      siteContent: { "site.name": "SA", "values.description": "These are the core values behind the way I build. I care about digital work that solves a real problem, feels intentional in every detail, and stays strong as products grow. I like thinking big, building fast but carefully, staying practical, and creating systems that are not only beautiful on the surface, but dependable underneath. My goal is always the same: make something useful, well made, and built to last." },
    };
  }
}
