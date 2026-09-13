import { MoonIcon, SunIcon } from './Icons.jsx';
import s from './ThemeToggle.module.css';

/** Compact header control: explicit light / dark switch. */
export function ThemeToggle({ theme, onToggle, className = '' }) {
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className={`${s.toggle} ${className}`}
      onClick={onToggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <span className={s.iconWrap} data-theme={theme}>
        <SunIcon className={s.sun} />
        <MoonIcon className={s.moon} />
      </span>
    </button>
  );
}

const OPTIONS = [
  ['light', 'Light'],
  ['dark', 'Dark'],
  ['system', 'System'],
];

/** Three-way control (light / dark / follow system) used in the footer and mobile menu. */
export function ThemeOptions({ preference, onSetPreference, className = '' }) {
  return (
    <div role="radiogroup" aria-label="Colour theme" className={`${s.options} ${className}`}>
      {OPTIONS.map(([value, label]) => (
        <button
          key={value}
          type="button"
          role="radio"
          aria-checked={preference === value}
          data-checked={preference === value}
          className={s.option}
          onClick={() => onSetPreference(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
