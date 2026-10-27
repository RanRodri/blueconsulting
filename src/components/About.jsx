import { Tx } from '../i18n/LangContext.jsx';

const STATS = [
  ['facts.1.n', 'facts.1.l'],
  ['facts.2.n', 'facts.2.l'],
  ['facts.4.n', 'facts.4.l'],
];

export default function About() {
  return (
    <section className="block" id="nosotros">
      <div className="wrap">
        <div className="about">
          <p className="kicker"><Tx k="about.kicker" /></p>
          <Tx as="h2" k="about.title" />
          <Tx as="p" k="about.p" />
          <Tx as="p" k="about.meta" className="about__meta" />
          <p className="sign">
            <Tx as="strong" k="about.sign" />
            <Tx as="span" k="about.role" />
          </p>
        </div>
        <ul className="stats">
          {STATS.map(([num, label]) => (
            <li key={label}>
              <Tx as="b" k={num} />
              <Tx as="span" k={label} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
