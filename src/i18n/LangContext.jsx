import { createContext, useContext, useEffect, useMemo, useState, useCallback, startTransition, addTransitionType } from 'react';
import { DICT } from './dictionary.js';

const Ctx = createContext(null);

export function langFromPath() {
  const parts = window.location.pathname.split('/').filter(Boolean);
  const last = parts[parts.length - 1];
  if (last === 'en' || last === 'es') return last;
  return null;
}

function applyLang(setLangState, next) {
  startTransition(() => {
    addTransitionType('lang');
    setLangState(next);
  });
}

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(() => langFromPath() || 'es');

  const setLang = useCallback((next) => {
    if (next !== 'es' && next !== 'en') return;
    applyLang(setLangState, next);
    const url = `/${next}${window.location.hash || ''}`;
    if (window.location.pathname.replace(/\/$/, '') !== `/${next}`) {
      window.history.pushState(null, '', url);
    }
    try { localStorage.setItem('bc-lang', next); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (!langFromPath()) {
      window.history.replaceState(null, '', `/es${window.location.hash || ''}`);
    }
    const onPop = () => applyLang(setLangState, langFromPath() || 'es');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({
    lang,
    setLang,
    t: (key) => DICT[lang][key] ?? DICT.es[key] ?? key,
  }), [lang, setLang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);

export function Tx({ k, as: Tag = 'span', ...rest }) {
  const { t } = useLang();
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: t(k) }} />;
}
