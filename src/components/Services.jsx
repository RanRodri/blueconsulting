import { Tx } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const ICONS = {
  ambiental: <><path d="M24 5C24 5 10 20 10 29a14 14 0 0 0 28 0C38 20 24 5 24 5Z" /><path d="M16 30c3-3 5-3 8 0s5 3 8 0" /></>,
  minero: <><path d="M3 40 17 17l8 12 5-7 15 18Z" /><path d="m13 24 4 5 4-5" /></>,
  administrativo: <path d="M6 20 24 7l18 13M10 20v18M20 20v18M28 20v18M38 20v18M5 40h38" />,
};
const AREAS = [
  { id: 'ambiental', title: 'svc.env', items: ['svc.env.1', 'svc.env.2', 'svc.env.3', 'svc.env.4', 'svc.env.5'] },
  { id: 'minero', title: 'svc.min', items: ['svc.min.1', 'svc.min.2', 'svc.min.3'] },
  { id: 'administrativo', title: 'svc.adm', items: ['svc.adm.1', 'svc.adm.2'] },
];

export default function Services({ onPick }) {
  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <Reveal className="head">
          <Tx as="h2" k="svc.title" className="h-bold" />
          <Tx as="p" k="svc.sub" className="sub" />
        </Reveal>
        <div className="svc">
          {AREAS.map((a, i) => (
            <Reveal as="article" className="svc__col" key={a.id} delay={i * 100}>
              <svg className="svc__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{ICONS[a.id]}</svg>
              <Tx as="h3" k={a.title} />
              <ul>{a.items.map((k) => <Tx as="li" k={k} key={k} />)}</ul>
              <a href="#reservar" className="svc__link" onClick={() => onPick(a.id)}><Tx k="svc.cta" /></a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
