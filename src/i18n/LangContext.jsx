import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { DICT } from './dictionary.js';

const Ctx = createContext(null);

function initialLang() {
  try {
    const q = new URLSearchParams(window.location.search).get('lang');
    if (q === 'en' || q === 'es') return q;
    const s = localStorage.getItem('bc-lang');
    if (s === 'en' || s === 'es') return s;
  } catch (e) { /* ignore */ }
  return 'es'; // ES por defecto
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang);
  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem('bc-lang', l); } catch (e) { /* ignore */ }
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    const title = lang === 'en'
      ? 'Blue Consulting · Environmental, mining and legal advisory'
      : 'Blue Consulting · Consultoría ambiental, minera y jurídica';
    const description = lang === 'en'
      ? 'Blue Consulting S.A.S.: technical and legal advisory, consulting and training in environmental, mining and administrative matters. Bucaramanga, Colombia.'
      : 'Blue Consulting S.A.S.: asesoría, consultoría y capacitación técnica y jurídica en materia ambiental, minera y administrativa. Bucaramanga, Colombia.';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', lang === 'en' ? 'en_US' : 'es_CO');
    const base = new URL('.', window.location.href).href;
    const links = [
      ['canonical', null, base],
      ['alternate', 'es', base],
      ['alternate', 'en', `${base}?lang=en`],
      ['alternate', 'x-default', base],
    ];
    links.forEach(([rel, hreflang, href]) => {
      const sel = hreflang
        ? `link[rel="${rel}"][hreflang="${hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      let el = document.head.querySelector(sel);
      if (!el) {
        el = document.createElement('link');
        el.rel = rel;
        if (hreflang) el.hreflang = hreflang;
        document.head.appendChild(el);
      }
      el.href = href;
    });
  }, [lang]);
  const value = useMemo(() => ({
    lang, setLang,
    t: (k) => DICT[lang][k] ?? DICT.es[k] ?? k,
  }), [lang, setLang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

/* Texto traducido: <Tx k="hero.title" as="h1" className="..." />  (admite <em>/<br> del diccionario) */
export function Tx({ k, as: Tag = 'span', ...rest }) {
  const { t } = useLang();
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: t(k) }} />;
}
