"use client";

import { useState } from "react";
import { smoothPath, type Pt } from "@/lib/path";

/* ==========================================================================
   MAPPA OPERATIVA

   SVG proprietario: nessun servizio di mappe, nessuna tessera scaricata,
   nessuna etichetta geografica superflua. Coste e confini ridotti a linee
   sottili, reticolo appena percepibile, un velo di grigio a separare la
   terra dal mare. Deve sembrare un'interfaccia operativa, non un atlante.

   Inquadratura: longitudine 5,5-21,5 e latitudine 38,5-46,8. Le coste sono
   costruite da coordinate di citta' reali e raccordate da una curva che ci
   passa dentro — vedi src/lib/path.ts.

   GERARCHIA DEI NODI, e vincolo di verita'.
   Un nodo pieno e pulsante: Lecce, sede e centro operativo. Un nodo a bordo
   tratteggiato: la sede operativa albanese. Tre nodi vuoti e piccolissimi:
   Roma, Nizza e Zagabria, che sono sedi previste e non esistono ancora —
   sono etichettate come tali e nient'altro nel sito le nomina. La
   distinzione grafica esiste apposta e non va appiattita.
   ========================================================================== */

const W = 800;
const H = 571;

/* Da coordinate geografiche a unita' di disegno.
   Riquadro: longitudine 6,2-21,0 e latitudine 38,8-46,6. */
const X = (lon: number) => (lon - 6.2) * 54.05;
const Y = (lat: number) => (46.6 - lat) * 73.2;
const P = (lat: number, lon: number): Pt => [X(lon), Y(lat)];

/* --- La costa, come una sola linea continua ----------------------------
   Dalla Costa Azzurra giu' lungo il Tirreno, intorno alla Calabria, su per
   lo Ionio e il Salento, lungo l'Adriatico fino a Trieste e poi giu' per la
   sponda orientale fino all'Albania. E' davvero un'unica linea di costa, e
   disegnarla cosi' evita di dover chiudere poligoni su confini interni che
   non c'entrano niente con la mappa. Nessun riempimento: solo la linea,
   come su una carta nautica. ------------------------------------------- */
const COAST: Pt[] = [
  [-40, 250],
  P(43.27, 6.64), // Saint-Tropez
  P(43.55, 7.02), // Cannes
  P(43.7, 7.27), // Nizza
  P(43.78, 7.53), // Ventimiglia
  P(44.1, 8.23), // Savona
  P(44.41, 8.93), // Genova
  P(44.1, 9.83), // La Spezia
  P(43.55, 10.31), // Livorno
  P(42.93, 10.52), // Piombino
  P(42.09, 11.8), // Civitavecchia
  P(41.73, 12.28), // Ostia
  P(41.21, 13.57), // Gaeta
  P(40.85, 14.27), // Napoli
  P(40.68, 14.77), // Salerno
  P(40.03, 15.28), // Palinuro
  P(39.99, 15.72), // Maratea
  P(38.9, 16.05), // Calabria tirrenica
  [535, 640], // punta della Calabria, fuori riquadro
  P(38.5, 16.9), // Calabria ionica
  P(39.72, 16.52), // Sibari
  P(40.35, 16.83), // Metaponto
  P(40.47, 17.24), // Taranto
  P(40.05, 17.98), // Gallipoli
  P(39.79, 18.36), // Leuca
  P(40.15, 18.49), // Otranto
  P(40.38, 18.29), // San Cataldo
  P(40.63, 17.94), // Brindisi
  P(41.12, 16.87), // Bari
  P(41.32, 16.28), // Barletta
  P(41.63, 15.92), // Manfredonia
  P(41.9, 16.18), // Gargano
  P(42.0, 15.0), // Termoli
  P(42.46, 14.21), // Pescara
  P(43.62, 13.51), // Ancona
  P(44.06, 12.57), // Rimini
  P(44.42, 12.3), // Ravenna
  P(45.44, 12.34), // Venezia
  P(45.65, 13.77), // Trieste
  P(44.87, 13.85), // Pola
  P(45.33, 14.44), // Fiume
  P(44.12, 15.23), // Zara
  P(43.51, 16.44), // Spalato
  P(43.05, 17.43), // Ploce
  P(42.65, 18.09), // Dubrovnik
  P(42.42, 18.77), // Bocche di Cattaro
  P(41.9, 19.35), // costa montenegrina
  P(41.32, 19.45), // Durazzo
  P(40.47, 19.49), // Valona
  P(39.87, 20.01), // Saranda
  [780, 600],
];

const SARDINIA: Pt[] = [
  P(41.25, 9.15),
  P(40.85, 9.72),
  P(40.5, 9.75),
  P(39.2, 9.6),
  P(38.92, 8.9),
  P(39.9, 8.4),
  P(40.9, 8.2),
];

const CORSICA: Pt[] = [
  P(43.0, 9.35),
  P(42.6, 9.55),
  P(41.9, 9.45),
  P(41.38, 9.15),
  P(42.2, 8.6),
  P(42.7, 8.7),
];

type NodeKind = "hq" | "office" | "planned";
type MapNode = {
  id: string;
  kind: NodeKind;
  at: Pt;
  /** Da che lato esce l'etichetta, per non uscire mai dal riquadro. */
  side: "left" | "right";
};

const NODES: MapNode[] = [
  { id: "lecce", kind: "hq", at: P(40.35, 18.17), side: "left" },
  { id: "albania", kind: "office", at: P(41.32, 19.9), side: "left" },
  { id: "rome", kind: "planned", at: P(41.9, 12.48), side: "left" },
  { id: "nice", kind: "planned", at: P(43.7, 7.27), side: "right" },
  { id: "zagreb", kind: "planned", at: P(45.81, 15.98), side: "left" },
];

export function OperationsMap({
  nodes,
  legend,
}: {
  nodes: Record<string, { name: string; role: string }>;
  legend: { hq: string; office: string; planned: string };
}) {
  /* Su mobile l'etichetta si apre al tocco: mostrarle tutte e cinque a
     390px le farebbe accavallare. Da tablet in su sono sempre visibili. */
  const [open, setOpen] = useState<string | null>(null);
  const hq = NODES[0];

  return (
    <figure className="m-0">
      <div className="relative border border-line bg-bg">
        <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
          <g stroke="var(--color-line)" strokeWidth={0.5} opacity={0.4}>
            {[100, 200, 300, 400, 500, 600, 700].map((x) => (
              <line key={`v${x}`} x1={x} y1={0} x2={x} y2={H} />
            ))}
            {[100, 200, 300, 400, 500].map((y) => (
              <line key={`h${y}`} x1={0} y1={y} x2={W} y2={y} />
            ))}
          </g>

          <g fill="none" stroke="var(--color-mute)" strokeWidth={1} strokeLinejoin="round">
            <path d={smoothPath(COAST)} />
            <path d={smoothPath(SARDINIA, true)} />
            <path d={smoothPath(CORSICA, true)} />
          </g>

          {/* Le rotte partono tutte da Lecce. Verso le sedi previste sono
              tratteggiate: e' una linea che non esiste ancora. */}
          {NODES.slice(1).map((n) => (
            <line
              key={n.id}
              x1={hq.at[0]}
              y1={hq.at[1]}
              x2={n.at[0]}
              y2={n.at[1]}
              stroke="var(--color-line)"
              strokeWidth={n.kind === "planned" ? 0.75 : 1}
              strokeDasharray={n.kind === "planned" ? "2 6" : undefined}
            />
          ))}

          {/* Impulso lento sull'unica rotta attiva */}
          <line
            x1={hq.at[0]}
            y1={hq.at[1]}
            x2={NODES[1].at[0]}
            y2={NODES[1].at[1]}
            stroke="var(--color-accent)"
            strokeWidth={1.5}
            strokeDasharray="10 200"
            className="route-pulse"
          />

          {/* Sedi previste: cerchietti vuoti, il meno possibile */}
          {NODES.filter((n) => n.kind === "planned").map((n) => (
            <circle
              key={n.id}
              cx={n.at[0]}
              cy={n.at[1]}
              r={3.5}
              fill="var(--color-bg)"
              stroke="var(--color-mute)"
              strokeWidth={1}
            />
          ))}

          {/* Sede operativa: bordo tratteggiato */}
          <circle
            cx={NODES[1].at[0]}
            cy={NODES[1].at[1]}
            r={5.5}
            fill="var(--color-bg)"
            stroke="var(--color-accent)"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />

          {/* Sede: pieno, con pulsazione lenta */}
          <circle
            cx={hq.at[0]}
            cy={hq.at[1]}
            r={7}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={1.5}
            className="node-pulse"
          />
          <circle cx={hq.at[0]} cy={hq.at[1]} r={5} fill="var(--color-accent)" />
        </svg>

        {NODES.map((n) => {
          const label = nodes[n.id];
          if (!label) return null;
          const pos =
            n.side === "right"
              ? { left: `${(n.at[0] / W) * 100}%`, top: `${(n.at[1] / H) * 100}%` }
              : { right: `${100 - (n.at[0] / W) * 100}%`, top: `${(n.at[1] / H) * 100}%` };
          const strong = n.kind === "hq";
          return (
            <div key={n.id}>
              <button
                type="button"
                onClick={() => setOpen(open === n.id ? null : n.id)}
                style={{
                  left: `${(n.at[0] / W) * 100}%`,
                  top: `${(n.at[1] / H) * 100}%`,
                }}
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
                    (n.side === "right" ? "ml-4" : "mr-4 text-right") +
                    " -translate-y-1/2"
                  }
                >
                  <span
                    className={`eyebrow block ${strong ? "text-max" : "text-copy"}`}
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

      {/* La legenda dice per che cosa sta ogni segno. Senza, la distinzione
          fra sede, sede operativa e sede prevista sarebbe solo grafica. */}
      <figcaption className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-3">
        <LegendMark kind="hq" label={legend.hq} />
        <LegendMark kind="office" label={legend.office} />
        <LegendMark kind="planned" label={legend.planned} />
      </figcaption>
    </figure>
  );
}

function LegendMark({ kind, label }: { kind: NodeKind; label: string }) {
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
          <circle
            cx="6"
            cy="6"
            r="3"
            fill="none"
            stroke="var(--color-mute)"
            strokeWidth="1"
          />
        )}
      </svg>
      <span className="eyebrow">{label}</span>
    </span>
  );
}
