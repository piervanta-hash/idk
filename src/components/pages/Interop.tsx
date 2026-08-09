"use client";

import { useState } from "react";

/* ==========================================================================
   ANIMAZIONE 4 — SCHEMA DI INTEROPERABILITA'

   Cittadino → ente → Anamnesis → infrastruttura pubblica, con impulsi che
   percorrono le linee di connessione. E' il vero differenziatore
   dell'azienda, e uno schema interattivo vale piu' di tre paragrafi.

   Selezionando un collegamento la sua linea si accende e sotto compare la
   riga che lo spiega. Nessuna selezione: tutte le linee sono percorse da un
   impulso lento e sfalsato, cosi' lo schema respira senza chiedere nulla.

   Il diagramma e' disegnato in SVG per la parte grafica, ma i comandi e i
   testi sono HTML: restano leggibili dagli screen reader e nel carattere
   giusto. Su mobile la catena si raddrizza in verticale.
   ========================================================================== */

type Endpoint = { id: string; name: string; body: string };

export function Interop({
  chain,
  endpoints,
  hint,
}: {
  chain: readonly string[];
  endpoints: readonly Endpoint[];
  hint: string;
}) {
  const [sel, setSel] = useState<string | null>(null);
  const current = endpoints.find((e) => e.id === sel) ?? null;

  return (
    <div>
      <div className="border border-line bg-surface-1 p-6 md:p-10">
        {/* --- La catena: cittadino → ente → Anamnesis ---------------------- */}
        <ol className="m-0 flex list-none flex-col gap-0 p-0 md:flex-row md:items-stretch">
          {chain.map((step, i) => {
            const last = i === chain.length - 1;
            return (
              <li key={step} className="flex flex-1 flex-col md:flex-row md:items-center">
                <div
                  className={
                    "flex min-h-16 flex-1 items-center justify-between gap-4 border px-5 py-4 md:justify-center " +
                    (last
                      ? "border-accent bg-surface-2"
                      : "border-line bg-bg")
                  }
                >
                  <span
                    className={
                      last
                        ? "font-display text-h5 font-semibold text-max"
                        : "eyebrow"
                    }
                  >
                    {step}
                  </span>
                  <span className="eyebrow tabular md:hidden">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {!last && (
                  <span
                    aria-hidden="true"
                    className="flex items-center justify-center py-2 text-mute md:px-3 md:py-0"
                  >
                    <span className="md:hidden">&darr;</span>
                    <span className="hidden md:inline">&rarr;</span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        {/* --- Le connessioni verso l'infrastruttura pubblica --------------- */}
        <div className="relative mt-8 md:mt-10">
          {/* Fascio di linee: una per collegamento, con impulso sfalsato */}
          <svg
            viewBox="0 0 1000 64"
            preserveAspectRatio="none"
            className="hidden h-16 w-full md:block"
            aria-hidden="true"
          >
            {endpoints.map((e, i) => {
              const x = (1000 / endpoints.length) * (i + 0.5);
              const d = `M 500 0 C 500 34, ${x} 30, ${x} 64`;
              const on = sel === e.id;
              return (
                <g key={e.id}>
                  <path
                    d={d}
                    fill="none"
                    stroke={on ? "var(--color-accent)" : "var(--color-line)"}
                    strokeWidth={1}
                  />
                  <path
                    d={d}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth={1.5}
                    strokeDasharray="10 150"
                    className="io-pulse"
                    style={{ animationDelay: `${i * 520}ms` }}
                  />
                </g>
              );
            })}
          </svg>

          <ul className="m-0 grid list-none grid-cols-2 gap-px bg-line p-0 md:grid-cols-6">
            {endpoints.map((e) => {
              const on = sel === e.id;
              return (
                <li key={e.id}>
                  <button
                    type="button"
                    onClick={() => setSel(on ? null : e.id)}
                    aria-pressed={on}
                    className={
                      "flex min-h-16 w-full items-center justify-center px-3 py-4 text-center " +
                      "font-mono text-data uppercase tracking-[0.08em] transition-colors duration-200 " +
                      (on
                        ? "bg-surface-2 text-accent"
                        : "bg-bg text-mute hover:text-max")
                    }
                  >
                    {e.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* --- La riga che spiega il collegamento selezionato --------------- */}
        <div className="mt-6 min-h-16 border-t border-line pt-4">
          {current ? (
            <p className="measure-wide text-body text-copy">
              <span className="font-mono text-data uppercase tracking-[0.08em] text-max">
                {current.name}
              </span>{" "}
              — {current.body}
            </p>
          ) : (
            <p className="eyebrow">{hint}</p>
          )}
        </div>
      </div>

      {/* Senza JavaScript i pulsanti non aprono niente: l'elenco completo sta
          anche qui sotto, in chiaro. */}
      <noscript>
        <dl className="mt-8 space-y-4">
          {endpoints.map((e) => (
            <div key={e.id} className="border-t border-line pt-3">
              <dt className="eyebrow text-max">{e.name}</dt>
              <dd className="mt-1 text-body text-copy">{e.body}</dd>
            </div>
          ))}
        </dl>
      </noscript>
    </div>
  );
}
