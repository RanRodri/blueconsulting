import { Tx } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const Line = ({ children }) => (
  <svg className="line-ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const VALUES = [
  { k: 'val.1', icon: <><circle cx="24" cy="24" r="16" /><path d="m16 24 5 5 11-12" /></> },
  { k: 'val.2', icon: <><path d="M24 6v34" /><path d="M10 18h28" /><path d="M10 18 6 28a6 6 0 0 0 12 0L14 18" /><path d="M34 18 30 28a6 6 0 0 0 12 0L42 18" /><path d="M18 40h12" /></> },
  { k: 'val.3', icon: <><path d="M16 28c0-6 4-8 8-14 4 6 8 8 8 14a8 8 0 0 1-16 0Z" /><path d="M18 40h12" /><path d="M24 32v8" /></> },
  { k: 'val.4', icon: <><path d="M18 20a8 8 0 1 1 12 7c-2 1.4-3 2.6-3 5" /><path d="M24 38h.1" /><path d="M16 42h16" /></> },
  { k: 'val.5', icon: <><path d="M24 8 38 14v10c0 9-6 14-14 18-8-4-14-9-14-18V14L24 8Z" /><path d="m17 24 4 4 10-10" /></> },
];

const WHY = [
  { n: 1, icon: <><circle cx="24" cy="24" r="8" /><path d="M24 4v6M24 38v6M4 24h6M38 24h6M8.5 8.5l4.2 4.2M35.3 35.3l4.2 4.2M8.5 39.5l4.2-4.2M35.3 12.7l4.2-4.2" /></> },
  { n: 2, icon: <><path d="M18 20a8 8 0 1 1 12 7c-2 1.4-3 2.6-3 5" /><path d="M24 38h.1" /></> },
  { n: 3, icon: <><circle cx="16" cy="18" r="5" /><circle cx="32" cy="18" r="5" /><path d="M8 36c1.5-6 5-9 8-9s6.5 3 8 9" /><path d="M24 36c1.5-6 5-9 8-9s6.5 3 8 9" /></> },
  { n: 4, icon: <><circle cx="12" cy="24" r="4" /><circle cx="36" cy="14" r="4" /><circle cx="36" cy="34" r="4" /><path d="M16 22 32 16M16 26l16 6" /></> },
  { n: 5, icon: <><path d="M24 6 40 12v12c0 10-7 16-16 20C15 40 8 34 8 24V12L24 6Z" /><path d="m17 24 4 4 10-9" /></> },
];

export function CtaBand() {
  return (
    <section className="band">
      <Reveal className="band__in">
        <Tx as="blockquote" k="band.quote" />
        <Tx as="cite" k="band.by" />
        <a href="#nosotros" className="btn btn--ghost"><Tx k="band.cta" /></a>
      </Reveal>
    </section>
  );
}

const COLS = [
  ['01', 'mission'],
  ['02', 'vision'],
  ['03', 'goal'],
];

export function Mission() {
  return (
    <section className="section" id="mision">
      <div className="wrap">
        <div className="mv">
          {COLS.map(([n, key], i) => (
            <Reveal className="mv__col" key={key} delay={i * 80}>
              <span className="mv__num">{n}</span>
              <Tx as="h3" k={`${key}.t`} />
              <Tx as="p" k={`${key}.p`} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Values() {
  return (
    <section className="section section--tight" id="valores">
      <div className="wrap">
        <Reveal className="head">
          <Tx as="p" k="values.kicker" className="kicker" />
          <Tx as="h2" k="values.title" className="h-display" />
        </Reveal>
        <ul className="values">
          {VALUES.map((item, i) => (
            <Reveal as="li" key={item.k} delay={i * 60}>
              <Line>{item.icon}</Line>
              <Tx k={item.k} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section className="section section--tint" id="porque">
      <div className="wrap">
        <Reveal className="head">
          <Tx as="p" k="why.kicker" className="kicker" />
          <Tx as="h2" k="why.title" className="h-display" />
        </Reveal>
        <ul className="why">
          {WHY.map((item, i) => (
            <Reveal as="li" key={item.n} delay={i * 60}>
              <Line>{item.icon}</Line>
              <Tx as="h3" k={`why.${item.n}.t`} />
              <Tx as="p" k={`why.${item.n}.p`} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
