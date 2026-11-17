import { MAP_PATHS, MAP_W, MAP_H, mapX, mapY } from "@/lib/map-data";

/* ==========================================================================
   MAPPA DELLE SEDI

   Confini reali, non ridisegnati: Natural Earth 1:50m, di pubblico dominio,
   proiettati e cotti in un SVG nostro da scripts/build-map.mjs. In pagina
   non arriva nessuna libreria di mappe e nessuna tessera: nessuna richiesta
   a servizi esterni, che su un sito che parla di sovranita' del dato non e'
   un dettaglio.

   GERARCHIA DEI NODI, e vincolo di verita'.
   Nodo pieno e pulsante: Lecce, sede e centro operativo. Anello cyan
   tratteggiato: Durazzo, Skopje e Belgrado, le tre sedi di prossima
   apertura. Cerchietti vuoti grigi: Roma e Zagabria, che sono in programma
   e non hanno ancora una data. La legenda sotto la mappa dichiara i tre
   livelli, cosi' la distinzione non resta solo grafica.

   SUL TELEFONO le etichette non galleggiano sulla mappa: a 330 pixel di
   larghezza sei nomi non ci stanno, e un'etichetta che esce dal riquadro
   e' esattamente il modo in cui una pagina comincia a scorrere di lato.
   Sotto la mappa c'e' l'elenco, sempre visibile, senza niente da toccare.
   ========================================================================== */

type NodeKind = "hq" | "soon" | "planned";
type MapNode = {
  id: string;
  kind: NodeKind;
  lat: number;
  lon: number;
  side: "left" | "right";
};

const NODES: MapNode[] = [
  { id: "lecce", kind: "hq", lat: 40.35, lon: 18.17, side: "right" },
  { id: "durres", kind: "soon", lat: 41.32, lon: 19.45, side: "left" },
  { id: "skopje", kind: "soon", lat: 42.0, lon: 21.43, side: "right" },
  { id: "belgrade", kind: "soon", lat: 44.8, lon: 20.46, side: "right" },
  { id: "rome", kind: "planned", lat: 41.9, lon: 12.48, side: "left" },
  { id: "zagreb", kind: "planned", lat: 45.81, lon: 15.98, side: "left" },
];

const AT = (n: MapNode) => [mapX(n.lon), mapY(n.lat)] as const;

type Label = { name: string; role: string };

export function OperationsMap({
  nodes,
  legend,
}: {
  nodes: Record<string, Label>;
  legend: { hq: string; soon: string; planned: string };
}) {
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

          {/* Le rotte partono tutte da Lecce. Verso le sedi in programma
              sono tratteggiate: e' una linea che non esiste ancora. */}
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

          {/* L'impulso corre sulle tre rotte che stanno per aprirsi.
              `pathLength` porta ogni linea a cento unita', cosi' la stessa
              animazione vale per tutte e tre anche se sono lunghe diverse:
              parte da Lecce e arriva al nodo, non a meta' strada. */}
          {NODES.filter((n) => n.kind === "soon").map((n) => {
            const [x, y] = AT(n);
            return (
              <line
                key={n.id}
                x1={hx}
                y1={hy}
                x2={x}
                y2={y}
                pathLength={100}
                stroke="var(--color-accent)"
                strokeWidth={1.5}
                strokeDasharray="7 200"
                strokeDashoffset={7}
                className="route-pulse"
              />
            );
          })}

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

          {NODES.filter((n) => n.kind === "soon").map((n) => {
            const [x, y] = AT(n);
            return (
              <circle
                key={n.id}
                cx={x}
                cy={y}
                r={5.5}
                fill="var(--color-bg)"
                stroke="var(--color-accent)"
                strokeWidth={1.5}
                strokeDasharray="3 3"
              />
            );
          })}

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

        {/* Etichette sulla mappa: solo dove c'e' lo spazio per tenerle. */}
        {NODES.map((n) => {
          const label = nodes[n.id];
          if (!label) return null;
          const [x, y] = AT(n);
          const left = `${(x / MAP_W) * 100}%`;
          const top = `${(y / MAP_H) * 100}%`;
          const pos =
            n.side === "right" ? { left, top } : { right: `${100 - (x / MAP_W) * 100}%`, top };
          return (
            <div
              key={n.id}
              style={pos}
              aria-hidden="true"
              className="pointer-events-none absolute hidden w-max max-w-32 md:block"
            >
              <div
                className={(n.side === "right" ? "ml-4" : "mr-4 text-right") + " -translate-y-1/2"}
              >
                <span className={`eyebrow block ${n.kind === "hq" ? "text-max" : "text-copy"}`}>
                  {label.name}
                </span>
                <span className="mt-0.5 block text-small text-label">{label.role}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* L'elenco: sul telefono e' il modo di leggere le sedi; per un
          lettore di schermo lo e' sempre, perche' il disegno e' muto. */}
      <ul className="m-0 mt-3 list-none divide-y divide-line border-t border-line p-0 max-md:block md:sr-only">
        {NODES.map((n) => {
          const label = nodes[n.id];
          if (!label) return null;
          return (
            <li key={n.id} className="flex min-h-11 items-center justify-between gap-4 py-2">
              <span className="inline-flex items-center gap-3">
                <Mark kind={n.kind} />
                <span className={`eyebrow ${n.kind === "hq" ? "text-max" : "text-copy"}`}>
                  {label.name}
                </span>
              </span>
              <span className="text-right text-small text-label">{label.role}</span>
            </li>
          );
        })}
      </ul>

      <figcaption className="mt-3 hidden flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-3 md:flex">
        <LegendMark kind="hq" label={legend.hq} />
        <LegendMark kind="soon" label={legend.soon} />
        <LegendMark kind="planned" label={legend.planned} />
      </figcaption>
    </figure>
  );
}

function Mark({ kind }: { kind: NodeKind }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="shrink-0">
      {kind === "hq" && <circle cx="6" cy="6" r="4" fill="var(--color-accent)" />}
      {kind === "soon" && (
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
  );
}

export function LegendMark({ kind, label }: { kind: NodeKind; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <Mark kind={kind} />
      <span className="eyebrow">{label}</span>
    </span>
  );
}
