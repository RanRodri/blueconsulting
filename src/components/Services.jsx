import { useState } from 'react';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const Ico = ({ children }) => (
  <svg className="line-ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const AREAS = [
  {
    id: 'ambiental',
    title: 'svc.env',
    line: 'svc.env.line',
    items: ['svc.env.1', 'svc.env.2', 'svc.env.3', 'svc.env.4', 'svc.env.5'],
    icon: (
      <>
        <path d="M24 42c0-16 10-26 20-28-2 18-12 26-20 28Z" />
        <path d="M24 42C24 26 14 16 4 14c2 18 12 26 20 28Z" />
        <path d="M24 42V20" />
      </>
    ),
  },
  {
    id: 'minero',
    title: 'svc.min',
    line: 'svc.min.line',
    items: ['svc.min.1', 'svc.min.2', 'svc.min.3'],
    icon: (
      <>
        <path d="M3 38 16 16l8 12 5-7 16 17" />
        <path d="M8 38h32" />
      </>
    ),
  },
  {
    id: 'administrativo',
    title: 'svc.adm',
    line: 'svc.adm.line',
    items: ['svc.adm.1', 'svc.adm.2'],
    icon: (
      <>
        <path d="M8 40V18L24 8l16 10v22" />
        <path d="M6 40h36" />
        <path d="M20 40V28h8v12" />
        <path d="M16 22h4M28 22h4M16 30h4M28 30h4" />
      </>
    ),
  },
];

export default function Services() {
  const { t } = useLang();
  const [active, setActive] = useState(AREAS[0].id);
  const current = AREAS.find((area) => area.id === active) ?? AREAS[0];

  const handleKeyDown = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const index = AREAS.findIndex((area) => area.id === active);
    const step = event.key === 'ArrowRight' ? 1 : -1;
    const next = AREAS[(index + step + AREAS.length) % AREAS.length];
    setActive(next.id);
    document.getElementById(`svc-tab-${next.id}`)?.focus();
  };

  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <Reveal className="head">
          <Tx as="p" k="svc.kicker" className="kicker" />
          <Tx as="h2" k="svc.title" className="h-display" />
        </Reveal>
        <div className="svc" role="tablist" aria-label={t('svc.kicker')} onKeyDown={handleKeyDown}>
          {AREAS.map((area) => {
            const selected = area.id === active;
            return (
              <button
                key={area.id}
                id={`svc-tab-${area.id}`}
                className={`svc__card${selected ? ' is-on' : ''}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="svc-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(area.id)}
              >
                <Ico>{area.icon}</Ico>
                <Tx as="span" k={area.title} className="svc__name" />
                <Tx as="span" k={area.line} className="svc__line" />
              </button>
            );
          })}
        </div>
        <div
          className="svc__panel"
          id="svc-panel"
          role="tabpanel"
          aria-labelledby={`svc-tab-${current.id}`}
        >
          <p className="svc__scope">
            <Tx k={current.title} />
            <span aria-hidden="true"> · </span>
            <Tx k="svc.includes" />
          </p>
          <ul className="svc__list">
            {current.items.map((key) => <Tx as="li" k={key} key={key} />)}
          </ul>
        </div>
      </div>
    </section>
  );
}
