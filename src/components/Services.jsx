import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';

const ITEMS = [
  {
    book: 'ambiental',
    num: '01',
    title: 'svc.env',
    alt: 'svc.env.alt',
    points: ['svc.env.1', 'svc.env.2', 'svc.env.3', 'svc.env.4', 'svc.env.5'],
    image: CONFIG.serviceImages.ambiental,
  },
  {
    book: 'minero',
    num: '02',
    title: 'svc.min',
    alt: 'svc.min.alt',
    points: ['svc.min.1', 'svc.min.2', 'svc.min.3'],
    image: CONFIG.serviceImages.minero,
  },
  {
    book: 'administrativo',
    num: '03',
    title: 'svc.adm',
    alt: 'svc.adm.alt',
    points: ['svc.adm.1', 'svc.adm.2'],
    image: CONFIG.serviceImages.administrativo,
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
    <section className="block" id="servicios">
      <div className="wrap">
        <div className="block__head">
          <p className="kicker"><Tx k="svc.kicker" /></p>
          <Tx as="h2" k="svc.title" />
          <Tx as="p" k="svc.lead" className="lede" />
        </div>
        <div className="cards cards--3">
          {ITEMS.map((item) => (
            <article className="card" key={item.book}>
              <div className="tone">
                <img
                  src={item.image.src}
                  srcSet={item.image.srcSet}
                  sizes="(max-width: 800px) 100vw, 360px"
                  alt={t(item.alt)}
                  width="1200"
                  height="800"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="card__body">
                <p className="card__num">{item.num}</p>
                <Tx as="h3" k={item.title} />
                <ul>
                  {item.points.map((key) => <li key={key}><Tx k={key} /></li>)}
                </ul>
                <a className="link-arrow" href="#agendar" onClick={goToBooking(item.book)}>
                  <Tx k="nav.book" />
                  <span className="arr" aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
