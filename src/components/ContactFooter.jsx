import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const wa = `https://wa.me/${CONFIG.whatsappNumber}`;

const Pin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.4" /></svg>
);
const Phone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>
);
const Mail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
);
const Instagram = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r=".8" fill="currentColor" /></svg>
);
const Linkedin = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.7 3.4a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM3 9.2h3.6V21H3V9.2Zm6.2 0h3.4v1.6h.1c.5-1 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.7V21H17.2v-5c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21H9.2V9.2Z" /></svg>
);

const SocialLink = ({ href, label, icon }) => {
  const { t } = useLang();
  if (!href) {
    return <span className="social__btn is-off" role="img" aria-label={`${label}. ${t('social.pending')}`} title={t('social.pending')}>{icon}</span>;
  }
  return <a className="social__btn" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>{icon}</a>;
};

export function Contact() {
  const { lang, t } = useLang();
  const mapSrc = `${CONFIG.mapEmbed}&hl=${lang === 'en' ? 'en' : 'es'}`;
  return (
    <section className="section section--tint" id="contacto">
      <div className="wrap contact">
        <Reveal className="contact__copy">
          <Tx as="p" k="contact.kicker" className="kicker" />
          <Tx as="h2" k="contact.title" className="h-display h-display--left" />
          <Tx as="p" k="contact.hours" className="contact__hours" />
          <ul className="contact__list">
            <li>
              <Pin />
              <div><Tx as="small" k="contact.hq" /><Tx as="p" k="contact.addr" /></div>
            </li>
            <li>
              <Phone />
              <div>
                <Tx as="small" k="contact.phone" />
                <p><a href={wa} target="_blank" rel="noopener noreferrer">{CONFIG.whatsappDisplay}</a></p>
              </div>
            </li>
            <li>
              <Mail />
              <div>
                <Tx as="small" k="contact.email" />
                <p><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></p>
              </div>
            </li>
          </ul>
          <div className="contact__actions">
            <a className="btn btn--steel" href="#reservar"><Tx k="hero.cta1" /></a>
            <a className="btn btn--line" href={CONFIG.mapsUrl} target="_blank" rel="noopener noreferrer"><Tx k="contact.directions" /></a>
          </div>
        </Reveal>
        <Reveal className="contact__map">
          <div className="contact__frame">
            <iframe
              title={t('contact.map')}
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <Tx as="p" k="contact.addrLine" className="contact__pin" />
        </Reveal>
      </div>
    </section>
  );
}

const SERVICE_LINKS = [
  ['#area-ambiental', 'svc.env'],
  ['#area-minero', 'svc.min'],
  ['#area-administrativo', 'svc.adm'],
];

const COMPANY_LINKS = [
  ['#nosotros', 'nav.about'],
  ['#valores', 'values.kicker'],
  ['#porque', 'why.kicker'],
  ['#reservar', 'nav.book'],
];

export function Footer() {
  const { t } = useLang();
  return (
    <>
      <footer className="footer">
        <div className="footer__in">
          <a href="#top" className="footer__brand" aria-label="Blue Consulting">
            <img src="./assets/logo-white.svg" alt="" />
          </a>
          <div className="footer__grid">
            <div className="footer__col footer__intro">
              <Tx as="p" k="foot.blurb" />
              <div className="footer__social">
                <SocialLink href={CONFIG.social.instagram} label="Instagram" icon={Instagram} />
                <SocialLink href={CONFIG.social.linkedin} label="LinkedIn" icon={Linkedin} />
              </div>
            </div>
            <nav className="footer__col" aria-label={t('foot.services')}>
              <Tx as="p" k="foot.services" className="footer__label" />
              {SERVICE_LINKS.map(([href, key]) => <a key={key} href={href}><Tx k={key} /></a>)}
            </nav>
            <nav className="footer__col" aria-label={t('foot.company')}>
              <Tx as="p" k="foot.company" className="footer__label" />
              {COMPANY_LINKS.map(([href, key]) => <a key={key} href={href}><Tx k={key} /></a>)}
            </nav>
            <div className="footer__col footer__contact">
              <Tx as="p" k="foot.contact" className="footer__label" />
              <Tx as="p" k="contact.addr" />
              <p><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></p>
              <p><a href={`tel:+${CONFIG.whatsappNumber}`}>{CONFIG.whatsappDisplay}</a></p>
            </div>
          </div>
          <div className="footer__bar">
            <Tx k="foot.legal" />
            <Tx k="foot.privacy" />
          </div>
        </div>
      </footer>
      <a href={wa} className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.6.8 2 .8 2.2.1.1.1.3 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" /></svg>
      </a>
    </>
  );
}
