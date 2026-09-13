import portrait from '../assets/images/tejas-portrait-detail.jpg?w=240;320;420&format=avif;webp;jpg&as=picture';
import { achievement, certifications, education } from '../data/background.js';
import { philosophy } from '../data/philosophy.js';
import { profile } from '../data/profile.js';
import Picture from './Picture.jsx';
import SectionHeading from './SectionHeading.jsx';
import s from './About.module.css';

function Philosophy() {
  return (
    <div className={s.philosophy}>
      <h3 className="label">How I work</h3>
      <ul className={s.principles}>
        {philosophy.map((item, index) => (
          <li key={item.title} className={s.principle} data-reveal style={{ '--reveal-delay': `${index * 70}ms` }}>
            <p className={`display ${s.principleTitle}`}>{item.title}</p>
            <p className={s.principleBody}>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Background() {
  return (
    <div className={s.background}>
      <div className={s.block} data-reveal>
        <p className="label">{achievement.label}</p>
        <h3 className={s.blockTitle}>{achievement.title}</h3>
        <p className={s.blockSub}>
          {achievement.subtitle}
          <br />
          {achievement.detail}
        </p>
        <p className={s.blockBody}>{achievement.body}</p>
        <figure className={s.certImage}>
          <Picture picture={achievement.image} alt={achievement.imageAlt} sizes="(min-width: 640px) 30vw, 90vw" imgClassName="mono" />
        </figure>
      </div>

      <div className={s.block} data-reveal style={{ '--reveal-delay': '80ms' }}>
        <p className="label">Education</p>
        {education.map((item) => (
          <div key={item.institution} className={s.cred}>
            <h3 className={s.blockTitle}>{item.institution}</h3>
            <p className={s.blockSub}>{item.degree}</p>
            <p className={`label ${s.credPeriod}`}>{item.period}</p>
            <p className={s.blockBody}>{item.note}</p>
          </div>
        ))}
      </div>

      <div className={s.block} data-reveal style={{ '--reveal-delay': '160ms' }}>
        <p className="label">Certification</p>
        <ul className={s.credList}>
          {certifications.map((cert) => (
            <li key={cert.href} className={s.cred}>
              <h3 className={s.blockTitle}>{cert.title}</h3>
              <p className={s.blockSub}>{cert.issuer}</p>
              <p className={`label ${s.credPeriod}`}>{cert.period}</p>
              <a href={cert.href} className={`link link--quiet ${s.verify}`} target="_blank" rel="noopener noreferrer">
                Verify certificate <span className="arrow">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading number="03" title={`About ${profile.firstName}`} id="about-title" />

        <div className={`grid ${s.layout}`}>
          <div className={s.aside}>
            <figure className={s.figure} data-reveal="clip">
              <Picture
                picture={portrait}
                alt="Tejas HR, close portrait"
                sizes="(min-width: 900px) 24vw, 62vw"
                imgClassName={s.img}
              />
            </figure>
            <dl className={s.facts}>
              <div>
                <dt className="label">Based in</dt>
                <dd>{profile.location}</dd>
              </div>
              <div>
                <dt className="label">Currently</dt>
                <dd>{profile.currentCompany}</dd>
              </div>
              <div>
                <dt className="label">Building since</dt>
                <dd>{profile.careerStart.year}</dd>
              </div>
              <div>
                <dt className="label">Focus</dt>
                <dd>Full-stack web applications</dd>
              </div>
            </dl>
          </div>

          <div className={s.main}>
            <p className={`display ${s.statement}`} data-reveal>
              I build things across the stack, from the interfaces people use to the systems that make them work.
            </p>
            <div className={`prose ${s.prose}`} data-reveal style={{ '--reveal-delay': '100ms' }}>
              <p>
                I’m Tejas, a full-stack developer based in Bengaluru. Since 2021 I’ve built for four companies: an
                early-stage team where I owned a MERN product end to end; Taskmo, where I built the client- and
                team-management dashboards the business ran on; Dvara Solutions; and now {profile.currentCompany}.
              </p>
              <p>
                My work sits on both sides of the stack: React interfaces and dashboards in front, Node.js and Express
                APIs with MongoDB or MySQL behind them. I care about the whole thing holding together, the interface,
                the API and the data model, because that is what a user actually experiences.
              </p>
              <p>
                Before that came a Computer Science engineering degree and a Smart India Hackathon grand finale in
                2018.
              </p>
              <p>
                The GitHub bio reads “open-source enthusiast, tech explorer”. That is a fair summary of how the time
                around the work gets spent.
              </p>
            </div>
          </div>
        </div>

        <Philosophy />
        <Background />
      </div>
    </section>
  );
}
