import portrait from '../assets/images/tejas-portrait.jpg?w=320;480;634&format=avif;webp;jpg&as=picture';
import { profile } from '../data/profile.js';
import { numberWord, yearsSince } from '../lib/dates.js';
import Picture from './Picture.jsx';
import s from './Hero.module.css';

/* Line breaks are only enforced on wide screens; below 900px the words wrap naturally. */
const HEADLINE = [
  ['I', 'build', 'web', 'products'],
  ['that', 'work', 'in'],
  ['production.'],
];

export default function Hero() {
  const years = yearsSince(profile.careerStart.year, profile.careerStart.month);
  let wordIndex = 0;

  return (
    <section id="top" className={s.hero} aria-labelledby="hero-title">
      <div className={`container ${s.inner}`}>
        <p className={`label ${s.eyebrow}`}>
          <span>{profile.title}</span>
          <span aria-hidden="true">·</span>
          <span>{profile.location}</span>
        </p>

        <h1 id="hero-title" className={`display ${s.title}`}>
          {HEADLINE.map((line, lineIndex) => (
            <span key={lineIndex} className={s.line}>
              {line.map((word) => {
                const i = wordIndex;
                wordIndex += 1;
                return (
                  <span key={`${lineIndex}-${word}`}>
                    <span className={s.wordMask}>
                      <span className={s.word} style={{ '--i': i }}>
                        {word}
                      </span>
                    </span>{' '}
                  </span>
                );
              })}
            </span>
          ))}
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

        <a href="#work" className={`label ${s.scrollCue}`}>
          <span>Selected work</span>
          <span className={s.scrollLine} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
