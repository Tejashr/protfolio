import { experience } from '../data/experience.js';
import SectionHeading from './SectionHeading.jsx';
import s from './ExperienceTimeline.module.css';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeading
          number="02"
          title="Experience"
          id="experience-title"
          lead="Four companies since 2021, one discipline: building and shipping full-stack web software."
        />

        <ol className={s.timeline}>
          {experience.map((job) => (
            <li key={job.id} className={`${s.entry} ${job.current ? s.current : ''}`} data-reveal>
              <div className={s.year}>
                <span className={`display ${s.yearBig}`}>{job.yearLabel}</span>
                {job.yearSuffix ? <span className={s.yearSuffix}>— {job.yearSuffix}</span> : null}
              </div>

              <div className={s.main}>
                <span className={s.marker} aria-hidden="true" />
                <h3 className={s.company}>{job.company}</h3>
                <p className={`label ${s.role}`}>
                  <span>{job.role}</span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {job.start} — {job.end}
                  </span>
                </p>
                <p className={s.summary}>{job.summary}</p>
                <ul className={s.tags} aria-label="Technologies and focus">
                  {job.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
