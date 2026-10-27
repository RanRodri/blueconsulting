import { useState } from 'react';
import { media, lqip } from '../images.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Picture } from './Picture.jsx';

const SHOTS = [
  { picture: media.stripForest, lqip: lqip.forest, alt: 'svc.env.alt' },
  { picture: media.stripMine, lqip: lqip.mine, alt: 'svc.min.alt' },
  { picture: media.sprout, lqip: lqip.sprout, alt: 'method.4.alt' },
  { picture: media.stripHero, lqip: lqip.hero, alt: 'scene.water' },
  { picture: media.plans, lqip: lqip.plans, alt: 'method.1.alt' },
  { picture: media.stripAdmin, lqip: lqip.admin, alt: 'svc.adm.alt' },
];

function Set({ hidden, t }) {
  return (
    <div className="marquee__set" aria-hidden={hidden ? 'true' : undefined}>
      {SHOTS.map((shot, index) => (
        <figure className="tile" key={`${shot.alt}-${index}`}>
          <Picture
            picture={shot.picture}
            lqip={hidden ? undefined : shot.lqip}
            alt={hidden ? '' : t(shot.alt)}
            sizes="340px"
          />
        </figure>
      ))}
    </div>
  );
}

export default function Strip() {
  const { t } = useLang();
  const [paused, setPaused] = useState(false);
  const label = `${t('svc.env')}, ${t('svc.min')}, ${t('svc.adm')}`;
  return (
    <section className={`marquee${paused ? ' is-paused' : ''}`} aria-label={label}>
      <div className="wrap marquee__bar">
        <p className="marquee__label">
          <Tx k="svc.env" />
          <span aria-hidden="true">·</span>
          <Tx k="svc.min" />
          <span aria-hidden="true">·</span>
          <Tx k="svc.adm" />
        </p>
        <button
          type="button"
          className="marquee__pause"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
        >
          {paused ? t('marquee.play') : t('marquee.pause')}
        </button>
      </div>
      <div className="marquee__window">
        <div className="marquee__track">
          <Set t={t} />
          <Set hidden t={t} />
        </div>
      </div>
    </section>
  );
}
