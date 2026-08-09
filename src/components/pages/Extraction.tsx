"use client";

import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   ESTRAZIONE DEL DATO — LO SCORRIMENTO E' IL COMANDO

   L'animazione piu' importante del sito. Una pagina di documento sotto
   scansione: una linea la percorre dall'alto verso il basso e, mano a mano
   che passa, i campi si accendono nel punto esatto in cui stanno sul foglio
   e compaiono nel record a destra con il loro indice di affidabilita'.

   NON E' UN FILMATO, E' UN COMANDO. Prima partiva da sola a tempo, e chi
   arrivava dopo trovava tutto gia' fatto. Adesso e' lo scorrimento a
   deciderlo: un campo per volta, dal primo all'ultimo, avanti e indietro.
   Chi si ferma resta fermo, chi torna su torna indietro. E' lo stesso
   comando dell'iter di digitalizzazione, e sono due parenti stretti: giusto
   che si comportino allo stesso modo.

   IL TELEFONO E' STRUTTURATO DIVERSAMENTE, non rimpicciolito. Su schermo
   largo il documento sta a sinistra e il record a destra, uniti da linee di
   richiamo. Su un telefono quelle linee sarebbero quattro fili accavallati
   in trecento pixel: li' il documento sta sopra, fermo, e i campi si
   impilano sotto man mano che escono. La cosa da capire e' la stessa; il
   modo di mostrarla no.

   STATO DI RIPOSO — senza JavaScript e con meno animazioni: i campi ci sono
   tutti, la pista di scorrimento non esiste e la linea non c'e'. Chi non
   vede l'animazione vede il risultato, che e' l'informazione.
   ========================================================================== */

type Field = { label: string; value: string; score: number };

/* --- La pagina di origine ------------------------------------------------
   Righe irregolari come una scrittura reale, generate una volta sola in modo
   deterministico: stessa pagina sul server e nel browser. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const PAGE = { x: 8, y: 16, w: 340, h: 508 };

/* Le quattro zone da cui vengono i campi: sono posizioni sul foglio, e la
   linea di richiamo parte da li'. La geolocalizzazione del dato sulla
   pagina non e' un vezzo — e' la prova che il valore e' verificabile
   sull'originale. */
const ZONES = [
  { y: 96, h: 30 },
  { y: 208, h: 30 },
  { y: 300, h: 30 },
  { y: 408, h: 30 },
];

const LINES = (() => {
  const r = rng(90210);
  const out: { x: number; y: number; w: number }[] = [];
  let y = PAGE.y + 34;
  while (y < PAGE.y + PAGE.h - 26) {
    const inZone = ZONES.some((z) => y >= z.y - 4 && y <= z.y + z.h);
    out.push({
      x: PAGE.x + 22 + Math.round(r() * 8),
      y,
      w: Math.round((PAGE.w - 58) * (inZone ? 0.72 + r() * 0.2 : 0.46 + r() * 0.46)),
    });
    y += 19;
  }
  return out;
})();

/* Righe del record, a destra. */
const ROW_TOP = 40;
const ROW_GAP = 118;
const COL = { x: 596, w: 414 };

export function Extraction({
  fields,
  labels,
  note,
}: {
  fields: readonly Field[];
  labels: { document: string; table: string; replay: string };
  note: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  /* Si parte con tutto acceso: e' lo stato corretto per chi non ha
     JavaScript, ed e' quello che finisce nell'HTML. Appena il browser
     prende in mano la pagina, e solo se la pista e' ancora sotto la piega,
     si azzera e comincia a seguire lo scorrimento. */
  const [revealed, setRevealed] = useState(fields.length);
  const [p, setP] = useState(1);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const prog = span > 0 ? Math.max(0, Math.min(1, -r.top / span)) : 1;
      setP(prog);
      /* Un passo in piu' dei campi: l'ultimo resta fermo un momento prima
         che la sezione se ne vada. */
      setRevealed(Math.min(fields.length, Math.floor(prog * (fields.length + 1) * 0.999)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [fields.length]);

  /* Il trattino porta al punto di scorrimento in cui il suo campo e'
     l'ultimo uscito.

     Il conto va fatto sulla stessa formula che legge lo scorrimento,
     altrimenti si sbaglia di uno: `revealed` e' floor(p * (n+1)), quindi
     per avere revealed = i+1 serve un avanzamento appena oltre
     (i+1)/(n+1). Il quattro decimi in piu' e' il margine che tiene il
     trattino al centro della sua porzione invece che sul bordo. */
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    if (span <= 0) return;
    const target = (i + 1.4) / (fields.length + 1);
    window.scrollTo({ top: el.offsetTop + span * target, behavior: "smooth" });
  };

  return (
    <>
      {/* La pista. L'altezza vale solo con JavaScript attivo: senza, sarebbe
          uno scorrimento a vuoto lungo quattro schermate. */}
      <div ref={trackRef} className="ex-track relative" style={{ ["--ex-n" as string]: fields.length }}>
        <div className="sticky top-16 flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-8 md:top-20 md:min-h-[calc(100dvh-5rem)]">
          <Wide fields={fields} labels={labels} revealed={revealed} p={p} />
          <Tall fields={fields} labels={labels} revealed={revealed} p={p} />

          {/* I trattini: dicono a che punto si e' e portano a un campo
              qualsiasi, avanti o indietro. */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex flex-1 gap-2">
              {fields.map((f, i) => (
                <button
                  key={f.label}
                  type="button"
                  onClick={() => goTo(i)}
                  className="group flex-1 py-3"
                >
                  <span className="sr-only">{f.label}</span>
                  <span
                    aria-hidden="true"
                    className={
                      "block h-px transition-colors duration-300 " +
                      (i === revealed - 1
                        ? "bg-accent"
                        : i < revealed
                          ? "bg-strong"
                          : "bg-line group-hover:bg-mute")
                    }
                  />
                </button>
              ))}
            </div>
            <span className="eyebrow tabular shrink-0">
              {String(Math.max(revealed, 0)).padStart(2, "0")} /{" "}
              {String(fields.length).padStart(2, "0")}
            </span>
          </div>

          <p className="mt-4 border-t border-line pt-3 text-small text-mute">{note}</p>
        </div>
      </div>
    </>
  );
}

/* --- Schermo largo: documento a sinistra, record a destra ---------------- */

function Wide({
  fields,
  labels,
  revealed,
  p,
}: {
  fields: readonly Field[];
  labels: { document: string; table: string };
  revealed: number;
  p: number;
}) {
  const scanY = PAGE.y + p * PAGE.h;

  return (
    <svg
      viewBox="0 0 1020 560"
      className="hidden h-auto w-full md:block"
      role="img"
      aria-label={`${labels.document} → ${labels.table}`}
    >
      <text x={PAGE.x} y={8} className="ex-cap">
        {labels.document.toUpperCase()}
      </text>
      <text x={COL.x} y={8} className="ex-cap">
        {labels.table.toUpperCase()}
      </text>

      {/* Il foglio */}
      <rect
        x={PAGE.x}
        y={PAGE.y}
        width={PAGE.w}
        height={PAGE.h}
        fill="var(--color-surface-1)"
        stroke="var(--color-line)"
        strokeWidth={1}
      />
      <g stroke="var(--color-line)" strokeWidth={3} strokeLinecap="butt">
        {LINES.map((l, i) => (
          <line key={i} x1={l.x} y1={l.y} x2={l.x + l.w} y2={l.y} />
        ))}
      </g>

      {/* La linea di scansione: continua, segue lo scorrimento senza scatti */}
      {p > 0.001 && p < 0.999 && (
        <line
          x1={PAGE.x}
          y1={scanY}
          x2={PAGE.x + PAGE.w}
          y2={scanY}
          stroke="var(--color-accent)"
          strokeWidth={1.5}
        />
      )}

      {fields.map((f, i) => {
        const on = i < revealed;
        const z = ZONES[i];
        const rowY = ROW_TOP + i * ROW_GAP;
        const midX = 470 + i * 26;

        return (
          <g key={f.label} opacity={on ? 1 : 0} style={{ transition: "opacity 320ms ease-out" }}>
            {/* Il riquadro sul foglio: da qui viene il valore */}
            <rect
              x={PAGE.x + 12}
              y={z.y}
              width={PAGE.w - 24}
              height={z.h}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={1.25}
            />

            {/* Il richiamo: dal foglio alla riga del record */}
            <path
              d={`M${PAGE.x + PAGE.w - 12},${z.y + z.h / 2} H${midX} V${rowY + 30} H${COL.x}`}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={1}
              opacity={0.75}
            />

            {/* La riga del record */}
            <line
              x1={COL.x}
              y1={rowY}
              x2={COL.x + COL.w}
              y2={rowY}
              stroke="var(--color-line)"
              strokeWidth={1}
            />
            <text x={COL.x} y={rowY + 20} className="ex-key">
              {f.label.toUpperCase()}
            </text>
            <text x={COL.x} y={rowY + 48} className="ex-val">
              {f.value}
            </text>
            <text x={COL.x + COL.w} y={rowY + 48} className="ex-score" textAnchor="end">
              {f.score}%
            </text>
            {/* L'indice di affidabilita', lungo quanto il valore che dichiara */}
            <line
              x1={COL.x}
              y1={rowY + 62}
              x2={COL.x + COL.w}
              y2={rowY + 62}
              stroke="var(--color-line)"
              strokeWidth={2}
            />
            <line
              x1={COL.x}
              y1={rowY + 62}
              x2={COL.x + (COL.w * f.score) / 100}
              y2={rowY + 62}
              stroke="var(--color-accent)"
              strokeWidth={2}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* --- Telefono: il documento sopra, i campi che si impilano sotto ---------
   Niente linee di richiamo: a trecento pixel sarebbero quattro fili
   accavallati. Il legame fra campo e posizione lo tiene il riquadro acceso
   sul foglio, che e' sempre quello dell'ultimo campo uscito. */

function Tall({
  fields,
  labels,
  revealed,
  p,
}: {
  fields: readonly Field[];
  labels: { document: string; table: string };
  revealed: number;
  p: number;
}) {
  const scanY = PAGE.y + p * PAGE.h;

  return (
    <div className="md:hidden">
      <span className="eyebrow">{labels.document}</span>
      <svg
        viewBox={`0 0 ${PAGE.w + 16} ${PAGE.h + 32}`}
        className="mt-3 block h-auto w-full"
        aria-hidden="true"
      >
        <rect
          x={PAGE.x}
          y={PAGE.y}
          width={PAGE.w}
          height={PAGE.h}
          fill="var(--color-surface-1)"
          stroke="var(--color-line)"
          strokeWidth={1}
        />
        <g stroke="var(--color-line)" strokeWidth={3}>
          {LINES.map((l, i) => (
            <line key={i} x1={l.x} y1={l.y} x2={l.x + l.w} y2={l.y} />
          ))}
        </g>

        {p > 0.001 && p < 0.999 && (
          <line
            x1={PAGE.x}
            y1={scanY}
            x2={PAGE.x + PAGE.w}
            y2={scanY}
            stroke="var(--color-accent)"
            strokeWidth={1.5}
          />
        )}

        {fields.map((f, i) => (
          <rect
            key={f.label}
            x={PAGE.x + 12}
            y={ZONES[i].y}
            width={PAGE.w - 24}
            height={ZONES[i].h}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={1.25}
            opacity={i < revealed ? (i === revealed - 1 ? 1 : 0.45) : 0}
            style={{ transition: "opacity 320ms ease-out" }}
          />
        ))}
      </svg>

      <span className="eyebrow mt-8 block">{labels.table}</span>
      <dl className="mt-3 flex flex-col">
        {fields.map((f, i) => (
          <div
            key={f.label}
            className="border-t border-line pt-3 pb-4"
            style={{
              opacity: i < revealed ? 1 : 0.12,
              transition: "opacity 320ms ease-out",
            }}
          >
            <dt className="eyebrow">{f.label}</dt>
            <dd className="mt-1 flex items-baseline justify-between gap-4">
              <span className="font-mono text-data text-max">{f.value}</span>
              <span className="font-mono text-data text-mute tabular">{f.score}%</span>
            </dd>
            <span
              aria-hidden="true"
              className="mt-2 block h-0.5 bg-line"
            >
              <span
                className="block h-full bg-accent transition-[width] duration-500"
                style={{ width: i < revealed ? `${f.score}%` : "0%" }}
              />
            </span>
          </div>
        ))}
      </dl>
    </div>
  );
}
