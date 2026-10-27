import { media, lqip } from '../images.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Picture } from './Picture.jsx';

export function Hero() {
  const { t } = useLang();
  return (
    <section className="hero" id="top">
      <Picture
        className="hero__photo"
        picture={media.hero}
        lqip={lqip.hero}
        alt={t('scene.water')}
        sizes="100vw"
        priority
      />
      <div className="hero__shade" aria-hidden="true" />
      <div className="hero__body">
        <div className="wrap hero__copy">
          <p className="kicker kicker--light"><Tx k="hero.eyebrow" /></p>
          <Tx as="h1" k="hero.title" />
          <Tx as="p" k="hero.lead" className="hero__lead" />
          <div className="hero__cta">
            <button type="button" className="btn btn--light" onClick={() => window.dispatchEvent(new Event('bc-open-book'))}><Tx k="hero.cta1" /></button>
            <a className="btn btn--ghost" href="#servicios"><Tx k="hero.cta2" /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
