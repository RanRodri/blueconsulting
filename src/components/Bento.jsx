import { Tx } from '../i18n/LangContext.jsx';

const CELLS = [
  { n: '10', k: 'facts.1.l' },
  { n: '3', k: 'facts.2.l' },
  { n: '2023', k: 'facts.4.l' },
  { n: '901726097-9', k: 'bento.nit' },
  { nKey: 'foot.addr', k: 'bento.seat' },
  { nKey: 'about.sign', k: 'about.role' },
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
              {cell.n ? <b>{cell.n}</b> : <Tx as="b" k={cell.nKey} />}
              <Tx as="span" k={cell.k} />
            </article>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
