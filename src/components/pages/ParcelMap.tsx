"use client";

import { useState } from "react";
import { GeoModal } from "./GeoModal";

/* ==========================================================================
   GEOLOCALIZZAZIONE DELLE PARTICELLE — ESPLOSO DI MAPPA

   Il riferimento catastale estratto dalla carta viene collocato sul terreno.
   L'esploso separa il foglio nei suoi livelli: la maglia del foglio, le
   particelle, il record estratto che si aggancia a una di esse.

   Tre livelli sovrapposti in prospettiva isometrica, disegnati a linee. Il
   comando in alto seleziona il livello e lo porta in evidenza: e' lo stesso
   gesto su desktop e su touch, senza dipendere dal passaggio del mouse.
   ========================================================================== */

/* Maglia delle particelle: geometria illustrativa, non catastale reale. */
const PARCELS = [
  "M 40,60 L 150,30 L 250,70 L 140,102 Z",
  "M 150,30 L 250,0 L 350,38 L 250,70 Z",
  "M 250,70 L 350,38 L 452,78 L 352,110 Z",
  "M 140,102 L 250,70 L 352,110 L 240,142 Z",
  "M 40,60 L 140,102 L 240,142 L 130,175 Z",
  "M 240,142 L 352,110 L 452,150 L 340,182 Z",
];
const TARGET = 2; // la particella agganciata al record

export function ParcelMap({
  layers,
  record,
  note,
  modal,
}: {
  layers: readonly string[];
  /** L'etichetta del record agganciato: arriva dai campi estratti. */
  record: { label: string; value: string };
  note: string;
  modal: {
    open: string;
    title: string;
    territory: string;
    detail: string;
    note: string;
    close: string;
  };
}) {
  const [active, setActive] = useState(2);
  const [geoOpen, setGeoOpen] = useState(false);

  /* Quote verticali dei tre piani: distanti quando il livello e' selezionato,
     raccolti quando non lo e'. */
  const offset = (i: number) => 40 + i * 96 + (active === i ? -14 : 0);

  return (
    <figure className="m-0">
      <div className="flex flex-wrap gap-px bg-line">
        {layers.map((l, i) => (
          <button
            key={l}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={
              "min-h-12 flex-1 px-4 font-mono text-data uppercase tracking-[0.08em] " +
              "transition-colors duration-200 " +
              (active === i ? "bg-surface-2 text-accent" : "bg-bg text-label hover:text-max")
            }
          >
            {l}
          </button>
        ))}
      </div>

      <div className="border border-line border-t-0 bg-bg">
        <svg viewBox="0 0 500 400" className="block h-auto w-full" aria-hidden="true">
          {/* Livello 0 — la maglia del foglio */}
          <g
            transform={`translate(20 ${offset(0)})`}
            className="transition-transform duration-500 ease-out"
            opacity={active === 0 ? 1 : 0.45}
          >
            <path
              d="M 40,60 L 250,0 L 452,78 L 240,142 Z"
              fill="rgb(255 255 255 / 0.03)"
              stroke="var(--color-line)"
            />
            {[0.25, 0.5, 0.75].map((t) => (
              <line
                key={t}
                x1={40 + (250 - 40) * t}
                y1={60 - 60 * t}
                x2={240 + (452 - 240) * t}
                y2={142 - 64 * t}
                stroke="var(--color-line)"
                strokeWidth={0.75}
              />
            ))}
          </g>

          {/* Livello 1 — le particelle */}
          <g
            transform={`translate(20 ${offset(1)})`}
            className="transition-transform duration-500 ease-out"
            opacity={active === 1 ? 1 : 0.55}
          >
            {PARCELS.map((d, i) => (
              <path
                key={i}
                d={d}
                fill={i === TARGET ? "rgb(0 194 209 / 0.14)" : "rgb(255 255 255 / 0.02)"}
                stroke={i === TARGET ? "var(--color-accent)" : "var(--color-mute)"}
                strokeWidth={i === TARGET ? 1.25 : 0.75}
              />
            ))}
          </g>

          {/* Livello 2 — il record estratto, agganciato alla particella */}
          <g
            transform={`translate(20 ${offset(2)})`}
            className="transition-transform duration-500 ease-out"
            opacity={active === 2 ? 1 : 0.55}
          >
            <path
              d={PARCELS[TARGET]}
              fill="rgb(0 194 209 / 0.1)"
              stroke="var(--color-accent)"
              strokeWidth={1.25}
            />
            <line
              x1={350}
              y1={74}
              x2={350}
              y2={-150}
              stroke="var(--color-accent)"
              strokeWidth={1}
              strokeDasharray="3 4"
            />
            <circle cx={350} cy={74} r={4} fill="var(--color-accent)" />
          </g>

          {/* L'etichetta del record, in cima al filo */}
          <g transform={`translate(20 ${offset(2)})`} className="transition-transform duration-500 ease-out">
            <rect
              x={230}
              y={-186}
              width={240}
              height={44}
              fill="var(--color-surface-2)"
              stroke="var(--color-line)"
            />
            <text x={244} y={-166} className="ex-key">
              {record.label.toUpperCase()}
            </text>
            <text x={244} y={-150} className="ex-val" style={{ fontSize: 14 }}>
              {record.value}
            </text>
          </g>
        </svg>
      </div>

      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-3">
        <span className="eyebrow">{note}</span>
        {/* Dall'esploso al territorio vero: e' il passo che chiude il
            racconto — il riferimento catastale diventa un punto sul terreno. */}
        <button
          type="button"
          onClick={() => setGeoOpen(true)}
          className="eyebrow inline-flex min-h-11 items-center gap-2 transition-colors hover:text-accent"
        >
          {modal.open}
          <span aria-hidden="true">&rarr;</span>
        </button>
      </figcaption>

      <GeoModal
        open={geoOpen}
        onClose={() => setGeoOpen(false)}
        labels={modal}
        record={record}
      />
    </figure>
  );
}
