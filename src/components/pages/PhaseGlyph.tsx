/* ==========================================================================
   I SEI DISEGNI DELLE FASI

   Un disegno per fase, nello stesso linguaggio del sito attuale — schemi a
   linea sottile su fondo scuro, come una tavola tecnica — ma nella palette
   nuova: grigi, e un solo elemento in cyan per disegno, quello che nella
   fase e' vivo.

   Sono tutti su un riquadro 200x200 e vanno letti anche a 96px, quindi
   niente dettagli sotto i 2 punti di spessore.
   ========================================================================== */

const S = {
  fill: "none",
  stroke: "var(--color-mute)",
  strokeWidth: 1.25,
} as const;

const ACCENT = {
  fill: "none",
  stroke: "var(--color-accent)",
  strokeWidth: 1.5,
} as const;

export function PhaseGlyph({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 200 200" className="block h-full w-full" aria-hidden="true">
      {index === 0 && <Survey />}
      {index === 1 && <Ordering />}
      {index === 2 && <Capture />}
      {index === 3 && <Extraction />}
      {index === 4 && <Preservation />}
      {index === 5 && <Publication />}
    </svg>
  );
}

/* 01 — Ricognizione: scaffalature misurate in metri lineari */
function Survey() {
  return (
    <>
      <g {...S}>
        {[0, 1, 2].map((i) => {
          const x = 28 + i * 50;
          return (
            <g key={i}>
              <rect x={x} y={44} width={38} height={92} />
              {[1, 2, 3].map((r) => (
                <line key={r} x1={x} y1={44 + r * 23} x2={x + 38} y2={44 + r * 23} />
              ))}
            </g>
          );
        })}
      </g>
      {/* La misura: e' il gesto della fase */}
      <g {...ACCENT}>
        <line x1={28} y1={156} x2={166} y2={156} />
        <line x1={28} y1={150} x2={28} y2={162} />
        <line x1={166} y1={150} x2={166} y2={162} />
      </g>
      <g {...S} strokeWidth={1}>
        {Array.from({ length: 15 }).map((_, i) => (
          <line key={i} x1={28 + i * 10} y1={166} x2={28 + i * 10} y2={i % 5 === 0 ? 174 : 170} />
        ))}
      </g>
    </>
  );
}

/* 02 — Riordino: serie e fascicoli, con la scheda in lavorazione */
function Ordering() {
  const cells: [number, number][] = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) cells.push([r, c]);
  return (
    <>
      {cells.map(([r, c]) => {
        const x = 24 + c * 32;
        const y = 44 + r * 40;
        const live = r === 1 && c === 2;
        return (
          <g key={`${r}${c}`} {...(live ? ACCENT : S)}>
            <rect x={x} y={y + 6} width={24} height={28} />
            <line x1={x + 5} y1={y + 6} x2={x + 5} y2={y} />
            <line x1={x + 5} y1={y} x2={x + 17} y2={y} />
            <line x1={x + 17} y1={y} x2={x + 17} y2={y + 6} />
          </g>
        );
      })}
      <g {...S} strokeWidth={1} strokeDasharray="2 4">
        {[0, 1, 2].map((r) => (
          <line key={r} x1={16} y1={44 + r * 40 + 40} x2={184} y2={44 + r * 40 + 40} />
        ))}
      </g>
    </>
  );
}

/* 03 — Ripresa: scanner planetario, cono di luce, target colorimetrico */
function Capture() {
  return (
    <>
      <g {...S}>
        <line x1={100} y1={170} x2={100} y2={92} />
        <line x1={72} y1={170} x2={128} y2={170} />
        <path d="M 100 92 Q 100 62 128 62" />
        <rect x={118} y={50} width={26} height={18} />
        <path d="M 44 138 L 100 124 L 156 138" />
        <path d="M 50 146 L 100 133 L 150 146" />
      </g>
      {/* Il cono di luce fredda */}
      <g {...ACCENT} strokeDasharray="4 4">
        <path d="M 122 70 L 158 130 L 86 130 Z" />
      </g>
      <g {...S} strokeWidth={1}>
        <rect x={160} y={126} width={10} height={24} />
        <line x1={160} y1={134} x2={170} y2={134} />
        <line x1={160} y1={142} x2={170} y2={142} />
      </g>
    </>
  );
}

/* 04 — Estrazione: campi riconosciuti, con il loro indice di affidabilita' */
function Extraction() {
  return (
    <>
      <g {...S}>
        <rect x={26} y={30} width={80} height={140} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <line key={i} x1={36} y1={46 + i * 16} x2={i % 3 === 0 ? 84 : 96} y2={46 + i * 16} />
        ))}
      </g>
      <g {...ACCENT}>
        {[0, 1, 2].map((i) => (
          <rect key={i} x={32} y={40 + i * 48} width={68} height={16} />
        ))}
      </g>
      {/* I valori estratti, con la barra di affidabilita' */}
      <g>
        {[0, 1, 2].map((i) => {
          const y = 48 + i * 48;
          return (
            <g key={i}>
              <path
                d={`M 100 ${y} H 116 V ${y} H 128`}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={1}
              />
              <rect x={128} y={y - 10} width={46} height={2} fill="var(--color-strong)" />
              <rect x={128} y={y + 4} width={46} height={2} fill="var(--color-line)" />
              <rect
                x={128}
                y={y + 4}
                width={46 * [0.99, 0.94, 0.87][i]}
                height={2}
                fill="var(--color-accent)"
              />
            </g>
          );
        })}
      </g>
    </>
  );
}

/* 05 — Conservazione: pacchetto di versamento, sigillo, marca temporale */
function Preservation() {
  return (
    <>
      <g {...S}>
        <rect x={40} y={54} width={92} height={110} />
        <rect x={48} y={44} width={92} height={110} />
        <rect x={56} y={34} width={92} height={110} />
        <line x1={70} y1={62} x2={134} y2={62} />
        <line x1={70} y1={76} x2={120} y2={76} />
        <line x1={70} y1={90} x2={134} y2={90} />
      </g>
      {/* Il sigillo elettronico qualificato */}
      <g {...ACCENT}>
        <circle cx={132} cy={128} r={22} />
        <path d="M 122 128 L 129 135 L 143 121" />
      </g>
      <g {...S} strokeWidth={1}>
        <line x1={56} y1={172} x2={148} y2={172} />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1={56 + i * 23} y1={172} x2={56 + i * 23} y2={178} />
        ))}
      </g>
    </>
  );
}

/* 06 — Pubblicazione: ricerca, risultati, collocazione sulla mappa */
function Publication() {
  return (
    <>
      <g {...S}>
        <rect x={26} y={38} width={148} height={24} />
        <circle cx={44} cy={50} r={6} />
        <line x1={48} y1={54} x2={53} y2={59} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={26} y={76 + i * 30} width={148} height={22} />
            <line x1={38} y1={87 + i * 30} x2={110} y2={87 + i * 30} />
          </g>
        ))}
      </g>
      {/* Il risultato collocato sul terreno */}
      <g {...ACCENT}>
        <rect x={26} y={106} width={148} height={22} />
        <path d="M 152 160 C 140 148, 140 138, 152 138 C 164 138, 164 148, 152 160 Z" />
        <circle cx={152} cy={145} r={3} />
      </g>
      <g {...S} strokeWidth={1} strokeDasharray="3 4">
        <line x1={26} y1={168} x2={174} y2={168} />
      </g>
    </>
  );
}
