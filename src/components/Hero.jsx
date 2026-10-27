import { lazy, Suspense, useEffect, useState } from 'react';
import { CONFIG } from '../config.js';
import { Tx } from '../i18n/LangContext.jsx';

const Hero3D = lazy(() => import('./Hero3D.jsx'));

/* El 3D solo se carga si el equipo lo soporta: sin "reducir movimiento", con WebGL
   y sin modo ahorro de datos / móvil de baja potencia. ?3d=1 o ?3d=0 fuerza la opción. */
function can3D() {
  try {
    const q = new URLSearchParams(location.search).get('3d');
    if (q === '0') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches && q !== '1') return false;
    const c = document.createElement('canvas');
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) return false;
    if (q === '1') return true;
    const small = window.innerWidth < 700;
    const weak = (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 2;
    if (navigator.connection?.saveData || (small && weak)) return false;
    return true;
  } catch { return false; }
}

export function Hero() {
  const [use3d, setUse3d] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => { setUse3d(can3D()); }, []);
  const style = CONFIG.heroImage ? { backgroundImage: `linear-gradient(rgba(38,52,74,.55),rgba(38,52,74,.55)), url(${CONFIG.heroImage})` } : undefined;
  return (
    <section className="hero" id="top">
      <div className={`hero__bg${ready ? ' is-3d' : ''}`} style={style} aria-hidden="true">
        {use3d && <Suspense fallback={null}><Hero3D onReady={() => setReady(true)} /></Suspense>}
        <svg className="hero__art" viewBox="0 0 1600 700" preserveAspectRatio="xMidYMax slice" fill="none">
          <g stroke="#ffffff" strokeOpacity=".16">
            <circle cx="1290" cy="190" r="70" /><circle cx="1290" cy="190" r="130" /><circle cx="1290" cy="190" r="200" /><circle cx="1290" cy="190" r="280" /><circle cx="1290" cy="190" r="370" />
          </g>
          <path d="M0 470C240 410 430 520 700 470S1170 380 1400 440 1560 470 1600 450V700H0Z" fill="#87A09A" fillOpacity=".28" />
          <path d="M0 530C260 480 470 580 760 530S1190 450 1420 510 1560 530 1600 520V700H0Z" fill="#B6CDCB" fillOpacity=".22" />
          <path d="M0 600C280 560 520 640 800 600S1240 540 1450 590 1570 600 1600 595V700H0Z" fill="#A5ADBE" fillOpacity=".25" />
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
