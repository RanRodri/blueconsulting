import { useEffect, useState } from 'react';
import { useLang, Tx } from '../i18n/LangContext.jsx';

const LINKS = [
  ['#top', 'nav.home'],
  ['#nosotros', 'nav.about'],
  ['#servicios', 'nav.services'],
  ['#reservar', 'nav.book'],
  ['#contacto', 'nav.contact'],
];

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => { document.body.classList.toggle('nav-open', open); }, [open]);
  const close = () => setOpen(false);
  return (
    <header className={`header${stuck ? ' is-stuck' : ''}`}>
      <div className="header__in">
        <a href="#top" className="brand" aria-label="Blue Consulting" onClick={close}>
          <img src="./assets/logo-white.svg" alt="" className="brand__on-dark" />
          <img src="./assets/logo-steel.svg" alt="" className="brand__on-light" />
        </a>
        <nav className="nav" id="nav" aria-label="Principal">
          {LINKS.map(([href, key]) => (
            <a key={key} href={href} onClick={close}><Tx k={key} /></a>
          ))}
        </nav>
        <div className="header__tools">
          <div className="lang" role="group" aria-label="Idioma / Language">
            <button type="button" className={lang === 'es' ? 'is-active' : ''} aria-pressed={lang === 'es'} onClick={() => setLang('es')}>ES</button>
            <span aria-hidden="true">/</span>
            <button type="button" className={lang === 'en' ? 'is-active' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
          </div>
          <button className="burger" type="button" aria-label={t('nav.menu')} aria-expanded={open} aria-controls="nav" onClick={() => setOpen((v) => !v)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
