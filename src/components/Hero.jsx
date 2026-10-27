import { CONFIG } from '../config.js';
import { Tx } from '../i18n/LangContext.jsx';

const TRUST = [
  ['trust.1.n', 'trust.1.l'],
  ['trust.2.n', 'trust.2.l'],
  ['trust.3.n', 'trust.3.l'],
];

export function Hero() {
  return (
    <section className="hero" id="top">
      <img
        className="hero__photo"
        src={CONFIG.heroImage.src}
        srcSet={CONFIG.heroImage.srcSet}
        sizes="100vw"
        alt=""
        width="1600"
        height="900"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__body">
        <div className="wrap hero__copy">
          <p className="kicker kicker--light"><Tx k="hero.eyebrow" /></p>
          <Tx as="h1" k="hero.title" />
          <Tx as="p" k="hero.lead" className="hero__lead" />
          <div className="hero__cta">
            <a className="btn btn--light" href="#agendar"><Tx k="hero.cta1" /></a>
            <a className="btn btn--ghost" href="#servicios"><Tx k="hero.cta2" /></a>
          </div>
        </div>
      </div>
      <div className="hero__trust">
        <ul className="wrap trust">
          {TRUST.map(([num, label]) => (
            <li key={label}>
              <Tx as="b" k={num} />
              <Tx as="span" k={label} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
