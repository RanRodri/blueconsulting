import { CONFIG } from '../config.js';
import { Tx } from '../i18n/LangContext.jsx';

export function Hero() {
  return (
    <section className="hero" id="top">
      <img
        className="hero__photo"
        src={CONFIG.heroImage}
        alt=""
        width="1600"
        height="1000"
        decoding="async"
        fetchPriority="high"
      />
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__in">
        <Tx as="p" k="hero.eyebrow" className="kicker kicker--light" />
        <Tx as="h1" k="hero.title" className="hero__title" />
        <Tx as="p" k="hero.lead" className="hero__lead" />
        <div className="hero__cta">
          <a href="#reservar" className="btn btn--fill"><Tx k="hero.cta1" /></a>
          <a href="#servicios" className="btn btn--ghost"><Tx k="hero.cta2" /></a>
        </div>
      </div>
    </section>
  );
}
