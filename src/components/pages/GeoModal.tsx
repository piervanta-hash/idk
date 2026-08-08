"use client";

import { useEffect, useRef } from "react";
import { MAP_PATHS, MAP_W, MAP_H, mapX, mapY } from "@/lib/map-data";

/* ==========================================================================
   IL RECORD SUL TERRITORIO

   L'esploso mostra la particella isolata dal foglio. Questa modale fa il
   passo successivo: la stessa particella collocata sul territorio vero,
   sulla stessa mappa Natural Earth usata per le sedi. Il riferimento
   catastale estratto dalla carta smette di essere una stringa e diventa un
   punto sul terreno.

   A destra il dettaglio ravvicinato: la maglia del foglio con la particella
   agganciata, cosi' si vede il salto di scala fra il paese e i pochi metri.

   Nessuna libreria di mappe, nessuna tessera, nessuna richiesta esterna.
   ========================================================================== */

/* Posizione dimostrativa nel Salento. La particella del record di esempio
   non esiste: e' un campione, come dichiarato in pagina. */
const LAT = 40.17;
const LON = 18.17;

export function GeoModal({
  open,
  onClose,
  labels,
  record,
}: {
  open: boolean;
  onClose: () => void;
  labels: {
    title: string;
    territory: string;
    detail: string;
    note: string;
    close: string;
  };
  record: { label: string; value: string };
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const x = mapX(LON);
  const y = mapY(LAT);
  /* Finestra ravvicinata attorno al punto, ritagliata dalla stessa mappa. */
  const zw = 150;
  const zh = zw * (MAP_H / MAP_W);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={labels.title}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="max-h-full w-full max-w-5xl overflow-y-auto border border-line bg-bg focus:outline-none"
      >
        <div className="flex items-center justify-between gap-6 border-b border-line px-5 py-4 md:px-8">
          <span className="eyebrow">{labels.title}</span>
          <button
            type="button"
            onClick={onClose}
            className="eyebrow inline-flex min-h-11 items-center gap-2 transition-colors hover:text-max"
          >
            {labels.close}
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="grid gap-px bg-line md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          {/* Il paese */}
          <div className="bg-bg p-5 md:p-8">
            <span className="eyebrow">{labels.territory}</span>
            <svg
              viewBox={`0 0 ${MAP_W} ${MAP_H}`}
              className="mt-4 block h-auto w-full"
              aria-hidden="true"
            >
              <g
                fill="rgb(255 255 255 / 0.035)"
                stroke="var(--color-mute)"
                strokeWidth={0.8}
                strokeLinejoin="round"
              >
                {MAP_PATHS.map((d, i) => (
                  <path key={i} d={d} />
                ))}
              </g>
              {/* Mirino sul punto */}
              <g stroke="var(--color-accent)" fill="none">
                <rect x={x - zw / 2} y={y - zh / 2} width={zw} height={zh} strokeWidth={1} />
                <line x1={x - 22} y1={y} x2={x - 8} y2={y} strokeWidth={1} />
                <line x1={x + 8} y1={y} x2={x + 22} y2={y} strokeWidth={1} />
                <line x1={x} y1={y - 22} x2={x} y2={y - 8} strokeWidth={1} />
                <line x1={x} y1={y + 8} x2={x} y2={y + 22} strokeWidth={1} />
              </g>
              <circle cx={x} cy={y} r={4} fill="var(--color-accent)" />
            </svg>
          </div>

          {/* Il dettaglio ravvicinato */}
          <div className="bg-bg p-5 md:p-8">
            <span className="eyebrow">{labels.detail}</span>
            <div className="mt-4 border border-line bg-surface-1">
              <svg viewBox="0 0 300 220" className="block h-auto w-full" aria-hidden="true">
                {/* La maglia del foglio */}
                <g stroke="var(--color-line)" strokeWidth={0.75} fill="none">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line key={`a${i}`} x1={20 + i * 22} y1={40} x2={90 + i * 22} y2={190} />
                  ))}
                  {[0, 1, 2, 3].map((i) => (
                    <line key={`b${i}`} x1={40 + i * 44} y1={30} x2={140 + i * 44} y2={120} />
                  ))}
                </g>
                {/* La particella agganciata al record */}
                <path
                  d="M 128 96 L 172 84 L 196 118 L 152 132 Z"
                  fill="rgb(0 194 209 / 0.14)"
                  stroke="var(--color-accent)"
                  strokeWidth={1.5}
                />
                <line
                  x1={162}
                  y1={108}
                  x2={162}
                  y2={54}
                  stroke="var(--color-accent)"
                  strokeWidth={1}
                  strokeDasharray="3 4"
                />
                <circle cx={162} cy={108} r={3.5} fill="var(--color-accent)" />
                <rect
                  x={110}
                  y={20}
                  width={168}
                  height={34}
                  fill="var(--color-surface-2)"
                  stroke="var(--color-line)"
                />
                <text x={122} y={36} className="ex-key">
                  {record.label.toUpperCase()}
                </text>
                <text x={122} y={49} className="ex-val" style={{ fontSize: 12 }}>
                  {record.value}
                </text>
              </svg>
            </div>
            <p className="mt-4 text-small text-mute">{labels.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
