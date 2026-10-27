import { CONFIG } from '../config.js';
import { Tx } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

export function CtaBand() {
  return (
    <section className="band">
      <Reveal className="band__in">
        <Tx as="blockquote" k="band.quote" />
        <Tx as="cite" k="band.by" />
        <div className="band__cta">
          <a href="#reservar" className="btn btn--sage"><Tx k="band.cta1" /></a>
          <a href={`https://wa.me/${CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="btn btn--light"><Tx k="band.cta2" /></a>
        </div>
      </Reveal>
    </section>
  );
}

const COLS = [['01', 'mission'], ['02', 'vision'], ['03', 'goal']];

export function Mission() {
  return (
    <section className="section" id="mision">
      <div className="wrap">
        <div className="mv">
          {COLS.map(([n, k], i) => (
            <Reveal className="mv__col" key={k} delay={i * 100}>
              <span className={`mv__num mv__num--${i + 1}`}>{n}</span>
              <Tx as="h3" k={`${k}.t`} />
              <Tx as="p" k={`${k}.p`} />
            </Reveal>
          ))}
        </div>
        <Reveal className="values">
          <Tx as="h2" k="values.title" className="h-thin" />
          <ul>{[1, 2, 3, 4, 5].map((n) => <Tx as="li" k={`val.${n}`} key={n} />)}</ul>
        </Reveal>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section className="why" id="porque">
      <Reveal className="wrap wrap--narrow">
        <Tx as="h2" k="why.title" className="h-thin h-thin--light" />
        <Tx as="p" k="why.p" className="why__p" />
      </Reveal>
    </section>
  );
}
