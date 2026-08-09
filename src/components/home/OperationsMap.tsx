"use client";

import { useState } from "react";
import { MAP_PATHS, MAP_W, MAP_H, mapX, mapY } from "@/lib/map-data";

/* ==========================================================================
   MAPPA DELLE SEDI

   Confini reali, non ridisegnati: Natural Earth 1:50m, di pubblico dominio,
   proiettati e cotti in un SVG nostro da scripts/build-map.mjs. In pagina
   non arriva nessuna libreria di mappe e nessuna tessera: nessuna richiesta
   a servizi esterni, che su un sito che parla di sovranita' del dato non e'
   un dettaglio.

   GERARCHIA DEI NODI, e vincolo di verita'.
   Nodo pieno e pulsante: Lecce, sede e centro operativo. Nodo a bordo
   tratteggiato: la sede operativa albanese. Cerchietti vuoti: Roma, Nizza e
   Zagabria, che sono sedi previste e non esistono ancora. La legenda sotto
   la mappa dichiara i tre livelli, cosi' la distinzione non resta solo
   grafica.
   ========================================================================== */

type NodeKind = "hq" | "office" | "planned";
type MapNode = {
  id: string;
  kind: NodeKind;
  lat: number;
  lon: number;
  side: "left" | "right";
};

const NODES: MapNode[] = [
  { id: "lecce", kind: "hq", lat: 40.35, lon: 18.17, side: "left" },
  { id: "albania", kind: "office", lat: 41.33, lon: 19.82, side: "left" },
  { id: "rome", kind: "planned", lat: 41.9, lon: 12.48, side: "left" },
  { id: "nice", kind: "planned", lat: 43.7, lon: 7.27, side: "right" },
  { id: "zagreb", kind: "planned", lat: 45.81, lon: 15.98, side: "right" },
];

const AT = (n: MapNode) => [mapX(n.lon), mapY(n.lat)] as const;

export function OperationsMap({
  nodes,
  legend,
}: {
  nodes: Record<string, { name: string; role: string }>;
  legend: { hq: string; office: string; planned: string };
}) {
  const [open, setOpen] = useState<string | null>(null);
  const hq = NODES[0];
  const [hx, hy] = AT(hq);

  return (
    <figure className="m-0">
      <div className="relative border border-line bg-bg">
        <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="block h-auto w-full" aria-hidden="true">
          {/* Reticolo: e' quello che fa leggere il disegno come uno strumento
              invece che come una carta geografica. */}
          <g stroke="var(--color-line)" strokeWidth={0.5} opacity={0.35}>
            {Array.from({ length: 8 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={(MAP_W / 8) * (i + 1)}
                y1={0}
                x2={(MAP_W / 8) * (i + 1)}
                y2={MAP_H}
              />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={(MAP_H / 6) * (i + 1)}
                x2={MAP_W}
                y2={(MAP_H / 6) * (i + 1)}
              />
            ))}
          </g>

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

          {/* Le rotte partono tutte da Lecce. Verso le sedi previste sono
              tratteggiate: e' una linea che non esiste ancora. */}
          {NODES.slice(1).map((n) => {
            const [x, y] = AT(n);
            return (
              <line
                key={n.id}
                x1={hx}
                y1={hy}
                x2={x}
                y2={y}
                stroke="var(--color-line)"
                strokeWidth={n.kind === "planned" ? 0.75 : 1}
                strokeDasharray={n.kind === "planned" ? "2 6" : undefined}
              />
            );
          })}

          <line
            x1={hx}
            y1={hy}
            x2={AT(NODES[1])[0]}
            y2={AT(NODES[1])[1]}
            stroke="var(--color-accent)"
            strokeWidth={1.5}
            strokeDasharray="10 200"
            className="route-pulse"
          />

          {NODES.filter((n) => n.kind === "planned").map((n) => {
            const [x, y] = AT(n);
            return (
              <circle
                key={n.id}
                cx={x}
                cy={y}
                r={3.5}
                fill="var(--color-bg)"
                stroke="var(--color-mute)"
                strokeWidth={1}
              />
            );
          })}

          <circle
            cx={AT(NODES[1])[0]}
            cy={AT(NODES[1])[1]}
            r={5.5}
            fill="var(--color-bg)"
            stroke="var(--color-accent)"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />

          <circle
            cx={hx}
            cy={hy}
            r={7}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={1.5}
            className="node-pulse"
          />
          <circle cx={hx} cy={hy} r={5} fill="var(--color-accent)" />
        </svg>

        {NODES.map((n) => {
          const label = nodes[n.id];
          if (!label) return null;
          const [x, y] = AT(n);
          const left = `${(x / MAP_W) * 100}%`;
          const top = `${(y / MAP_H) * 100}%`;
          const pos =
            n.side === "right"
              ? { left, top }
              : { right: `${100 - (x / MAP_W) * 100}%`, top };
          return (
            <div key={n.id}>
              <button
                type="button"
                onClick={() => setOpen(open === n.id ? null : n.id)}
                style={{ left, top }}
                className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full md:pointer-events-none"
              >
                <span className="sr-only">
                  {label.name} — {label.role}
                </span>
              </button>
              <div
                style={pos}
                className={
                  "pointer-events-none absolute w-max max-w-32 transition-opacity duration-200 md:opacity-100 " +
                  (open === n.id ? "opacity-100" : "opacity-0")
                }
              >
                <div
                  className={
                    (n.side === "right" ? "ml-4" : "mr-4 text-right") + " -translate-y-1/2"
                  }
                >
                  <span
                    className={`eyebrow block ${n.kind === "hq" ? "text-max" : "text-copy"}`}
                  >
                    {label.name}
                  </span>
                  <span className="mt-0.5 block text-small text-mute">{label.role}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <figcaption className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-3">
        <LegendMark kind="hq" label={legend.hq} />
        <LegendMark kind="office" label={legend.office} />
        <LegendMark kind="planned" label={legend.planned} />
      </figcaption>
    </figure>
  );
}

export function LegendMark({ kind, label }: { kind: NodeKind; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        {kind === "hq" && <circle cx="6" cy="6" r="4" fill="var(--color-accent)" />}
        {kind === "office" && (
          <circle
            cx="6"
            cy="6"
            r="4"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
        )}
        {kind === "planned" && (
          <circle cx="6" cy="6" r="3" fill="none" stroke="var(--color-mute)" strokeWidth="1" />
        )}
      </svg>
      <span className="eyebrow">{label}</span>
    </span>
  );
}
