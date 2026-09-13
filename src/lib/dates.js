/** Whole years elapsed since a given month/year, never below zero. */
export function yearsSince(year, month = 1, now = new Date()) {
  const start = new Date(year, month - 1, 1);
  let years = now.getFullYear() - start.getFullYear();
  if (now.getMonth() < start.getMonth()) years -= 1;
  return Math.max(0, years);
}

const WORDS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

/** "five" for 5; falls back to digits beyond twelve. */
export function numberWord(n) {
  return WORDS[n] ?? String(n);
}
