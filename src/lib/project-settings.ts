export const projectAccentSettingKey = (slug: string) => `${slug}-accent`;

export const isHexColor = (value: string) => /^#[0-9a-fA-F]{6}$/.test(value);

export const getProjectAccent = (
  slug: string,
  fallback: string,
  settings?: { key: string; value: string }[] | null
) => {
  const value = settings?.find((setting) => setting.key === projectAccentSettingKey(slug))?.value;
  return value && isHexColor(value) ? value : fallback;
};
