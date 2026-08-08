"use client";

import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   LA CONVERSIONE: CARTA → RECORD

   E' il piede della scheda di testata, e l'unico momento orchestrato forte
   del sito. Non illustra un concetto: mostra la cosa che l'azienda fa
   davvero, con i nomi dei campi che escono davvero da una pratica edilizia.

   COME FUNZIONA. A sinistra una pagina: righe di testo, che sono barre
   grigie perche' una pagina vista da lontano e' questo. A destra gli stessi
   contenuti diventati campi con un nome. Una riga ciano attraversa la
   scheda da sinistra a destra, e dietro di lei i campi compaiono uno dopo
   l'altro, nell'ordine in cui li raggiunge.

   PERCHE' NON E' DECORAZIONE. La riga si muove alla velocita' a cui
   compaiono i campi: chi guarda capisce che il movimento *causa* il
   risultato, non che lo accompagna. Se i campi comparissero tutti insieme
   la riga sarebbe un ornamento.

   STATO DI RIPOSO. Senza JavaScript, o con `prefers-reduced-motion`, i
   campi ci sono tutti e la riga non c'e'. Non si perde niente: il
   risultato e' la cosa che conta, l'animazione e' solo il modo in cui ci
   si arriva.

   Le barre della pagina sono generate da un seme fisso: stessa sequenza sul
   server e nel browser, altrimenti React protesterebbe per la differenza.
   ========================================================================== */

/* Generatore deterministico: nessun Math.random, che darebbe due pagine
   diverse fra server e browser. */
function lines(seed: number, count: number) {
  let s = seed;
  const rnd = () => {
    s = (s * 1103515245 + 12345) % 2147483648;
    return s / 2147483648;
  };
  return Array.from({ length: count }, (_, i) => ({
    w: 34 + rnd() * 62, // percentuale di larghezza della riga
    gap: i === 3 || i === 8, // due stacchi di paragrafo
  }));
}

const PAGE = lines(7, 13);

export function Conversion({
  from,
  to,
  replay,
  note,
  fields,
}: {
  from: string;
  to: string;
  replay: string;
  note: string;
  fields: readonly { label: string; value: string }[];
}) {
  /* `run` monta l'animazione; `key` la fa ripartire da capo rimontando il
     sottoalbero, che e' l'unico modo pulito per riavviare un'animazione CSS
     senza toccare lo stile a mano. */
  const [run, setRun] = useState(false);
  const [key, setKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  /* Parte quando la scheda e' davvero sullo schermo, non al caricamento:
     su un telefono la testata si vede subito, ma su uno schermo piccolo in
     orizzontale potrebbe non esserci. */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="border-t border-line">
      <div className="flex items-baseline justify-between gap-6 border-b border-line px-5 py-3 md:px-8">
        <span className="eyebrow">{note}</span>
        <button
          type="button"
          onClick={() => {
            setRun(true);
            setKey((k) => k + 1);
          }}
          className="eyebrow inline-flex min-h-11 items-center transition-colors hover:text-accent"
        >
          {replay}
        </button>
      </div>

      <div
        key={key}
        className={`relative overflow-hidden ${run ? "rs-run" : ""}`}
      >
        {/* La riga di scansione. Sta sopra tutto, non intercetta il
            puntatore, e sparisce da sola quando ha finito. */}
        <span
          aria-hidden="true"
          className="rs-scan pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-accent"
        />

        <div className="grid md:grid-cols-2">
          {/* LA CARTA */}
          <div className="border-b border-line px-5 py-8 md:border-r md:border-b-0 md:px-8 md:py-10">
            <span className="eyebrow">{from}</span>
            <div className="mt-6 flex flex-col gap-2" aria-hidden="true">
              {PAGE.map((l, i) => (
                <span
                  key={i}
                  className={`rs-dash block h-1.5 bg-line ${l.gap ? "mt-4" : ""}`}
                  style={{
                    width: `${l.w}%`,
                    animationDelay: `${120 + i * 26}ms`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* IL RECORD */}
          <div className="px-5 py-8 md:px-8 md:py-10">
            <span className="eyebrow">{to}</span>
            <dl className="mt-6 flex flex-col gap-5">
              {fields.map((f, i) => (
                <div
                  key={f.label}
                  className="rs-field border-t border-line pt-3"
                  /* I ritardi seguono la riga: il campo compare quando la
                     riga lo ha appena superato. */
                  style={{ animationDelay: `${820 + i * 210}ms` }}
                >
                  <dt className="eyebrow">{f.label}</dt>
                  <dd className="mt-2 font-mono text-data text-max">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
