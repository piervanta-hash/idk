/* ==========================================================================
   REPERIMENTO — TRE GIORNI CONTRO QUATTRO SECONDI

   E' il pezzo migliore del sito attuale e non si tocca nella sostanza: il
   confronto fra i cinque passaggi in archivio e l'unico passaggio sulla
   piattaforma. Qui e' ricomposto nella palette e nella tipografia nuove.

   Il tempo lungo resta in grigio, quello breve e' l'unico dato in cyan della
   sezione: e' esattamente il punto della sezione.
   ========================================================================== */

type Side = { name: string; value: string; unit: string };

export function Retrieval({
  manual,
  platform,
}: {
  manual: Side & { steps: readonly string[] };
  platform: Side & { step: string };
}) {
  return (
    <div className="grid gap-px bg-line md:grid-cols-2">
      {/* In archivio */}
      <div className="flex flex-col bg-bg p-6 md:p-10">
        <span className="eyebrow">{manual.name}</span>
        <ol className="m-0 mt-8 flex-1 list-none space-y-0 p-0">
          {manual.steps.map((s, i) => (
            <li
              key={s}
              className="flex gap-5 border-t border-line py-4 last:border-b last:border-line"
            >
              <span className="eyebrow tabular shrink-0 pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-body text-copy">{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex items-baseline gap-3">
          <span className="font-mono text-metric text-strong tabular">{manual.value}</span>
          <span className="eyebrow">{manual.unit}</span>
        </div>
      </div>

      {/* Su Anamnesis */}
      <div className="flex flex-col bg-surface-1 p-6 md:p-10">
        <span className="eyebrow">{platform.name}</span>
        <div className="mt-8 flex flex-1 items-center">
          <div className="w-full border-t border-line py-4">
            <div className="flex gap-5">
              <span className="eyebrow tabular shrink-0 pt-1">01</span>
              <span className="text-body text-copy">{platform.step}</span>
            </div>
          </div>
        </div>
        <div className="mt-10 flex items-baseline gap-3">
          <span className="font-mono text-metric text-accent tabular">{platform.value}</span>
          <span className="eyebrow">{platform.unit}</span>
        </div>
      </div>
    </div>
  );
}
