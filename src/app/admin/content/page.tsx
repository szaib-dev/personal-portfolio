"use client";

import { useState, useEffect, useMemo } from "react";
import { ConvexProvider, ConvexReactClient, useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { FiEdit2, FiSave, FiX, FiPlus, FiTrash2, FiUser, FiMessageSquare, FiType, FiLayers, FiArrowUp, FiArrowDown } from "react-icons/fi";
import {
  aboutContent as staticAbout,
  audienceProfiles as staticProfiles,
  navSections as staticNav,
  projectEntries as staticProjects,
  referenceCards as staticReferences,
  type CaseStudyBlock,
  values as staticValues,
} from "@/data/site-content";

const DEFAULT_VALUES_DESCRIPTION =
  "These are the core values behind the way I build. I care about digital work that solves a real problem, feels intentional in every detail, and stays strong as products grow. I like thinking big, building fast but carefully, staying practical, and creating systems that are not only beautiful on the surface, but dependable underneath. My goal is always the same: make something useful, well made, and built to last.";

export default function ContentPage() {
  const [convexUrl, setConvexUrl] = useState<string | null>(null);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [token] = useState<string | null>(() =>
    typeof window === "undefined" ? null : localStorage.getItem("admin_token")
  );

  useEffect(() => {
    fetch("/api/convex-config", { cache: "no-store" })
      .then((r) => r.json())
      .then((c: { url?: string }) => setConvexUrl(c.url?.trim() || null))
      .catch(() => setConvexUrl(null))
      .finally(() => setConfigLoaded(true));
  }, []);

  const convex = useMemo(
    () => (convexUrl ? new ConvexReactClient(convexUrl) : null),
    [convexUrl]
  );

  if (!configLoaded) {
    return <div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-[#e0e0e0] border-t-[#111]" /></div>;
  }

  if (!convex || !token) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[0.95rem] text-[#666]">Please login from <a href="/admin" className="text-[#111] underline">/admin</a> first.</p>
        </div>
      </div>
    );
  }

  return (
    <ConvexProvider client={convex}>
      <ContentEditor />
    </ConvexProvider>
  );
}

type Tab = "profiles" | "references" | "values" | "about" | "projects";
type EditorProject = {
  slug: string;
  kicker: string;
  title: string;
  summary: string;
  metaLeft: string;
  metaRight: string;
  accent: string;
  year: string;
  role: string;
  client: string;
  duration: string;
  stack: string[];
  reverse: boolean;
  order: number;
  caseStudyBlocksJson?: string;
};

const makeStaticProject = (project: (typeof staticProjects)[number], order: number): EditorProject => ({
  slug: project.slug,
  kicker: project.kicker,
  title: project.title,
  summary: project.summary,
  metaLeft: project.metaLeft,
  metaRight: project.metaRight,
  accent: project.accent,
  year: project.year,
  role: project.role,
  client: project.client,
  duration: project.duration,
  stack: project.stack,
  reverse: project.reverse,
  order,
  caseStudyBlocksJson: JSON.stringify(project.caseStudyBlocks, null, 2),
});

const getProjectBlocksJson = (project: Partial<EditorProject>) =>
  project.caseStudyBlocksJson ||
  JSON.stringify(
    staticProjects.find((item) => item.slug === project.slug)?.caseStudyBlocks || [],
    null,
    2
  );

const parseProjectBlocks = (json: string): CaseStudyBlock[] => {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? (parsed as CaseStudyBlock[]) : [];
  } catch {
    return [];
  }
};

const getBlockTitle = (block: CaseStudyBlock, index: number) => {
  if ("label" in block && block.label) return `${index + 1}. ${block.label}`;
  if ("title" in block && block.title) return `${index + 1}. ${block.title}`;
  return `${index + 1}. ${block.type}`;
};

function ContentEditor() {
  const [activeTab, setActiveTab] = useState<Tab>("profiles");
  const [syncing, setSyncing] = useState(false);
  const sessionCheck = useQuery(api.auth.validateSession, { token: localStorage.getItem("admin_token") || "" });
  const upsertProfile = useMutation(api.content.upsertAudienceProfile);
  const upsertNav = useMutation(api.content.upsertNavSection);
  const upsertProject = useMutation(api.content.upsertProject);
  const upsertReference = useMutation(api.content.upsertReference);
  const upsertValue = useMutation(api.content.upsertValue);
  const setAbout = useMutation(api.content.setAboutContent);
  const setSiteContent = useMutation(api.content.setSiteContent);

  if (sessionCheck && !sessionCheck.valid) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="text-center">
          <p className="text-[0.95rem] text-[#666]">Session expired. <a href="/admin" className="text-[#111] underline">Login again</a></p>
        </div>
      </div>
    );
  }

  const tabs: { id: Tab; label: string; description: string; icon: React.ElementType }[] = [
    { id: "profiles", label: "Homepage Hero", description: "Audience tabs and intro copy", icon: FiUser },
    { id: "projects", label: "Project Pages", description: "Cards, details, and case-study sections", icon: FiLayers },
    { id: "references", label: "Testimonials", description: "Reference cards on the homepage", icon: FiMessageSquare },
    { id: "values", label: "Values Section", description: "Big value words and paragraph", icon: FiType },
    { id: "about", label: "About + Footer Text", description: "About copy before the page ends", icon: FiEdit2 },
  ];

  const syncStaticContent = async () => {
    setSyncing(true);
    try {
      await Promise.all([
        ...staticProfiles.map((profile, order) =>
          upsertProfile({
            profileId: profile.id,
            label: profile.label,
            headline: profile.headline,
            summary: profile.summary,
            order,
          })
        ),
        ...staticNav.map((section, order) =>
          upsertNav({ sectionId: section.id, label: section.label, order })
        ),
        ...staticProjects.map((project, order) =>
          upsertProject({
            ...makeStaticProject(project, order),
          })
        ),
        ...staticReferences.map((reference, order) =>
          upsertReference({ ...reference, order })
        ),
        ...staticValues.map((text, order) => upsertValue({ text, order })),
        setAbout({ key: "heading", lines: staticAbout.heading }),
        setAbout({ key: "columnTwo", lines: staticAbout.columnTwo }),
        setAbout({ key: "columnThree", lines: staticAbout.columnThree }),
        setAbout({ key: "bottomText", lines: staticAbout.bottomText }),
        setSiteContent({ key: "site.name", value: "SA" }),
        setSiteContent({ key: "values.description", value: DEFAULT_VALUES_DESCRIPTION }),
      ]);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 border-b border-[#eaeaea] bg-white">
        <div className="mx-auto flex max-w-[960px] items-center justify-between px-6 py-4 max-[560px]:px-4">
          <span className="text-[0.95rem] font-semibold tracking-[-0.03em] text-[#111]">Content Manager</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={syncStaticContent}
              disabled={syncing}
              className="rounded-[5px] border border-[#dedede] px-3 py-1.5 text-[0.8rem] font-medium text-[#555] transition-colors hover:border-[#111] hover:text-[#111] disabled:cursor-wait disabled:opacity-60"
            >
              {syncing ? "Syncing..." : "Sync current content"}
            </button>
            <a href="/admin" className="text-[0.82rem] font-medium text-[#888] hover:text-[#111]">Images</a>
          </div>
        </div>
      </header>
      <div className="border-b border-[#eaeaea]">
        <div className="mx-auto max-w-[960px] px-6 max-[560px]:px-4">
          <div className="grid grid-cols-5 gap-2 py-3 max-[900px]:flex max-[900px]:overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`min-h-[4.5rem] rounded-[7px] border p-3 text-left transition-colors max-[900px]:w-[15rem] max-[900px]:shrink-0 ${activeTab === tab.id ? "border-[#111] bg-[#111] text-white" : "border-[#e9e9e9] bg-white text-[#777] hover:border-[#cfcfcf] hover:text-[#111]"}`}>
                  <span className="flex items-center gap-2 text-[0.84rem] font-semibold">
                    <Icon className="text-[0.9rem]" strokeWidth={1.8} />
                    <span>{tab.label}</span>
                  </span>
                  <span className={`mt-1.5 block text-[0.72rem] leading-[1.35] ${activeTab === tab.id ? "text-white/68" : "text-[#aaa]"}`}>
                    {tab.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <main className="mx-auto max-w-[960px] px-6 py-8 max-[560px]:px-4 max-[560px]:py-5">
        {activeTab === "profiles" && <ProfilesEditor />}
        {activeTab === "projects" && <ProjectsEditor />}
        {activeTab === "references" && <ReferencesEditor />}
        {activeTab === "values" && <ValuesEditor />}
        {activeTab === "about" && <AboutEditor />}
      </main>
    </div>
  );
}

function ProfilesEditor() {
  const profiles = useQuery(api.content.getAudienceProfiles);
  const upsert = useMutation(api.content.upsertAudienceProfile);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ profileId: "", label: "", headline: "", summary: "", order: 0 });

  if (!profiles) return <Skeleton />;
  const displayProfiles = profiles.length
    ? profiles
    : staticProfiles.map((profile, order) => ({
        profileId: profile.id,
        label: profile.label,
        headline: profile.headline,
        summary: profile.summary,
        order,
      }));

  const startEdit = (p: any) => { setEditing(p.profileId); setForm({ profileId: p.profileId, label: p.label, headline: p.headline, summary: p.summary, order: p.order }); };
  const save = async () => { await upsert(form); setEditing(null); };

  return (
    <div className="space-y-3">
      <h2 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#111]">Audience Profiles</h2>
      <p className="text-[0.85rem] text-[#888]">Hero section tab content</p>
      <div className="mt-4 space-y-3">
        {displayProfiles.map((p: any) => (
          <div key={p.profileId} className="rounded-[8px] border border-[#eaeaea] p-4">
            {editing === p.profileId ? (
              <div className="space-y-3">
                <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Label" />
                <textarea value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" rows={3} placeholder="Headline" />
                <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" rows={2} placeholder="Summary" />
                <div className="flex gap-2">
                  <button onClick={save} className="flex items-center gap-1.5 rounded-[5px] bg-[#111] px-3 py-1.5 text-[0.82rem] font-medium text-white"><FiSave className="text-[0.75rem]" /> Save</button>
                  <button onClick={() => setEditing(null)} className="flex items-center gap-1.5 rounded-[5px] border border-[#e0e0e0] px-3 py-1.5 text-[0.82rem] font-medium text-[#666]"><FiX className="text-[0.75rem]" /> Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div><p className="text-[0.9rem] font-semibold text-[#222]">{p.label}</p><p className="mt-1 text-[0.82rem] leading-[1.5] text-[#888]">{p.headline.slice(0, 80)}...</p></div>
                <button onClick={() => startEdit(p)} className="shrink-0 text-[#aaa] hover:text-[#111]"><FiEdit2 className="text-[0.85rem]" /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsEditor() {
  const projects = useQuery(api.content.getProjects);
  const upsert = useMutation(api.content.upsertProject);
  const deleteProject = useMutation(api.content.deleteProject);
  const [editing, setEditing] = useState<string | null>(null);
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [expandedBlocks, setExpandedBlocks] = useState<Set<number>>(new Set());
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<EditorProject>({ slug: "", kicker: "", title: "", summary: "", metaLeft: "", metaRight: "", accent: "#111111", year: "", role: "", client: "", duration: "", stack: [], reverse: false, order: 0, caseStudyBlocksJson: "[]" });
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (!projects) return <Skeleton />;
  const displayProjects = projects.length
    ? projects
    : staticProjects.map((project, order) => makeStaticProject(project, order));

  const toggleProject = (slug: string) => {
    setExpandedProjects((current) => {
      const next = new Set(current);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };
  const startEdit = (p: EditorProject) => {
    setEditing(p.slug);
    setJsonError(null);
    setExpandedProjects((current) => new Set(current).add(p.slug));
    setForm({ ...p, caseStudyBlocksJson: getProjectBlocksJson(p) });
  };
  const startAdd = () => {
    setShowAdd(true);
    setJsonError(null);
    setForm({ slug: "", kicker: "", title: "", summary: "", metaLeft: "", metaRight: "", accent: "#111111", year: new Date().getFullYear().toString(), role: "", client: "", duration: "", stack: [], reverse: false, order: displayProjects.length, caseStudyBlocksJson: "[]" });
  };
  const save = async () => {
    if (!form.slug) return;
    try {
      const parsed = JSON.parse(form.caseStudyBlocksJson || "[]");
      if (!Array.isArray(parsed)) throw new Error("Case-study sections must be an array.");
      await upsert({ ...form, caseStudyBlocksJson: JSON.stringify(parsed, null, 2) });
      setEditing(null);
      setShowAdd(false);
      setJsonError(null);
    } catch (error) {
      setJsonError(error instanceof Error ? error.message : "Case-study JSON is not valid.");
    }
  };
  const confirmDel = async () => { if (deleteConfirm) { await deleteProject({ slug: deleteConfirm }); setDeleteConfirm(null); } };

  // Reorder
  const reorder = async (slug: string, direction: "up" | "down") => {
    const idx = displayProjects.findIndex((p: any) => p.slug === slug);
    const swapIdx = direction === "up" ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= displayProjects.length) return;
    const current = displayProjects[idx] as EditorProject;
    const swap = displayProjects[swapIdx] as EditorProject;
    await upsert({ ...current, caseStudyBlocksJson: getProjectBlocksJson(current), order: swap.order });
    await upsert({ ...swap, caseStudyBlocksJson: getProjectBlocksJson(swap), order: current.order });
  };

  const blocks = parseProjectBlocks(form.caseStudyBlocksJson || "[]");
  const renderFormFields = () => (
    <div className="space-y-3 rounded-[8px] border border-[#eaeaea] bg-[#fafafa] p-5">
      <div>
        <p className="text-[0.92rem] font-semibold text-[#111]">Project overview content</p>
        <p className="mt-1 text-[0.78rem] leading-[1.45] text-[#888]">This controls the homepage project card plus the project page hero/meta text.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
        <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Slug" disabled={!!editing} />
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Title" />
      </div>
      <input value={form.kicker} onChange={(e) => setForm({ ...form, kicker: e.target.value })} className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Kicker" />
      <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" rows={3} placeholder="Summary" />
      <div className="grid grid-cols-3 gap-3 max-[560px]:grid-cols-1">
        <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Role" />
        <input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Client" />
        <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Duration" />
      </div>
      <div className="grid grid-cols-3 gap-3 max-[560px]:grid-cols-1">
        <input value={form.metaLeft} onChange={(e) => setForm({ ...form, metaLeft: e.target.value })} className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Meta Left" />
        <input value={form.metaRight} onChange={(e) => setForm({ ...form, metaRight: e.target.value })} className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Meta Right" />
        <input value={form.accent} onChange={(e) => setForm({ ...form, accent: e.target.value })} className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Accent (#hex)" />
      </div>
      <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Year" />
      <input value={form.stack.join(", ")} onChange={(e) => setForm({ ...form, stack: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })} className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Stack (comma separated)" />
      <div className="rounded-[8px] border border-[#e4e4e4] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#eeeeee] px-4 py-3">
          <div>
            <p className="text-[0.92rem] font-semibold text-[#111]">Project page sections</p>
            <p className="mt-1 text-[0.76rem] leading-[1.45] text-[#888]">Overview, persona, palette, typography, final design, galleries, mobile notes, and any other case-study text.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => setExpandedBlocks(new Set(blocks.map((_, index) => index)))} className="rounded-[5px] border border-[#dedede] px-2.5 py-1.5 text-[0.76rem] font-medium text-[#666] hover:text-[#111]">Expand all</button>
            <button type="button" onClick={() => setExpandedBlocks(new Set())} className="rounded-[5px] border border-[#dedede] px-2.5 py-1.5 text-[0.76rem] font-medium text-[#666] hover:text-[#111]">Collapse all</button>
          </div>
        </div>
        <div className="divide-y divide-[#eeeeee]">
          {blocks.map((block, index) => {
            const isOpen = expandedBlocks.has(index);
            return (
              <div key={`${block.type}-${index}`}>
                <button
                  type="button"
                  onClick={() => setExpandedBlocks((current) => {
                    const next = new Set(current);
                    if (next.has(index)) next.delete(index);
                    else next.add(index);
                    return next;
                  })}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span>
                    <span className="block text-[0.84rem] font-semibold text-[#222]">{getBlockTitle(block, index)}</span>
                    <span className="mt-0.5 block text-[0.72rem] uppercase tracking-[0.12em] text-[#aaa]">{block.type}</span>
                  </span>
                  <span className="text-[1.1rem] text-[#aaa]">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="bg-[#fbfbfb] px-4 pb-4">
                    <textarea
                      value={JSON.stringify(block, null, 2)}
                      onChange={(event) => {
                        try {
                          const nextBlock = JSON.parse(event.target.value);
                          const nextBlocks = [...blocks];
                          nextBlocks[index] = nextBlock;
                          setForm({ ...form, caseStudyBlocksJson: JSON.stringify(nextBlocks, null, 2) });
                          setJsonError(null);
                        } catch {
                          setJsonError("This block JSON is not valid yet.");
                        }
                      }}
                      className="min-h-[13rem] w-full rounded-[5px] border border-[#e0e0e0] bg-white px-3 py-2 font-mono text-[0.76rem] leading-[1.55] text-[#333] outline-none focus:border-[#111]"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="border-t border-[#eeeeee] p-4">
          <p className="mb-2 text-[0.78rem] font-semibold text-[#555]">Full sections JSON</p>
          <textarea
            value={form.caseStudyBlocksJson || "[]"}
            onChange={(event) => {
              setForm({ ...form, caseStudyBlocksJson: event.target.value });
              setJsonError(null);
            }}
            className="min-h-[14rem] w-full rounded-[5px] border border-[#e0e0e0] bg-white px-3 py-2 font-mono text-[0.76rem] leading-[1.55] text-[#333] outline-none focus:border-[#111]"
          />
          {jsonError && <p className="mt-2 text-[0.78rem] font-medium text-[#d33]">{jsonError}</p>}
        </div>
      </div>
      <div className="flex gap-2">
        <button onClick={save} className="flex items-center gap-1.5 rounded-[5px] bg-[#111] px-3 py-1.5 text-[0.82rem] font-medium text-white"><FiSave className="text-[0.75rem]" /> Save</button>
        <button onClick={() => { setEditing(null); setShowAdd(false); }} className="flex items-center gap-1.5 rounded-[5px] border border-[#e0e0e0] px-3 py-1.5 text-[0.82rem] font-medium text-[#666]"><FiX className="text-[0.75rem]" /> Cancel</button>
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div><h2 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#111]">Projects</h2><p className="text-[0.85rem] text-[#888]">Manage portfolio projects</p></div>
        <button onClick={startAdd} className="flex items-center gap-1.5 rounded-[5px] bg-[#111] px-3 py-1.5 text-[0.82rem] font-medium text-white"><FiPlus className="text-[0.75rem]" /> Add</button>
      </div>
      {showAdd && renderFormFields()}
      <div className="mt-4 space-y-3">
        {displayProjects.map((p: any, idx: number) => (
          <div key={p.slug}>
            {editing === p.slug ? renderFormFields() : (
              <div className="flex items-center justify-between rounded-[8px] border border-[#eaeaea] p-4">
                <div><p className="text-[0.9rem] font-semibold text-[#222]">{p.title}</p><p className="mt-0.5 text-[0.8rem] text-[#aaa]">{p.metaLeft} · {p.year}</p></div>
                <div className="flex items-center gap-2">
                  <button onClick={() => reorder(p.slug, "up")} disabled={idx === 0} className="text-[#ccc] hover:text-[#111] disabled:opacity-30"><FiArrowUp className="text-[0.8rem]" /></button>
                  <button onClick={() => reorder(p.slug, "down")} disabled={idx === displayProjects.length - 1} className="text-[#ccc] hover:text-[#111] disabled:opacity-30"><FiArrowDown className="text-[0.8rem]" /></button>
                  <button onClick={() => startEdit(p)} className="text-[#aaa] hover:text-[#111]"><FiEdit2 className="text-[0.85rem]" /></button>
                  <button onClick={() => setDeleteConfirm(p.slug)} className="text-[#aaa] hover:text-[#e03030]"><FiTrash2 className="text-[0.85rem]" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[340px] rounded-[10px] bg-white p-6">
            <h3 className="text-[1.05rem] font-semibold text-[#111]">Delete project?</h3>
            <p className="mt-2 text-[0.88rem] text-[#666]">This cannot be undone.</p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 rounded-[6px] border border-[#e0e0e0] py-2.5 text-[0.85rem] font-medium text-[#555]">Cancel</button>
              <button onClick={confirmDel} className="flex-1 rounded-[6px] bg-[#111] py-2.5 text-[0.85rem] font-medium text-white">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ReferencesEditor() {
  const references = useQuery(api.content.getReferences);
  const upsert = useMutation(api.content.upsertReference);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", role: "", body: "", order: 0 });

  if (!references) return <Skeleton />;
  const displayReferences = references.length
    ? references
    : staticReferences.map((reference, order) => ({ ...reference, order }));

  const startEdit = (r: any) => { setEditing(r.name); setForm({ name: r.name, role: r.role, body: r.body, order: r.order }); };
  const save = async () => { await upsert(form); setEditing(null); };

  return (
    <div className="space-y-3">
      <h2 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#111]">References</h2>
      <p className="text-[0.85rem] text-[#888]">Edit testimonials</p>
      <div className="mt-4 space-y-3">
        {displayReferences.map((r: any) => (
          <div key={r.name} className="rounded-[8px] border border-[#eaeaea] p-4">
            {editing === r.name ? (
              <div className="space-y-3">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Name" />
                <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Role" />
                <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" rows={3} placeholder="Testimonial" />
                <div className="flex gap-2">
                  <button onClick={save} className="flex items-center gap-1.5 rounded-[5px] bg-[#111] px-3 py-1.5 text-[0.82rem] font-medium text-white"><FiSave className="text-[0.75rem]" /> Save</button>
                  <button onClick={() => setEditing(null)} className="flex items-center gap-1.5 rounded-[5px] border border-[#e0e0e0] px-3 py-1.5 text-[0.82rem] font-medium text-[#666]"><FiX className="text-[0.75rem]" /> Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div><p className="text-[0.9rem] font-semibold text-[#222]">{r.name}</p><p className="text-[0.78rem] text-[#aaa]">{r.role}</p><p className="mt-1 text-[0.82rem] leading-[1.5] text-[#666]">{r.body.slice(0, 100)}...</p></div>
                <button onClick={() => startEdit(r)} className="shrink-0 text-[#aaa] hover:text-[#111]"><FiEdit2 className="text-[0.85rem]" /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ValuesEditor() {
  const values = useQuery(api.content.getValues);
  const siteContent = useQuery(api.content.getAllSiteContent);
  const setSiteContent = useMutation(api.content.setSiteContent);
  const upsertValue = useMutation(api.content.upsertValue);
  const [editingDesc, setEditingDesc] = useState(false);
  const [editingValue, setEditingValue] = useState<string | null>(null);
  const [desc, setDesc] = useState("");
  const [valueForm, setValueForm] = useState({ text: "", order: 0, previousText: "" });

  if (!values || !siteContent) return <Skeleton />;
  const displayValues = values.length
    ? values
    : staticValues.map((text, order) => ({ text, order }));

  const startEditDesc = () => { setEditingDesc(true); setDesc(siteContent["values.description"] || DEFAULT_VALUES_DESCRIPTION); };
  const saveDesc = async () => { await setSiteContent({ key: "values.description", value: desc }); setEditingDesc(false); };
  const startEditValue = (item: { text: string; order: number }) => {
    setEditingValue(item.text);
    setValueForm({ text: item.text, order: item.order, previousText: item.text });
  };
  const saveValue = async () => {
    await upsertValue(valueForm);
    setEditingValue(null);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#111]">Values</h2>
      <div className="mt-4 space-y-2">
        {displayValues.map((v: any) => (
          <div key={v.text} className="rounded-[8px] border border-[#eaeaea] px-4 py-3">
            {editingValue === v.text ? (
              <div className="flex gap-2">
                <input value={valueForm.text} onChange={(e) => setValueForm({ ...valueForm, text: e.target.value })} className="min-w-0 flex-1 rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" />
                <button onClick={saveValue} className="rounded-[5px] bg-[#111] px-3 py-2 text-[0.8rem] font-medium text-white">Save</button>
                <button onClick={() => setEditingValue(null)} className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.8rem] font-medium text-[#666]">Cancel</button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-[1rem] font-semibold tracking-[-0.02em] text-[#222]">{v.text}</p>
                <button onClick={() => startEditValue(v)} className="text-[#aaa] hover:text-[#111]"><FiEdit2 className="text-[0.85rem]" /></button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-[8px] border border-[#eaeaea] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[0.88rem] font-semibold text-[#222]">Description</p>
          {!editingDesc && <button onClick={startEditDesc} className="text-[#aaa] hover:text-[#111]"><FiEdit2 className="text-[0.85rem]" /></button>}
        </div>
        {editingDesc ? (
          <div className="mt-3 space-y-3">
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] leading-[1.6] outline-none focus:border-[#111]" rows={4} />
            <div className="flex gap-2">
              <button onClick={saveDesc} className="flex items-center gap-1.5 rounded-[5px] bg-[#111] px-3 py-1.5 text-[0.82rem] font-medium text-white"><FiSave className="text-[0.75rem]" /> Save</button>
              <button onClick={() => setEditingDesc(false)} className="flex items-center gap-1.5 rounded-[5px] border border-[#e0e0e0] px-3 py-1.5 text-[0.82rem] font-medium text-[#666]"><FiX className="text-[0.75rem]" /> Cancel</button>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-[0.82rem] leading-[1.6] text-[#888]">{(siteContent["values.description"] || DEFAULT_VALUES_DESCRIPTION).slice(0, 180)}...</p>
        )}
      </div>
    </div>
  );
}

function AboutEditor() {
  const about = useQuery(api.content.getAboutContent);
  const setAbout = useMutation(api.content.setAboutContent);
  const [editing, setEditing] = useState<string | null>(null);
  const [lines, setLines] = useState<string[]>([]);

  if (!about) return <Skeleton />;
  const displayAbout = Object.keys(about).length
    ? about
    : {
        heading: staticAbout.heading,
        columnTwo: staticAbout.columnTwo,
        columnThree: staticAbout.columnThree,
        bottomText: staticAbout.bottomText,
      };

  const sections = [
    { key: "heading", label: "Heading" },
    { key: "columnTwo", label: "Column Two" },
    { key: "columnThree", label: "Column Three" },
    { key: "bottomText", label: "Bottom Text" },
  ];

  const startEdit = (key: string) => { setEditing(key); setLines(displayAbout[key] || []); };
  const save = async () => { if (!editing) return; await setAbout({ key: editing, lines }); setEditing(null); };

  return (
    <div className="space-y-3">
      <h2 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#111]">About Section</h2>
      <div className="mt-4 space-y-3">
        {sections.map((s) => (
          <div key={s.key} className="rounded-[8px] border border-[#eaeaea] p-4">
            {editing === s.key ? (
              <div className="space-y-3">
                <p className="text-[0.82rem] font-semibold text-[#555]">{s.label}</p>
                <textarea value={lines.join("\n")} onChange={(e) => setLines(e.target.value.split("\n"))} className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] leading-[1.6] outline-none focus:border-[#111]" rows={4} placeholder="One line per row" />
                <div className="flex gap-2">
                  <button onClick={save} className="flex items-center gap-1.5 rounded-[5px] bg-[#111] px-3 py-1.5 text-[0.82rem] font-medium text-white"><FiSave className="text-[0.75rem]" /> Save</button>
                  <button onClick={() => setEditing(null)} className="flex items-center gap-1.5 rounded-[5px] border border-[#e0e0e0] px-3 py-1.5 text-[0.82rem] font-medium text-[#666]"><FiX className="text-[0.75rem]" /> Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div><p className="text-[0.88rem] font-semibold text-[#222]">{s.label}</p><p className="mt-1 text-[0.82rem] leading-[1.5] text-[#888]">{(displayAbout[s.key] || []).join(" ")}</p></div>
                <button onClick={() => startEdit(s.key)} className="shrink-0 text-[#aaa] hover:text-[#111]"><FiEdit2 className="text-[0.85rem]" /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse rounded-[8px] border border-[#f0f0f0] p-4">
          <div className="h-4 w-1/3 rounded bg-[#f0f0f0]" />
          <div className="mt-2 h-3 w-2/3 rounded bg-[#f5f5f5]" />
        </div>
      ))}
    </div>
  );
}
