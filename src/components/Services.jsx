import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const CARDS = [
  {
    id: 'ambiental',
    book: 'ambiental',
    title: 'svc.env',
    lead: 'svc.env.lead',
    alt: 'svc.env.alt',
    points: ['svc.env.1', 'svc.env.2', 'svc.env.3'],
    image: CONFIG.serviceImages.ambiental,
    num: '01',
  },
  {
    id: 'minera',
    book: 'minero',
    title: 'svc.min',
    lead: 'svc.min.lead',
    alt: 'svc.min.alt',
    points: ['svc.min.1', 'svc.min.2', 'svc.min.3'],
    image: CONFIG.serviceImages.minero,
    num: '02',
  },
  {
    id: 'administrativa',
    book: 'administrativo',
    title: 'svc.adm',
    lead: 'svc.adm.lead',
    alt: 'svc.adm.alt',
    points: ['svc.adm.1', 'svc.adm.2'],
    image: CONFIG.serviceImages.administrativo,
    num: '03',
  },
];

const goToBooking = (id) => (event) => {
  event.preventDefault();
  window.dispatchEvent(new CustomEvent('bc-service', { detail: id }));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('agendar')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
};

export default function Services() {
  const { t } = useLang();
  return (
    <section className="section section--white" id="servicios">
      <div className="wrap">
        <div className="split-head">
          <Reveal>
            <p className="eyebrow">
              <span className="eyebrow__line" aria-hidden="true" />
              <Tx k="svc.kicker" />
            </p>
            <Tx as="h2" k="svc.title" />
          </Reveal>
          <Reveal delay={60}>
            <Tx as="p" k="svc.lead" className="lead" />
          </Reveal>
        </div>
        <div className="cards">
          {CARDS.map((card, index) => (
            <Reveal as="article" className="card" id={card.id} key={card.id} delay={Math.min(index, 3) * 60}>
              <div className="card__photo">
                <img
                  src={card.image.src}
                  srcSet={card.image.srcSet}
                  sizes="(max-width: 860px) 100vw, 380px"
                  alt={t(card.alt)}
                  width="1280"
                  height="960"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="card__num">{card.num}</p>
              <Tx as="h3" k={card.title} />
              <Tx as="p" k={card.lead} />
              <ul>
                {card.points.map((key) => (
                  <li key={key}><Tx k={key} /></li>
                ))}
              </ul>
              <a className="link-arrow" href="#agendar" onClick={goToBooking(card.book)}>
                <Tx k="svc.more" />
                <span className="arr" aria-hidden="true">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
