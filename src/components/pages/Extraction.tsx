"use client";

import { useState } from "react";
import { useInView } from "@/lib/useInView";

/* ==========================================================================
   ANIMAZIONE 1 — ESTRAZIONE DEL DATO

   La piu' importante del sito, e riprende il linguaggio gia' usato su
   Instagram. Una pagina di documento sotto scansione: una linea cyan la
   percorre, alcuni campi si accendono dentro un riquadro sottile, e da
   ciascuno parte una linea che porta il valore in una tabella strutturata.
   La carta diventa dato sotto gli occhi di chi guarda.

   Su desktop documento a sinistra e tabella a destra; su mobile documento
   sopra e tabella che si compone sotto, con i collegamenti che scendono.

   Lo stato di riposo e' quello finale, completo: chi ha disattivato il
   movimento o naviga senza JavaScript vede lo schema intero, con tutti i
   riquadri, tutti i collegamenti e tutti i valori. L'animazione parte solo
   quando c'e' la classe di avvio, quindi non nasconde mai nulla.
   ========================================================================== */

type Field = { label: string; value: string; score: number };

/* Righe di testo della pagina di origine: irregolari come una scrittura
   reale, generate una volta sola in modo deterministico. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

type Line = { x: number; y: number; w: number };

function buildLines(width: number, top: number, gap: number, count: number): Line[] {
  const r = rng(90210);
  const out: Line[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      x: 26 + Math.round(r() * 10),
      y: top + i * gap,
      w: Math.round(width * (0.52 + r() * 0.4)),
    });
  }
  return out;
}

/* Le quattro zone della pagina da cui provengono i campi estratti. */
const ZONES = [
  { y: 96, h: 26 },
  { y: 196, h: 26 },
  { y: 268, h: 26 },
  { y: 372, h: 26 },
];

export function Extraction({
  fields,
  labels,
  note,
}: {
  fields: readonly Field[];
  labels: { document: string; table: string; replay: string };
  note: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 });
  const [runKey, setRunKey] = useState(0);

  return (
    <div ref={ref} className={inView ? "ex-run" : undefined}>
      <div key={runKey}>
        <Wide fields={fields} labels={labels} />
        <Tall fields={fields} labels={labels} />
      </div>

      <div className="mt-6 flex flex-col gap-4 border-t border-line pt-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-small text-mute">{note}</p>
        <button
          type="button"
          onClick={() => setRunKey((k) => k + 1)}
          className="eyebrow inline-flex min-h-11 shrink-0 items-center gap-2 transition-colors hover:text-max"
        >
          <span aria-hidden="true" className="text-accent">
            &#8635;
          </span>
          {labels.replay}
        </button>
      </div>
    </div>
  );
}

/* --- Desktop: documento a sinistra, tabella a destra ---------------------- */

function Wide({
  fields,
  labels,
}: {
  fields: readonly Field[];
  labels: { document: string; table: string };
}) {
  const PAGE = { x: 0, y: 40, w: 380, h: 470 };
  const TABLE_X = 560;
  const ROW_Y = [110, 208, 306, 404];
  const lines = buildLines(PAGE.w, 70, 22, 19);

  return (
    <svg
      viewBox="0 0 1000 560"
      className="hidden h-auto w-full md:block"
      role="img"
      aria-label="A scanned page on the left; four fields are boxed and carried across into a structured record on the right, each with a confidence score."
    >
      <text x={0} y={20} className="ex-cap">
        {labels.document.toUpperCase()}
      </text>
      <text x={TABLE_X} y={20} className="ex-cap">
        {labels.table.toUpperCase()}
      </text>

      {/* La pagina */}
      <rect
        x={PAGE.x}
        y={PAGE.y}
        width={PAGE.w}
        height={PAGE.h}
        fill="var(--color-surface-2)"
        stroke="var(--color-line)"
      />
      <g fill="var(--color-mute)" opacity={0.75}>
        {lines.map((l, i) => (
          <rect key={i} x={PAGE.x + l.x} y={l.y} width={l.w} height={4} rx={1} />
        ))}
      </g>

      {/* I quattro campi: riquadro sottile, collegamento, riga di tabella */}
      {fields.map((f, i) => {
        const z = ZONES[i];
        const y = ROW_Y[i];
        const delay = 420 + i * 340;
        return (
          <g key={f.label}>
            <rect
              className="ex-fade"
              style={{ animationDelay: `${delay}ms` }}
              x={PAGE.x + 20}
              y={z.y}
              width={PAGE.w - 40}
              height={z.h}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={1}
            />
            <path
              className="ex-draw"
              style={{ animationDelay: `${delay + 140}ms` }}
              d={`M ${PAGE.x + PAGE.w - 20} ${z.y + z.h / 2} H ${(PAGE.x + PAGE.w + TABLE_X) / 2} V ${y} H ${TABLE_X}`}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={1}
              pathLength={100}
            />
            <g className="ex-fade" style={{ animationDelay: `${delay + 420}ms` }}>
              <line
                x1={TABLE_X}
                y1={y - 34}
                x2={1000}
                y2={y - 34}
                stroke="var(--color-line)"
              />
              <text x={TABLE_X} y={y - 16} className="ex-key">
                {f.label.toUpperCase()}
              </text>
              <text x={TABLE_X} y={y + 12} className="ex-val">
                {f.value}
              </text>
              <text x={1000} y={y + 12} textAnchor="end" className="ex-score">
                {f.score}%
              </text>
              <rect x={TABLE_X} y={y + 24} width={440} height={2} fill="var(--color-line)" />
              <rect
                x={TABLE_X}
                y={y + 24}
                width={(440 * f.score) / 100}
                height={2}
                fill="var(--color-accent)"
              />
            </g>
          </g>
        );
      })}

      {/* La testa di scansione percorre la pagina dall'alto in basso */}
      <g className="ex-scan">
        <line
          x1={PAGE.x}
          y1={PAGE.y}
          x2={PAGE.x + PAGE.w}
          y2={PAGE.y}
          stroke="var(--color-accent)"
          strokeWidth={2}
        />
        <rect x={PAGE.x + PAGE.w - 4} y={PAGE.y - 4} width={8} height={8} fill="var(--color-accent)" />
      </g>
    </svg>
  );
}

/* --- Mobile: documento sopra, tabella che si compone sotto ---------------- */

function Tall({
  fields,
  labels,
}: {
  fields: readonly Field[];
  labels: { document: string; table: string };
}) {
  const PAGE = { x: 40, y: 34, w: 300, h: 360 };
  const ROW_Y = [470, 560, 650, 740];
  const lines = buildLines(PAGE.w, 60, 17, 18);
  const zones = [
    { y: 74, h: 22 },
    { y: 150, h: 22 },
    { y: 208, h: 22 },
    { y: 290, h: 22 },
  ];

  return (
    <svg
      viewBox="0 0 380 800"
      className="h-auto w-full md:hidden"
      role="img"
      aria-label="A scanned page above; four fields are boxed and carried down into a structured record below, each with a confidence score."
    >
      <text x={0} y={16} className="ex-cap">
        {labels.document.toUpperCase()}
      </text>

      <rect
        x={PAGE.x}
        y={PAGE.y}
        width={PAGE.w}
        height={PAGE.h}
        fill="var(--color-surface-2)"
        stroke="var(--color-line)"
      />
      <g fill="var(--color-mute)" opacity={0.75}>
        {lines.map((l, i) => (
          <rect key={i} x={PAGE.x + l.x} y={PAGE.y + l.y} width={l.w * 0.8} height={3} rx={1} />
        ))}
      </g>

      <text x={0} y={434} className="ex-cap">
        {labels.table.toUpperCase()}
      </text>

      {fields.map((f, i) => {
        const z = zones[i];
        const y = ROW_Y[i];
        const delay = 420 + i * 340;
        const zy = PAGE.y + z.y;
        return (
          <g key={f.label}>
            <rect
              className="ex-fade"
              style={{ animationDelay: `${delay}ms` }}
              x={PAGE.x + 14}
              y={zy}
              width={PAGE.w - 28}
              height={z.h}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={1}
            />
            <path
              className="ex-draw"
              style={{ animationDelay: `${delay + 140}ms` }}
              d={`M ${PAGE.x + 14} ${zy + z.h / 2} H ${20 + i * 6} V ${y - 34} H 40`}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={1}
              pathLength={100}
            />
            <g className="ex-fade" style={{ animationDelay: `${delay + 420}ms` }}>
              <line x1={0} y1={y - 34} x2={380} y2={y - 34} stroke="var(--color-line)" />
              <text x={0} y={y - 16} className="ex-key">
                {f.label.toUpperCase()}
              </text>
              <text x={0} y={y + 12} className="ex-val">
                {f.value}
              </text>
              <text x={380} y={y + 12} textAnchor="end" className="ex-score">
                {f.score}%
              </text>
              <rect x={0} y={y + 24} width={380} height={2} fill="var(--color-line)" />
              <rect
                x={0}
                y={y + 24}
                width={(380 * f.score) / 100}
                height={2}
                fill="var(--color-accent)"
              />
            </g>
          </g>
        );
      })}

      <g className="ex-scan-tall">
        <line
          x1={PAGE.x}
          y1={PAGE.y}
          x2={PAGE.x + PAGE.w}
          y2={PAGE.y}
          stroke="var(--color-accent)"
          strokeWidth={2}
        />
        <rect
          x={PAGE.x + PAGE.w - 4}
          y={PAGE.y - 4}
          width={8}
          height={8}
          fill="var(--color-accent)"
        />
      </g>
    </svg>
  );
}
