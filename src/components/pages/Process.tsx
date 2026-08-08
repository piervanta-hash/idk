"use client";

import { useEffect, useRef, useState } from "react";
import { PhaseGlyph } from "./PhaseGlyph";

/* ==========================================================================
   ITER DI DIGITALIZZAZIONE — UN SOLO RIQUADRO CHE CAMBIA

   Le sei fasi non si srotolano una sotto l'altra: la pagina diventerebbe
   lunghissima e il lettore perderebbe il filo. Sta tutto in un riquadro
   fermo, e scorrendo cambiano insieme il disegno e il testo — come si
   sfogliano i fotogrammi di una sequenza.

   Sotto il riquadro, sei trattini: dicono a che punto si e' e permettono di
   saltare a una fase qualsiasi, avanti o indietro.

   La sezione e' alta quanto sei schermate; dentro, il riquadro resta
   incollato. Lo scorrimento non e' decorativo, e' il comando.

   Senza JavaScript resterebbe visibile solo la prima fase: per questo tutte
   e sei sono nel documento, e sotto c'e' un elenco completo in chiaro che
   compare solo quando gli script non girano.
   ========================================================================== */

type Step = {
  n: string;
  name: string;
  title: string;
  body: string;
  tags: string;
};

export function Process({ steps, caption }: { steps: readonly Step[]; caption: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      /* Quanta parte della sezione e' gia' passata sopra la finestra. */
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.max(0, Math.min(1, -r.top / span)) : 0;
      setProgress(p);
      setActive(Math.min(steps.length - 1, Math.floor(p * steps.length * 0.999)));
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

  /* Il trattino porta alla porzione di scorrimento della sua fase. */
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const span = el.offsetHeight - window.innerHeight;
    const y = el.offsetTop + (span * (i + 0.35)) / steps.length;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const step = steps[active];

  return (
    <>
      <div ref={trackRef} style={{ height: `${steps.length * 90}vh` }} className="relative">
        <div className="sticky top-16 flex h-[calc(100dvh-4rem)] flex-col justify-center py-8 md:top-20 md:h-[calc(100dvh-5rem)]">
          <div className="grid items-center gap-8 md:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] md:gap-16">
            {/* Il disegno */}
            <div className="relative mx-auto aspect-square w-40 border border-line bg-surface-1 sm:w-56 md:mx-0 md:w-full">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  aria-hidden={i !== active}
                  className={
                    "absolute inset-0 p-6 transition-opacity duration-400 md:p-10 " +
                    (i === active ? "opacity-100" : "opacity-0")
                  }
                >
                  <PhaseGlyph index={i} />
                </div>
              ))}
            </div>

            {/* Il testo, nello stesso riquadro: cambia, non si accumula */}
            <div className="relative min-h-64 md:min-h-72">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  aria-hidden={i !== active}
                  className={
                    "transition-opacity duration-400 " +
                    (i === active
                      ? "relative opacity-100"
                      : "pointer-events-none absolute inset-0 opacity-0")
                  }
                >
                  <span className="eyebrow tabular text-max">
                    {s.n} · {s.name}
                  </span>
                  <h3 className="mt-4 text-d3 font-display font-semibold text-max">
                    {s.title}
                  </h3>
                  <p className="measure-wide mt-6 text-body-l text-copy">{s.body}</p>
                  <p className="mt-6 font-mono text-data text-mute">{s.tags}</p>
                </div>
              ))}
            </div>
          </div>

          {/* I sei trattini: dove sono, e dove voglio andare */}
          <div className="mt-10 flex items-end justify-between gap-6 border-t border-line pt-4">
            <nav aria-label="Phases" className="flex flex-1 gap-2">
              {steps.map((s, i) => (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={i === active ? "step" : undefined}
                  className="group flex-1 py-4"
                  title={`${s.n} · ${s.name}`}
                >
                  <span className="sr-only">
                    {s.n} — {s.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className={
                      "block h-0.5 w-full transition-colors duration-300 " +
                      (i === active
                        ? "bg-accent"
                        : i < active
                          ? "bg-strong group-hover:bg-max"
                          : "bg-line group-hover:bg-mute")
                    }
                  />
                </button>
              ))}
            </nav>
            <span className="eyebrow tabular shrink-0 pb-4">
              {step.n} / {String(steps.length).padStart(2, "0")}
            </span>
          </div>

          <p className="mt-2 hidden text-small text-mute md:block">{caption}</p>

          {/* Barra di avanzamento continua della sezione */}
          <div className="mt-4 h-px w-full bg-line" aria-hidden="true">
            <div
              className="h-px bg-accent transition-[width] duration-150 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Senza JavaScript il riquadro non cambia: qui c'e' tutto in chiaro. */}
      <noscript>
        <ol className="m-0 list-none p-0">
          {steps.map((s) => (
            <li key={s.n} className="border-t border-line py-8">
              <span className="eyebrow tabular">
                {s.n} · {s.name}
              </span>
              <h3 className="mt-3 text-h4 font-display font-semibold text-max">{s.title}</h3>
              <p className="measure-wide mt-4 text-body text-copy">{s.body}</p>
              <p className="mt-3 font-mono text-data text-mute">{s.tags}</p>
            </li>
          ))}
        </ol>
      </noscript>
    </>
  );
}
