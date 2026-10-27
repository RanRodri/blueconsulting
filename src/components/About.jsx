import { CONFIG } from '../config.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const Instagram = <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".6" fill="currentColor" /></svg>;
const Linkedin = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.05c.55-1 1.9-1.95 3.9-1.95 4.1 0 4.75 2.55 4.75 5.9V21h-4v-5.1c0-1.2 0-2.8-1.75-2.8s-2 1.3-2 2.7V21h-4V9.75Z" /></svg>;

export function Social() {
  const { t } = useLang();
  const items = [['instagram', 'Instagram', Instagram], ['linkedin', 'LinkedIn', Linkedin]];
  const missing = items.some(([k]) => !CONFIG.social[k]);
  return (
    <div className="social">
      <Tx as="p" k="social.title" />
      <div className="social__icons">
        {items.map(([k, label, icon]) => CONFIG.social[k]
          ? <a key={k} href={CONFIG.social[k]} target="_blank" rel="noopener noreferrer" aria-label={label}>{icon}</a>
          : <span key={k} className="is-off" role="img" aria-label={`${label} (${t('social.pending')})`} title={t('social.pending')}>{icon}</span>)}
      </div>
      {missing && <Tx as="small" k="social.pending" className="ph" />}
    </div>
  );
}

export default function About() {
  const rows = [['co.name', 'co.name.v'], ['co.nit', 'co.nit.v'], ['co.date', 'co.date.v'], ['co.rep', 'co.rep.v']];
  return (
    <section className="about" id="nosotros">
      <div className="banner" aria-hidden="true">
        <img src="./assets/logo-white.svg" alt="" />
      </div>
      <div className="wrap wrap--narrow">
        <Reveal className="block">
          <Tx as="h2" k="about.title" className="h-thin" />
          <Tx as="p" k="about.p" className="body" />
        </Reveal>
        <Reveal className="block">
          <Tx as="h2" k="about.do.title" className="h-thin" />
          <Tx as="p" k="about.do.p" className="body" />
        </Reveal>
        <Reveal as="dl" className="facts">
          {rows.map(([l, v]) => <div key={l}><Tx as="dt" k={l} /><Tx as="dd" k={v} /></div>)}
        </Reveal>
        <Reveal><Social /></Reveal>
      </div>
    </section>
  );
}
