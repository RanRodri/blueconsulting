import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

export default function About() {
  const { t } = useLang();
  return (
    <section className="section section--tint about" id="nosotros">
      <div className="wrap about__grid">
        <Reveal className="about__media">
          <img
            src={CONFIG.aboutImage}
            alt={t('about.photo')}
            width="1000"
            height="1500"
            loading="lazy"
            decoding="async"
          />
        </Reveal>
        <Reveal className="about__copy">
          <Tx as="p" k="about.kicker" className="kicker" />
          <Tx as="h2" k="about.title" className="h-display h-display--left" />
          <Tx as="p" k="about.p" className="body" />
        </Reveal>
      </div>
    </section>
  );
}
