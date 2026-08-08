/* ==========================================================================
   LA SCAFFALATURA

   La grafica accanto al titolo e' l'archivio: sei ripiani, faldoni, buste e
   volumi rilegati, disegnati in alzato come su una tavola tecnica. E' la
   materia di cui parla il titolo — e la ragione per cui questa azienda si
   misura in metri lineari e non in gigabyte.

   PERCHE' DISEGNATA E NON FOTOGRAFATA. Una fotografia di scaffali sarebbe
   una fotografia di scaffali: chiunque ne ha una. Un disegno in alzato,
   fatto con le stesse linee sottili di tutto il resto del sito, e' un
   oggetto che esiste solo qui.

   PERCHE' IRREGOLARE. Uno scaffale d'archivio non e' una griglia: i
   faldoni hanno dorsi di larghezza diversa, qualcuno pende, qualcuno manca
   perche' e' sul tavolo di chi lo sta consultando, e ogni tanto c'e' un
   volume rilegato piu' alto degli altri. Disegnarlo regolare darebbe uno
   scaffale di un rendering immobiliare. L'irregolarita' e' generata da un
   seme fisso: sempre la stessa, uguale sul server e nel browser.

   LA RISOLUZIONE. Il disegno esiste due volte. Sotto lo scaffale com'e':
   linee grigie, dorsi anonimi. Sopra lo stesso scaffale censito — dorsi
   schiariti, una tacca ciano alla base di ogni pezzo — scoperto da sinistra
   a destra da una lama che lo attraversa.

   Non e' l'archivio che diventa altro: e' l'archivio che diventa
   interrogabile restando dov'e'. E' esattamente quello che l'azienda fa, e
   il brief lo dice a parole in due punti diversi: gli originali non
   lasciano mai l'edificio che li custodisce.

   STATO DI RIPOSO — senza JavaScript, e con meno animazioni: lo scaffale e'
   censito del tutto e la lama non c'e'. Non si perde niente.
   ========================================================================== */

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
}

/* Il disegno e' piu' largo e piu' alto della scaffalatura: il margine a
   destra e in basso serve alle quote, che compaiono quando la lama passa.
   In una tavola tecnica le quote stanno fuori dall'oggetto, non sopra. */
const W = 646;
const H = 830;
const LEFT = 26;
const RIGHT = 534;
const TOP = 16;
const SHELVES = [128, 250, 372, 494, 616, 738]; // quota del piano di ogni ripiano
const BOTTOM = SHELVES[SHELVES.length - 1];

/* Le due linee di quota. */
const DIM_X = 590; // quota verticale, a destra dell'oggetto
const DIM_Y = 790; // quota orizzontale, sotto l'oggetto

/* Tre grigi per i dorsi, e non uno solo. Uno scaffale d'archivio non e' una
   massa uniforme: i faldoni arrivano da forniture diverse e da anni
   diversi, e si vede. Con un grigio unico il disegno diventa una macchia
   nera; con tre si contano i pezzi.

   Sono grigi derivati dai tre ufficiali, come il brief consente: nessun
   colore nuovo, solo gradini fra il fondo e la linea. */
const TONES = ["#161616", "#1e1e1e", "#262626"];
const TONES_INDEXED = ["#202020", "#292929", "#333333"];

type Item = {
  x: number;
  w: number;
  h: number;
  base: number;
  kind: "box" | "volume" | "folder";
  lean: number;
  bands: number;
  tone: number;
};

/* Riempie ogni ripiano fino a esaurire lo spazio, lasciando ogni tanto un
   vuoto: e' il faldone che qualcuno ha in mano. */
function build(): Item[] {
  const r = rng(20260808);
  const out: Item[] = [];

  for (const base of SHELVES) {
    let x = LEFT + 2;
    while (x < RIGHT - 26) {
      /* Un vuoto ogni tanto, mai due di fila all'inizio. */
      if (r() < 0.09 && x > LEFT + 40) {
        x += 14 + r() * 26;
        continue;
      }

      const roll = r();
      const kind: Item["kind"] = roll < 0.6 ? "box" : roll < 0.85 ? "volume" : "folder";

      const w =
        kind === "box" ? 30 + r() * 26 : kind === "volume" ? 14 + r() * 12 : 22 + r() * 14;
      if (x + w > RIGHT) break;

      const h =
        kind === "box" ? 74 + r() * 18 : kind === "volume" ? 84 + r() * 22 : 68 + r() * 14;

      out.push({
        x,
        w,
        h,
        base,
        kind,
        /* Solo i volumi stretti pendono, e solo qualcuno: un faldone pieno
           sta dritto perche' e' incastrato fra gli altri. */
        lean: kind === "volume" && r() < 0.22 ? (r() < 0.5 ? -5 : 5) : 0,
        bands: kind === "volume" ? 2 + Math.floor(r() * 2) : 0,
        tone: Math.floor(r() * TONES.length),
      });
      x += w + 1.5;
    }
  }
  return out;
}

const ITEMS = build();

/* Un pezzo, disegnato due volte con due trattamenti diversi. `indexed` e'
   lo strato di sopra: stesso disegno, dorsi schiariti e tacca alla base. */
function Piece({ it, indexed }: { it: Item; indexed: boolean }) {
  const y = it.base - it.h;
  const spine = indexed ? "var(--color-strong)" : "var(--color-mute)";
  const face = indexed ? TONES_INDEXED[it.tone] : TONES[it.tone];
  const edge = indexed ? "var(--color-mute)" : "var(--color-line)";

  return (
    <g
      transform={it.lean ? `rotate(${it.lean} ${it.x + it.w / 2} ${it.base})` : undefined}
    >
      <rect
        x={it.x}
        y={y}
        width={it.w}
        height={it.h}
        fill={face}
        stroke={edge}
        strokeWidth={1}
      />

      {it.kind === "box" && (
        <>
          {/* Cartellino del dorso */}
          <rect
            x={it.x + 4}
            y={y + 9}
            width={it.w - 8}
            height={13}
            fill="none"
            stroke={spine}
            strokeWidth={0.75}
          />
          <line
            x1={it.x + 7}
            y1={y + 15.5}
            x2={it.x + it.w - 7}
            y2={y + 15.5}
            stroke={spine}
            strokeWidth={1.5}
          />
          {/* Presa per le dita, in basso al centro */}
          <line
            x1={it.x + it.w / 2 - 5}
            y1={it.base - 11}
            x2={it.x + it.w / 2 + 5}
            y2={it.base - 11}
            stroke={edge}
            strokeWidth={1.5}
          />
        </>
      )}

      {it.kind === "volume" &&
        Array.from({ length: it.bands }, (_, i) => (
          <line
            key={i}
            x1={it.x + 2.5}
            y1={y + 16 + i * 15}
            x2={it.x + it.w - 2.5}
            y2={y + 16 + i * 15}
            stroke={spine}
            strokeWidth={1.5}
          />
        ))}

      {it.kind === "folder" && (
        <>
          {/* La busta ha il lembo: una piega in alto a destra */}
          <path
            d={`M${it.x + it.w - 11},${y} L${it.x + it.w},${y + 11}`}
            fill="none"
            stroke={edge}
            strokeWidth={1}
          />
          <line
            x1={it.x + 4}
            y1={y + 26}
            x2={it.x + it.w - 4}
            y2={y + 26}
            stroke={spine}
            strokeWidth={1.5}
          />
        </>
      )}

      {/* La tacca: compare solo sullo strato censito. E' l'unico ciano del
          disegno, ed e' minuscolo per trenta volte — sotto l'un per cento
          della superficie, ben dentro il tetto del brief. */}
      {indexed && (
        <rect
          x={it.x + it.w / 2 - 1}
          y={it.base - 4}
          width={2}
          height={3}
          fill="var(--color-accent)"
        />
      )}
    </g>
  );
}

function Unit({ indexed }: { indexed: boolean }) {
  return (
    <g>
      {ITEMS.map((it, i) => (
        <Piece key={i} it={it} indexed={indexed} />
      ))}
    </g>
  );
}

/* ==========================================================================
   IL RILIEVO

   Quello che compare dietro la lama non e' un'altra cosa: e' la stessa
   cosa, misurata. Linee di quota fuori dall'oggetto, linee di richiamo che
   scendono da ogni pezzo, una tacca per unita' sulla graduazione, e le due
   misure d'ingombro in mono.

   E' il primo lavoro che l'azienda fa su un archivio — la ricognizione — e
   il brief dice che e' la fase che gli altri saltano. E' anche la ragione
   per cui l'unita' di misura di questo mestiere e' il metro lineare.

   Le linee di richiamo sono il dettaglio che decide: senza, sono due righe
   con dei numeri; con, e' una tavola quotata.
   ========================================================================== */
function Survey() {
  return (
    <g
      fill="none"
      stroke="var(--color-mute)"
      strokeWidth={1}
      strokeLinecap="square"
    >
      {/* Graduazione sotto ogni ripiano, con una tacca per ogni pezzo che
          ci sta sopra: ogni unita' e' contata, non stimata. */}
      {SHELVES.map((y) => (
        <g key={y}>
          <line x1={LEFT - 12} y1={y + 9} x2={RIGHT + 12} y2={y + 9} strokeWidth={0.75} />
          {ITEMS.filter((it) => it.base === y).map((it, i) => (
            <line key={i} x1={it.x} y1={y + 5} x2={it.x} y2={y + 13} strokeWidth={0.75} />
          ))}
        </g>
      ))}

      {/* Quota verticale, a destra */}
      <line x1={DIM_X} y1={TOP} x2={DIM_X} y2={BOTTOM} />
      <line x1={DIM_X - 5} y1={TOP} x2={DIM_X + 5} y2={TOP} />
      <line x1={DIM_X - 5} y1={BOTTOM} x2={DIM_X + 5} y2={BOTTOM} />
      {/* Linee di richiamo: dall'oggetto alla quota, sottilissime */}
      <line
        x1={RIGHT + 12}
        y1={TOP}
        x2={DIM_X}
        y2={TOP}
        strokeWidth={0.5}
        stroke="var(--color-line)"
      />
      <line
        x1={RIGHT + 12}
        y1={BOTTOM}
        x2={DIM_X}
        y2={BOTTOM}
        strokeWidth={0.5}
        stroke="var(--color-line)"
      />

      {/* Quota orizzontale, in basso */}
      <line x1={LEFT - 12} y1={DIM_Y} x2={RIGHT + 12} y2={DIM_Y} />
      <line x1={LEFT - 12} y1={DIM_Y - 5} x2={LEFT - 12} y2={DIM_Y + 5} />
      <line x1={RIGHT + 12} y1={DIM_Y - 5} x2={RIGHT + 12} y2={DIM_Y + 5} />
      <line
        x1={LEFT - 12}
        y1={BOTTOM + 14}
        x2={LEFT - 12}
        y2={DIM_Y}
        strokeWidth={0.5}
        stroke="var(--color-line)"
      />
      <line
        x1={RIGHT + 12}
        y1={BOTTOM + 14}
        x2={RIGHT + 12}
        y2={DIM_Y}
        strokeWidth={0.5}
        stroke="var(--color-line)"
      />

      {/* Le due misure. Sono le dimensioni standard di una scaffalatura
          d'archivio: descrivono il disegno, non dichiarano niente
          sull'azienda. */}
      <text
        x={DIM_X + 14}
        y={(TOP + BOTTOM) / 2}
        transform={`rotate(-90 ${DIM_X + 14} ${(TOP + BOTTOM) / 2})`}
        textAnchor="middle"
        stroke="none"
        fill="var(--color-mute)"
        style={{ font: '13px var(--font-mono)', letterSpacing: "0.08em" }}
      >
        2,00 m
      </text>
      <text
        x={(LEFT + RIGHT) / 2}
        y={DIM_Y + 24}
        textAnchor="middle"
        stroke="none"
        fill="var(--color-mute)"
        style={{ font: '13px var(--font-mono)', letterSpacing: "0.08em" }}
      >
        2,40 m
      </text>
    </g>
  );
}

export function Stacks({ label }: { label: string }) {
  return (
    <div className="st-run relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        role="img"
        aria-label={label}
      >
        <defs>
          {/* Lo strato censito e' scoperto da un rettangolo che si allarga:
              e' la stessa lama che si vede passare. */}
          <clipPath id="st-reveal">
            <rect className="st-clip" x="0" y="0" width={W} height={H} />
          </clipPath>
        </defs>

        {/* Montanti e ripiani: la struttura, che non cambia mai */}
        <g stroke="var(--color-line)" strokeWidth={1.5} fill="none">
          <line x1={LEFT - 12} y1={TOP} x2={LEFT - 12} y2={BOTTOM + 14} />
          <line x1={RIGHT + 12} y1={TOP} x2={RIGHT + 12} y2={BOTTOM + 14} />
          {SHELVES.map((y) => (
            <line key={y} x1={LEFT - 12} y1={y} x2={RIGHT + 12} y2={y} />
          ))}
        </g>

        <Unit indexed={false} />
        <g clipPath="url(#st-reveal)">
          <Unit indexed />
          <Survey />
        </g>
      </svg>

      {/* La lama, fuori dall'SVG: cosi' e' alta quanto il riquadro senza
          dover essere ridisegnata a ogni proporzione. */}
      <span
        aria-hidden="true"
        className="st-blade pointer-events-none absolute inset-y-0 w-0.5 bg-accent"
      />
    </div>
  );
}
