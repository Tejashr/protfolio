import { useEffect } from 'react';

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Keeps keyboard focus inside `ref` while `active`, closes on Escape and
 * restores focus to the previously focused element afterwards.
 */
export function useFocusTrap(ref, active, onClose) {
  useEffect(() => {
    if (!active || !ref.current) return undefined;
    const node = ref.current;
    const previouslyFocused = document.activeElement;

    const focusables = () => Array.from(node.querySelectorAll(FOCUSABLE)).filter((el) => el.offsetParent !== null);
    const first = focusables()[0];
    if (first) first.focus({ preventScroll: true });

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (!items.length) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus({ preventScroll: true });
      }
    };
  }, [ref, active, onClose]);
}
