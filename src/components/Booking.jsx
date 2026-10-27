import { useMemo, useState } from 'react';
import { CONFIG } from '../config.js';
import { useLang, Tx } from '../i18n/LangContext.jsx';
import { Reveal } from './Reveal.jsx';

const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseISO = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};
const toMin = (hm) => {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + m;
};
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const daySlots = (dateStr) => {
  if (!dateStr || !CONFIG.slots.days.includes(parseISO(dateStr).getDay())) return [];
  const out = [];
  for (let m = toMin(CONFIG.slots.start); m < toMin(CONFIG.slots.end); m += CONFIG.slots.stepMinutes) {
    const hm = `${pad(Math.floor(m / 60))}:${pad(m % 60)}`;
    if (!CONFIG.slots.skip.includes(hm)) out.push(hm);
  }
  return out;
};

const nextOpenDay = () => {
  const d = startOfDay(new Date());
  d.setDate(d.getDate() + 1);
  for (let i = 0; i < 21; i += 1) {
    if (CONFIG.slots.days.includes(d.getDay())) return iso(d);
    d.setDate(d.getDate() + 1);
  }
  return iso(d);
};

const cellsFor = (cursor) => {
  const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
  const lead = (first.getDay() + 6) % 7;
  const count = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const cells = Array(lead).fill(null);
  for (let day = 1; day <= count; day += 1) cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), day));
  while (cells.length % 7) cells.push(null);
  return cells;
};

const hourLabel = (hm, lang) => {
  let [h, m] = hm.split(':').map(Number);
  const ap = h >= 12 ? (lang === 'es' ? 'p. m.' : 'p.m.') : (lang === 'es' ? 'a. m.' : 'a.m.');
  h = h % 12 || 12;
  return `${pad(h)}:${pad(m)} ${ap}`;
};

export default function Booking() {
  const { lang, t } = useLang();
  const initialDay = useMemo(nextOpenDay, []);
  const [service, setService] = useState('general');
  const [f, setF] = useState({
    name: '', email: '', phone: '', date: initialDay, time: daySlots(initialDay)[0] || '', mode: 'video',
  });
  const [cursor, setCursor] = useState(() => parseISO(initialDay));
  const [err, setErr] = useState('');

  const minDay = useMemo(() => {
    const d = startOfDay(new Date());
    d.setDate(d.getDate() + 1);
    return d;
  }, []);
  const slots = daySlots(f.date);
  const cells = cellsFor(cursor);
  const week = lang === 'en'
    ? ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    : ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];
  const monthName = cursor.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CO', { month: 'long' });
  const monthLabel = `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)} ${cursor.getFullYear()}`;

  const canGoPrev = cursor.getFullYear() > minDay.getFullYear()
    || (cursor.getFullYear() === minDay.getFullYear() && cursor.getMonth() > minDay.getMonth());

  const shiftMonth = (dir) => {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + dir, 1));
  };

  const pickDay = (date) => {
    const value = iso(date);
    const nextSlots = daySlots(value);
    setF((p) => ({ ...p, date: value, time: nextSlots.includes(p.time) ? p.time : (nextSlots[0] || '') }));
    setErr('');
  };

  const set = (key) => (e) => setF((p) => ({ ...p, [key]: e.target.value }));

  const svcLabel = {
    general: t('form.service.general'),
    ambiental: t('svc.env'),
    minero: t('svc.min'),
    administrativo: t('svc.adm'),
  }[service];
  const modeLabel = { video: t('form.mode.video'), phone: t('form.mode.phone'), office: t('form.mode.office') }[f.mode];

  const handleConfirm = () => {
    const emailOk = /^\S+@\S+\.\S+$/.test(f.email.trim());
    if (!f.name.trim() || !emailOk || !f.date || !f.time) {
      setErr(t('form.err'));
      return;
    }
    if (!CONFIG.slots.days.includes(parseISO(f.date).getDay())) {
      setErr(t('form.err.day'));
      return;
    }
    setErr('');
    const dateStr = parseISO(f.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CO', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
    const line = (label, value) => (value ? `${label}: ${value}` : null);
    const message = [
      t('msg.hello'), '',
      line(t('msg.name'), f.name.trim()),
      line(t('msg.email'), f.email.trim()),
      line(t('msg.phone'), f.phone.trim()),
      line(t('msg.service'), svcLabel),
      line(t('msg.date'), dateStr),
      line(t('msg.time'), `${hourLabel(f.time, lang)} (${CONFIG.timezoneLabel})`),
      line(t('msg.mode'), modeLabel),
    ].filter((row) => row !== null).join('\n');
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
  };

  return (
    <section className="section booking" id="reservar">
      <div className="wrap">
        <Reveal className="head">
          <Tx as="p" k="book.kicker" className="kicker" />
          <Tx as="h2" k="book.title" className="h-display" />
        </Reveal>
        <Reveal className="book">
          <div className="book__when">
            <div className="cal" aria-label={monthLabel}>
              <div className="cal__bar">
                <button type="button" onClick={() => shiftMonth(-1)} disabled={!canGoPrev} aria-label={t('cal.prev')}>‹</button>
                <strong>{monthLabel}</strong>
                <button type="button" onClick={() => shiftMonth(1)} aria-label={t('cal.next')}>›</button>
              </div>
              <div className="cal__grid">
                {week.map((name) => <span className="cal__dow" key={name}>{name}</span>)}
                {cells.map((date, index) => {
                  if (!date) return <span key={`e-${index}`} />;
                  const value = iso(date);
                  const open = date >= minDay && CONFIG.slots.days.includes(date.getDay());
                  return (
                    <button
                      key={value}
                      type="button"
                      className={`cal__day${f.date === value ? ' is-on' : ''}`}
                      disabled={!open}
                      aria-pressed={f.date === value}
                      onClick={() => pickDay(date)}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="slotcol">
              <span className="slotcol__label" id="time-label">{t('cal.slots')}</span>
              <div className="slots" role="radiogroup" aria-labelledby="time-label">
                {slots.map((hm) => (
                  <label className="slot" key={hm}>
                    <input type="radio" name="time" value={hm} checked={f.time === hm} onChange={set('time')} />
                    <span>{hourLabel(hm, lang)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <form className="form" noValidate onSubmit={(e) => { e.preventDefault(); handleConfirm(); }}>
            <label className="f"><Tx k="form.name" />
              <input type="text" value={f.name} onChange={set('name')} required autoComplete="name" />
            </label>
            <label className="f"><Tx k="form.email" />
              <input type="email" value={f.email} onChange={set('email')} required autoComplete="email" />
            </label>
            <label className="f"><Tx k="form.phone" />
              <input type="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" />
            </label>
            <label className="f"><Tx k="form.service" />
              <select value={service} onChange={(e) => setService(e.target.value)}>
                <option value="general">{t('form.service.general')}</option>
                <option value="ambiental">{t('svc.env')}</option>
                <option value="minero">{t('svc.min')}</option>
                <option value="administrativo">{t('svc.adm')}</option>
              </select>
            </label>
            <fieldset className="modes">
              <legend><Tx k="form.mode" /></legend>
              {[['video', 'form.mode.video'], ['phone', 'form.mode.phone'], ['office', 'form.mode.office']].map(([value, key]) => (
                <label key={value}>
                  <input type="radio" name="mode" value={value} checked={f.mode === value} onChange={set('mode')} />
                  <span>{t(key)}</span>
                </label>
              ))}
            </fieldset>
            {err && <p className="form__err" role="alert">{err}</p>}
            <button type="submit" className="btn btn--deep btn--block"><Tx k="form.confirm" /></button>
            <p className="form__note"><Tx k="form.note" /></p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
