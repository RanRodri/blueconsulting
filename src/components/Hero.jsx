import { CONFIG } from '../config.js';
import { Tx } from '../i18n/LangContext.jsx';

export function Hero() {
  const style = CONFIG.heroImage
    ? { backgroundImage: `linear-gradient(rgba(38,52,74,.55),rgba(38,52,74,.55)), url(${CONFIG.heroImage})` }
    : undefined;
  return (
    <section className="hero" id="top">
      <div className="hero__bg" style={style} aria-hidden="true">
        <svg className="hero__art" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <g fill="none" strokeLinecap="round">
            <circle cx="1288" cy="168" r="72" stroke="#B6CDCB" strokeOpacity=".55" strokeWidth="1.25" />
            <circle cx="1288" cy="168" r="128" stroke="#A5ADBE" strokeOpacity=".4" strokeWidth="1" />
            <circle cx="1288" cy="168" r="196" stroke="#ffffff" strokeOpacity=".18" strokeWidth=".8" />
            <circle cx="1288" cy="168" r="278" stroke="#B6CDCB" strokeOpacity=".16" strokeWidth=".7" />
            <circle cx="1288" cy="168" r="372" stroke="#ffffff" strokeOpacity=".1" strokeWidth=".6" />
            <path d="M1148 286A196 196 0 1 1 1186 62" stroke="#87A09A" strokeOpacity=".72" strokeWidth="2.4" />
            <path d="M1164 266A166 166 0 1 1 1208 82" stroke="#B6CDCB" strokeOpacity=".38" strokeWidth="1" />
          </g>
          <circle cx="1186" cy="62" r="4.5" fill="#B6CDCB" fillOpacity=".9" />
          <g fill="none" stroke="#ffffff" strokeOpacity=".12" strokeWidth=".8">
            <circle cx="150" cy="700" r="70" />
            <circle cx="150" cy="700" r="128" />
            <circle cx="150" cy="700" r="198" />
            <circle cx="150" cy="700" r="280" />
          </g>
          <path d="M0 620C220 560 420 680 700 620S1180 520 1420 590 1560 620 1600 600V900H0Z" fill="#87A09A" fillOpacity=".22" />
          <path d="M0 700C260 650 480 770 780 710S1220 640 1460 700 1570 720 1600 710V900H0Z" fill="#B6CDCB" fillOpacity=".16" />
          <path d="M0 790C300 760 540 840 820 800S1260 740 1480 790 1580 800 1600 795V900H0Z" fill="#A5ADBE" fillOpacity=".2" />
        </svg>
      </div>
      <div className="hero__in">
        <Tx as="h1" k="hero.title" className="hero__title" />
        <Tx as="p" k="hero.lead" className="hero__lead" />
        <div className="hero__cta">
          <a href="#servicios" className="btn btn--deep"><Tx k="hero.cta1" /></a>
          <a href="#reservar" className="btn btn--sage"><Tx k="hero.cta2" /></a>
        </div>
      </div>
    </section>
  );
}
