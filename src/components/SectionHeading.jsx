import s from './SectionHeading.module.css';

/**
 * Numbered editorial section header. The h2 carries the real section name
 * (good for crawlers and screen readers); the optional lead is the large
 * statement that sets the section's tone.
 */
export default function SectionHeading({ number, title, id, lead }) {
  return (
    <div className={s.heading}>
      <h2 id={id} className={`label ${s.kicker}`}>
        <span className={s.num}>{number}</span>
        <span aria-hidden="true">—</span>
        <span>{title}</span>
      </h2>
      {lead ? (
        <p className={`display ${s.lead}`} data-reveal>
          {lead}
        </p>
      ) : null}
    </div>
  );
}
