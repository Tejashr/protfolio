import { useEffect, useState } from 'react';
import { profile, socialLinks } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';
import s from './Contact.module.css';

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      window.prompt('Copy the address:', value);
    }
  };

  return (
    <button type="button" className={`label ${s.copy}`} onClick={copy} aria-live="polite">
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading number="04" title="Contact" id="contact-title" />

        <p className={`display ${s.statement}`} data-reveal>
          Let’s build something worth using.
        </p>
        <p className={`lead ${s.lead}`} data-reveal style={{ '--reveal-delay': '100ms' }}>
          Have a product, an idea or a problem worth solving? I’d like to hear about it.
        </p>
        <a
          href={profile.composeUrl}
          className={s.cta}
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
          style={{ '--reveal-delay': '200ms' }}
        >
          Get in touch <span className="arrow">→</span>
        </a>

        <ul className={s.channels} data-reveal style={{ '--reveal-delay': '250ms' }}>
          {socialLinks.map((link) => (
            <li key={link.label} className={s.channelRow}>
              <a
                href={link.href}
                className={s.channel}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                <span className="label">{link.label}</span>
                <span className={s.channelValue}>{link.display}</span>
                <span className={`arrow ${s.channelArrow}`} aria-hidden="true">
                  ↗
                </span>
              </a>
              {link.copy ? <CopyButton value={link.copy} /> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
