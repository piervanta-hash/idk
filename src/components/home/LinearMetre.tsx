"use client";

import { useState } from "react";
import { useInView } from "@/lib/useInView";

/* ==========================================================================
   SIGNATURE ELEMENT — «IL METRO LINEARE»

   Gli archivisti misurano gli archivi in metri lineari: la lunghezza di
   scaffale occupata dalla carta. E' l'unita' di misura vera del mestiere e
   nessun concorrente la userebbe come elemento grafico.

   Il segno e' un righello. A destra i dorsi dei faldoni, tratti verticali
   irregolari. Una testa di scansione cyan lo percorre e dietro di se' la
   carta diventa dato: righe allineate di lunghezza variabile, come i record
   di una tabella. La misura fisica diventa misura di dato.

   Due varianti, non una ruotata. Ruotare il righello di 90 gradi su mobile
   lo renderebbe alto oltre milleseicento pixel: al suo posto c'e' un
   righello piu' corto e piu' profondo, con le stesse regole e lo stesso
   gesto. Il movimento resta identico.

   Vincoli rispettati: solo CSS e SVG, nessuna libreria. La scansione si
   ferma a due terzi, cosi' lo stato di riposo mostra ancora entrambe le
   nature — ed e' anche lo stato statico servito a chi ha disattivato le
   animazioni o non ha JavaScript.
   ========================================================================== */

/* Generatore deterministico: server e client devono disegnare esattamente le
   stesse barre, altrimenti React segnala una discrepanza di idratazione. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Variant = {
  uid: string;
  len: number; // lunghezza del righello, in unita' di disegno
  h: number; // profondita' del riquadro
  base: number; // linea di appoggio dei dorsi
  stop: number; // dove si ferma la testa di scansione
  gap: number; // passo fra un dorso e il successivo
  rows: number[]; // quote delle righe di dato
  minBar: number;
  varBar: number;
};

const WIDE: Variant = {
  uid: "lmw",
  len: 1000,
  h: 220,
  base: 190,
  stop: 620,
  gap: 6,
  rows: [56, 84, 112, 140, 168],
  minBar: 44,
  varBar: 90,
};

const NARROW: Variant = {
  uid: "lmn",
  len: 440,
  h: 250,
  base: 214,
  stop: 272,
  gap: 5,
  rows: [58, 90, 122, 154, 186],
  minBar: 48,
  varBar: 104,
};

type Bar = { x: number; w: number; h: number };
type Seg = { x: number; w: number };

function buildBars(v: Variant): Bar[] {
  const r = rng(20260808);
  const bars: Bar[] = [];
  let x = 10;
  while (x < v.len - 12) {
    const w = 2 + Math.round(r() * 3);
    const h = v.minBar + Math.round(r() * v.varBar);
    bars.push({ x, w, h });
    x += w + v.gap + Math.round(r() * v.gap);
  }
  return bars;
}

function buildRows(v: Variant): Seg[][] {
  const r = rng(4711);
  const unit = v.len / 1000;
  return v.rows.map(() => {
    const segs: Seg[] = [];
    let x = 10;
    while (x < v.len - 18) {
      const w = Math.round((26 + r() * 90) * unit) + 8;
      if (x + w > v.len - 10) break;
      segs.push({ x, w });
      x += w + Math.round((10 + r() * 20) * unit) + 3;
    }
    return segs;
  });
}

const DATA = {
  wide: { bars: buildBars(WIDE), rows: buildRows(WIDE) },
  narrow: { bars: buildBars(NARROW), rows: buildRows(NARROW) },
};

function Ruler({
  v,
  data,
  className,
}: {
  v: Variant;
  data: { bars: Bar[]; rows: Seg[][] };
  className: string;
}) {
  const ticks = Math.floor(v.len / 25);

  return (
    <svg
      viewBox={`0 0 ${v.len} ${v.h}`}
      className={className}
      style={{ "--lm-stop": `${v.stop}px` } as React.CSSProperties}
      aria-hidden="true"
    >
      <defs>
        {/* Un solo movimento comanda tutto: le due maschere e la testa di
            scansione condividono la stessa animazione, quindi non possono
            desincronizzarsi fra loro. */}
        <clipPath id={`${v.uid}-paper`} clipPathUnits="userSpaceOnUse">
          <rect className="lm-scan" x={0} y={0} width={v.len} height={v.h} />
        </clipPath>
        <clipPath id={`${v.uid}-data`} clipPathUnits="userSpaceOnUse">
          <rect className="lm-scan" x={-v.len} y={0} width={v.len} height={v.h} />
        </clipPath>
      </defs>

      {/* Carta: i dorsi dei faldoni, ancora da leggere */}
      <g clipPath={`url(#${v.uid}-paper)`} fill="var(--color-mute)">
        {data.bars.map((b, i) => (
          <rect key={i} x={b.x} y={v.base - b.h} width={b.w} height={b.h} />
        ))}
      </g>

      {/* Dato: la stessa informazione, allineata in record */}
      <g clipPath={`url(#${v.uid}-data)`} fill="var(--color-strong)">
        {data.rows.map((segs, r) =>
          segs.map((s, i) => (
            <rect key={`${r}-${i}`} x={s.x} y={v.rows[r]} width={s.w} height={3} />
          )),
        )}
      </g>

      {/* Il righello vero e proprio: tacche ogni 25, maggiori ogni 100 */}
      <g stroke="var(--color-line)" strokeWidth={1}>
        <line x1={0} y1={v.base + 8} x2={v.len} y2={v.base + 8} />
        {Array.from({ length: ticks + 1 }).map((_, i) => (
          <line
            key={i}
            x1={i * 25}
            y1={v.base + 8}
            x2={i * 25}
            y2={v.base + 8 + (i % 4 === 0 ? 11 : 5)}
          />
        ))}
      </g>

      {/* Testa di scansione: l'unico cyan del blocco */}
      <g className="lm-scan">
        <line
          x1={0}
          y1={16}
          x2={0}
          y2={v.base + 8}
          stroke="var(--color-accent)"
          strokeWidth={2}
        />
        <rect x={-4} y={10} width={8} height={8} fill="var(--color-accent)" />
      </g>
    </svg>
  );
}

export function LinearMetre({
  labels,
  readout,
}: {
  labels: { paper: string; data: string; replay: string };
  readout: readonly { key: string; value: string }[];
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [runKey, setRunKey] = useState(0);

  return (
    <div ref={ref} className={inView ? "lm-run" : undefined}>
      <div
        role="img"
        aria-label="A ruler graduated in shelf metres: box spines on one side, structured data records on the other, with a scanning head between them."
      >
        <Ruler
          key={`w${runKey}`}
          v={WIDE}
          data={DATA.wide}
          className="hidden h-auto w-full md:block"
        />
        <Ruler
          key={`n${runKey}`}
          v={NARROW}
          data={DATA.narrow}
          className="h-auto w-full md:hidden"
        />
      </div>

      {/* Legenda: quale meta' e' quale */}
      <div className="mt-4 flex items-center justify-between gap-6 border-t border-line pt-3">
        <div className="flex items-center gap-3">
          <span className="eyebrow text-strong">{labels.data}</span>
          <span className="eyebrow text-line" aria-hidden="true">
            |
          </span>
          <span className="eyebrow">{labels.paper}</span>
        </div>
        <button
          type="button"
          onClick={() => setRunKey((k) => k + 1)}
          className="eyebrow inline-flex min-h-11 items-center gap-2 transition-colors hover:text-max"
        >
          <span aria-hidden="true" className="text-accent">
            &#8635;
          </span>
          {labels.replay}
        </button>
      </div>

      {/* La conversione, in chiaro: misura fisica → misura di dato */}
      <dl className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-4">
        {readout.map((r, i) => (
          <div key={r.key} className="flex items-baseline gap-4">
            {i > 0 && (
              <span aria-hidden="true" className="font-mono text-data text-accent">
                &rarr;
              </span>
            )}
            <div>
              <dt className="eyebrow">{r.key}</dt>
              <dd className="mt-1 font-mono text-h5 text-max tabular">{r.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
