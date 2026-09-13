import { experiment, projects } from '../data/projects.js';
import ProjectShowcase from './ProjectShowcase.jsx';
import SectionHeading from './SectionHeading.jsx';
import s from './SelectedWork.module.css';

export default function SelectedWork() {
  return (
    <section id="work" className="section" aria-labelledby="work-title">
      <div className="container">
        <SectionHeading
          number="01"
          title="Selected Work"
          id="work-title"
          lead="A selection of products, applications and systems I’ve built, each one full-stack and each one shipped."
        />

        <div className={s.list}>
          {projects.map((project) => (
            <ProjectShowcase key={project.slug} project={project} />
          ))}
        </div>

        <aside className={s.experiment} aria-label="Recent experiment" data-reveal>
          <p className="label">{experiment.label}</p>
          <div className={s.experimentMain}>
            <h3 className={s.experimentName}>
              <a href={experiment.href} className="link" target="_blank" rel="noopener noreferrer">
                {experiment.name} <span className="arrow">↗</span>
              </a>
              <span className={`label ${s.experimentYear}`}>{experiment.year}</span>
            </h3>
            <p className={s.experimentBody}>{experiment.description}</p>
          </div>
          <ul className={s.experimentTech}>
            {experiment.tech.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
