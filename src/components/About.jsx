import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';

const FACTS = [
  ['facts.1.n', 'facts.1.l', false],
  ['facts.2.n', 'facts.2.l', false],
  ['facts.4.n', 'facts.4.l', false],
  ['facts.3.n', 'facts.3.l', true],
];

export default function About() {
  const { t } = useLang();
  return (
    <section className="portrait" id="nosotros">
      <div className="wrap portrait__grid">
        <div className="portrait__copy">
          <p className="kicker"><Tx k="about.kicker" /></p>
          <Tx as="h2" k="about.title" />
          <Tx as="p" k="about.p1" />
          <Tx as="p" k="about.p2" />
          <p className="sign">
            <Tx as="strong" k="about.sign" />
            <Tx as="span" k="about.role" />
          </p>
        </div>
        <div className="ring">
          <img
            src={CONFIG.aboutImage}
            alt={t('about.photo')}
            width="1000"
            height="1500"
            loading="lazy"
            decoding="async"
          />
          <span className="ring__stroke" />
        </div>
      </div>
      <ul className="wrap facts">
        {FACTS.map(([num, label, word]) => (
          <li className="fact" key={label}>
            <Tx as="b" k={num} className={word ? 'is-word' : undefined} />
            <Tx as="span" k={label} />
          </li>
        ))}
      </ul>
      <ul className="wrap principles">
        {[['pr.1.t', 'pr.1.p'], ['pr.2.t', 'pr.2.p'], ['pr.3.t', 'pr.3.p']].map(([title, body], index) => (
          <li key={title}>
            <span>0{index + 1}</span>
            <Tx as="h3" k={title} />
            <Tx as="p" k={body} />
          </li>
        ))}
      </ul>
    </section>
  );
}
