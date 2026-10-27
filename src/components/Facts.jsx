import { Tx } from '../i18n/LangContext.jsx';

const ITEMS = [
  ['facts.1.n', 'facts.1.l', false],
  ['facts.2.n', 'facts.2.l', false],
  ['facts.3.n', 'facts.3.l', true],
  ['facts.4.n', 'facts.4.l', false],
];

export default function Facts() {
  return (
    <section className="facts" id="hechos">
      <div className="wrap">
        <ul className="facts__row">
          {ITEMS.map(([num, label, word]) => (
            <li className="fact" key={label}>
              <Tx as="b" k={num} className={word ? 'is-word' : undefined} />
              <Tx as="span" k={label} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
