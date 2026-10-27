import { media, lqip } from '../images.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Count } from './Motion.jsx';
import { Picture } from './Picture.jsx';

const METER = [
  [10, 'facts.1.l'],
  [3, 'facts.2.l'],
  [2023, 'facts.4.l'],
];

export function Meter() {
  return (
    <section className="meter">
      <ul className="wrap">
        {METER.map(([num, label]) => (
          <li key={label}>
            <Count to={num} />
            <Tx as="span" k={label} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function About() {
  const { t } = useLang();
  return (
    <section className="block" id="nosotros">
      <div className="wrap split">
        <figure className="split__photo zoom">
          <Picture picture={media.plans} lqip={lqip.plans} alt={t('method.1.alt')} sizes="(max-width: 860px) 100vw, 50vw" />
        </figure>
        <div className="split__copy">
          <p className="kicker"><Tx k="about.kicker" /></p>
          <Tx as="h2" k="about.title" />
          <Tx as="p" k="about.p" />
          <Tx as="p" k="about.meta" className="about__meta" />
          <p className="sign">
            <Tx as="strong" k="about.sign" />
            <Tx as="span" k="about.role" />
          </p>
        </div>
      </div>
    </section>
  );
}
