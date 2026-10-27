import { useState } from 'react';
import { media, lqip } from '../images.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Picture } from './Picture.jsx';

const ITEMS = [
  {
    book: 'ambiental',
    num: '01',
    title: 'svc.env',
    alt: 'svc.env.alt',
    points: ['svc.env.1', 'svc.env.2', 'svc.env.3', 'svc.env.4', 'svc.env.5'],
    image: media.forest,
    lqip: lqip.forest,
  },
  {
    book: 'minero',
    num: '02',
    title: 'svc.min',
    alt: 'svc.min.alt',
    points: ['svc.min.1', 'svc.min.2', 'svc.min.3'],
    image: media.mine,
    lqip: lqip.mine,
  },
  {
    book: 'administrativo',
    num: '03',
    title: 'svc.adm',
    alt: 'svc.adm.alt',
    points: ['svc.adm.1', 'svc.adm.2'],
    image: media.admin,
    lqip: lqip.admin,
  },
];

const goToBooking = (id) => (event) => {
  event.preventDefault();
  window.dispatchEvent(new CustomEvent('bc-service', { detail: id }));
  window.dispatchEvent(new Event('bc-open-book'));
};

export default function Services() {
  const { t } = useLang();
  const [open, setOpen] = useState(null);
  return (
    <section className="block block--white" id="servicios">
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
                  <Picture
                    picture={item.image}
                    lqip={item.lqip}
                    alt={t(item.alt)}
                    sizes="(max-width: 860px) 100vw, 33vw"
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
