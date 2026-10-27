import { useEffect, useState } from 'react';
import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';

const ITEMS = [
  {
    id: 'ambiental',
    book: 'ambiental',
    num: '01',
    title: 'svc.env',
    lead: 'svc.env.lead',
    alt: 'svc.env.alt',
    points: ['svc.env.1', 'svc.env.2', 'svc.env.3'],
    image: CONFIG.serviceImages.ambiental,
  },
  {
    id: 'minera',
    book: 'minero',
    num: '02',
    title: 'svc.min',
    lead: 'svc.min.lead',
    alt: 'svc.min.alt',
    points: ['svc.min.1', 'svc.min.2', 'svc.min.3'],
    image: CONFIG.serviceImages.minero,
  },
  {
    id: 'administrativa',
    book: 'administrativo',
    num: '03',
    title: 'svc.adm',
    lead: 'svc.adm.lead',
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
  const [on, setOn] = useState(0);
  const [canHover, setCanHover] = useState(false);
  const pick = (index) => setOn(index);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const apply = () => setCanHover(mq.matches);
    apply();
    mq.addEventListener?.('change', apply);
    return () => mq.removeEventListener?.('change', apply);
  }, []);

  useEffect(() => {
    const onTab = (event) => {
      const index = ITEMS.findIndex((item) => item.id === event.detail);
      if (index >= 0) setOn(index);
    };
    window.addEventListener('bc-tab', onTab);
    return () => window.removeEventListener('bc-tab', onTab);
  }, []);

  const onKey = (event) => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    const next = event.key === 'ArrowDown' ? (on + 1) % ITEMS.length : (on + ITEMS.length - 1) % ITEMS.length;
    setOn(next);
    document.getElementById(`tab-${ITEMS[next].id}`)?.focus();
  };

  return (
    <section className="atlas" id="servicios">
      <div className="wrap atlas__grid">
        <div className="atlas__index">
          <p className="kicker"><Tx k="svc.kicker" /></p>
          <Tx as="h2" k="svc.title" />
          <div role="tablist" aria-label={t('svc.kicker')} onKeyDown={onKey}>
            {ITEMS.map((item, index) => (
              <button
                key={item.id}
                id={`tab-${item.id}`}
                type="button"
                role="tab"
                aria-selected={on === index}
                aria-controls={item.id}
                tabIndex={on === index ? 0 : -1}
                className={on === index ? 'is-on' : ''}
                onMouseEnter={canHover ? () => pick(index) : undefined}
                onFocus={() => pick(index)}
                onClick={() => pick(index)}
              >
                <span>{item.num}</span>
                <Tx k={item.title} />
              </button>
            ))}
          </div>
        </div>
        <div className="atlas__stage">
          {ITEMS.map((item, index) => (
            <figure
              key={item.id}
              id={item.id}
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              aria-hidden={on !== index}
              ref={(node) => {
                if (!node) return;
                if (on !== index) node.setAttribute('inert', '');
                else node.removeAttribute('inert');
              }}
              className={on === index ? 'is-on' : ''}
            >
              <div className="tone">
                <img
                  src={item.image.src}
                  srcSet={item.image.srcSet}
                  sizes="(max-width: 900px) 100vw, 560px"
                  alt={t(item.alt)}
                  width="1200"
                  height="800"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
              </div>
              <figcaption>
                <Tx as="p" k={item.lead} />
                <ul>
                  {item.points.map((key) => <li key={key}><Tx k={key} /></li>)}
                </ul>
                <a className="link-arrow" href="#agendar" onClick={goToBooking(item.book)}>
                  <Tx k="svc.more" />
                  <span className="arr" aria-hidden="true">→</span>
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
