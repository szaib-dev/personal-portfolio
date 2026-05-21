export const projectAccentSettingKey = (slug: string) => `${slug}-accent`;

export const getProjectAccent = (
  slug: string,
  fallback: string,
  settings?: { key: string; value: string }[] | null
) => settings?.find((setting) => setting.key === projectAccentSettingKey(slug))?.value ?? fallback;
