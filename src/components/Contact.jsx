import { profile, socialLinks } from '../data/profile.js';
import SectionHeading from './SectionHeading.jsx';
import s from './Contact.module.css';

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
        <a href={`mailto:${profile.email}`} className={s.cta} data-reveal style={{ '--reveal-delay': '200ms' }}>
          Get in touch <span className="arrow">→</span>
        </a>

        <ul className={s.channels} data-reveal style={{ '--reveal-delay': '250ms' }}>
          {socialLinks.map((link) => (
            <li key={link.label}>
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
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
