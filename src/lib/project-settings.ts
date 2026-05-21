export const projectAccentSettingKey = (slug: string) => `${slug}-accent`;
export const projectAccentStorageKey = (slug: string) => `project-accent:${slug}`;
export const PROJECT_ACCENT_EVENT = "project-accent-change";

export const isHexColor = (value: string) => /^#[0-9a-fA-F]{6}$/.test(value);

export const getProjectAccent = (
  slug: string,
  fallback: string,
  settings?: { key: string; value: string }[] | null
) => {
  const value = settings?.find((setting) => setting.key === projectAccentSettingKey(slug))?.value;
  return value && isHexColor(value) ? value : fallback;
};

export const getStoredProjectAccent = (slug: string) => {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(projectAccentStorageKey(slug));
  return value && isHexColor(value) ? value : null;
};

export const publishProjectAccent = (slug: string, value: string) => {
  if (typeof window === "undefined" || !isHexColor(value)) return;

  window.localStorage.setItem(projectAccentStorageKey(slug), value);
  window.dispatchEvent(
    new CustomEvent(PROJECT_ACCENT_EVENT, {
      detail: { slug, value },
    })
  );
};
