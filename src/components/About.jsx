import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const PRINCIPLES = [
  ['pr.1.t', 'pr.1.p', 'M4 14h16M12 6v16'],
  ['pr.2.t', 'pr.2.p', 'M4 8h16M4 12h16M4 16h10'],
  ['pr.3.t', 'pr.3.p', 'M12 20s-6-3.6-6-8a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.4-6 8-6 8z'],
];

export default function About() {
  const { t } = useLang();
  return (
    <section className="section section--mist" id="nosotros">
      <div className="wrap about">
        <Reveal className="about__copy">
          <p className="eyebrow">
            <span className="eyebrow__line" aria-hidden="true" />
            <Tx k="about.kicker" />
          </p>
          <Tx as="h2" k="about.title" />
          <Tx as="p" k="about.p1" />
          <Tx as="p" k="about.p2" />
          <p className="sign">
            <Tx as="strong" k="about.sign" />
            <Tx as="span" k="about.role" />
          </p>
        </Reveal>
        <Reveal className="about__photo" delay={60}>
          <img src={CONFIG.aboutImage} alt={t('about.photo')} width="1000" height="1500" loading="lazy" decoding="async" />
        </Reveal>
      </div>
      <div className="wrap principles">
        {PRINCIPLES.map(([title, body, d], index) => (
          <Reveal className="principle" key={title} delay={Math.min(index, 3) * 60}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <Tx as="h3" k={title} />
            <Tx as="p" k={body} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
