import { Tx } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const PILLARS = [
  ['01', 'mission.t', 'mission.p'],
  ['02', 'vision.t', 'vision.p'],
  ['03', 'goal.t', 'goal.p'],
];

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

export function Mission() {
  return (
    <section className="section section--white" id="proposito">
      <div className="wrap pillars">
        {PILLARS.map(([num, title, body], index) => (
          <Reveal className="pillar" key={num} delay={Math.min(index, 3) * 60}>
            <span>{num}</span>
            <Tx as="h2" k={title} />
            <Tx as="p" k={body} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Values() {
  return (
    <section className="section section--white values">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow__line" aria-hidden="true" />
            <Tx k="values.kicker" />
          </p>
          <Tx as="h2" k="values.title" />
        </Reveal>
        <ul className="chips">
          {VALUES.map((key) => (
            <li key={key}><Tx k={key} /></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section className="section" id="casos">
      <div className="wrap">
        <Reveal className="split-head split-head--stack">
          <div>
            <p className="eyebrow">
              <span className="eyebrow__line" aria-hidden="true" />
              <Tx k="cases.kicker" />
            </p>
            <Tx as="h2" k="cases.title" />
          </div>
          <Tx as="p" k="cases.note" className="lead" />
        </Reveal>
        <ul className="kinds">
          {CASES.map(([title, body], index) => (
            <Reveal as="li" key={title} delay={Math.min(index, 3) * 60}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Tx as="h3" k={title} />
              <Tx as="p" k={body} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section className="section section--sage" id="por-que">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow">
            <span className="eyebrow__line" aria-hidden="true" />
            <Tx k="why.kicker" />
          </p>
          <Tx as="h2" k="why.title" />
        </Reveal>
        <div className="why">
          {WHY.map(([title, body], index) => (
            <Reveal className="why__item" key={title} delay={Math.min(index, 3) * 60}>
              <Tx as="h3" k={title} />
              <Tx as="p" k={body} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
