import { capabilities } from '../data/capabilities.js';
import SectionHeading from './SectionHeading.jsx';
import s from './Capabilities.module.css';

export default function Capabilities() {
  return (
    <section id="capabilities" className="section" aria-labelledby="capabilities-title">
      <div className="container">
        <SectionHeading
          number="01"
          title="What I Build"
          id="capabilities-title"
          lead="Full-stack work across the interface, the API and the data underneath, from internal dashboards to authenticated products."
        />

        <ul className={s.groups}>
          {capabilities.map((group, index) => (
            <li key={group.number} className={s.group} data-reveal style={{ '--reveal-delay': `${index * 80}ms` }}>
              <span className={`label ${s.num}`}>{group.number}</span>
              <h3 className={`display ${s.title}`}>{group.title}</h3>
              <p className={s.summary}>{group.summary}</p>
              <ul className={s.items}>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
