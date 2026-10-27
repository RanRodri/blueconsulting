import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CONFIG } from './config.js';
import { useLang } from './i18n/LangContext.jsx';
import { Icon } from './components/Icons.jsx';
import { Photo } from './components/Photo.jsx';
import Booking from './components/Booking.jsx';

const NAV = [
  ['#servicios', 'nav.services'],
  ['#proposito', 'nav.purpose'],
  ['#valores', 'nav.values'],
  ['#contacto', 'nav.contact'],
];

const AREAS = [
  { id: 'area-env', photo: 'env', title: 'svc.env', line: 'svc.env.line', items: ['svc.env.1', 'svc.env.2', 'svc.env.3', 'svc.env.4', 'svc.env.5'], service: 'ambiental', alt: 'photo.env' },
  { id: 'area-mine', photo: 'mine', title: 'svc.min', line: 'svc.min.line', items: ['svc.min.1', 'svc.min.2', 'svc.min.3'], service: 'minero', alt: 'photo.mine', flip: true },
  { id: 'area-admin', photo: 'admin', title: 'svc.adm', line: 'svc.adm.line', items: ['svc.adm.1', 'svc.adm.2'], service: 'administrativo', alt: 'photo.admin' },
];

const VALUES = [
  ['01', 'scale', 'val.1'],
  ['02', 'shield', 'val.2'],
  ['03', 'check', 'val.3'],
  ['04', 'spark', 'val.4'],
  ['05', 'hands', 'val.5'],
];

function ask(service) {
  window.dispatchEvent(new CustomEvent('bc-service', { detail: service }));
  document.getElementById('agendar')?.scrollIntoView();
}

function AreaBlock({ area, startOpen }) {
  const ref = useRef(null);
  const { t } = useLang();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const mq = window.matchMedia('(min-width: 861px)');
    const apply = () => {
      el.open = mq.matches || el.dataset.start === 'open';
    };
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  return (
    <details
      className={area.flip ? 'area area--flip' : 'area'}
      id={area.id}
      ref={ref}
      data-start={startOpen ? 'open' : 'closed'}
      onToggle={(e) => {
        if (window.matchMedia('(min-width: 861px)').matches) e.currentTarget.open = true;
      }}
    >
      <summary>
        <span>
          <h3>{t(area.title)}</h3>
          <p>{t(area.line)}</p>
        </span>
        <span className="chev" aria-hidden="true" />
      </summary>
      <div className="area__grid">
        <figure>
          <Photo name={area.photo} alt={t(area.alt)} />
        </figure>
        <div className="area__rest">
          <ul>
            {area.items.map((key) => (
              <li key={key}><Icon name="check" /><span>{t(key)}</span></li>
            ))}
          </ul>
          <button type="button" className="textlink" onClick={() => ask(area.service)}>{t('svc.ask')}</button>
        </div>
      </div>
    </details>
  );
}

export default function App() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('nav-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const solidBar = solid || open;

  return (
    <>
      <a className="skip" href="#main">{t('a11y.skip')}</a>
      <header className={solidBar ? 'header is-solid' : 'header'}>
        <div className="header__in">
          <a className="brand" href="#main" onClick={() => setOpen(false)}>
            <img
              src={solidBar ? '/assets/logo-steel.svg' : '/assets/logo-white.svg'}
              alt="Blue Consulting"
              width="154"
              height="80"
            />
          </a>
          <nav className="nav" aria-label={lang === 'en' ? 'Primary' : 'Principal'}>
            {NAV.map(([href, key]) => <a key={href} href={href}>{t(key)}</a>)}
          </nav>
          <div className="header__tools">
            <div className="lang" role="group" aria-label={t('a11y.lang')}>
              <button type="button" aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
              <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            </div>
            <a className="btn btn--nav" href="#agendar">{t('nav.cta')}</a>
            <button
              type="button"
              className="burger"
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? t('a11y.close') : t('a11y.menu')}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div className="menu" id="menu" hidden={!open}>
          {NAV.map(([href, key]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{t(key)}</a>
          ))}
          <a className="btn btn--deep" href="#agendar" onClick={() => setOpen(false)}>{t('nav.cta')}</a>
      </div>

      <main id="main">
        <section className="hero" aria-label={t('hero.title')}>
          <div className="hero__slides" aria-hidden="true">
            <Photo name="env" alt="" priority className="slide slide--a" />
            <Photo name="mine" alt="" className="slide slide--b" />
            <Photo name="admin" alt="" className="slide slide--c" />
          </div>
          <div className="hero__scrim" />
          <div className="wrap hero__copy">
            <p className="eyebrow">{t('hero.eyebrow')}</p>
            <h1>{t('hero.title')}</h1>
            <p className="hero__lead">{t('hero.lead')}</p>
            <div className="hero__actions">
              <a className="btn btn--light" href="#agendar">{t('nav.cta')}</a>
              <a className="textlink textlink--light" href="#servicios">{t('hero.cta2')}</a>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="areas-title">
          <div className="wrap">
            <h2 id="areas-title">{t('areas.title')}</h2>
            <div className="areas">
              {AREAS.map((area) => (
                <a className="areacard" key={area.id} href={`#${area.id}`}>
                  <figure>
                    <Photo name={area.photo} alt={t(area.alt)} />
                  </figure>
                  <h3>{t(area.title)}</h3>
                  <p>{t(area.line)}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section section--tight" id="proposito">
          <div className="wrap">
            <p className="kicker">{t('mission.kicker')}</p>
            <h2>{t('mission.title')}</h2>
            <p className="prose">{t('about.p')}</p>
            <p className="prose prose--quiet">{t('years.p')}</p>
            <p className="meta">{t('about.nit')}</p>

            <article className="pair">
              <figure>
                <Photo name="env" alt={t('photo.env')} />
              </figure>
              <div>
                <h3>{t('mission.t')}</h3>
                <p>{t('mission.p')}</p>
              </div>
            </article>
            <article className="pair pair--flip">
              <div>
                <h3>{t('vision.t')}</h3>
                <p>{t('vision.p')}</p>
              </div>
              <figure>
                <Photo name="nature" alt={t('photo.nature')} />
              </figure>
            </article>
          </div>
          <div className="band">
            <Photo name="admin" alt={t('photo.admin')} />
            <div className="wrap band__copy">
              <h3>{t('goal.t')}</h3>
              <p>{t('goal.p')}</p>
            </div>
          </div>
        </section>

        <section className="section" id="valores">
          <div className="wrap">
            <p className="kicker">{t('values.kicker')}</p>
            <h2>{t('values.title')}</h2>
            <p className="prose">{t('values.note')}</p>
            <ol className="values">
              {VALUES.map(([num, icon, key]) => (
                <li key={key}>
                  <span className="num">{num}</span>
                  <Icon name={icon} />
                  <h3>{t(key)}</h3>
                  <p>{t(`${key}.p`)}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section--tight" id="servicios">
          <div className="wrap">
            <p className="kicker">{t('svc.kicker')}</p>
            <h2>{t('nav.services')}</h2>
            {AREAS.map((area, index) => (
              <AreaBlock key={area.id} area={area} startOpen={index === 0} />
            ))}
          </div>
        </section>

        <section className="quote" aria-label={t('band.by')}>
          <Photo name="nature" alt="" />
          <blockquote className="wrap">
            <p>{t('band.quote')}</p>
            <cite>{t('band.by')}</cite>
          </blockquote>
        </section>

        <Booking />

        <section className="section" id="contacto">
          <div className="wrap">
            <p className="kicker">{t('contact.kicker')}</p>
            <h2>{t('contact.title')}</h2>
            <p className="prose">{t('contact.hours')}</p>
            <div className="cards">
              <article className="card">
                <Icon name="pin" />
                <h3>{t('contact.hq')}</h3>
                <p>{t('contact.addrLine')}<br />{t('contact.city')}</p>
                <a href={CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer">{t('contact.directions')}</a>
              </article>
              <article className="card">
                <Icon name="phone" />
                <h3>{t('contact.phone')}</h3>
                <p><a href={`https://wa.me/${CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer">{CONFIG.whatsappDisplay}</a></p>
              </article>
              <article className="card">
                <Icon name="mail" />
                <h3>{t('contact.email')}</h3>
                <p><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap foot">
          <div>
            <img src="/assets/logo-white.svg" alt="Blue Consulting" width="140" height="72" />
            <p>{t('foot.blurb')}</p>
          </div>
          <div>
            <h2>{t('foot.services')}</h2>
            <a href="#area-env">{t('svc.env')}</a>
            <a href="#area-mine">{t('svc.min')}</a>
            <a href="#area-admin">{t('svc.adm')}</a>
          </div>
          <div>
            <h2>{t('foot.company')}</h2>
            <a href="#proposito">{t('nav.purpose')}</a>
            <a href="#valores">{t('nav.values')}</a>
            <a href="#agendar">{t('nav.cta')}</a>
            <a href="#politica">{t('foot.policy')}</a>
          </div>
          <div>
            <h2>{t('foot.contact')}</h2>
            <p>{t('contact.addrLine')}<br />{t('contact.city')}</p>
            <a href={`https://wa.me/${CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer">{CONFIG.whatsappDisplay}</a>
            <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
            <p>{t('contact.hours')}</p>
          </div>
        </div>
        <div className="wrap foot__bar">
          <p>{t('foot.legal')}</p>
          <p>{t('foot.nit')}</p>
          <a href="#politica">{t('foot.policy')}</a>
        </div>
        <p className="wrap policy" id="politica">{t('foot.privacy')}</p>
      </footer>

      <a className="float" href={`https://wa.me/${CONFIG.whatsappNumber}`} target="_blank" rel="noopener noreferrer" aria-label={t('a11y.wa')}>
        <Icon name="phone" />
      </a>
    </>
  );
}
