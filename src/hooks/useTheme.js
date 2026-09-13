import { useCallback, useEffect, useState } from 'react';
import { readPreference, resolveTheme, writePreference } from '../lib/theme.js';

/**
 * Theme state shared with the inline no-flash script in index.html.
 * `preference` is what the user chose (light / dark / system);
 * `theme` is what is actually applied.
 */
export function useTheme() {
  const [preference, setPreferenceState] = useState(readPreference);
  const [theme, setTheme] = useState(() => resolveTheme(readPreference()));

  const apply = useCallback((nextPreference, animate = true) => {
    const root = document.documentElement;
    const next = resolveTheme(nextPreference);
    if (animate && root.getAttribute('data-theme') !== next) {
      root.classList.add('theme-transition');
      window.setTimeout(() => root.classList.remove('theme-transition'), 720);
    }
    root.setAttribute('data-theme', next);
    root.setAttribute('data-theme-preference', nextPreference);
    setTheme(next);
  }, []);

  const setPreference = useCallback(
    (nextPreference) => {
      writePreference(nextPreference);
      setPreferenceState(nextPreference);
      apply(nextPreference);
    },
    [apply],
  );

  /** Header control: explicit light ⇄ dark. */
  const toggle = useCallback(() => {
    setPreference(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setPreference]);

  // Follow the OS while the preference is "system".
  useEffect(() => {
    if (preference !== 'system') return undefined;
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => apply('system');
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [preference, apply]);

  return { theme, preference, setPreference, toggle };
}
