import { Tx } from '../i18n/LangContext.jsx';

const VALUES = ['val.1', 'val.2', 'val.3', 'val.4', 'val.5'];
const CASES = [
  ['cases.1.t', 'cases.1.p'],
  ['cases.2.t', 'cases.2.p'],
  ['cases.3.t', 'cases.3.p'],
  ['cases.4.t', 'cases.4.p'],
];
const WHY = [
  ['why.1.t', 'why.1.p'],
  ['why.2.t', 'why.2.p'],
  ['why.3.t', 'why.3.p'],
  ['why.4.t', 'why.4.p'],
];

export function Values() {
  return (
    <section className="roll" id="valores">
      <div className="wrap">
        <p className="kicker"><Tx k="values.kicker" /></p>
        <Tx as="h2" k="values.title" className="roll__title" />
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

export function Mission() {
  return (
    <section className="bento" id="proposito">
      <div className="wrap bento__grid">
        <article className="bento__main">
          <p className="kicker"><Tx k="mission.t" /></p>
          <Tx as="p" k="mission.p" />
        </article>
        <article>
          <p className="kicker"><Tx k="vision.t" /></p>
          <Tx as="p" k="vision.p" />
        </article>
        <article>
          <p className="kicker"><Tx k="goal.t" /></p>
          <Tx as="p" k="goal.p" />
        </article>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section className="index" id="casos">
      <div className="wrap index__grid">
        <div>
          <p className="kicker"><Tx k="cases.kicker" /></p>
          <Tx as="h2" k="cases.title" />
          <Tx as="p" k="cases.note" className="note" />
          <ol className="index__list">
            {CASES.map(([title, body], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <Tx as="h3" k={title} />
                  <Tx as="p" k={body} />
                </div>
              </li>
            ))}
          </ol>
        </div>
        <aside>
          <p className="kicker"><Tx k="why.kicker" /></p>
          <Tx as="h2" k="why.title" />
          <ul className="why-list">
            {WHY.map(([title, body]) => (
              <li key={title}>
                <Tx as="h3" k={title} />
                <Tx as="p" k={body} />
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
