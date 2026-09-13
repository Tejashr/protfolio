import portrait from '../assets/images/tejas-portrait.jpg?w=320;480;634&format=avif;webp;jpg&as=picture';
import { profile } from '../data/profile.js';
import { useTypewriter } from '../hooks/useTypewriter.js';
import { numberWord, yearsSince } from '../lib/dates.js';
import Picture from './Picture.jsx';
import s from './Hero.module.css';

/* Each phrase is an array of lines. Line breaks are enforced on wide screens
   and wrap naturally below 900px. */
const PHRASES = [
  [`${profile.name}.`],
  ['I build web products', 'that work in', 'production.'],
];
const HEADLINE_TEXT = PHRASES.map((lines) => lines.join(' ')).join(' ');

export default function Hero() {
  const years = yearsSince(profile.careerStart.year, profile.careerStart.month);
  const { lines, resting, animated } = useTypewriter(PHRASES, { staticIndex: 1 });

  return (
    <section id="top" className={s.hero} aria-labelledby="hero-title">
      <div className={`container ${s.inner}`}>
        <p className={`label ${s.eyebrow}`}>
          <span>{profile.title}</span>
          <span aria-hidden="true">·</span>
          <span>{profile.location}</span>
        </p>

        <h1 id="hero-title" className={`display ${s.title}`} aria-label={HEADLINE_TEXT}>
          <span aria-hidden="true">
            {lines.map((line, index) => (
              <span key={index}>
                <span className={s.line}>
                  {line}
                  {animated && index === lines.length - 1 ? (
                    <span className={`${s.cursor} ${resting ? s.cursorResting : ''}`} />
                  ) : null}
                </span>{' '}
              </span>
            ))}
          </span>
        </h1>

        <p className={`lead ${s.lead}`}>
          Full-stack developer with {numberWord(years)} years of shipping React front-ends, Node.js APIs and the
          databases underneath them. Currently building at {profile.currentCompany}.
        </p>

        <dl className={s.meta}>
            <div>
              <dt className="label">Name</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt className="label">Discipline</dt>
              <dd>{profile.title}</dd>
            </div>
            <div>
              <dt className="label">Building since</dt>
              <dd>{profile.careerStart.year}</dd>
            </div>
            <div>
              <dt className="label">Elsewhere</dt>
              <dd className={s.metaLinks}>
                <a href={profile.links.github} className="link link--quiet" target="_blank" rel="noopener noreferrer">
                  GitHub <span className="arrow">↗</span>
                </a>
                <a href={profile.links.linkedin} className="link link--quiet" target="_blank" rel="noopener noreferrer">
                  LinkedIn <span className="arrow">↗</span>
                </a>
              </dd>
            </div>
          </dl>

        <figure className={s.figure}>
          <div className={s.frame}>
            <Picture
              picture={portrait}
              alt="Portrait of Tejas HR, smiling, in a dark shirt"
              sizes="(min-width: 900px) 40vw, 78vw"
              priority
              className={s.picture}
              imgClassName={s.img}
            />
          </div>
          <figcaption className={`label ${s.caption}`}>
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </figcaption>
        </figure>

        <a href="#capabilities" className={`label ${s.scrollCue}`}>
          <span>What I build</span>
          <span className={s.scrollLine} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
