import { useEffect, useState } from 'react';
import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { useReveal } from './Motion.jsx';

const PANELS = [
  { title: 'mission.t', body: 'mission.p', image: CONFIG.serviceImages.ambiental, alt: 'svc.env.alt' },
  { title: 'vision.t', body: 'vision.p', image: CONFIG.heroImage, alt: 'scene.water' },
  { title: 'goal.t', body: 'goal.p', image: CONFIG.serviceImages.administrativo, alt: 'svc.adm.alt' },
];

const VALUES = [
  { key: 'val.1', icon: 'shield' },
  { key: 'val.2', icon: 'scale' },
  { key: 'val.3', icon: 'check' },
  { key: 'val.4', icon: 'spark' },
  { key: 'val.5', icon: 'hands' },
];

const WHY = [
  ['why.1.t', 'why.1.p'],
  ['why.2.t', 'why.2.p'],
  ['why.3.t', 'why.3.p'],
  ['why.4.t', 'why.4.p'],
  ['why.5.t', 'why.5.p'],
];

function Glyph({ name }) {
  const common = {
    viewBox: '0 0 32 32',
    width: 28,
    height: 28,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };
  if (name === 'shield') {
    return <svg {...common}><path d="M16 4 26 8v8c0 6.2-4.2 9.8-10 12-5.8-2.2-10-5.8-10-12V8l10-4Z" /><path d="m12 16 2.6 2.6L20 13.2" /></svg>;
  }
  if (name === 'scale') {
    return <svg {...common}><path d="M16 5v22M10 27h12M16 9H8.5L6 16a4 4 0 0 0 8 0L11.5 9M16 9h7.5L26 16a4 4 0 0 1-8 0L20.5 9" /></svg>;
  }
  if (name === 'check') {
    return <svg {...common}><circle cx="16" cy="16" r="10" /><path d="m11 16.5 3.2 3.2L21.5 12" /></svg>;
  }
  if (name === 'spark') {
    return <svg {...common}><path d="M16 4v6M16 22v6M4 16h6M22 16h6M7.5 7.5l4 4M20.5 20.5l4 4M24.5 7.5l-4 4M11.5 20.5l-4 4" /></svg>;
  }
  return <svg {...common}><path d="M8 18c2.2-1.2 4.2-1.2 6.2 0l1.8 1.2c2 1.2 4 1.2 6.2 0" /><path d="M6 14.5c2.6-2 5.2-2 8 0M18 14.5c2.6-2 5.2-2 8 0" /><path d="M10 22.5c2 .8 4 .8 6 0s4-.8 6 0" /></svg>;
}

export function Mission() {
  const { t } = useLang();
  const ref = useReveal();
  const [on, setOn] = useState(0);
  const pick = (index) => setOn(index);
  const onKeys = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = event.key === 'ArrowRight' ? (on + 1) % PANELS.length : (on + PANELS.length - 1) % PANELS.length;
    setOn(next);
    event.currentTarget.querySelectorAll('[role="tab"]')[next]?.focus();
  };
  const panel = PANELS[on];
  return (
    <section className="block block--white" id="proposito" ref={ref}>
      <div className="wrap stage">
        <div className="stage__photo zoom">
          {PANELS.map((item, index) => (
            <img
              key={item.title}
              className={index === on ? 'is-on' : ''}
              src={item.image.src}
              srcSet={item.image.srcSet}
              sizes="(max-width: 860px) 100vw, 58vw"
              alt={index === on ? t(item.alt) : ''}
              aria-hidden={index === on ? undefined : true}
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
        <div className="stage__copy">
          <div
            className="tabs"
            role="tablist"
            aria-label={`${t('mission.t')}, ${t('vision.t')}, ${t('goal.t')}`}
            onKeyDown={onKeys}
          >
            {PANELS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                id={`tab-${index}`}
                aria-selected={index === on}
                aria-controls="purpose-panel"
                tabIndex={index === on ? 0 : -1}
                onClick={() => pick(index)}
              >
                {t(item.title)}
              </button>
            ))}
          </div>
          <div role="tabpanel" id="purpose-panel" aria-labelledby={`tab-${on}`}>
            <Tx as="h2" k={panel.title} />
            <Tx as="p" k={panel.body} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Values() {
  const ref = useReveal();
  return (
    <section className="values" id="valores" ref={ref}>
      <div className="wrap">
        <div className="block__head block__head--light">
          <p className="kicker"><Tx k="values.kicker" /></p>
          <Tx as="h2" k="values.title" />
        </div>
        <ol>
          {VALUES.map((item) => (
            <li key={item.key}>
              <span className="val__ico"><Glyph name={item.icon} /></span>
              <Tx as="strong" k={item.key} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Quote() {
  const ref = useReveal();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setReady(true);
      return undefined;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setReady(true);
      io.disconnect();
    }, { rootMargin: '600px' });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  const image = ready
    ? `linear-gradient(rgba(31,42,59,.84), rgba(31,42,59,.84)), url(${CONFIG.quoteImage})`
    : 'none';
  return (
    <section className="band" ref={ref} style={{ backgroundImage: image }}>
      <div className="wrap band__in">
        <blockquote>
          <Tx as="p" k="band.quote" />
          <footer><Tx k="band.by" /></footer>
        </blockquote>
        <a className="btn btn--light" href="#nosotros"><Tx k="band.cta" /></a>
      </div>
    </section>
  );
}

export function Why() {
  const ref = useReveal();
  return (
    <section className="block" id="porque" ref={ref}>
      <div className="wrap">
        <div className="block__head">
          <p className="kicker"><Tx k="why.kicker" /></p>
          <Tx as="h2" k="why.title" />
        </div>
        <div className="cards cards--5">
          {WHY.map(([title, body], index) => (
            <article className="plain why-card" key={title}>
              <p className="why-card__n">{String(index + 1).padStart(2, '0')}</p>
              <Tx as="h3" k={title} />
              <Tx as="p" k={body} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
