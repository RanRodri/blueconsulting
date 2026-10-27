import { CONFIG } from '../config.js';
import { Tx } from '../i18n/LangContext.jsx';

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
    </section>
  );
}
