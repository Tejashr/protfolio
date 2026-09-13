import { useEffect } from 'react';

/** Locks page scroll while `locked` is true (used by the mobile menu). */
export function useLockBody(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
    };
  }, [locked]);
}
