import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';

const wa = `https://wa.me/${CONFIG.whatsappNumber}`;

const Instagram = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r=".8" fill="currentColor" /></svg>
);
const Linkedin = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.7 3.4a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM3 9.2h3.6V21H3V9.2Zm6.2 0h3.4v1.6h.1c.5-1 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.7V21H17.2v-5c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21H9.2V9.2Z" /></svg>
);
const Whats = (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 3C7.3 3 3.46 6.8 3.46 11.5c0 1.5.4 2.96 1.16 4.24L3.4 21l5.4-1.18A8.7 8.7 0 0 0 12.04 20c4.74 0 8.58-3.8 8.58-8.5S16.78 3 12.04 3Zm4.9 12.02c-.2.58-1.18 1.1-1.64 1.16-.42.06-.96.08-1.55-.1-.36-.1-.82-.26-1.42-.52-2.5-1.08-4.12-3.6-4.24-3.76-.12-.18-1-1.32-1-2.52s.62-1.78.84-2.02c.22-.24.48-.3.64-.3h.46c.14 0 .34-.06.54.4.2.48.7 1.66.76 1.78.06.12.1.26.02.42-.08.16-.12.26-.24.4-.12.14-.26.32-.36.42-.12.12-.24.26-.1.5.14.24.62 1.02 1.32 1.66.92.82 1.68 1.08 1.92 1.2.24.12.38.1.52-.06.14-.16.6-.7.76-.94.16-.24.32-.2.54-.12.22.08 1.4.66 1.64.78.24.12.4.18.46.28.06.1.06.58-.14 1.16Z" /></svg>
);

const Social = ({ href, label, icon }) => {
  const { t } = useLang();
  if (!href) {
    return <span className="social is-off" role="img" aria-label={`${label}. ${t('social.pending')}`} title={t('social.pending')}>{icon}</span>;
  }
  return <a className="social" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{icon}</a>;
};

const showService = (id) => (event) => {
  event.preventDefault();
  window.dispatchEvent(new CustomEvent('bc-tab', { detail: id }));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.getElementById('servicios')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
};

export function Footer() {
  const { lang, t } = useLang();
  const mapSrc = `${CONFIG.mapEmbed}&hl=${lang === 'en' ? 'en' : 'es'}`;
  return (
    <footer className="colophon" id="contacto">
      <div className="wrap">
        <p className="wordmark" aria-hidden="true"><span>Blue</span><span>Consulting</span></p>
        <div className="colophon__grid">
          <div>
            <Tx as="p" k="foot.blurb" />
            <div className="colophon__social">
              <Social href={CONFIG.social.instagram} label={t('social.ig')} icon={Instagram} />
              <Social href={CONFIG.social.linkedin} label={t('social.in')} icon={Linkedin} />
              <a className="social" href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{Whats}</a>
            </div>
          </div>
          <div>
            <Tx as="h2" k="foot.services" />
            <a href="#servicios" onClick={showService('ambiental')}><Tx k="svc.env" /></a>
            <a href="#servicios" onClick={showService('minera')}><Tx k="svc.min" /></a>
            <a href="#servicios" onClick={showService('administrativa')}><Tx k="svc.adm" /></a>
          </div>
          <div>
            <Tx as="h2" k="foot.company" />
            <a href="#nosotros"><Tx k="nav.about" /></a>
            <a href="#enfoque"><Tx k="nav.method" /></a>
            <a href="#casos"><Tx k="nav.cases" /></a>
            <a href="#agendar"><Tx k="nav.book" /></a>
          </div>
          <div>
            <Tx as="h2" k="foot.contact" />
            <p>{t('foot.addr')}</p>
            <p><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></p>
            <p><a href={wa} target="_blank" rel="noopener noreferrer">{CONFIG.whatsappDisplay}</a></p>
            <p><a href={CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer"><Tx k="foot.map" /></a></p>
            <iframe title={t('contact.map')} src={mapSrc} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
        <div className="colophon__bar">
          <p><Tx k="foot.legal" /></p>
          <p><Tx k="foot.privacy" /></p>
        </div>
      </div>
    </footer>
  );
}

export function Float() {
  return (
    <a className="float" href={wa} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{Whats}</a>
  );
}
