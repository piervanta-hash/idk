/* ==========================================================================
   METRICA
   La decisione tipografica non ovvia del progetto: la cifra grande sta in
   IBM Plex Mono, non nel carattere display. Un numero non e' un trofeo,
   e' la lettura di uno strumento.
   ========================================================================== */

export function Metric({
  value,
  unit,
  label,
  note,
}: {
  value: string;
  /** Suffisso piccolo accanto alla cifra: "M+", "%", "m". */
  unit?: string;
  label: string;
  note?: string;
}) {
  return (
    <div className="flex flex-col border-t border-line pt-4">
      <div className="flex items-baseline gap-1 font-mono text-metric text-max tabular">
        <span>{value}</span>
        {unit && <span className="text-d3 text-label">{unit}</span>}
      </div>
      <span className="eyebrow mt-4 block">{label}</span>
      {note && <span className="mt-2 text-small text-label">{note}</span>}
    </div>
  );
}

/* ==========================================================================
   INDICE DI AFFIDABILITA'
   Ripreso dal sito attuale e promosso a componente di sistema. E' uno dei
   pochi usi ammessi dell'accento: dichiara quanto il dato e' sicuro.
   ========================================================================== */

export function Confidence({
  field,
  value,
  score,
}: {
  field: string;
  value: string;
  /** 0-100. */
  score: number;
}) {
  const pct = Math.max(0, Math.min(100, score));
  return (
    <div className="flex flex-col gap-2 border-t border-line pt-3">
      <div className="flex items-baseline justify-between gap-4">
        <span className="eyebrow">{field}</span>
        <span className="font-mono text-data text-label tabular">{pct}%</span>
      </div>
      <span className="font-mono text-data text-strong">{value}</span>
      {/* 2px, non 1: a un pixel la barra si confonde con le hairline di
          separazione e smette di essere leggibile come misura. */}
      <div
        className="mt-1 h-0.5 w-full bg-line"
        role="meter"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${field}: affidabilita' ${pct}%`}
      >
        <div className="h-0.5 bg-accent" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
