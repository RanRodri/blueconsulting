import { Tx, useLang } from '../i18n/LangContext.jsx';
import { useReveal } from './Motion.jsx';

const SHOTS = [
  { src: './assets/svc-amb-640.webp', alt: 'svc.env.alt' },
  { src: './assets/svc-min-640.webp', alt: 'svc.min.alt' },
  { src: './assets/step-4.webp', alt: 'method.4.alt' },
  { src: './assets/hero-800.webp', alt: 'scene.water' },
  { src: './assets/step-1.webp', alt: 'method.1.alt' },
  { src: './assets/svc-adm-640.webp', alt: 'svc.adm.alt' },
];

function Set({ hidden, t }) {
  return (
    <div className="marquee__set" aria-hidden={hidden ? 'true' : undefined}>
      {SHOTS.map((shot, index) => (
        <figure className="tile" key={`${shot.src}-${index}`}>
          <img
            src={shot.src}
            alt={hidden ? '' : t(shot.alt)}
            width="640"
            height="420"
            loading="lazy"
            decoding="async"
          />
        </figure>
      ))}
    </div>
  );
}

export default function Strip() {
  const { t } = useLang();
  const ref = useReveal();
  const label = `${t('svc.env')}, ${t('svc.min')}, ${t('svc.adm')}`;
  return (
    <section className="marquee" ref={ref} aria-label={label}>
      <p className="marquee__label wrap">
        <Tx k="svc.env" />
        <span aria-hidden="true">·</span>
        <Tx k="svc.min" />
        <span aria-hidden="true">·</span>
        <Tx k="svc.adm" />
      </p>
      <div className="marquee__window">
        <div className="marquee__track">
          <Set t={t} />
          <Set hidden t={t} />
        </div>
      </div>
    </section>
  );
}
