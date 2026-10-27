import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const VALUES = ['val.1', 'val.2', 'val.3', 'val.4', 'val.5'];

const WHY = [
  { n: 1, image: './assets/why/why-disruptiva.jpg' },
  { n: 2, image: './assets/why/why-innovadoras.jpg' },
  { n: 6, image: './assets/why/why-evidencia.jpg' },
  { n: 3, image: './assets/why/why-acompanamiento.jpg' },
  { n: 4, image: './assets/why/why-redes.jpg' },
  { n: 5, image: './assets/why/why-cumplimiento.jpg' },
];

export function CtaBand() {
  return (
    <section className="band">
      <Reveal className="band__in">
        <Tx as="blockquote" k="band.quote" />
        <Tx as="cite" k="band.by" />
        <a href="#reservar" className="btn btn--sage"><Tx k="band.cta" /></a>
      </Reveal>
    </section>
  );
}

const COLS = ['mission', 'vision', 'goal'];

export function Mission() {
  return (
    <section className="section section--purpose" id="mision">
      <div className="wrap">
        <Reveal className="head">
          <Tx as="p" k="mission.kicker" className="kicker" />
          <Tx as="h2" k="mission.title" className="h-display" />
        </Reveal>
        <div className="mv">
          {COLS.map((key, i) => (
            <Reveal className="mv__col" key={key} delay={i * 80}>
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
    <section className="section section--white" id="valores">
      <div className="wrap">
        <div className="split-head">
          <Reveal>
            <Tx as="p" k="values.kicker" className="kicker" />
            <Tx as="h2" k="values.title" className="h-display h-display--left" />
          </Reveal>
          <Reveal>
            <Tx as="p" k="values.note" className="lead" />
          </Reveal>
        </div>
        <ul className="value-cards">
          {VALUES.map((key, index) => (
            <Reveal as="li" key={key} delay={index * 40}>
              <div className="value-cards__media" aria-hidden="true">
                <span className="value-cards__n">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="value-cards__body">
                <Tx as="h3" k={key} />
                <Tx as="p" k={`${key}.p`} />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Why() {
  const { t } = useLang();
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
              <div className="why__media">
                <img src={item.image} alt={t(`why.${item.n}.alt`)} />
              </div>
              <div className="why__body">
                <Tx as="h3" k={`why.${item.n}.t`} />
                <Tx as="p" k={`why.${item.n}.p`} />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
