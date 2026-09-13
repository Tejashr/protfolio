import { profile, socialLinks } from '../data/profile.js';
import { ThemeOptions } from './ThemeToggle.jsx';
import s from './Footer.module.css';

export default function Footer({ preference, onSetPreference }) {
  const year = new Date().getFullYear();

  return (
    <footer id="footer" className={s.footer}>
      <div className={`container ${s.inner}`}>
        <div className={s.identity}>
          <p className={s.name}>{profile.name}</p>
          <p className="label">{profile.title}</p>
          <p className={s.tagline}>{profile.tagline}</p>
        </div>

        <ul className={s.links} aria-label="Elsewhere">
          {socialLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="link link--quiet"
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={s.theme}>
          <span className="label">Theme</span>
          <ThemeOptions preference={preference} onSetPreference={onSetPreference} />
        </div>

        <div className={s.bottom}>
          <p className="label">
            © {year} {profile.name}
          </p>
          <a href="#top" className={`label link link--quiet ${s.top}`}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
