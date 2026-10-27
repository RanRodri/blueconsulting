import { useMemo, useState } from 'react';
import { CONFIG } from '../config.js';
import { useLang, Tx } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseISO = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const toMin = (hm) => { const [h, m] = hm.split(':').map(Number); return h * 60 + m; };

function embedSrc(url) {
  if (/calendly\.com/i.test(url)) return url + (url.includes('?') ? '&' : '?') + 'hide_gdpr_banner=1&primary_color=1457c8';
  return url;
}

export default function Booking({ service, setService }) {
  const { lang, t } = useLang();
  const [f, setF] = useState({ name: '', company: '', email: '', phone: '', date: '', time: '', mode: 'video', message: '' });
  const [err, setErr] = useState('');
  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value, ...(k === 'date' ? { time: '' } : {}) }));

  const tomorrow = useMemo(() => { const d = new Date(); d.setDate(d.getDate() + 1); return iso(d); }, []);
  const slots = useMemo(() => {
    if (!f.date) return null;
    if (!CONFIG.slots.days.includes(parseISO(f.date).getDay())) return [];
    const out = [];
    for (let m = toMin(CONFIG.slots.start); m < toMin(CONFIG.slots.end); m += CONFIG.slots.stepMinutes) {
      const hm = `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
      if (!CONFIG.slots.skip.includes(hm)) out.push(hm);
    }
    return out;
  }, [f.date]);
  const hourLabel = (hm) => {
    if (lang === 'es') return hm;
    let [h, m] = hm.split(':').map(Number); const ap = h >= 12 ? 'PM' : 'AM'; h = h % 12 || 12; return `${h}:${pad(m)} ${ap}`;
  };

  const svcLabel = { general: t('form.service.general'), ambiental: t('svc.env'), minero: t('svc.min'), administrativo: t('svc.adm') }[service];
  const modeLabel = { video: t('form.mode.video'), phone: t('form.mode.phone'), office: t('form.mode.office') }[f.mode];

  const build = () => {
    let e = '';
    if (!f.name.trim() || !f.email.trim() || !f.date || !f.time || !/^\S+@\S+\.\S+$/.test(f.email.trim())) e = t('form.err');
    else if (!CONFIG.slots.days.includes(parseISO(f.date).getDay())) e = t('form.err.day');
    setErr(e);
    if (e) return null;
    const dateStr = parseISO(f.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const line = (label, v) => (v ? `${label}: ${v}` : null);
    return [
      t('msg.hello'), '',
      line(t('msg.name'), f.name.trim()),
      line(t('msg.company'), f.company.trim()),
      line(t('msg.email'), f.email.trim()),
      line(t('msg.phone'), f.phone.trim()),
      line(t('msg.service'), svcLabel),
      line(t('msg.date'), dateStr),
      line(t('msg.time'), `${f.time} (${CONFIG.timezoneLabel})`),
      line(t('msg.mode'), modeLabel),
      line(t('msg.note'), f.message.trim()),
    ].filter((x) => x !== null).join('\n');
  };
  const sendWA = () => { const m = build(); if (m) window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(m)}`, '_blank', 'noopener'); };
  const sendMail = () => {
    const m = build();
    if (m) window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`${t('msg.subject')} – ${f.name.trim()}`)}&body=${encodeURIComponent(m)}`;
  };

  const embed = (CONFIG.bookingEmbedUrl || '').trim();

  return (
    <section className="section section--tint booking" id="reservar">
      <div className="wrap">
        <Reveal className="head">
          <Tx as="h2" k="book.title" className="h-bold" />
          <Tx as="p" k="book.sub" className="sub" />
        </Reveal>
        <div className="booking__grid">
          <Reveal className="panel panel--cal">
            <Tx as="h3" k="book.cal.title" />
            {/* SLOT DE CALENDARIO: se llena desde src/config.js → bookingEmbedUrl */}
            <div className={`cal${embed ? ' cal--live' : ''}`} id="calendar-embed">
              {embed ? (
                <iframe src={embedSrc(embed)} title="Calendar" loading="lazy" frameBorder="0" />
              ) : (
                <div className="cal__ph">
                  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="9" width="36" height="32" rx="5" /><path d="M6 19h36M15 5v8M33 5v8M15 27h4M22 27h4M29 27h4M15 34h4M22 34h4" /></svg>
                  <Tx as="b" k="book.cal.ph.t" />
                  <Tx as="p" k="book.cal.ph.p" />
                </div>
              )}
            </div>
          </Reveal>

          <Reveal as="form" className="panel form" noValidate onSubmit={(e) => e.preventDefault()}>
            <Tx as="h3" k="form.title" />
            <div className="form__grid">
              <label className="f"><Tx k="form.name" /><input type="text" value={f.name} onChange={set('name')} required autoComplete="name" /></label>
              <label className="f"><Tx k="form.company" /><input type="text" value={f.company} onChange={set('company')} autoComplete="organization" /></label>
              <label className="f"><Tx k="form.email" /><input type="email" value={f.email} onChange={set('email')} required autoComplete="email" /></label>
              <label className="f"><Tx k="form.phone" /><input type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" /></label>
              <label className="f f--full"><Tx k="form.service" />
                <select value={service} onChange={(e) => setService(e.target.value)}>
                  <option value="general">{t('form.service.general')}</option>
                  <option value="ambiental">{t('svc.env')}</option>
                  <option value="minero">{t('svc.min')}</option>
                  <option value="administrativo">{t('svc.adm')}</option>
                </select>
              </label>
              <label className="f"><Tx k="form.date" /><input type="date" min={tomorrow} value={f.date} onChange={set('date')} required /></label>
              <div className="f"><Tx as="span" k="form.time" id="time-label" />
                <div className="slots" role="radiogroup" aria-labelledby="time-label">
                  {slots === null && <em className="slots__hint">{t('form.time.pick')}</em>}
                  {slots && slots.length === 0 && <em className="slots__hint">{t('form.time.none')}</em>}
                  {slots && slots.map((hm) => (
                    <label className="slot" key={hm}>
                      <input type="radio" name="time" value={hm} checked={f.time === hm} onChange={set('time')} /><span>{hourLabel(hm)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <fieldset className="f f--full modes"><legend><Tx k="form.mode" /></legend>
                {[['video', 'form.mode.video'], ['phone', 'form.mode.phone'], ['office', 'form.mode.office']].map(([v, k]) => (
                  <label key={v}><input type="radio" name="mode" value={v} checked={f.mode === v} onChange={set('mode')} /><span>{t(k)}</span></label>
                ))}
              </fieldset>
              <label className="f f--full"><Tx k="form.msg" /><textarea rows="3" value={f.message} onChange={set('message')} /></label>
            </div>
            {err && <p className="form__err" role="alert">{err}</p>}
            <div className="form__btns">
              <button type="button" className="btn btn--wa" onClick={sendWA}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.200-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5.2.6.8 2 .8 2.200.1.100.1.300 0 .5l-.3.5-.4.5c-.1.1-.3.3-.1.6.2.3.7 1.200 1.500 1.900 1 .9 1.900 1.200 2.200 1.300.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l1.900.9c.3.1.5.2.5.3.1.2.1.7-.1 1.300Z" /></svg>
                <Tx k="form.wa" />
              </button>
              <button type="button" className="btn btn--outline" onClick={sendMail}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3.5 7 8.5 6 8.500-6" /></svg>
                <Tx k="form.mail" />
              </button>
            </div>
            <p className="form__note"><Tx k="form.note" /> <span className="tz">· {CONFIG.timezoneLabel}</span></p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
