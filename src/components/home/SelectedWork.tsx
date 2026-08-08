import Link from "next/link";

/* ==========================================================================
   PROVA SOCIALE
   Su desktop una griglia, su mobile una fila che si fa scorrere col pollice
   con aggancio a ogni card. Lo scorrimento orizzontale sta dentro il proprio
   contenitore: la pagina non scorre mai in orizzontale.

   Regola del brief rispettata: volumi e risultati, mai importi contrattuali.
   ========================================================================== */

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
      <ul
        className={
          "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 " +
          "md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 " +
          "lg:grid-cols-4"
        }
      >
        {items.map((item) => (
          <li
            key={item.client}
            className="w-[78vw] max-w-xs shrink-0 snap-start md:w-auto md:max-w-none"
          >
            <article className="flex h-full flex-col border border-line bg-surface-2 p-6">
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
