import { useEffect, useMemo, useState } from 'react';
import { CONFIG } from '../config.js';
import { useLang, Tx } from '../i18n/LangContext.jsx';
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
  return `${h}:${pad(m)} ${ap}`;
};

const icsStamp = (dateStr, hm) => {
  const [y, m, d] = dateStr.split('-');
  const [hh, mm] = hm.split(':');
  return `${y}${m}${d}T${hh}${mm}00`;
};

const addMinutes = (dateStr, hm, minutes) => {
  const date = parseISO(dateStr);
  const [h, m] = hm.split(':').map(Number);
  date.setHours(h, m + minutes, 0, 0);
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
};

const escapeIcs = (value) => value
  .replace(/\\/g, '\\\\')
  .replace(/\n/g, '\\n')
  .replace(/,/g, '\\,')
  .replace(/;/g, '\\;');

const SERVICES = ['ambiental', 'minero', 'administrativo', 'general'];

export default function Booking() {
  const { lang, t } = useLang();
  const initialDay = useMemo(nextOpenDay, []);
  const [step, setStep] = useState(1);
  const [service, setService] = useState('general');
  const [done, setDone] = useState(null);
  const [err, setErr] = useState('');
  const [f, setF] = useState({
    name: '', company: '', email: '', phone: '', msg: '',
    date: initialDay, time: daySlots(initialDay)[0] || '', mode: 'video',
  });
  const [cursor, setCursor] = useState(() => parseISO(initialDay));

  useEffect(() => {
    const onService = (event) => {
      const id = event.detail;
      if (!SERVICES.includes(id)) return;
      setService(id);
      setStep(1);
      setDone(null);
      setErr('');
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

  const svcKey = {
    general: 'form.service.general',
    ambiental: 'svc.env',
    minero: 'svc.min',
    administrativo: 'svc.adm',
  }[service];
  const modeKey = { video: 'form.mode.video', phone: 'form.mode.phone', office: 'form.mode.office' }[f.mode];

  const set = (key) => (event) => {
    setF((prev) => ({ ...prev, [key]: event.target.value }));
    setErr('');
  };

  const shiftMonth = (dir) => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + dir, 1));

  const pickDay = (date) => {
    const value = iso(date);
    const nextSlots = daySlots(value);
    setF((prev) => ({
      ...prev,
      date: value,
      time: nextSlots.includes(prev.time) ? prev.time : (nextSlots[0] || ''),
    }));
    setErr('');
  };

  const buildLines = (snap) => {
    const dateStr = parseISO(snap.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CO', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
    const line = (label, value) => (value ? `${label}: ${value}` : null);
    return [
      t('msg.hello'),
      '',
      line(t('msg.name'), snap.name),
      line(t('msg.company'), snap.company),
      line(t('msg.email'), snap.email),
      line(t('msg.phone'), snap.phone),
      line(t('msg.service'), snap.service),
      line(t('msg.date'), dateStr),
      line(t('msg.time'), `${snap.timeLabel} · ${t('cal.tz')}`),
      line(t('msg.mode'), snap.mode),
      line(t('msg.note'), snap.msg),
    ].filter((row) => row !== null).join('\n');
  };

  const goNext = () => {
    if (step === 1) {
      setStep(2);
      setErr('');
      return;
    }
    if (!f.date || !f.time) {
      setErr(t('form.err.when'));
      return;
    }
    if (!CONFIG.slots.days.includes(parseISO(f.date).getDay())) {
      setErr(t('form.err.day'));
      return;
    }
    setErr('');
    setStep(3);
  };

  const handleConfirm = () => {
    const emailOk = /^\S+@\S+\.\S+$/.test(f.email.trim());
    if (!f.name.trim() || !emailOk) {
      setErr(t('form.err'));
      return;
    }
    if (!f.date || !f.time || !CONFIG.slots.days.includes(parseISO(f.date).getDay())) {
      setErr(t('form.err.when'));
      setStep(2);
      return;
    }
    setErr('');
    setDone({
      name: f.name.trim(),
      company: f.company.trim(),
      email: f.email.trim(),
      phone: f.phone.trim(),
      msg: f.msg.trim(),
      service: t(svcKey),
      mode: t(modeKey),
      date: f.date,
      time: f.time,
      timeLabel: hourLabel(f.time, lang),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (step < 3) {
      goNext();
      return;
    }
    handleConfirm();
  };

  const downloadIcs = () => {
    if (!done) return;
    const description = escapeIcs(buildLines(done));
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Blue Consulting//Agenda//ES',
      'CALSCALE:GREGORIAN',
      'BEGIN:VTIMEZONE',
      `TZID:${CONFIG.timezone}`,
      'BEGIN:STANDARD',
      'DTSTART:19700101T000000',
      'TZOFFSETFROM:-0500',
      'TZOFFSETTO:-0500',
      'TZNAME:COT',
      'END:STANDARD',
      'END:VTIMEZONE',
      'BEGIN:VEVENT',
      `DTSTART;TZID=${CONFIG.timezone}:${icsStamp(done.date, done.time)}`,
      `DTEND;TZID=${CONFIG.timezone}:${addMinutes(done.date, done.time, CONFIG.slots.stepMinutes)}`,
      `SUMMARY:${escapeIcs(t('ics.title'))}`,
      `DESCRIPTION:${description}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'blue-consulting.ics';
    link.click();
    URL.revokeObjectURL(url);
  };

  const message = done ? buildLines(done) : buildLines({
    name: f.name.trim(),
    company: f.company.trim(),
    email: f.email.trim(),
    phone: f.phone.trim(),
    msg: f.msg.trim(),
    service: t(svcKey),
    mode: t(modeKey),
    date: f.date,
    time: f.time,
    timeLabel: f.time ? hourLabel(f.time, lang) : '',
  });
  const waHref = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  const mailHref = `mailto:${CONFIG.email}?subject=${encodeURIComponent(t('msg.subject'))}&body=${encodeURIComponent(message)}`;

  const reset = () => {
    setDone(null);
    setStep(1);
    setErr('');
  };

  return (
    <section className="block block--white" id="agendar">
      <div className="wrap">
        <div className="block__head">
          <p className="kicker"><Tx k="book.kicker" /></p>
          <Tx as="h2" k={done ? 'form.ok.kicker' : 'book.title'} />
          <p className="visit__alt"><Tx k="book.alt" /></p>
          <a className="link-arrow" href={waHref} target="_blank" rel="noopener noreferrer"><Tx k="book.wa" /></a>
        </div>
        <div className="tone tone--banner">
          <img src={CONFIG.meetImage} alt={t('book.photo')} width="1200" height="675" loading="lazy" decoding="async" />
        </div>
        <div className="visit">
          {done ? (
            <div className="success">
              <p className="eyebrow">
                <span className="eyebrow__line" aria-hidden="true" />
                <Tx k="form.ok.kicker" />
              </p>
              <Tx as="h3" k="form.ok.title" />
              <Tx as="p" k="form.ok.p" />
              <dl className="summary">
                <div><dt>{t('msg.service')}</dt><dd>{done.service}</dd></div>
                <div><dt>{t('msg.date')}</dt><dd>{parseISO(done.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}</dd></div>
                <div><dt>{t('msg.time')}</dt><dd>{done.timeLabel} · {t('cal.tz')}</dd></div>
                <div><dt>{t('msg.mode')}</dt><dd>{done.mode}</dd></div>
                <div><dt>{t('msg.name')}</dt><dd>{done.name}</dd></div>
                {done.company ? <div><dt>{t('msg.company')}</dt><dd>{done.company}</dd></div> : null}
              </dl>
              <div className="success__actions">
                <button type="button" className="btn" onClick={downloadIcs}><Tx k="form.ics" /></button>
                <a className="btn btn--wa" href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
                <a className="btn btn--line" href={mailHref}><Tx k="form.mail" /></a>
              </div>
              <button type="button" className="text-btn" onClick={reset}><Tx k="form.again" /></button>
            </div>
          ) : (
            <form className="wizard" noValidate onSubmit={handleSubmit}>
              <ol className="stepper" aria-label={t('book.kicker')}>
                {[1, 2, 3].map((n) => (
                  <li key={n} className={step === n ? 'is-on' : (step > n ? 'is-done' : '')}>
                    <i>{n}</i>
                    <span>{t(`step.${n}`)}</span>
                  </li>
                ))}
              </ol>

              {step === 1 && (
                <fieldset className="pick">
                  <legend><Tx k="form.service" /></legend>
                  {[
                    ['ambiental', 'svc.env'],
                    ['minero', 'svc.min'],
                    ['administrativo', 'svc.adm'],
                    ['general', 'form.service.general'],
                  ].map(([value, key]) => (
                    <label className="pick__opt" key={value}>
                      <input type="radio" name="service" value={value} checked={service === value} onChange={(e) => setService(e.target.value)} />
                      <span>{t(key)}</span>
                    </label>
                  ))}
                </fieldset>
              )}

              {step === 2 && (
                <div className="when">
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
                            aria-label={date.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-CO', { dateStyle: 'full' })}
                            onClick={() => pickDay(date)}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="slotcol">
                    <p className="tz" id="tz-label">{t('cal.tz')}</p>
                    <span className="slotcol__label" id="time-label">{t('cal.slots')}</span>
                    {slots.length === 0 ? <p>{t('cal.empty')}</p> : (
                      <div className="slots" role="radiogroup" aria-labelledby="time-label">
                        {slots.map((hm) => (
                          <label className="slot" key={hm}>
                            <input type="radio" name="time" value={hm} checked={f.time === hm} onChange={set('time')} />
                            <span>{hourLabel(hm, lang)}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    <fieldset className="modes">
                      <legend><Tx k="form.mode" /></legend>
                      {[['video', 'form.mode.video'], ['office', 'form.mode.office'], ['phone', 'form.mode.phone']].map(([value, key]) => (
                        <label key={value}>
                          <input type="radio" name="mode" value={value} checked={f.mode === value} onChange={set('mode')} />
                          <span>{t(key)}</span>
                        </label>
                      ))}
                    </fieldset>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="fields">
                  <label className="f"><Tx k="form.name" />
                    <input type="text" name="name" value={f.name} onChange={set('name')} required autoComplete="name" />
                  </label>
                  <label className="f"><span><Tx k="form.company" /> <em><Tx k="form.company.opt" /></em></span>
                    <input type="text" name="organization" value={f.company} onChange={set('company')} autoComplete="organization" />
                  </label>
                  <label className="f"><Tx k="form.email" />
                    <input type="email" name="email" value={f.email} onChange={set('email')} required autoComplete="email" />
                  </label>
                  <label className="f"><Tx k="form.phone" />
                    <input type="tel" name="tel" value={f.phone} onChange={set('phone')} autoComplete="tel" />
                  </label>
                  <label className="f f--wide"><Tx k="form.msg" />
                    <textarea name="message" rows="4" value={f.msg} onChange={set('msg')} placeholder={t('form.msg.ph')} />
                  </label>
                </div>
              )}

              {err && <p className="form__err" role="alert">{err}</p>}

              <div className="wizard__bar">
                {step > 1 && (
                  <button type="button" className="btn btn--line" onClick={() => { setStep((n) => n - 1); setErr(''); }}>
                    <Tx k="step.back" />
                  </button>
                )}
                {step < 3 ? (
                  <button type="submit" className="btn">
                    <Tx k="step.next" />
                    <span className="arr" aria-hidden="true">→</span>
                  </button>
                ) : (
                  <button type="submit" className="btn"><Tx k="form.confirm" /></button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
