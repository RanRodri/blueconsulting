import { CONFIG } from '../config.js';
import { Tx } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const Ic = ({ children }) => <span className="citem__ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{children}</svg></span>;
const wa = `https://wa.me/${CONFIG.whatsappNumber}`;

export function Contact() {
  return (
    <section className="section" id="contacto">
      <div className="wrap">
        <Reveal className="head"><Tx as="h2" k="contact.title" className="h-bold" /></Reveal>
        <div className="contact">
          <Reveal className="citem"><Ic><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></Ic>
            <Tx as="small" k="contact.hq" /><Tx as="p" k="contact.addr" />
            <a className="tlink" target="_blank" rel="noopener noreferrer" href={CONFIG.mapsUrl}><Tx k="contact.map" /></a></Reveal>
          <Reveal className="citem" delay={100}><Ic><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></Ic>
            <Tx as="small" k="contact.phone" /><p><a href={wa} target="_blank" rel="noopener noreferrer">{CONFIG.whatsappDisplay}</a></p></Reveal>
          <Reveal className="citem" delay={200}><Ic><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.5-6" /></Ic>
            <Tx as="small" k="contact.email" /><p><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></p></Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer__top">
          <div className="footer__in">
            <div><img src="./assets/logo-white.svg" alt="Blue Consulting" className="footer__logo" /><Tx as="p" k="foot.tag" /></div>
            <div><Tx as="h4" k="nav.contact" /><span><Tx k="contact.addr" /></span><a href={wa} target="_blank" rel="noopener noreferrer">{CONFIG.whatsappDisplay}</a><a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a></div>
            <div><Tx as="h4" k="nav.about" />
              <a href="#nosotros"><Tx k="nav.about" /></a><a href="#servicios"><Tx k="nav.services" /></a><a href="#mision"><Tx k="nav.mission" /></a><a href="#reservar"><Tx k="nav.book" /></a></div>
          </div>
        </div>
        <div className="footer__bar">© {new Date().getFullYear()} Blue Consulting S.A.S. · NIT 901726097-9 · <Tx k="foot.rights" /> · <Tx k="foot.credit" /></div>
      </footer>
      <a href={wa} className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.6.8 2 .8 2.2.1.1.1.3 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.7 1.2 1.5 1.9 1 .9 1.9 1.2 2.2 1.3.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" /></svg></a>
    </>
  );
}
