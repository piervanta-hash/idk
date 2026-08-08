import Link from "next/link";

/* ==========================================================================
   PROVA SOCIALE
   Su desktop una griglia, su mobile una fila che si fa scorrere col pollice
   con aggancio a ogni card. Lo scorrimento orizzontale sta dentro il proprio
   contenitore: la pagina non scorre mai in orizzontale.

   Regola del brief rispettata: volumi e risultati, mai importi contrattuali.
   ========================================================================== */

/* Il ritmo delle larghezze, su dodici colonne. Si ripete ogni cinque
   schede: se un giorno ne arriva una sesta, riparte da 5 e la griglia
   resta piena. */
const SPANS = [
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-12",
];

type Item = {
  index: string;
  sector: string;
  client: string;
  scope: string;
  note: string;
};

export function SelectedWork({
  items,
  alsoLabel,
  also,
  cta,
}: {
  items: readonly Item[];
  alsoLabel: string;
  also: string;
  cta: { label: string; href: string };
}) {
  return (
    <div>
      {/* VARIETA' SENZA GERARCHIA.

          Le committenze pesano tutte uguale — sono quasi tutti comuni, e
          ognuna e' un lavoro a se' — ma cinque riquadri identici in fila
          si leggono come un listino. Su schermo largo le schede alternano
          larghezza su dodici colonne: 5+7, 7+5, 12. Nessuna e' piu'
          importante di un'altra, ma il ritmo cambia a ogni riga e
          l'occhio non scivola via.

          Sul telefono restano una fila che si scorre col pollice, con
          aggancio a ogni scheda: lo scorrimento sta dentro il proprio
          contenitore, la pagina non scorre mai in orizzontale. */}
      <ul
        className={
          "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 " +
          "md:mx-0 md:grid md:grid-cols-12 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
        }
      >
        {items.map((item, i) => (
          <li
            key={item.client}
            className={
              "w-[78vw] max-w-xs shrink-0 snap-start md:w-auto md:max-w-none " +
              SPANS[i % SPANS.length]
            }
          >
            <article className="flex h-full flex-col border border-line bg-surface-2 p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="eyebrow tabular">{item.index}</span>
                <span className="eyebrow border border-line px-2 py-1">{item.sector}</span>
              </div>
              <h3 className="mt-6 text-h4 font-display font-semibold text-max">
                {item.client}
              </h3>
              <p className="mt-3 text-body text-copy">{item.scope}</p>
              <p className="mt-auto border-t border-line pt-4 font-mono text-data text-mute tabular">
                {item.note}
              </p>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-6 border-t border-line pt-4 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="eyebrow">
          {alsoLabel} <span className="text-copy">{also}</span>
        </p>
        <Link
          href={cta.href}
          className="group inline-flex min-h-11 items-center gap-3 font-mono text-data uppercase tracking-[0.08em] text-strong transition-colors hover:text-accent"
        >
          {cta.label}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
}
