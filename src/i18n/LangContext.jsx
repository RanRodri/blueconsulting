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
    document.title = lang === 'en'
      ? 'Blue Consulting · Environmental, mining and administrative advisory'
      : 'Blue Consulting · Asesoría ambiental, minera y administrativa';
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
