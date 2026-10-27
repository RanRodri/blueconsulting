import { CONFIG } from '../config.js';
import { Tx } from '../i18n/LangContext.jsx';

export function Hero() {
  return (
    <section className="opening" id="top">
      <div className="wrap opening__grid">
        <div className="opening__copy">
          <p className="kicker"><Tx k="hero.eyebrow" /></p>
          <Tx as="h1" k="hero.title" />
        </div>
        <div className="ring ring--hero" aria-hidden="true">
          <img
            src={CONFIG.heroImage.src}
            srcSet={CONFIG.heroImage.srcSet}
            sizes="(max-width: 860px) 220px, 420px"
            alt=""
            width="1280"
            height="800"
            fetchPriority="high"
            decoding="async"
          />
          <span className="ring__stroke" />
        </div>
      </div>
      <div className="wrap opening__deck">
        <Tx as="p" k="hero.lead" />
        <div className="opening__actions">
          <a className="btn" href="#agendar">
            <Tx k="hero.cta" />
            <span className="arr" aria-hidden="true">→</span>
          </a>
          <a className="text-link" href="#servicios"><Tx k="hero.more" /></a>
        </div>
      </div>
    </section>
  );
}
