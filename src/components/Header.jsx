import { useEffect, useState } from 'react';
import { CONFIG } from '../config.js';
import { useLang, Tx } from '../i18n/LangContext.jsx';

const LINKS = [
  ['#servicios', 'nav.services'],
  ['#nosotros', 'nav.about'],
  ['#enfoque', 'nav.method'],
  ['#casos', 'nav.cases'],
  ['#contacto', 'nav.contact'],
];

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const close = () => setOpen(false);
  const wa = `https://wa.me/${CONFIG.whatsappNumber}`;

  return (
    <div className={`topbar${stuck ? ' is-stuck' : ''}${open ? ' is-open' : ''}`}>
      <div className="util">
        <div className="wrap util__in">
          <div className="lang" role="group" aria-label={t('a11y.lang')}>
            <button type="button" className={lang === 'es' ? 'is-active' : ''} aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
            <span aria-hidden="true">|</span>
            <button type="button" className={lang === 'en' ? 'is-active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          </div>
          <a href={wa} target="_blank" rel="noopener noreferrer"><Tx k="util.wa" /></a>
          <span className="util__city"><Tx k="util.city" /></span>
        </div>
      </div>
      <header className="header">
        <div className="wrap header__in">
          <a href="#top" className="brand" aria-label="Blue Consulting" onClick={close}>
            <img src="./assets/logo-white.svg" alt="" className="brand__on-dark" width="168" height="40" />
            <img src="./assets/logo-steel.svg" alt="" className="brand__on-light" width="168" height="40" />
          </a>
          <nav className="nav" id="nav" aria-label="Principal">
            {LINKS.map(([href, key]) => (
              <a key={key} href={href} onClick={close}><Tx k={key} /></a>
            ))}
          </nav>
          <div className="header__tools">
            <div className="lang lang--header" role="group" aria-label={t('a11y.lang')}>
              <button type="button" className={lang === 'es' ? 'is-active' : ''} aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
              <span aria-hidden="true">/</span>
              <button type="button" className={lang === 'en' ? 'is-active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
            </div>
            <a className="btn btn--book" href="#agendar" onClick={close}>
              <span className="btn__long"><Tx k="nav.book" /></span>
              <span className="btn__short"><Tx k="nav.book.short" /></span>
            </a>
            <button
              className="burger"
              type="button"
              aria-label={open ? t('nav.close') : t('nav.menu')}
              aria-expanded={open}
              aria-controls="nav"
              onClick={() => setOpen((value) => !value)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}
