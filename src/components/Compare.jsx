import { useState } from 'react';
import { media, lqip } from '../images.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';
import { Picture } from './Picture.jsx';

export function Compare() {
  const { t } = useLang();
  const [value, setValue] = useState(56);
  return (
    <section className="block block--white" id="referencia">
      <div className="wrap">
        <div className="block__head">
          <p className="kicker"><Tx k="compare.kicker" /></p>
          <Tx as="h2" k="compare.title" />
          <p className="lede"><Tx k="compare.note" /></p>
        </div>
        <div className="compare">
          <Picture picture={media.after} lqip={lqip.after} alt={t('compare.after')} sizes="(max-width: 900px) 100vw, 1120px" />
          <div className="compare__before" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
            <Picture picture={media.before} lqip={lqip.before} alt="" sizes="(max-width: 900px) 100vw, 1120px" />
          </div>
          <input
            className="compare__range"
            type="range"
            min="0"
            max="100"
            value={value}
            aria-valuetext={`${value}%`}
            aria-label={t('compare.range')}
            onChange={(event) => setValue(Number(event.target.value))}
          />
          <span className="compare__tag compare__tag--before"><Tx k="compare.before" /></span>
          <span className="compare__tag compare__tag--after"><Tx k="compare.after" /></span>
        </div>
      </div>
    </section>
  );
}
