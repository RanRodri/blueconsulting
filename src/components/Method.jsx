import { Tx } from '../i18n/LangContext.jsx';

const STEPS = [
  ['01', 'method.1.t', 'method.1.p'],
  ['02', 'method.2.t', 'method.2.p'],
  ['03', 'method.3.t', 'method.3.p'],
  ['04', 'method.4.t', 'method.4.p'],
];

export default function Method() {
  return (
    <section className="story" id="enfoque">
      <div className="wrap story__grid">
        <div className="story__pin">
          <p className="kicker"><Tx k="method.kicker" /></p>
          <Tx as="h2" k="method.title" />
          <Tx as="p" k="method.quote" className="story__quote" />
        </div>
        <ol className="story__steps">
          {STEPS.map(([num, title, body]) => (
            <li key={num}>
              <b>{num}</b>
              <Tx as="h3" k={title} />
              <Tx as="p" k={body} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
