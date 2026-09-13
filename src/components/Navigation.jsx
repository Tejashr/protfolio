import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { navigation } from '../data/navigation.js';
import { profile, socialLinks } from '../data/profile.js';
import { useActiveSection } from '../hooks/useActiveSection.js';
import { useFocusTrap } from '../hooks/useFocusTrap.js';
import { useLockBody } from '../hooks/useLockBody.js';
import { useScrolled } from '../hooks/useScrolled.js';
import { CloseIcon, MenuIcon } from './Icons.jsx';
import { ThemeOptions, ThemeToggle } from './ThemeToggle.jsx';
import s from './Navigation.module.css';

function Brand({ className = '' }) {
  return (
    <a href="#top" className={`${s.brand} ${className}`} aria-label={`${profile.name}, back to top`}>
      <span>{profile.firstName}</span> <span className={s.brandSub}>HR</span>
    </a>
  );
}

export default function Navigation({ theme, onToggleTheme, preference, onSetPreference }) {
  const scrolled = useScrolled(24);
  const ids = useMemo(() => navigation.map((item) => item.id), []);
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const close = useCallback(() => setOpen(false), []);

  useLockBody(open);
  useFocusTrap(menuRef, open, close);

  // Make the rest of the page inert while the menu is open, and close the
  // menu automatically if the viewport grows into the desktop layout.
  useEffect(() => {
    ['main', 'footer'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (open) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)');
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return (
    <>
      <header className={`${s.header} ${scrolled ? s.scrolled : ''} ${open ? s.menuOpen : ''}`}>
        <div className={`container ${s.bar}`}>
          <Brand />
          <nav className={s.nav} aria-label="Primary">
            <ul className={s.list}>
              {navigation.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`${s.navLink} ${isActive ? s.active : ''}`}
                      aria-current={isActive ? 'true' : undefined}
                    >
                      <span className={s.navNum}>{item.number}</span>
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className={s.actions}>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button
              type="button"
              className={s.menuButton}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label="Open menu"
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobile-menu"
        ref={menuRef}
        className={s.menu}
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
      >
        <div className={`container ${s.menuTop}`}>
          <Brand />
          <div className={s.actions}>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            <button type="button" className={s.menuButton} aria-label="Close menu" onClick={close}>
              <CloseIcon />
            </button>
          </div>
        </div>

        <nav className={`container ${s.menuBody}`} aria-label="Primary, mobile">
          <ul className={s.menuList}>
            {navigation.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`${s.menuLink} ${active === item.id ? s.menuLinkActive : ''}`}
                  style={{ '--i': index }}
                  onClick={close}
                >
                  <span className={s.menuLinkNum}>{item.number}</span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`container ${s.menuFooter}`}>
          <ul className={s.menuContact}>
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
          <ThemeOptions preference={preference} onSetPreference={onSetPreference} />
        </div>
      </div>
    </>
  );
}
