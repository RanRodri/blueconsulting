import { Tx } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const Ico = ({ children }) => (
  <svg className="line-ico" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

const AREAS = [
  {
    id: 'ambiental',
    title: 'svc.env',
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
  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <Reveal className="head">
          <Tx as="p" k="svc.kicker" className="kicker" />
          <Tx as="h2" k="svc.title" className="h-display" />
        </Reveal>
        <div className="svc">
          {AREAS.map((area, i) => (
            <Reveal as="article" className="svc__col" key={area.id} delay={i * 80}>
              <Ico>{area.icon}</Ico>
              <Tx as="h3" k={area.title} />
              <ul>
                {area.items.map((key) => <Tx as="li" k={key} key={key} />)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
