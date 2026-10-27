import { Activity, ViewTransition, startTransition, addTransitionType, useEffect, useRef, useState } from 'react';
import { media, lqip } from '../images.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Picture } from './Picture.jsx';

const PANELS = [
  { title: 'mission.t', body: 'mission.p', image: media.forest, lqip: lqip.forest, alt: 'svc.env.alt' },
  { title: 'vision.t', body: 'vision.p', image: media.hero, lqip: lqip.hero, alt: 'scene.water' },
  { title: 'goal.t', body: 'goal.p', image: media.admin, lqip: lqip.admin, alt: 'svc.adm.alt' },
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
  const [on, setOn] = useState(0);
  const pick = (index) => startTransition(() => {
    addTransitionType('tab');
    setOn(index);
  });
  const onKeys = (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const next = event.key === 'ArrowRight' ? (on + 1) % PANELS.length : (on + PANELS.length - 1) % PANELS.length;
    pick(next);
    event.currentTarget.parentElement.querySelectorAll('[role="tab"]')[next]?.focus();
  };
  return (
    <section className="block block--white" id="proposito">
      <div className="wrap stage">
        <div className="stage__photo zoom">
          {PANELS.map((item, index) => (
            <Activity key={item.title} mode={index === on ? 'visible' : 'hidden'}>
              <ViewTransition default="none" enter={{ tab: 'fade-step' }} exit={{ tab: 'fade-step' }}>
                <Picture
                  picture={item.image}
                  lqip={item.lqip}
                  alt={t(item.alt)}
                  sizes="(max-width: 860px) 100vw, 50vw"
                />
              </ViewTransition>
            </Activity>
          ))}
        </div>
        <div className="stage__copy">
          <div
            className="tabs"
            role="tablist"
            aria-label={`${t('mission.t')}, ${t('vision.t')}, ${t('goal.t')}`}
          >
            {PANELS.map((item, index) => (
              <button
                key={item.title}
                type="button"
                role="tab"
                id={`tab-${index}`}
                aria-selected={index === on}
                aria-controls={`purpose-${index}`}
                tabIndex={index === on ? 0 : -1}
                onClick={() => pick(index)}
                onKeyDown={onKeys}
              >
                {t(item.title)}
              </button>
            ))}
          </div>
          {PANELS.map((item, index) => (
            <Activity key={item.body} mode={index === on ? 'visible' : 'hidden'}>
              <ViewTransition default="none" enter={{ tab: 'fade-step' }} exit={{ tab: 'fade-step' }}>
                <div role="tabpanel" id={`purpose-${index}`} aria-labelledby={`tab-${index}`}>
                  <Tx as="h2" k={item.title} />
                  <Tx as="p" k={item.body} />
                </div>
              </ViewTransition>
            </Activity>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Values() {
  return (
    <section className="values" id="valores">
      <div className="wrap">
        <div className="block__head block__head--light">
          <p className="kicker"><Tx k="values.kicker" /></p>
          <Tx as="h2" k="values.title" />
        </div>
        <ol>
          {VALUES.map((item, index) => (
            <li key={item.key} style={{ '--i': index }}>
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
  const { t } = useLang();
  const ref = useRef(null);
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
  }, []);
  const image = ready
    ? `linear-gradient(rgba(31,42,59,.84), rgba(31,42,59,.84)), url(${media.quote})`
    : 'none';
  const words = t('band.quote').split(/(\s+)/);
  return (
    <section className="band" ref={ref} style={{ backgroundImage: image }}>
      <div className="wrap band__in">
        <blockquote>
          <p>
            {words.map((part, index) => (
              part.trim()
                ? <span className="quote-w" style={{ '--i': index }} key={index}>{part}</span>
                : <span key={index}>{part}</span>
            ))}
          </p>
          <footer><Tx k="band.by" /></footer>
        </blockquote>
        <a className="btn btn--light" href="#nosotros"><Tx k="band.cta" /></a>
      </div>
    </section>
  );
}

export function Why() {
  return (
    <section className="block block--white" id="porque">
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
