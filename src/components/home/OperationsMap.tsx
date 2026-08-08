"use client";

import { useState } from "react";

/* ==========================================================================
   MAPPA OPERATIVA — LECCE ↔ ALBANIA

   SVG proprietario: nessun servizio di mappe, nessuna tessera scaricata,
   nessuna etichetta geografica. Coste e confine ridotti a linee sottili su
   fondo nero, con un velo di grigio appena percepibile a separare la terra
   dal mare. Deve sembrare un'interfaccia operativa, non un atlante.

   Inquadratura: basso Adriatico e Ionio, longitudine 16,8-20,6 e latitudine
   39,6-41,8. Puglia e costa albanese nella stessa vista, cosi' la brevita'
   della traversata si legge a colpo d'occhio.

   Gerarchia dei nodi, come da vincolo di verita' del brief: Lecce e' la sede
   e si disegna piena; l'Albania e' sede operativa e si disegna a tratteggio.
   La distinzione grafica resta, ma dice "principale / operativa", non
   "reale / prevista".
   ========================================================================== */

/* Coste ridisegnate a mano dalle coordinate reali. Chiuse sul bordo del
   riquadro, cosi' il velo di grigio riempie la terra e non il mare. */
/* Punti di appoggio reali, dal nord al sud dell'Adriatico pugliese e poi
   risalendo lo Ionio: Bari, Monopoli, Ostuni, Brindisi, San Cataldo, Otranto,
   Castro, Leuca, Gallipoli, Porto Cesareo, Taranto, golfo di Taranto. */
const ITALY =
  "M -20,145 Q -4,155 13,168 Q 48,185 80,198 Q 88,205 95,211 " +
  "Q 124,232 152,253 Q 184,272 216,290 Q 225,303 233,315 " +
  "Q 258,334 282,352 Q 293,363 303,374 Q 313,392 320,409 " +
  "Q 318,428 314,439 Q 311,443 308,446 Q 305,455 303,463 " +
  "Q 300,481 296,498 Q 289,496 282,493 Q 270,485 257,476 " +
  "Q 240,455 224,433 Q 215,407 207,381 Q 194,377 180,372 " +
  "Q 132,351 83,330 Q 51,341 19,372 Q 0,384 -20,396 Z";

/* Costa albanese da nord di Durazzo a Saranda, poi il confine orientale
   risale verso nord. Il gancio del Karaburun resta accennato: alla scala
   della vista un rientro piu' marcato si leggerebbe come un errore. */
const ALBANIA =
  "M 486,-25 Q 495,50 502,119 Q 494,142 492,168 Q 497,198 500,228 " +
  "Q 505,258 508,288 Q 506,308 500,326 Q 490,334 478,338 " +
  "Q 494,346 508,354 Q 527,377 545,400 Q 563,420 580,440 " +
  "Q 595,459 608,478 Q 613,500 618,522 Q 631,472 640,430 " +
  "Q 652,386 660,340 Q 664,290 662,240 Q 655,190 645,140 " +
  "Q 633,88 620,40 Q 614,8 610,-25 Z";

const CORFU = "M 590,486 Q 580,506 588,523 Q 600,541 618,546 Q 609,519 601,500 Q 596,490 590,486 Z";

const LECCE = { x: 260, y: 359 };
const ALB = { x: 560, y: 240 };

type NodeKey = "primary" | "secondary" | null;

export function OperationsMap({
  nodes,
  strait,
}: {
  nodes: {
    primary: { name: string; role: string };
    secondary: { name: string; role: string };
  };
  strait: string;
}) {
  /* Su mobile l'etichetta si apre al tocco: mostrarle entrambe sempre, a
     390px, le farebbe accavallare. Da tablet in su sono sempre visibili. */
  const [open, setOpen] = useState<NodeKey>(null);

  const label = (key: Exclude<NodeKey, null>) =>
    [
      "pointer-events-none absolute w-max max-w-36 transition-opacity duration-200 md:opacity-100",
      open === key ? "opacity-100" : "opacity-0",
    ].join(" ");

  /* Il nodo albanese sta nel terzo destro del riquadro: la sua etichetta si
     ancora per il bordo destro e sale sopra il nodo, cosi' non esce mai dal
     riquadro a 390px e non finisce sopra la rotta. */
  const PRIMARY_POS = { left: `${LECCE.x / 7.2}%`, top: `${LECCE.y / 5.45}%` };
  const SECONDARY_POS = { right: `${100 - ALB.x / 7.2}%`, top: `${ALB.y / 5.45}%` };

  return (
    <figure className="m-0">
      <div className="relative border border-line bg-bg">
        <svg viewBox="0 0 720 545" className="block h-auto w-full" aria-hidden="true">
          {/* Reticolo: e' quello che fa leggere il disegno come uno strumento
              invece che come una carta geografica. Volutamente al limite
              della visibilita'. */}
          <g stroke="var(--color-line)" strokeWidth={0.5} opacity={0.45}>
            {[90, 180, 270, 360, 450, 540, 630].map((x) => (
              <line key={`v${x}`} x1={x} y1={0} x2={x} y2={545} />
            ))}
            {[90, 180, 270, 360, 450].map((y) => (
              <line key={`h${y}`} x1={0} y1={y} x2={720} y2={y} />
            ))}
          </g>

          {/* Coste e confini: linee sottili grigie, con un velo appena
              percepibile a distinguere la terra dal mare. */}
          <g
            fill="rgb(255 255 255 / 0.04)"
            stroke="var(--color-mute)"
            strokeWidth={1}
            strokeLinejoin="round"
          >
            <path d={ITALY} />
            <path d={ALBANIA} />
            <path d={CORFU} />
          </g>

          {/* La rotta: traccia ferma in grigio, impulso in cyan che la percorre */}
          <line
            x1={LECCE.x}
            y1={LECCE.y}
            x2={ALB.x}
            y2={ALB.y}
            stroke="var(--color-line)"
            strokeWidth={1}
          />
          <line
            x1={LECCE.x}
            y1={LECCE.y}
            x2={ALB.x}
            y2={ALB.y}
            stroke="var(--color-accent)"
            strokeWidth={1.5}
            strokeDasharray="16 307"
            className="route-pulse"
          />

          {/* Nodo secondario: cerchio vuoto, bordo tratteggiato */}
          <circle
            cx={ALB.x}
            cy={ALB.y}
            r={6}
            fill="var(--color-bg)"
            stroke="var(--color-accent)"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />

          {/* Nodo primario: pieno, con pulsazione lenta */}
          <circle
            cx={LECCE.x}
            cy={LECCE.y}
            r={7}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={1.5}
            className="node-pulse"
          />
          <circle cx={LECCE.x} cy={LECCE.y} r={5} fill="var(--color-accent)" />
        </svg>

        {/* Aree di tocco e etichette, in HTML: il testo resta nel carattere
            giusto e leggibile dagli screen reader. */}
        <NodeButton
          x={LECCE.x / 7.2}
          y={LECCE.y / 5.45}
          name={nodes.primary.name}
          role={nodes.primary.role}
          onToggle={() => setOpen((v) => (v === "primary" ? null : "primary"))}
        />
        <div className={label("primary")} style={PRIMARY_POS}>
          <div className="ml-5 -mt-1">
            <span className="eyebrow block text-max">{nodes.primary.name}</span>
            <span className="mt-1 block text-small text-mute">{nodes.primary.role}</span>
          </div>
        </div>

        <NodeButton
          x={ALB.x / 7.2}
          y={ALB.y / 5.45}
          name={nodes.secondary.name}
          role={nodes.secondary.role}
          onToggle={() => setOpen((v) => (v === "secondary" ? null : "secondary"))}
        />
        <div className={label("secondary")} style={SECONDARY_POS}>
          <div className="mr-5 -translate-y-[130%] text-right">
            <span className="eyebrow block text-max">{nodes.secondary.name}</span>
            <span className="mt-1 block text-small text-mute">{nodes.secondary.role}</span>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 flex items-center justify-between gap-6 border-t border-line pt-3">
        <span className="eyebrow">{strait}</span>
        <span className="eyebrow md:hidden">Tap a node</span>
      </figcaption>
    </figure>
  );
}

/* Bersaglio di tocco da 44px centrato sul nodo: il cerchio disegnato e'
   molto piu' piccolo, ma il dito deve trovarlo lo stesso. */
function NodeButton({
  x,
  y,
  name,
  role,
  onToggle,
}: {
  x: number;
  y: number;
  name: string;
  role: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{ left: `${x}%`, top: `${y}%` }}
      className="absolute h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full md:pointer-events-none"
    >
      <span className="sr-only">
        {name} — {role}
      </span>
    </button>
  );
}
