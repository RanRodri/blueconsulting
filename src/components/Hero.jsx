import { CONFIG } from '../config.js';
import { Tx } from '../i18n/LangContext.jsx';

const TABS = [
  ['01', 'tab.01', '#ambiental'],
  ['02', 'tab.02', '#minera'],
  ['03', 'tab.03', '#administrativa'],
];

const Photo = ({ className, priority = false, sizes = '100vw' }) => (
  <img
    className={className}
    src={CONFIG.heroImage.src}
    srcSet={CONFIG.heroImage.srcSet}
    sizes={sizes}
    alt=""
    width="1920"
    height="1200"
    fetchPriority={priority ? 'high' : 'low'}
    decoding="async"
  />
);

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <Photo priority />
      </div>
      <div className="hero__veil" aria-hidden="true" />
      <div className="hero__motif" aria-hidden="true">
        <div className="hero__orb">
          <Photo sizes="(max-width: 860px) 180px, 520px" />
        </div>
        <svg className="hero__ring" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="48.5" fill="none" stroke="#B6CDCB" strokeWidth="0.35" />
        </svg>
      </div>
      <div className="wrap hero__copy">
        <p className="eyebrow eyebrow--mist">
          <span className="eyebrow__line" aria-hidden="true" />
          <Tx k="hero.eyebrow" />
        </p>
        <Tx as="h1" k="hero.title" className="display" />
        <Tx as="p" k="hero.lead" className="hero__lead" />
        <div className="hero__actions">
          <a className="btn btn--light" href="#agendar">
            <Tx k="hero.cta" />
            <span className="arr" aria-hidden="true">→</span>
          </a>
          <a className="link-grow hero__more" href="#servicios">
            <Tx k="hero.more" />
          </a>
        </div>
        <a className="hero__scroll" href="#hechos"><Tx k="hero.scroll" /></a>
      </div>
      <div className="hero__tabs">
        {TABS.map(([num, key, href]) => (
          <a className="hero__tab" href={href} key={href}>
            <small>{num}</small>
            <strong><Tx k={key} /></strong>
          </a>
        ))}
      </div>
    </section>
  );
}
