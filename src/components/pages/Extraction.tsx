"use client";

import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   ESTRAZIONE DEL DATO — LO SCORRIMENTO E' IL COMANDO

   L'animazione piu' importante del sito. Un fascicolo edilizio sotto
   scansione: una linea lo percorre dall'alto verso il basso e, mano a mano
   che passa, i campi si accendono nel punto esatto in cui stanno sul foglio
   e compaiono nel record a destra con il loro indice di affidabilita'.

   IL FOGLIO ADESSO SI LEGGE. Per un giro qui c'era una pagina di righe
   grigie: la forma di un documento senza il documento. Non funzionava, e il
   motivo e' semplice — se sul foglio non c'e' scritto niente, l'estrazione
   non estrae niente, tira fuori un valore dal nulla e chiede di crederci.
   Adesso sul foglio c'e' un fascicolo vero da leggere, intestazione,
   etichette e valori; il record a fianco contiene esattamente quei valori.
   Si vede il prima e il dopo, che e' tutto il punto.

   E' un esempio dichiarato e non e' la pratica di nessuno: l'intestatario
   siamo noi e l'indirizzo e' la nostra sede.

   NON E' UN FILMATO, E' UN COMANDO. Prima partiva da sola a tempo, e chi
   arrivava dopo trovava tutto gia' fatto. Adesso e' lo scorrimento a
   deciderlo: un campo per volta, dal primo all'ultimo, avanti e indietro.
   Chi si ferma resta fermo, chi torna su torna indietro. E' lo stesso
   comando dell'iter di digitalizzazione, e sono due parenti stretti: giusto
   che si comportino allo stesso modo.

   E SI PUO' CHIEDERE DA DOVE VIENE. Toccando un campo del record, la sua
   zona sul foglio si accende e le altre si spengono. E' la domanda che fa
   chiunque debba fidarsi di un dato estratto in automatico — «da dove
   l'hai preso?» — e qui ha una risposta in un tocco invece che in una
   telefonata.

   IL TELEFONO E' STRUTTURATO DIVERSAMENTE, non rimpicciolito. Su schermo
   largo il documento sta a sinistra e il record a destra, uniti da linee di
   richiamo. Su un telefono quelle linee sarebbero cinque fili accavallati
   in trecento pixel: li' il documento sta sopra, fermo, e i campi si
   impilano sotto man mano che escono.

   STATO DI RIPOSO — senza JavaScript: i campi ci sono tutti, la pista di
   scorrimento non esiste e la linea non c'e'. Chi non vede l'animazione
   vede il risultato, che e' l'informazione.
   ========================================================================== */

type Field = { label: string; docLabel: string; value: string; score: number };

type Labels = {
  document: string;
  table: string;
  replay: string;
  locate: string;
  located: string;
};

/* --- Il foglio -----------------------------------------------------------
   Un fascicolo edilizio in alzato. Le misure sono in unita' del disegno,
   non in pixel: l'SVG si adatta e le proporzioni restano. */
const PAGE = { x: 8, y: 16, w: 340, h: 508 };
const MARGIN = 18;
const TEXT_X = PAGE.x + MARGIN;
const TEXT_W = PAGE.w - MARGIN * 2;

/* Le zone da cui vengono i campi: cinque blocchi distribuiti sul foglio.
   La geolocalizzazione del dato sulla pagina non e' un vezzo — e' la prova
   che il valore e' verificabile sull'originale. */
const BLOCK_H = 40;
const BLOCK_TOP = [72, 158, 244, 330, 424];
const zone = (i: number) => ({ y: BLOCK_TOP[i], h: BLOCK_H });

/* Righe di riempimento fra un blocco e l'altro: un documento vero ha anche
   testo che non interessa a nessuno, ed e' quello che rende credibile il
   poco che interessa. Generate una volta, in modo deterministico: stessa
   pagina sul server e nel browser. */
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const FILLER = (() => {
  const r = rng(41062);
  const out: { x: number; y: number; w: number }[] = [];
  for (let i = 0; i < BLOCK_TOP.length - 1; i++) {
    const from = BLOCK_TOP[i] + BLOCK_H + 12;
    const to = BLOCK_TOP[i + 1] - 12;
    for (let y = from; y < to; y += 13) {
      out.push({ x: TEXT_X, y, w: TEXT_W * (0.55 + r() * 0.42) });
    }
  }
  /* E qualche riga anche in coda all'ultimo blocco. */
  for (let y = BLOCK_TOP[4] + BLOCK_H + 12; y < PAGE.y + PAGE.h - 22; y += 13) {
    out.push({ x: TEXT_X, y, w: TEXT_W * (0.5 + r() * 0.45) });
  }
  return out;
})();

/* Righe del record, a destra. */
const ROW_TOP = 30;
const COL = { x: 596, w: 414 };

export function Extraction({
  fields,
  labels,
  docHead,
  note,
}: {
  fields: readonly Field[];
  labels: Labels;
  docHead: string;
  note: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const ROW_GAP = 470 / fields.length;

  /* Si parte con tutto acceso: e' lo stato corretto per chi non ha
     JavaScript, ed e' quello che finisce nell'HTML. Appena il browser
     prende in mano la pagina si azzera e comincia a seguire lo
     scorrimento. */
  const [revealed, setRevealed] = useState(fields.length);
  const [p, setP] = useState(1);

  /* Il campo di cui si e' chiesto «da dove viene». Null = nessuno, e allora
     acceso resta l'ultimo uscito, come prima. */
  const [picked, setPicked] = useState<number | null>(null);

  /* Schermo basso: si parte da falso, che e' quello che finisce nell'HTML,
     e si corregge appena il browser puo' misurare. Il riquadro sta a meta'
     pagina, quindi il ritocco non e' mai nella prima schermata e non
     produce salti visibili. */
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-height: 720px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

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

  /* Un campo che non e' ancora uscito non si puo' interrogare. E toccare
     due volte lo stesso campo lo deseleziona: se l'unico modo di tornare
     indietro fosse ricaricare, si smette di provare. */
  const pick = (i: number) => {
    if (i >= revealed) return;
    setPicked((cur) => (cur === i ? null : i));
  };

  /* Quale zona e' accesa sul foglio: quella scelta, altrimenti l'ultima
     uscita. */
  const active = picked !== null && picked < revealed ? picked : revealed - 1;

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

  const shared = { fields, labels, docHead, revealed, p, active, picked, pick, compact };

  return (
    <div ref={trackRef} className="ex-track relative" style={{ ["--ex-n" as string]: fields.length }}>
      <div
        className={
          "sticky top-16 flex min-h-[calc(100dvh-4rem)] flex-col justify-center md:top-20 md:min-h-[calc(100dvh-5rem)] md:py-8 " +
          (compact ? "py-2" : "py-6")
        }
      >
        <Wide {...shared} rowGap={ROW_GAP} />
        <Tall {...shared} />

        {/* I trattini: dicono a che punto si e' e portano a un campo
            qualsiasi, avanti o indietro. */}
        <div className={(compact ? "mt-3" : "mt-6") + " flex items-center gap-4"}>
          <div className="flex flex-1 gap-2">
            {fields.map((f, i) => (
              <button
                key={f.label}
                type="button"
                onClick={() => goTo(i)}
                /* Il trattino e' alto un pixel; l'area che lo raccoglie
                   dev'essere alta 44, altrimenti da telefono si manca. */
                className="group flex min-h-11 flex-1 items-center"
              >
                <span className="sr-only">{f.label}</span>
                <span
                  aria-hidden="true"
                  className={
                    "ex-fade block h-px w-full transition-colors duration-300 " +
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

        <p className="mt-2 flex flex-wrap justify-between gap-x-6 gap-y-1 border-t border-line pt-2 text-small text-label">
          <span className="measure">{note}</span>
          <span aria-live="polite">
            {picked !== null && picked < revealed ? labels.located : labels.locate}
          </span>
        </p>
      </div>
    </div>
  );
}

/* --- Il foglio disegnato, condiviso fra le due impaginazioni ------------- */

function Sheet({
  fields,
  docHead,
  revealed,
  active,
  p,
}: {
  fields: readonly Field[];
  docHead: string;
  revealed: number;
  active: number;
  p: number;
}) {
  const scanY = PAGE.y + p * PAGE.h;

  return (
    <>
      <rect
        x={PAGE.x}
        y={PAGE.y}
        width={PAGE.w}
        height={PAGE.h}
        fill="var(--color-surface-1)"
        stroke="var(--color-line)"
        strokeWidth={1}
      />

      {/* Intestazione dell'ente e filo di separazione */}
      <text x={TEXT_X} y={PAGE.y + 30} className="ex-doc-head">
        {docHead}
      </text>
      <line
        x1={TEXT_X}
        y1={PAGE.y + 40}
        x2={TEXT_X + TEXT_W}
        y2={PAGE.y + 40}
        stroke="var(--color-line)"
        strokeWidth={1}
      />

      {/* Il testo che non interessa: e' quello che rende credibile il resto */}
      <g stroke="var(--color-line)" strokeWidth={3} strokeLinecap="butt" opacity={0.6}>
        {FILLER.map((l, i) => (
          <line key={i} x1={l.x} y1={l.y} x2={l.x + l.w} y2={l.y} />
        ))}
      </g>

      {/* I cinque blocchi stampati: etichetta e valore, come su un modulo */}
      {fields.map((f, i) => {
        const z = zone(i);
        const on = i < revealed;
        return (
          <g key={f.label} className="ex-fade" opacity={on ? 1 : 0.28} style={FADE}>
            <text x={TEXT_X} y={z.y + 11} className="ex-doc-key">
              {f.docLabel}
            </text>
            <text x={TEXT_X} y={z.y + 30} className="ex-doc-val">
              {f.value}
            </text>
          </g>
        );
      })}

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

      {/* I riquadri di provenienza. Quello acceso e' pieno di un velo
          ciano; gli altri gia' usciti restano segnati appena, perche' si
          continui a vedere quanti pezzi sono stati presi. */}
      {fields.map((f, i) => {
        const z = zone(i);
        const on = i < revealed;
        const isActive = i === active;
        return (
          <rect
            key={f.label}
            className="ex-fade"
            x={PAGE.x + 10}
            y={z.y - 4}
            width={PAGE.w - 20}
            height={z.h}
            fill={isActive ? "rgb(0 194 209 / 0.12)" : "none"}
            stroke="var(--color-accent)"
            strokeWidth={isActive ? 1.5 : 1}
            opacity={on ? (isActive ? 1 : 0.32) : 0}
            style={FADE}
          />
        );
      })}
    </>
  );
}

const FADE: React.CSSProperties = { transition: "opacity 320ms ease-out" };

/* --- Schermo largo: documento a sinistra, record a destra ---------------- */

function Wide({
  fields,
  labels,
  docHead,
  revealed,
  p,
  active,
  picked,
  pick,
  rowGap,
}: {
  fields: readonly Field[];
  labels: Labels;
  docHead: string;
  revealed: number;
  p: number;
  active: number;
  picked: number | null;
  pick: (i: number) => void;
  rowGap: number;
}) {
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

      <Sheet fields={fields} docHead={docHead} revealed={revealed} active={active} p={p} />

      {fields.map((f, i) => {
        const on = i < revealed;
        const z = zone(i);
        const rowY = ROW_TOP + i * rowGap;
        const midX = 456 + i * 22;
        const isActive = i === active;

        return (
          <g
            key={f.label}
            className="ex-fade"
            opacity={on ? 1 : 0}
            style={{ ...FADE, cursor: on ? "pointer" : "default" }}
            onClick={() => pick(i)}
          >
            {/* Il richiamo: dal foglio alla riga del record. Quello del
                campo interrogato e' pieno, gli altri restano tenui. */}
            <path
              d={`M${PAGE.x + PAGE.w - 10},${z.y + z.h / 2 - 4} H${midX} V${rowY + 26} H${COL.x}`}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={isActive ? 1.5 : 1}
              opacity={isActive ? 0.95 : 0.4}
              className="ex-fade"
              style={FADE}
            />

            {/* Zona sensibile della riga: un rettangolo trasparente, perche'
                il testo da solo e' un bersaglio troppo sottile da colpire. */}
            <rect
              x={COL.x - 10}
              y={rowY - 12}
              width={COL.w + 20}
              height={rowGap - 8}
              fill={picked === i ? "rgb(255 255 255 / 0.03)" : "transparent"}
            />

            <line
              x1={COL.x}
              y1={rowY}
              x2={COL.x + COL.w}
              y2={rowY}
              stroke={isActive ? "var(--color-accent)" : "var(--color-line)"}
              strokeWidth={1}
            />
            <text x={COL.x} y={rowY + 18} className="ex-key">
              {f.label.toUpperCase()}
            </text>
            <text x={COL.x} y={rowY + 44} className="ex-val">
              {f.value}
            </text>
            <text x={COL.x + COL.w} y={rowY + 44} className="ex-score" textAnchor="end">
              {f.score}%
            </text>
            {/* L'indice di affidabilita', lungo quanto il valore che dichiara */}
            <line
              x1={COL.x}
              y1={rowY + 56}
              x2={COL.x + COL.w}
              y2={rowY + 56}
              stroke="var(--color-line)"
              strokeWidth={2}
            />
            <line
              x1={COL.x}
              y1={rowY + 56}
              x2={COL.x + (COL.w * f.score) / 100}
              y2={rowY + 56}
              stroke="var(--color-accent)"
              strokeWidth={2}
            />
          </g>
        );
      })}
    </svg>
  );
}

/* --- Telefono: una finestra sul foglio, e sotto il record ----------------

   Niente linee di richiamo: a trecento pixel sarebbero cinque fili
   accavallati.

   E niente foglio intero. Il foglio intero, alla larghezza di un telefono,
   e' alto quattrocentocinquanta pixel; sotto ci vanno cinque righe di
   record, i trattini e la nota, e il totale supera lo schermo. Il riquadro
   pero' e' incollato — quello che sfora non si raggiunge scorrendo, resta
   fuori e basta. Su un telefono da 360 il record finiva sotto il bordo.

   Quindi qui il foglio si guarda da vicino: una finestra che inquadra il
   campo in lettura e scorre insieme a lui, come farebbe chi passa il dito
   sulla pagina cercando la riga. Il testo resta grande, e a destra una
   barretta dice a che altezza del foglio siamo — cosi' non si perde il
   senso della pagina intera.
   ========================================================================== */

/* DUE ALTEZZE, PERCHE' I TELEFONI NON SONO TUTTI ALTI UGUALE.

   Il riquadro e' incollato: quello che non ci sta nello schermo non si
   raggiunge scorrendo, resta fuori. Su un telefono da 844 punti il
   pannello avanza spazio; su un iPhone SE (667) e sugli Android piccoli
   (640) sfora di un centinaio di pixel, e sotto il bordo finivano proprio
   gli ultimi campi del record.

   Invece di stringere tutto per tutti — che avrebbe peggiorato il telefono
   normale per salvare quello piccolo — sotto i 720 punti di altezza il
   pannello passa alla versione compatta: finestra sul foglio piu' bassa,
   righe piu' strette, e la barretta dell'affidabilita' che sparisce
   lasciando la percentuale in cifre, che e' il dato vero. */
const WIN_FULL = 128;
const WIN_COMPACT = 92;

function windowTop(active: number, win: number) {
  const i = Math.max(active, 0);
  const wanted = BLOCK_TOP[i] - (win === WIN_FULL ? 55 : 38);
  return Math.max(PAGE.y, Math.min(PAGE.y + PAGE.h - win, wanted));
}

function Tall({
  fields,
  labels,
  docHead,
  revealed,
  p,
  active,
  picked,
  pick,
  compact,
}: {
  fields: readonly Field[];
  labels: Labels;
  docHead: string;
  revealed: number;
  p: number;
  active: number;
  picked: number | null;
  pick: (i: number) => void;
  compact: boolean;
}) {
  const win = compact ? WIN_COMPACT : WIN_FULL;
  const top = windowTop(active, win);

  return (
    <div className="md:hidden">
      <span className="eyebrow">{labels.document}</span>

      <div className={(compact ? "mt-2" : "mt-3") + " flex items-stretch gap-2"}>
        <div className="min-w-0 flex-1 border border-line">
          <svg
            viewBox={`0 ${top} ${PAGE.w + 16} ${win}`}
            className="block h-auto w-full"
            aria-hidden="true"
          >
            <Sheet fields={fields} docHead={docHead} revealed={revealed} active={active} p={p} />
          </svg>
        </div>

        {/* Dove siamo nel foglio: la traccia e' l'altezza della pagina, il
            segno e' la porzione inquadrata. */}
        <span aria-hidden="true" className="relative w-px shrink-0 bg-line">
          <span
            className="ex-fade absolute inset-x-0 bg-accent transition-[top] duration-300"
            style={{
              top: `${((top - PAGE.y) / PAGE.h) * 100}%`,
              height: `${(win / PAGE.h) * 100}%`,
            }}
          />
        </span>
      </div>

      <span className={(compact ? "mt-3" : "mt-6") + " eyebrow block"}>{labels.table}</span>
      <ul className="m-0 mt-3 flex list-none flex-col p-0">
        {fields.map((f, i) => {
          const on = i < revealed;
          return (
            <li key={f.label}>
              {/* Un bottone e non un `dl`: la riga si tocca per chiedere da
                  dove viene il valore, quindi dev'essere un comando anche
                  per chi naviga da tastiera o con un lettore di schermo. */}
              <button
                type="button"
                onClick={() => pick(i)}
                disabled={!on}
                aria-pressed={picked === i}
                /* Il nome del comando va dichiarato qui e non lasciato al
                   contenuto: finche' il campo non e' uscito il suo testo e'
                   `visibility: hidden`, quindi per un lettore di schermo il
                   bottone non ha nome. Con l'etichetta esplicita ce l'ha
                   sempre, e resta il nome del campo — non il valore, che a
                   quel punto non e' ancora stato estratto. */
                aria-label={f.label}
                className={
                  "flex w-full flex-col border-t border-line px-1 text-left transition-colors " +
                  (compact ? "pt-1.5 pb-2 " : "pt-2 pb-3 ") +
                  (picked === i ? "bg-surface-1" : "")
                }
              >
                {/* Il campo non ancora uscito tiene il suo posto — la riga
                    non deve saltare — ma il testo sparisce con
                    `visibility`, non con l'opacita'.

                    Non e' un dettaglio: del testo a opacita' 0,12 resta
                    testo, e un controllo di accessibilita' lo legge come
                    scritta grigio scurissimo su fondo nero, contrasto 1,09
                    su 4,5 richiesto. Con `visibility: hidden` il testo esce
                    anche dall'albero di accessibilita': non e' piu'
                    illeggibile, semplicemente non c'e' ancora. */}
                <span className="eyebrow" style={{ visibility: on ? "visible" : "hidden" }}>
                  {f.label}
                </span>
                <span
                  className="mt-1 flex w-full items-baseline justify-between gap-4"
                  style={{ visibility: on ? "visible" : "hidden" }}
                >
                  <span
                    className={
                      "font-mono text-data " + (i === active ? "text-accent" : "text-max")
                    }
                  >
                    {f.value}
                  </span>
                  <span className="font-mono text-data text-label tabular">{f.score}%</span>
                </span>
                {/* Su schermo basso la barretta se ne va: dice la stessa
                    cosa della percentuale scritta accanto al valore, e qui
                    ogni pixel serve a far entrare tutte e cinque le righe. */}
                {!compact && (
                  <span aria-hidden="true" className="mt-2 block h-0.5 w-full bg-line">
                    <span
                      className="ex-fade block h-full bg-accent transition-[width] duration-500"
                      style={{ width: on ? `${f.score}%` : "0%" }}
                    />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
