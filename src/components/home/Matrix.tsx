import Link from "next/link";

/* ==========================================================================
   LA DOPPIA MATRICE — DUE OFFERTE × DUE MERCATI

   E' la struttura portante della home dichiarata dal brief, e qui e' resa
   letteralmente come matrice invece che come le solite tre card affiancate.
   Chi arriva deve capire in tre secondi che Paloryn non e' solo un fornitore
   della Pubblica Amministrazione.

   Su mobile la matrice si apre in due blocchi impilati, uno per offerta, con
   i due mercati come righe: la lettura resta la stessa, in colonna.
   ========================================================================== */

type Row = {
  name: string;
  role: string;
  href: string;
  cells: readonly string[];
};

export function Matrix({
  columns,
  rows,
}: {
  columns: readonly string[];
  rows: readonly Row[];
}) {
  return (
    <div>
      {/* Intestazione dei mercati — solo da tablet in su */}
      <div className="hidden grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)_minmax(0,1.3fr)] gap-8 border-b border-line pb-3 md:grid">
        <span />
        {columns.map((c) => (
          <span key={c} className="eyebrow">
            {c}
          </span>
        ))}
      </div>

      {rows.map((row) => (
        <div key={row.name} className="border-b border-line">
          {/* Desktop: una riga della matrice */}
          <div className="hidden grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)_minmax(0,1.3fr)] gap-8 py-10 md:grid">
            <div>
              <Link
                href={row.href}
                className="group inline-flex items-baseline gap-3 transition-colors"
              >
                <h3 className="text-h4 font-display font-semibold text-max group-hover:text-accent">
                  {row.name}
                </h3>
                <span
                  aria-hidden="true"
                  className="text-mute transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
                >
                  &rarr;
                </span>
              </Link>
              <span className="eyebrow mt-2 block">{row.role}</span>
            </div>
            {row.cells.map((cell, i) => (
              <p key={i} className="text-body text-copy">
                {cell}
              </p>
            ))}
          </div>

          {/* Mobile: lo stesso contenuto, in colonna */}
          <div className="py-8 md:hidden">
            <Link href={row.href} className="flex items-baseline justify-between gap-4">
              <h3 className="text-d3 font-display font-semibold text-max">{row.name}</h3>
              <span aria-hidden="true" className="text-mute">
                &rarr;
              </span>
            </Link>
            <span className="eyebrow mt-2 block">{row.role}</span>
            <dl className="mt-6 space-y-5">
              {row.cells.map((cell, i) => (
                <div key={i} className="border-l border-line pl-4">
                  <dt className="eyebrow">{columns[i]}</dt>
                  <dd className="mt-2 text-body text-copy">{cell}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ))}
    </div>
  );
}
