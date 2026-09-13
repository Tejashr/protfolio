import { useEffect, useMemo, useState } from 'react';

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';

/**
 * Types each phrase (an array of lines) character by character, holds it,
 * deletes it and moves on to the next, looping forever. Returns the lines
 * currently on screen plus whether the caret should rest (blink).
 *
 * When the visitor prefers reduced motion the phrases are still typed, but
 * only once: the sequence stops on the last phrase instead of looping.
 */
export function useTypewriter(phrases, { typeSpeed = 58, deleteSpeed = 26, hold = 2400, gap = 500 } = {}) {
  const [loop] = useState(() => !(typeof window !== 'undefined' && window.matchMedia?.(REDUCED_MOTION).matches));
  const [state, setState] = useState({ phrase: 0, count: 0, mode: 'typing', done: false });

  const texts = useMemo(() => phrases.map((lines) => lines.join('\n')), [phrases]);
  const text = texts[state.phrase];
  const isLast = state.phrase === texts.length - 1;

  useEffect(() => {
    if (state.done) return undefined;
    let delay;
    let next;
    if (state.mode === 'typing') {
      if (state.count < text.length) {
        const char = text[state.count];
        // Newlines and spaces are instant; other characters get a little jitter.
        delay = char === '\n' ? 0 : char === ' ' ? typeSpeed * 0.6 : typeSpeed + Math.random() * 45;
        next = { ...state, count: state.count + 1 };
      } else if (isLast && !loop) {
        next = { ...state, done: true };
        delay = 0;
      } else {
        delay = hold;
        next = { ...state, mode: 'deleting' };
      }
    } else if (state.count > 0) {
      delay = deleteSpeed;
      next = { ...state, count: state.count - 1 };
    } else {
      delay = gap;
      next = { phrase: (state.phrase + 1) % texts.length, count: 0, mode: 'typing', done: false };
    }
    const timer = window.setTimeout(() => setState(next), delay);
    return () => window.clearTimeout(timer);
  }, [loop, state, text, isLast, texts.length, typeSpeed, deleteSpeed, hold, gap]);

  const shown = text.slice(0, state.count);
  const resting =
    state.done ||
    (state.mode === 'typing' && state.count === text.length) ||
    (state.mode === 'deleting' && state.count === 0);
  return { lines: shown.split('\n'), resting, animated: true };
}
