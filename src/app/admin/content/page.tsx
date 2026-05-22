"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { FiEdit2, FiSave, FiX, FiPlus, FiTrash2, FiUser, FiMessageSquare, FiType, FiLayers } from "react-icons/fi";

type Tab = "profiles" | "references" | "values" | "about" | "projects";

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profiles");

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "profiles", label: "Profiles", icon: FiUser },
    { id: "projects", label: "Projects", icon: FiLayers },
    { id: "references", label: "References", icon: FiMessageSquare },
    { id: "values", label: "Values", icon: FiType },
    { id: "about", label: "About", icon: FiEdit2 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 border-b border-[#eaeaea] bg-white">
        <div className="mx-auto flex max-w-[960px] items-center justify-between px-6 py-4 max-[560px]:px-4">
          <span className="text-[0.95rem] font-semibold tracking-[-0.03em] text-[#111]">
            Content Manager
          </span>
          <a href="/admin" className="text-[0.82rem] font-medium text-[#888] hover:text-[#111]">
            ← Images
          </a>
        </div>
      </header>

      <div className="border-b border-[#eaeaea]">
        <div className="mx-auto max-w-[960px] px-6 max-[560px]:px-4">
          <div className="flex gap-6 overflow-x-auto pt-1 max-[560px]:gap-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex shrink-0 items-center gap-2 border-b-2 pb-3 pt-3 text-[0.88rem] font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-[#111] text-[#111]"
                      : "border-transparent text-[#888] hover:text-[#444]"
                  }`}
                >
                  <Icon className="text-[0.9rem]" strokeWidth={1.8} />
                  <span>{tab.label}</span>
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

  if (!profiles) return <LoadingSkeleton />;

  const startEdit = (p: any) => {
    setEditing(p.profileId);
    setForm({ profileId: p.profileId, label: p.label, headline: p.headline, summary: p.summary, order: p.order });
  };

  const save = async () => {
    await upsert(form);
    setEditing(null);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#111]">Audience Profiles</h2>
      <p className="text-[0.85rem] text-[#888]">Edit the hero section tab content</p>
      <div className="mt-4 space-y-3">
        {profiles.map((p: any) => (
          <div key={p.profileId} className="rounded-[8px] border border-[#eaeaea] p-4">
            {editing === p.profileId ? (
              <div className="space-y-3">
                <input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })}
                  className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.88rem] outline-none focus:border-[#111]" placeholder="Label" />
                <textarea value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })}
                  className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.88rem] outline-none focus:border-[#111]" rows={3} placeholder="Headline" />
                <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.88rem] outline-none focus:border-[#111]" rows={2} placeholder="Summary" />
                <div className="flex gap-2">
                  <button onClick={save} className="flex items-center gap-1.5 rounded-[5px] bg-[#111] px-3 py-1.5 text-[0.82rem] font-medium text-white">
                    <FiSave className="text-[0.75rem]" /> Save
                  </button>
                  <button onClick={() => setEditing(null)} className="flex items-center gap-1.5 rounded-[5px] border border-[#e0e0e0] px-3 py-1.5 text-[0.82rem] font-medium text-[#666]">
                    <FiX className="text-[0.75rem]" /> Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.9rem] font-semibold text-[#222]">{p.label}</p>
                  <p className="mt-1 text-[0.82rem] leading-[1.5] text-[#888]">{p.headline.slice(0, 80)}...</p>
                </div>
                <button onClick={() => startEdit(p)} className="shrink-0 text-[#aaa] hover:text-[#111]">
                  <FiEdit2 className="text-[0.85rem]" />
                </button>
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
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    slug: "", kicker: "", title: "", summary: "", metaLeft: "", metaRight: "",
    accent: "#111111", year: "", role: "", client: "", duration: "", stack: [] as string[],
    reverse: false, order: 0,
  });

  if (!projects) return <LoadingSkeleton />;

  const startEdit = (p: any) => {
    setEditing(p.slug);
    setForm({ slug: p.slug, kicker: p.kicker, title: p.title, summary: p.summary,
      metaLeft: p.metaLeft, metaRight: p.metaRight, accent: p.accent, year: p.year,
      role: p.role, client: p.client, duration: p.duration, stack: p.stack,
      reverse: p.reverse, order: p.order });
  };

  const startAdd = () => {
    setShowAdd(true);
    setForm({ slug: "", kicker: "", title: "", summary: "", metaLeft: "", metaRight: "",
      accent: "#111111", year: new Date().getFullYear().toString(), role: "", client: "",
      duration: "", stack: [], reverse: false, order: projects.length });
  };

  const save = async () => {
    if (!form.slug) { alert("Slug is required"); return; }
    await upsert(form);
    setEditing(null);
    setShowAdd(false);
  };

  const handleDelete = async (slug: string) => {
    if (confirm("Delete this project?")) {
      await deleteProject({ slug });
    }
  };

  const ProjectForm = () => (
    <div className="space-y-3 rounded-[8px] border border-[#eaeaea] bg-[#fafafa] p-5">
      <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
        <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Slug (url-friendly)" disabled={!!editing} />
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Title" />
      </div>
      <input value={form.kicker} onChange={(e) => setForm({ ...form, kicker: e.target.value })}
        className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Kicker" />
      <textarea value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })}
        className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" rows={3} placeholder="Summary" />
      <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
        <input value={form.metaLeft} onChange={(e) => setForm({ ...form, metaLeft: e.target.value })}
          className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Meta Left (e.g. Editorial platform)" />
        <input value={form.metaRight} onChange={(e) => setForm({ ...form, metaRight: e.target.value })}
          className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Meta Right (e.g. UI / Frontend concept)" />
      </div>
      <div className="grid grid-cols-3 gap-3 max-[560px]:grid-cols-1">
        <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Role" />
        <input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })}
          className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Client" />
        <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Duration" />
      </div>
      <div className="grid grid-cols-2 gap-3 max-[560px]:grid-cols-1">
        <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Year" />
        <input value={form.accent} onChange={(e) => setForm({ ...form, accent: e.target.value })}
          className="rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Accent color (#hex)" />
      </div>
      <input value={form.stack.join(", ")} onChange={(e) => setForm({ ...form, stack: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
        className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Tech stack (comma separated)" />
      <div className="flex gap-2">
        <button onClick={save} className="flex items-center gap-1.5 rounded-[5px] bg-[#111] px-3 py-1.5 text-[0.82rem] font-medium text-white">
          <FiSave className="text-[0.75rem]" /> Save
        </button>
        <button onClick={() => { setEditing(null); setShowAdd(false); }} className="flex items-center gap-1.5 rounded-[5px] border border-[#e0e0e0] px-3 py-1.5 text-[0.82rem] font-medium text-[#666]">
          <FiX className="text-[0.75rem]" /> Cancel
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#111]">Projects</h2>
          <p className="text-[0.85rem] text-[#888]">Manage portfolio projects</p>
        </div>
        <button onClick={startAdd} className="flex items-center gap-1.5 rounded-[5px] bg-[#111] px-3 py-1.5 text-[0.82rem] font-medium text-white">
          <FiPlus className="text-[0.75rem]" /> Add Project
        </button>
      </div>
      {showAdd && <ProjectForm />}
      <div className="mt-4 space-y-3">
        {projects.map((p: any) => (
          <div key={p.slug}>
            {editing === p.slug ? <ProjectForm /> : (
              <div className="flex items-center justify-between rounded-[8px] border border-[#eaeaea] p-4">
                <div>
                  <p className="text-[0.9rem] font-semibold text-[#222]">{p.title}</p>
                  <p className="mt-0.5 text-[0.8rem] text-[#aaa]">{p.metaLeft} · {p.year}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(p)} className="text-[#aaa] hover:text-[#111]"><FiEdit2 className="text-[0.85rem]" /></button>
                  <button onClick={() => handleDelete(p.slug)} className="text-[#aaa] hover:text-[#e03030]"><FiTrash2 className="text-[0.85rem]" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReferencesEditor() {
  const references = useQuery(api.content.getReferences);
  const upsert = useMutation(api.content.upsertReference);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", role: "", body: "", order: 0 });

  if (!references) return <LoadingSkeleton />;

  const startEdit = (r: any) => {
    setEditing(r.name);
    setForm({ name: r.name, role: r.role, body: r.body, order: r.order });
  };

  const save = async () => {
    await upsert(form);
    setEditing(null);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#111]">References</h2>
      <p className="text-[0.85rem] text-[#888]">Edit testimonials</p>
      <div className="mt-4 space-y-3">
        {references.map((r: any) => (
          <div key={r.name} className="rounded-[8px] border border-[#eaeaea] p-4">
            {editing === r.name ? (
              <div className="space-y-3">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Name" />
                <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" placeholder="Role" />
                <textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}
                  className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] outline-none focus:border-[#111]" rows={3} placeholder="Testimonial" />
                <div className="flex gap-2">
                  <button onClick={save} className="flex items-center gap-1.5 rounded-[5px] bg-[#111] px-3 py-1.5 text-[0.82rem] font-medium text-white"><FiSave className="text-[0.75rem]" /> Save</button>
                  <button onClick={() => setEditing(null)} className="flex items-center gap-1.5 rounded-[5px] border border-[#e0e0e0] px-3 py-1.5 text-[0.82rem] font-medium text-[#666]"><FiX className="text-[0.75rem]" /> Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.9rem] font-semibold text-[#222]">{r.name}</p>
                  <p className="text-[0.78rem] text-[#aaa]">{r.role}</p>
                  <p className="mt-1 text-[0.82rem] leading-[1.5] text-[#666]">{r.body.slice(0, 100)}...</p>
                </div>
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
  const [editingDesc, setEditingDesc] = useState(false);
  const [desc, setDesc] = useState("");

  if (!values || !siteContent) return <LoadingSkeleton />;

  const startEditDesc = () => {
    setEditingDesc(true);
    setDesc(siteContent["values.description"] || "");
  };

  const saveDesc = async () => {
    await setSiteContent({ key: "values.description", value: desc });
    setEditingDesc(false);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#111]">Values</h2>
      <p className="text-[0.85rem] text-[#888]">The four core values displayed on the homepage</p>
      <div className="mt-4 space-y-2">
        {values.map((v: any) => (
          <div key={v.text} className="rounded-[8px] border border-[#eaeaea] px-4 py-3">
            <p className="text-[1.1rem] font-semibold tracking-[-0.03em] text-[#222]">{v.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-[8px] border border-[#eaeaea] p-4">
        <div className="flex items-center justify-between">
          <p className="text-[0.88rem] font-semibold text-[#222]">Values Description</p>
          {!editingDesc && <button onClick={startEditDesc} className="text-[#aaa] hover:text-[#111]"><FiEdit2 className="text-[0.85rem]" /></button>}
        </div>
        {editingDesc ? (
          <div className="mt-3 space-y-3">
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)}
              className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] leading-[1.6] outline-none focus:border-[#111]" rows={4} />
            <div className="flex gap-2">
              <button onClick={saveDesc} className="flex items-center gap-1.5 rounded-[5px] bg-[#111] px-3 py-1.5 text-[0.82rem] font-medium text-white"><FiSave className="text-[0.75rem]" /> Save</button>
              <button onClick={() => setEditingDesc(false)} className="flex items-center gap-1.5 rounded-[5px] border border-[#e0e0e0] px-3 py-1.5 text-[0.82rem] font-medium text-[#666]"><FiX className="text-[0.75rem]" /> Cancel</button>
            </div>
          </div>
        ) : (
          <p className="mt-2 text-[0.82rem] leading-[1.6] text-[#888]">{siteContent["values.description"]?.slice(0, 150)}...</p>
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

  if (!about) return <LoadingSkeleton />;

  const sections = [
    { key: "heading", label: "Heading" },
    { key: "columnTwo", label: "Column Two" },
    { key: "columnThree", label: "Column Three" },
    { key: "bottomText", label: "Bottom Text" },
  ];

  const startEdit = (key: string) => {
    setEditing(key);
    setLines(about[key] || []);
  };

  const save = async () => {
    if (!editing) return;
    await setAbout({ key: editing, lines });
    setEditing(null);
  };

  return (
    <div className="space-y-3">
      <h2 className="text-[1.2rem] font-semibold tracking-[-0.02em] text-[#111]">About Section</h2>
      <p className="text-[0.85rem] text-[#888]">Edit the about section text content</p>
      <div className="mt-4 space-y-3">
        {sections.map((s) => (
          <div key={s.key} className="rounded-[8px] border border-[#eaeaea] p-4">
            {editing === s.key ? (
              <div className="space-y-3">
                <p className="text-[0.82rem] font-semibold text-[#555]">{s.label}</p>
                <textarea
                  value={lines.join("\n")}
                  onChange={(e) => setLines(e.target.value.split("\n"))}
                  className="w-full rounded-[5px] border border-[#e0e0e0] px-3 py-2 text-[0.85rem] leading-[1.6] outline-none focus:border-[#111]"
                  rows={4}
                  placeholder="One line per row"
                />
                <p className="text-[0.75rem] text-[#bbb]">Each line becomes a separate line on the site</p>
                <div className="flex gap-2">
                  <button onClick={save} className="flex items-center gap-1.5 rounded-[5px] bg-[#111] px-3 py-1.5 text-[0.82rem] font-medium text-white"><FiSave className="text-[0.75rem]" /> Save</button>
                  <button onClick={() => setEditing(null)} className="flex items-center gap-1.5 rounded-[5px] border border-[#e0e0e0] px-3 py-1.5 text-[0.82rem] font-medium text-[#666]"><FiX className="text-[0.75rem]" /> Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[0.88rem] font-semibold text-[#222]">{s.label}</p>
                  <p className="mt-1 text-[0.82rem] leading-[1.5] text-[#888]">
                    {(about[s.key] || []).join(" ")}
                  </p>
                </div>
                <button onClick={() => startEdit(s.key)} className="shrink-0 text-[#aaa] hover:text-[#111]"><FiEdit2 className="text-[0.85rem]" /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function LoadingSkeleton() {
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
