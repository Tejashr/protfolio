import Picture from './Picture.jsx';
import s from './ProjectShowcase.module.css';

const LAYOUT_CLASS = {
  full: s.full,
  'split-right': s.splitRight,
  'split-left': s.splitLeft,
  typographic: s.typographic,
};

const SIZES = {
  full: '(min-width: 1640px) 1520px, (min-width: 900px) calc(100vw - 2 * var(--gutter)), 100vw',
  'split-right': '(min-width: 900px) 46vw, 100vw',
  'split-left': '(min-width: 900px) 38vw, 100vw',
};

function Media({ project }) {
  if (project.specimen) {
    return (
      <div className={s.specimen} aria-hidden="true">
        <span className={s.specBefore}>{project.specimen.before}</span>
        <span className={s.specArrow}>→</span>
        <span className={s.specAfter}>{project.specimen.after}</span>
      </div>
    );
  }

  const href = project.live ?? project.repos[0]?.href;
  const label = project.live ? `Open the live ${project.name}` : `View the ${project.name} source on GitHub`;

  return (
    <a href={href} className={s.mediaLink} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <div className={s.frame} data-reveal="clip">
        <Picture picture={project.image} alt={project.imageAlt} sizes={SIZES[project.layout]} imgClassName="mono" />
      </div>
      {project.secondaryImage ? (
        <div className={s.secondary} data-reveal style={{ '--reveal-delay': '250ms' }}>
          <Picture picture={project.secondaryImage} alt={project.secondaryImageAlt} sizes="18vw" imgClassName="mono" />
        </div>
      ) : null}
    </a>
  );
}

export default function ProjectShowcase({ project }) {
  return (
    <article className={`${s.project} ${LAYOUT_CLASS[project.layout] ?? ''}`} id={`project-${project.slug}`}>
      <div className={s.head} data-reveal>
        <span className={s.number}>{project.number}</span>
        <h3 className={`display ${s.name}`}>{project.name}</h3>
        <p className={`label ${s.category}`}>
          {project.category} · {project.year}
        </p>
      </div>

      <figure className={s.media}>
        <Media project={project} />
      </figure>

      <div className={s.body} data-reveal style={{ '--reveal-delay': '120ms' }}>
        <p className={s.description}>{project.description}</p>

        <dl className={s.meta}>
          <div className={s.metaRow}>
            <dt className="label">Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div className={s.metaRow}>
            <dt className="label">Stack</dt>
            <dd>
              <ul className={s.tech}>
                {project.tech.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>

        <div className={s.links}>
          {project.live ? (
            <a href={project.live} className="link" target="_blank" rel="noopener noreferrer">
              View live <span className="arrow">↗</span>
            </a>
          ) : (
            <span className={`label ${s.retired}`}>{project.liveNote}</span>
          )}
          {project.repos.map((repo) => (
            <a key={repo.href} href={repo.href} className="link link--quiet" target="_blank" rel="noopener noreferrer">
              {repo.label} on GitHub <span className="arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </article>
  );
}
