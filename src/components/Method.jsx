import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';

const STEPS = [
  ['01', 'method.1.t', 'method.1.p', 'method.1.alt', CONFIG.stepImages[0]],
  ['02', 'method.2.t', 'method.2.p', 'method.2.alt', CONFIG.stepImages[1]],
  ['03', 'method.3.t', 'method.3.p', 'method.3.alt', CONFIG.stepImages[2]],
  ['04', 'method.4.t', 'method.4.p', 'method.4.alt', CONFIG.stepImages[3]],
];

export default function Method() {
  const { t } = useLang();
  return (
    <section className="block block--white" id="enfoque">
      <div className="wrap">
        <div className="block__head">
          <p className="kicker"><Tx k="method.kicker" /></p>
          <Tx as="h2" k="method.title" />
          <Tx as="p" k="method.quote" className="lede" />
        </div>
        <ol className="cards cards--4 steps">
          {STEPS.map(([num, title, body, alt, src]) => (
            <li className="card" key={num}>
              <div className="tone">
                <img src={src} alt={t(alt)} width="960" height="600" loading="lazy" decoding="async" />
              </div>
              <div className="card__body">
                <p className="card__num">{num}</p>
                <Tx as="h3" k={title} />
                <Tx as="p" k={body} />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
