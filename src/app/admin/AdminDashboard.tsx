"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import ImageUploader from "./ImageUploader";
import { AdminImageSkeleton } from "@/components/Skeleton";
import {
  FiHome,
  FiGrid,
  FiImage,
  FiSmartphone,
  FiUser,
  FiChevronDown,
  FiTrash2,
  FiCheck,
  FiLayers,
} from "react-icons/fi";

type Slot = { id: string; label: string };

type Section = {
  id: string;
  label: string;
  icon: React.ElementType;
  slots: Slot[];
};

type ProjectGroup = {
  id: string;
  name: string;
  icon: React.ElementType;
  sections: Section[];
};

const GROUPS: ProjectGroup[] = [
  {
    id: "homepage",
    name: "Homepage",
    icon: FiHome,
    sections: [
      {
        id: "homepage-about",
        label: "About Portraits",
        icon: FiUser,
        slots: [
          { id: "primary", label: "Primary Portrait" },
          { id: "secondary", label: "Secondary Portrait" },
        ],
      },
    ],
  },
  {
    id: "trend-bible",
    name: "Trend Bible",
    icon: FiLayers,
    sections: [
      {
        id: "trend-bible-hero",
        label: "Hero",
        icon: FiImage,
        slots: [{ id: "hero", label: "Hero Image" }],
      },
      {
        id: "trend-bible-gallery",
        label: "Gallery",
        icon: FiGrid,
        slots: [
          { id: "gallery-0", label: "Image 1" },
          { id: "gallery-1", label: "Image 2" },
          { id: "gallery-2", label: "Image 3" },
          { id: "gallery-3", label: "Image 4" },
          { id: "gallery-4", label: "Image 5" },
          { id: "gallery-5", label: "Image 6" },
        ],
      },
      {
        id: "trend-bible-mobile",
        label: "Mobile Mockups",
        icon: FiSmartphone,
        slots: [
          { id: "mobile-0", label: "Mobile 1" },
          { id: "mobile-1", label: "Mobile 2" },
          { id: "mobile-2", label: "Mobile 3" },
          { id: "mobile-3", label: "Mobile 4" },
          { id: "mobile-4", label: "Mobile 5" },
        ],
      },
      {
        id: "trend-bible-persona",
        label: "Persona",
        icon: FiUser,
        slots: [{ id: "persona", label: "Persona Photo" }],
      },
    ],
  },
  {
    id: "visual-poetry",
    name: "Visual Poetry",
    icon: FiLayers,
    sections: [
      {
        id: "visual-poetry-hero",
        label: "Hero",
        icon: FiImage,
        slots: [{ id: "hero", label: "Hero Image" }],
      },
      {
        id: "visual-poetry-mobile",
        label: "Mobile Mockups",
        icon: FiSmartphone,
        slots: [
          { id: "mobile-0", label: "Mobile 1" },
          { id: "mobile-1", label: "Mobile 2" },
          { id: "mobile-2", label: "Mobile 3" },
          { id: "mobile-3", label: "Mobile 4" },
          { id: "mobile-4", label: "Mobile 5" },
        ],
      },
      {
        id: "visual-poetry-persona",
        label: "Persona",
        icon: FiUser,
        slots: [{ id: "persona", label: "Persona Photo" }],
      },
    ],
  },
];

export default function AdminDashboard({
  token,
  onLogout,
}: {
  token: string;
  onLogout: () => void;
}) {
  const [activeGroup, setActiveGroup] = useState<string>(GROUPS[0].id);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(GROUPS[0].sections.map((s) => s.id))
  );

  const [deleteTarget, setDeleteTarget] = useState<Id<"images"> | null>(null);

  const allImages = useQuery(api.images.getAll);
  const deleteImage = useMutation(api.images.deleteImage);
  const logout = useMutation(api.auth.logout);

  const currentGroup = GROUPS.find((g) => g.id === activeGroup)!;

  const getImageForSlot = (section: string, slot: string) => {
    if (!allImages) return null;
    return allImages.find((img) => img.section === section && img.slot === slot);
  };

  const getUploadedCount = (groupId: string) => {
    if (!allImages) return 0;
    return allImages.filter((img) => img.section.startsWith(groupId)).length;
  };

  const getTotalSlots = (group: ProjectGroup) => {
    return group.sections.reduce((acc, s) => acc + s.slots.length, 0);
  };

  const handleLogout = async () => {
    await logout({ token });
    onLogout();
  };

  const handleDelete = async (id: Id<"images">) => {
    setDeleteTarget(id);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteImage({ id: deleteTarget });
    } catch (err) {
      console.error("Delete failed:", err);
    }
    setDeleteTarget(null);
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleGroupChange = (groupId: string) => {
    setActiveGroup(groupId);
    const group = GROUPS.find((g) => g.id === groupId)!;
    setExpandedSections(new Set(group.sections.map((s) => s.id)));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-[#eaeaea] bg-white">
        <div className="mx-auto flex max-w-[960px] items-center justify-between px-6 py-4 max-[560px]:px-4">
          <div className="flex items-center gap-2.5">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="text-[#111111]"
            >
              <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" />
              <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
            </svg>
            <span className="text-[0.95rem] font-semibold tracking-[-0.03em] text-[#111111]">
              Images Manager
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-[0.82rem] font-medium text-[#888888] transition-colors hover:text-[#111111]"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* Project Tabs */}
      <div className="border-b border-[#eaeaea]">
        <div className="mx-auto max-w-[960px] px-6 max-[560px]:px-4">
          <div className="flex gap-6 overflow-x-auto pt-1 max-[560px]:gap-4">
            {GROUPS.map((group) => {
              const GroupIcon = group.icon;
              const uploaded = getUploadedCount(group.id);
              const total = getTotalSlots(group);
              const isActive = activeGroup === group.id;
              return (
                <button
                  key={group.id}
                  onClick={() => handleGroupChange(group.id)}
                  className={`flex shrink-0 items-center gap-2 border-b-2 pb-3 pt-3 text-[0.88rem] font-medium transition-colors ${
                    isActive
                      ? "border-[#111111] text-[#111111]"
                      : "border-transparent text-[#888888] hover:text-[#444444]"
                  }`}
                >
                  <GroupIcon className="text-[1rem]" strokeWidth={1.8} />
                  <span>{group.name}</span>
                  <span className="text-[0.72rem] text-[#aaaaaa]">
                    {uploaded}/{total}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-[960px] px-6 py-8 max-[560px]:px-4 max-[560px]:py-5">
        {/* Section Header with Collapse All */}
        <div className="mb-5 flex items-center justify-between">
          <p className="text-[0.82rem] font-medium text-[#888888]">
            {currentGroup.sections.length} sections · {getTotalSlots(currentGroup)} slots
          </p>
          <button
            onClick={() => {
              const allExpanded = currentGroup.sections.every((s) => expandedSections.has(s.id));
              if (allExpanded) {
                setExpandedSections(new Set());
              } else {
                setExpandedSections(new Set(currentGroup.sections.map((s) => s.id)));
              }
            }}
            className="text-[0.8rem] font-medium text-[#888888] transition-colors hover:text-[#111111]"
          >
            {currentGroup.sections.every((s) => expandedSections.has(s.id))
              ? "Collapse all"
              : "Expand all"}
          </button>
        </div>

        {/* Sections */}
        <div className="space-y-5">
          {currentGroup.sections.map((section) => {
            const SectionIcon = section.icon;
            const isExpanded = expandedSections.has(section.id);
            const sectionUploaded = section.slots.filter(
              (slot) => getImageForSlot(section.id, slot.id) !== null
            ).length;
            const isComplete = sectionUploaded === section.slots.length;

            return (
              <div
                key={section.id}
                className="rounded-[8px] border border-[#eaeaea]"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left max-[560px]:px-4"
                >
                  <div className="flex items-center gap-3">
                    <SectionIcon
                      className="text-[1.1rem] text-[#777777]"
                      strokeWidth={1.6}
                    />
                    <span className="text-[0.92rem] font-semibold tracking-[-0.01em] text-[#222222]">
                      {section.label}
                    </span>
                    {isComplete && (
                      <FiCheck className="text-[0.85rem] text-[#888888]" strokeWidth={2.5} />
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[0.78rem] text-[#aaaaaa]">
                      {sectionUploaded}/{section.slots.length}
                    </span>
                    <FiChevronDown
                      className={`text-[0.9rem] text-[#aaaaaa] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="border-t border-[#f0f0f0] px-5 pb-5 pt-4 max-[560px]:px-4">
                    <div className={`grid gap-4 ${section.slots.length === 1 ? "grid-cols-1 max-w-[420px]" : section.slots.length === 2 ? "grid-cols-2 max-[560px]:grid-cols-1" : "grid-cols-3 max-[768px]:grid-cols-2 max-[560px]:grid-cols-1"}`}>
                      {!allImages ? (
                        // Loading skeleton
                        section.slots.map((slot) => (
                          <AdminImageSkeleton key={slot.id} />
                        ))
                      ) : (
                        section.slots.map((slot) => {
                        const image = getImageForSlot(section.id, slot.id);
                        return (
                          <div key={slot.id}>
                            <p className="mb-2 text-[0.75rem] font-medium text-[#888888]">
                              {slot.label}
                            </p>

                            {image ? (
                              <div>
                                <div className="relative aspect-[4/3] overflow-hidden rounded-[5px] border border-[#f0f0f0] bg-[#fafafa]">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={image.url}
                                    alt={slot.label}
                                    className="h-full w-full object-cover"
                                  />
                                  <button
                                    onClick={() => handleDelete(image._id)}
                                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#999999] shadow-sm transition-colors hover:text-[#111111]"
                                    aria-label="Delete image"
                                  >
                                    <FiTrash2 className="text-[0.78rem]" />
                                  </button>
                                </div>
                                <div className="mt-2">
                                  <ImageUploader section={section.id} slot={slot.id} />
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="flex aspect-[4/3] items-center justify-center rounded-[5px] border border-dashed border-[#d8d8d8] bg-[#fafafa]">
                                  <FiImage className="text-[1.2rem] text-[#cccccc]" />
                                </div>
                                <div className="mt-2">
                                  <ImageUploader section={section.id} slot={slot.id} />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-[340px] rounded-[10px] bg-white p-6 shadow-xl">
            <h3 className="text-[1.05rem] font-semibold text-[#111111]">Delete image?</h3>
            <p className="mt-2 text-[0.88rem] leading-[1.5] text-[#666666]">
              This action cannot be undone. The image will be permanently removed.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 rounded-[6px] border border-[#e0e0e0] py-2.5 text-[0.85rem] font-medium text-[#555555] transition-colors hover:border-[#999999]"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 rounded-[6px] bg-[#111111] py-2.5 text-[0.85rem] font-medium text-white transition-opacity hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
