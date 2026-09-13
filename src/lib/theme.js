export const THEME_STORAGE_KEY = 'tejas-theme';
export const THEMES = ['light', 'dark', 'system'];

export function systemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function readPreference() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return THEMES.includes(stored) ? stored : 'system';
  } catch {
    return 'system';
  }
}

export function writePreference(preference) {
  try {
    if (preference === 'system') localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    /* Storage unavailable (private mode, blocked): the choice lives for this session only. */
  }
}

export function resolveTheme(preference) {
  return preference === 'system' ? systemTheme() : preference;
}
