import { MAP } from '../data/map.js';
import { Tx, useLang } from '../i18n/LangContext.jsx';

export function ColombiaMap() {
  const { t } = useLang();
  return (
    <section className="block block--soft topo" id="sede">
      <div className="wrap map-grid">
        <div>
          <p className="kicker"><Tx k="map.kicker" /></p>
          <Tx as="h2" k="map.title" />
          <p><Tx k="map.note" /></p>
          <p className="about__meta"><Tx k="foot.addr" /></p>
        </div>
        <div className="map-frame">
          <svg className="map-svg" viewBox={MAP.viewBox} role="img" aria-labelledby="map-title">
            <title id="map-title">{t('map.title')}</title>
            <path className="map-country" d={MAP.country} />
            <path className="map-region" d={MAP.santander} />
            <circle className="map-dot" cx={MAP.bucaramanga.x} cy={MAP.bucaramanga.y} r="4.5" />
          </svg>
          <button
            type="button"
            className="map-pin"
            style={{ left: `${(MAP.bucaramanga.x / 280) * 100}%`, top: `${(MAP.bucaramanga.y / 360) * 100}%`, anchorName: '--bga' }}
            popoverTarget="bga-tip"
            aria-label={t('map.point')}
          />
          <div id="bga-tip" popover="auto" className="map-tip" style={{ positionAnchor: '--bga' }}>
            <strong><Tx k="map.point" /></strong>
            <span><Tx k="map.tip" /></span>
          </div>
          <button type="button" className="map-region-btn" popoverTarget="sant-tip" style={{ anchorName: '--sant' }}>
            <Tx k="map.region" />
          </button>
          <div id="sant-tip" popover="auto" className="map-tip" style={{ positionAnchor: '--sant' }}>
            <Tx k="map.note" />
          </div>
        </div>
      </div>
    </section>
  );
}
