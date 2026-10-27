import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

export default function About() {
  const { t } = useLang();
  return (
    <section className="section section--white about" id="nosotros">
      <div className="wrap about__grid">
        <Reveal className="about__copy">
          <Tx as="p" k="about.kicker" className="kicker" />
          <Tx as="h2" k="about.title" className="h-display h-display--left" />
          <Tx as="p" k="about.p" className="body" />
          <ul className="about__metrics">
            <li><b>10</b><Tx k="about.m1" /></li>
            <li><b>3</b><Tx k="about.m2" /></li>
            <li><b>2023</b><Tx k="about.m3" /></li>
          </ul>
        </Reveal>
        <Reveal className="about__media">
          <img
            src={CONFIG.aboutImage}
            alt={t('about.photo')}
            width="1000"
            height="1500"
            loading="lazy"
            decoding="async"
          />
          <p className="about__nit"><Tx k="about.nit" /></p>
        </Reveal>
      </div>
    </section>
  );
}
