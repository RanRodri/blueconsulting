import { useRef } from 'react';
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

/* Inclinación 3D según la posición del cursor (CSS perspective, sin librerías) */
function Tilt({ children }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    const el = ref.current, r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${(x * 12).toFixed(2)}deg`);
    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
    el.classList.add('is-tilting');
  };
  const leave = () => {
    const el = ref.current; el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); el.classList.remove('is-tilting');
  };
  return <div className="tilt" ref={ref} onPointerMove={move} onPointerLeave={leave}>{children}</div>;
}

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
              <Tilt>
              <svg className="svc__icon" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONS[a.id]}</svg>
              <Tx as="h3" k={a.title} />
              <ul>{a.items.map((k) => <Tx as="li" k={k} key={k} />)}</ul>
              <a href="#reservar" className="svc__link" onClick={() => onPick(a.id)}><Tx k="svc.cta" /></a>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
