import { useState } from 'react';
import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { useReveal } from './Motion.jsx';

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
  const ref = useReveal();
  const [open, setOpen] = useState(null);
  return (
    <section className="block" id="servicios" ref={ref}>
      <div className="wrap">
        <div className="block__head">
          <p className="kicker"><Tx k="svc.kicker" /></p>
          <Tx as="h2" k="svc.title" />
        </div>
        <div className="vgrid">
          {ITEMS.map((item) => {
            const on = open === item.book;
            const panel = `${item.book}-more`;
            return (
              <article className={`vcard${on ? ' is-open' : ''}`} key={item.book}>
                <div className="vcard__photo zoom">
                  <img
                    src={item.image.src}
                    srcSet={item.image.srcSet}
                    sizes="(max-width: 860px) 100vw, 33vw"
                    alt={t(item.alt)}
                    width="1200"
                    height="800"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="vcard__body">
                  <p className="card__num">{item.num}</p>
                  <Tx as="h3" k={item.title} />
                  <p className="vcard__hook"><Tx k={item.points[0]} /></p>
                  <div className="vcard__more" id={panel}>
                    <ul>
                      {item.points.slice(1).map((key) => <li key={key}><Tx k={key} /></li>)}
                    </ul>
                  </div>
                  <div className="vcard__actions">
                    <button
                      type="button"
                      className="link-arrow vcard__toggle"
                      aria-expanded={on}
                      aria-controls={panel}
                      onClick={() => setOpen(on ? null : item.book)}
                    >
                      {on ? t('svc.less') : t('svc.more')}
                    </button>
                    <a className="link-arrow" href="#agendar" onClick={goToBooking(item.book)}>
                      <Tx k="nav.book" />
                      <span className="arr" aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
