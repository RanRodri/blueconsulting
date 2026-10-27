import { Tx } from '../i18n/LangContext.jsx';

const CELLS = [
  { n: '10', k: 'facts.1.l' },
  { n: '3', k: 'facts.2.l' },
  { n: '2023', k: 'facts.4.l' },
  { n: '901726097-9', k: 'bento.nit', tone: 'id' },
  { nKey: 'foot.addr', k: 'bento.seat', tone: 'prose' },
  { nKey: 'about.sign', k: 'about.role', tone: 'prose' },
];

export function Bento() {
  return (
    <section className="block block--soft topo" id="breve">
      <div className="wrap">
        <div className="block__head">
          <p className="kicker"><Tx k="bento.kicker" /></p>
          <Tx as="h2" k="bento.title" />
        </div>
        <div className="bento-host">
        <div className="bento">
          {CELLS.map((cell) => (
            <article key={cell.k}>
              {cell.n
                ? <b className={cell.tone ? `bento__${cell.tone}` : undefined}>{cell.n}</b>
                : <Tx as="b" k={cell.nKey} className={`bento__${cell.tone}`} />}
              <Tx as="span" k={cell.k} />
            </article>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
