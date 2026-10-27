import { useEffect, useState } from 'react';
import { useLang, Tx } from '../i18n/LangContext.jsx';

export default function Header() {
  const { lang, setLang, t } = useLang();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setStuck(window.scrollY > 40);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => { document.body.classList.toggle('nav-open', open); }, [open]);
  const close = () => setOpen(false);
  return (
    <header className={`header${stuck ? ' is-stuck' : ''}`}>
      <div className="header__in">
        <a href="#top" className="brand" aria-label="Blue Consulting" onClick={close}>
          <img src="./assets/logo-white.svg" alt="Blue Consulting" className="brand__dark" />
          <img src="./assets/logo-steel.svg" alt="" className="brand__light" aria-hidden="true" />
        </a>
        <nav className="nav" id="nav" aria-label="Principal">
          <a href="#top" onClick={close}><Tx k="nav.home" /></a>
          <a href="#nosotros" onClick={close}><Tx k="nav.about" /></a>
          <a href="#servicios" onClick={close}><Tx k="nav.services" /></a>
          <a href="#mision" onClick={close}><Tx k="nav.mission" /></a>
          <a href="#reservar" onClick={close}><Tx k="nav.book" /></a>
          <a href="#contacto" onClick={close}><Tx k="nav.contact" /></a>
        </nav>
        <div className="header__tools">
          <div className="lang" role="group" aria-label="Idioma / Language">
            {['es', 'en'].map((l) => (
              <button key={l} type="button" className={lang === l ? 'is-active' : ''} aria-pressed={lang === l} onClick={() => setLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
          <button className="burger" aria-label={t('nav.menu')} aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}><span /><span /><span /></button>
        </div>
      </div>
    </header>
  );
}
