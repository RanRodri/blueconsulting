import { Tx } from '../i18n/LangContext.jsx';

const VALUES = ['val.1', 'val.2', 'val.3', 'val.4', 'val.5'];
const WHY = [
  ['why.1.t', 'why.1.p'],
  ['why.2.t', 'why.2.p'],
  ['why.3.t', 'why.3.p'],
  ['why.4.t', 'why.4.p'],
  ['why.5.t', 'why.5.p'],
];

export function Mission() {
  return (
    <section className="block block--white" id="proposito">
      <div className="wrap cards cards--3">
        <article className="plain">
          <p className="kicker"><Tx k="mission.t" /></p>
          <Tx as="p" k="mission.p" />
        </article>
        <article className="plain">
          <p className="kicker"><Tx k="vision.t" /></p>
          <Tx as="p" k="vision.p" />
        </article>
        <article className="plain">
          <p className="kicker"><Tx k="goal.t" /></p>
          <Tx as="p" k="goal.p" />
        </article>
      </div>
    </section>
  );
}

export function Values() {
  return (
    <section className="values" id="valores">
      <div className="wrap">
        <div className="block__head block__head--light">
          <p className="kicker"><Tx k="values.kicker" /></p>
          <Tx as="h2" k="values.title" />
        </div>
        <ol>
          {VALUES.map((key, index) => (
            <li key={key}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Tx k={key} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Quote() {
  return (
    <section className="band">
      <div className="wrap band__in">
        <blockquote>
          <Tx as="p" k="band.quote" />
          <footer><Tx k="band.by" /></footer>
        </blockquote>
        <a className="btn btn--light" href="#nosotros"><Tx k="band.cta" /></a>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section className="block" id="porque">
      <div className="wrap">
        <div className="block__head">
          <p className="kicker"><Tx k="why.kicker" /></p>
          <Tx as="h2" k="why.title" />
        </div>
        <div className="cards cards--5">
          {WHY.map(([title, body]) => (
            <article className="plain" key={title}>
              <Tx as="h3" k={title} />
              <Tx as="p" k={body} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
