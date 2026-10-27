import { useEffect, useMemo, useState } from 'react';
import { CONFIG } from '../config.js';
import { useLang } from '../i18n/LangContext.jsx';

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
const stamp = (dateStr, hm) => `${dateStr.replace(/-/g, '')}T${hm.replace(':', '')}00`;

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
  return `${h}:${pad(m)} ${ap}`;
};

const endStamp = (dateStr, hm) => {
  const [y, mo, d] = dateStr.split('-').map(Number);
  const [h, m] = hm.split(':').map(Number);
  const dt = new Date(y, mo - 1, d, h, m + CONFIG.slots.stepMinutes);
  return `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
};

const icsEscape = (s) => s.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');

function buildIcs({ title, date, time, description }) {
  const uid = `${date}-${time}-${Math.random().toString(36).slice(2, 8)}@blueconsulting`;
  const now = new Date();
  const dtstamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Blue Consulting//ES',
    'CALSCALE:GREGORIAN',
    'BEGIN:VTIMEZONE',
    'TZID:America/Bogota',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:-0500',
    'TZOFFSETTO:-0500',
    'TZNAME:COT',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=America/Bogota:${stamp(date, time)}`,
    `DTEND;TZID=America/Bogota:${endStamp(date, time)}`,
    `SUMMARY:${icsEscape(title)}`,
    `DESCRIPTION:${icsEscape(description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

const SERVICES = [
  ['general', 'form.service.general'],
  ['ambiental', 'svc.env'],
  ['minero', 'svc.min'],
  ['administrativo', 'svc.adm'],
];

const MODES = [
  ['video', 'form.mode.video'],
  ['phone', 'form.mode.phone'],
  ['office', 'form.mode.office'],
];

export default function Booking() {
  const { lang, t } = useLang();
  const initialDay = useMemo(nextOpenDay, []);
  const [step, setStep] = useState(1);
  const [service, setService] = useState('general');
  const [f, setF] = useState({
    name: '', email: '', phone: '', date: initialDay, time: daySlots(initialDay)[0] || '', mode: 'video',
  });
  const [cursor, setCursor] = useState(() => parseISO(initialDay));
  const [err, setErr] = useState('');
  const [done, setDone] = useState(null);

  useEffect(() => {
    const onService = (event) => {
      const next = event.detail;
      if (SERVICES.some(([id]) => id === next)) {
        setService(next);
        setDone(null);
        setStep(1);
        setErr('');
      }
    };
    window.addEventListener('bc-service', onService);
    return () => window.removeEventListener('bc-service', onService);
  }, []);

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

  const svcLabel = {
    general: t('form.service.general'),
    ambiental: t('svc.env'),
    minero: t('svc.min'),
    administrativo: t('svc.adm'),
  }[service];
  const modeLabel = { video: t('form.mode.video'), phone: t('form.mode.phone'), office: t('form.mode.office') }[f.mode];

  const set = (key) => (e) => setF((p) => ({ ...p, [key]: e.target.value }));

  const pickDay = (date) => {
    const value = iso(date);
    const nextSlots = daySlots(value);
    setF((p) => ({ ...p, date: value, time: nextSlots.includes(p.time) ? p.time : (nextSlots[0] || '') }));
    setErr('');
  };

  const messageFor = (data) => {
    const dateStr = parseISO(data.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CO', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
    const line = (label, value) => (value ? `${label}: ${value}` : null);
    return [
      t('msg.hello'), '',
      line(t('msg.name'), data.name),
      line(t('msg.email'), data.email),
      line(t('msg.phone'), data.phone),
      line(t('msg.service'), data.service),
      line(t('msg.date'), dateStr),
      line(t('msg.time'), `${hourLabel(data.time, lang)} (${CONFIG.timezone})`),
      line(t('msg.mode'), data.mode),
    ].filter((row) => row !== null).join('\n');
  };

  const goNext = () => {
    if (step === 1) {
      setStep(2);
      return;
    }
    if (!f.date || !f.time || !CONFIG.slots.days.includes(parseISO(f.date).getDay())) {
      setErr(t('form.err.day'));
      return;
    }
    setErr('');
    setStep(3);
  };

  const submit = async (e) => {
    e.preventDefault();
    const emailOk = /^\S+@\S+\.\S+$/.test(f.email.trim());
    if (!f.name.trim() || !emailOk || !f.date || !f.time) {
      setErr(t('form.err'));
      return;
    }
    if (!CONFIG.slots.days.includes(parseISO(f.date).getDay()) || parseISO(f.date) < minDay) {
      setErr(t('form.err.day'));
      return;
    }
    setErr('');
    const data = {
      name: f.name.trim(),
      email: f.email.trim(),
      phone: f.phone.trim(),
      service: svcLabel,
      serviceId: service,
      date: f.date,
      time: f.time,
      mode: modeLabel,
      modeId: f.mode,
    };
    const text = messageFor(data);
    const formId = import.meta.env.VITE_FORMSPREE_ID;
    let posted = false;
    let tried = false;
    if (formId) {
      tried = true;
      try {
        const res = await fetch(`https://formspree.io/f/${formId}`, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            service: data.service,
            date: data.date,
            time: data.time,
            mode: data.mode,
            _subject: t('msg.subject'),
          }),
        });
        posted = res.ok;
      } catch {
        posted = false;
      }
    }
    setDone({ ...data, text, posted, tried });
  };

  const downloadIcs = () => {
    if (!done) return;
    const body = buildIcs({
      title: `${t('msg.subject')} · Blue Consulting`,
      date: done.date,
      time: done.time,
      description: done.text,
    });
    const blob = new Blob([body], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'blue-consulting.ics';
    a.click();
    URL.revokeObjectURL(url);
  };

  const steps = ['book.step1', 'book.step2', 'book.step3'];

  return (
    <section className="section" id="agendar">
      <div className="wrap book">
        <div className="book__intro">
          <p className="kicker">{t('book.kicker')}</p>
          <h2>{t('book.title')}</h2>
          <p className="host__name">Dra. Yolanda Salazar Ortiz</p>
          <p className="host__role">{t('book.role')}</p>
          <p className="lead">{t('book.lead')}</p>
        </div>

        {done ? (
          <div className="book__done" role="status">
            <h3>{t('form.done')}</h3>
            <p>{t('form.done.p')}</p>
            <p className="book__pick">
              <strong>{done.service}</strong>
              <span>{done.date} · {hourLabel(done.time, lang)} · {done.mode}</span>
            </p>
            {done.tried && <p>{done.posted ? t('form.posted') : t('form.postfail')}</p>}
            {!done.tried && <p>{t('form.nofeed')}</p>}
            <div className="book__actions">
              <button type="button" className="btn btn--deep" onClick={downloadIcs}>{t('form.ics')}</button>
              <a className="btn btn--line" href={`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(done.text)}`} target="_blank" rel="noopener noreferrer">{t('form.wa')}</a>
              <a className="btn btn--line" href={`mailto:${CONFIG.email}?subject=${encodeURIComponent(t('msg.subject'))}&body=${encodeURIComponent(done.text)}`}>{t('form.mail')}</a>
            </div>
            <button type="button" className="textlink" onClick={() => setDone(null)}>{t('form.again')}</button>
          </div>
        ) : (
          <form className="book__form" noValidate onSubmit={submit}>
            <ol className="steps">
              {steps.map((key, index) => {
                const n = index + 1;
                return (
                  <li key={key} className={n === step ? 'is-on' : n < step ? 'is-done' : ''}>
                    <button type="button" disabled={n > step} onClick={() => setStep(n)}>
                      {n}. {t(key)}
                    </button>
                  </li>
                );
              })}
            </ol>

            {step === 1 && (
              <fieldset>
                <legend>{t('form.service')}</legend>
                <div className="choices">
                  {SERVICES.map(([id, key]) => (
                    <label key={id} className="choice">
                      <input type="radio" name="service" value={id} checked={service === id} onChange={() => setService(id)} />
                      <span>{t(key)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {step === 2 && (
              <>
                <p className="book__rule">{t('book.rule')}</p>
                <div className="cal" aria-label={monthLabel}>
                  <div className="cal__bar">
                    <strong>{monthLabel}</strong>
                    <div className="cal__nav">
                      <button type="button" onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1))} disabled={!canGoPrev} aria-label={t('cal.prev')}>‹</button>
                      <button type="button" onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1))} aria-label={t('cal.next')}>›</button>
                    </div>
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
                <fieldset>
                  <legend>{t('book.step2')}</legend>
                  <div className="slots">
                    {slots.map((hm) => (
                      <label className="slot" key={hm}>
                        <input type="radio" name="time" value={hm} checked={f.time === hm} onChange={set('time')} />
                        <span>{hourLabel(hm, lang)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>{t('form.mode')}</legend>
                  <div className="choices choices--3">
                    {MODES.map(([id, key]) => (
                      <label key={id} className="choice">
                        <input type="radio" name="mode" value={id} checked={f.mode === id} onChange={set('mode')} />
                        <span>{t(key)}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              </>
            )}

            {step === 3 && (
              <>
                <p className="book__pick">
                  <strong>{svcLabel}</strong>
                  <span>{f.date} · {f.time ? hourLabel(f.time, lang) : ''} · {modeLabel}</span>
                </p>
                <label className="field">{t('form.name')}
                  <input type="text" name="name" value={f.name} onChange={set('name')} autoComplete="name" required />
                </label>
                <label className="field">{t('form.email')}
                  <input type="email" name="email" value={f.email} onChange={set('email')} autoComplete="email" required />
                </label>
                <label className="field">{t('form.phone')}
                  <input type="tel" name="phone" value={f.phone} onChange={set('phone')} autoComplete="tel" />
                </label>
              </>
            )}

            {err && <p className="form__err" role="alert">{err}</p>}
            <div className="book__nav">
              {step > 1 && <button type="button" className="btn btn--line" onClick={() => { setErr(''); setStep((n) => n - 1); }}>{t('form.back')}</button>}
              {step < 3 && <button type="button" className="btn btn--deep" onClick={goNext}>{t('form.next')}</button>}
              {step === 3 && <button type="submit" className="btn btn--deep">{t('form.confirm')}</button>}
            </div>
            <p className="form__note">{t('form.note')}</p>
          </form>
        )}
      </div>
    </section>
  );
}
