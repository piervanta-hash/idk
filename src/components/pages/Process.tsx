"use client";

import { useEffect, useRef, useState } from "react";
import { PhaseGlyph } from "./PhaseGlyph";

/* ==========================================================================
   ITER DI DIGITALIZZAZIONE — SEI FASI

   Ripreso dal comportamento del sito attuale: un pannello disegnato che
   resta fermo a sinistra e cambia figura man mano che si scende da una fase
   alla successiva. Non sei riquadri affiancati, ma una sequenza connessa che
   avanza con lo scorrimento.

   Rifatto nella palette nuova: schemi a linea grigia con un solo elemento
   cyan per disegno, quello che nella fase e' vivo. Il cambio e' un dissolvi
   incrociato breve, piu' una guida verticale che si riempie.

   Su mobile il pannello non puo' restare fermo: ogni fase porta il suo
   disegno in piccolo accanto al titolo, e il testo si apre al tocco. Il
   disegno resta sempre visibile, anche a pannello chiuso.
   ========================================================================== */

type Step = {
  n: string;
  name: string;
  title: string;
  body: string;
  tags: string;
};

export function Process({ steps, caption }: { steps: readonly Step[]; caption: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(0);

  /* Il server rende tutte le fasi aperte: senza JavaScript nessun testo
     resta chiuso e nascosto. L'accordion si attiva dopo l'idratazione. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* Una sola misura per fotogramma, agganciata al rendering del browser:
     nessun lavoro pesante durante lo scorrimento. */
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const anchor = window.innerHeight * 0.45;

      const r = el.getBoundingClientRect();
      setProgress(Math.max(0, Math.min(1, (anchor - r.top) / r.height)));

      /* La fase attiva e' l'ultima il cui inizio ha superato l'ancora. */
      let next = 0;
      itemRefs.current.forEach((li, i) => {
        if (li && li.getBoundingClientRect().top <= anchor) next = i;
      });
      setActive(next);
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
  }, [steps.length]);

  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:gap-16">
      {/* --- Il pannello fermo, solo da desktop -------------------------- */}
      <div className="hidden lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-square border border-line bg-surface-1">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className={
                  "absolute inset-0 p-10 transition-opacity duration-500 " +
                  (i === active ? "opacity-100" : "opacity-0")
                }
                aria-hidden={i !== active}
              >
                <PhaseGlyph index={i} />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-baseline justify-between gap-4 border-t border-line pt-3">
            <span className="eyebrow tabular">
              {steps[active].n} · {steps[active].name}
            </span>
            <span className="eyebrow tabular">
              {steps[active].n} / {String(steps.length).padStart(2, "0")}
            </span>
          </div>

          {/* Guida di avanzamento */}
          <div className="mt-4 h-px w-full bg-line">
            <div
              className="h-px bg-accent transition-[width] duration-150 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>

          <p className="mt-6 text-small text-mute">{caption}</p>
        </div>
      </div>

      {/* --- Le sei fasi ------------------------------------------------- */}
      <ol ref={listRef} className="m-0 list-none p-0">
        {steps.map((s, i) => {
          const isOpen = open === i;
          const on = i === active;
          return (
            <li
              key={s.n}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="border-b border-line lg:min-h-[70vh] lg:py-16"
            >
              {/* Mobile: disegno piccolo sempre visibile, testo a fisarmonica */}
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-5 py-6 text-left lg:hidden"
              >
                <span className="h-20 w-20 shrink-0 border border-line bg-surface-1 p-2">
                  <PhaseGlyph index={i} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="eyebrow tabular">
                    {s.n} · {s.name}
                  </span>
                  <span className="mt-2 block text-h4 font-display font-semibold text-max">
                    {s.title}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-h5 text-mute transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {/* Desktop: intestazione statica */}
              <div className="hidden lg:block">
                <span className={`eyebrow tabular ${on ? "text-max" : ""}`}>
                  {s.n} · {s.name}
                </span>
                <h3 className="mt-3 text-d3 font-display font-semibold text-max">
                  {s.title}
                </h3>
              </div>

              <div className={`${!mounted || isOpen ? "block" : "hidden"} pb-8 lg:block`}>
                <p className="measure-wide text-body-l text-copy lg:mt-6">{s.body}</p>
                <p className="mt-6 font-mono text-data text-mute">{s.tags}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
