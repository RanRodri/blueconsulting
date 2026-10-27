import { Tx } from '../i18n/LangContext.jsx';
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
  return (
    <section className="section" id="servicios">
      <div className="wrap">
        <div className="split-head">
          <Reveal>
            <p className="kicker"><span className="kicker__mark" aria-hidden="true" /><Tx k="svc.kicker" /></p>
            <Tx as="h2" k="svc.title" className="h-display h-display--left" />
          </Reveal>
        </div>
        <div className="dossiers">
          {AREAS.map((area, index) => (
            <Reveal as="article" className="dossier" id={`area-${area.id}`} key={area.id} delay={index * 60}>
              <div>
                <div className="dossier__top">
                  <span className="dossier__ico"><Ico>{area.icon}</Ico></span>
                </div>
                <Tx as="h3" k={area.title} />
                <Tx as="p" k={area.line} className="dossier__line" />
                <ul>
                  {area.items.map((key) => <li key={key}><Tx k={key} /></li>)}
                </ul>
              </div>
              <a className="dossier__go" href="#reservar">
                <Tx k="svc.ask" />
                <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
