import { Tx } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const STEPS = [
  ['01', 'method.1.t', 'method.1.p'],
  ['02', 'method.2.t', 'method.2.p'],
  ['03', 'method.3.t', 'method.3.p'],
  ['04', 'method.4.t', 'method.4.p'],
];

export default function Method() {
  return (
    <section className="section section--deep" id="enfoque">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow eyebrow--mist">
            <span className="eyebrow__line" aria-hidden="true" />
            <Tx k="method.kicker" />
          </p>
          <Tx as="h2" k="method.title" />
        </Reveal>
        <ol className="steps">
          {STEPS.map(([num, title, body], index) => (
            <Reveal as="li" className="step" key={num} delay={Math.min(index, 3) * 60}>
              <b>{num}</b>
              <Tx as="h3" k={title} />
              <Tx as="p" k={body} />
            </Reveal>
          ))}
        </ol>
        <Reveal>
          <Tx as="blockquote" k="method.quote" className="pull" />
        </Reveal>
      </div>
    </section>
  );
}
