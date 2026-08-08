"use client";

import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   ANIMAZIONE 3 — ITER DI DIGITALIZZAZIONE

   Le sei fasi come sequenza connessa che avanza con lo scroll, non come sei
   riquadri statici affiancati. Una guida verticale corre lungo l'elenco e si
   riempie di cyan man mano che si scende: si vede sempre a che punto del
   processo si e'.

   Su mobile e' un accordion: una fase aperta per volta, tap per cambiare,
   bersagli da 44px. Su desktop sono tutte aperte e la guida fa il resto.

   Senza JavaScript o con il movimento disattivato: tutte le fasi aperte e
   leggibili, guida piena. Non manca nessuna informazione.
   ========================================================================== */

type Step = {
  n: string;
  name: string;
  title: string;
  body: string;
  tags: string;
};

export function Process({ steps }: { steps: readonly Step[] }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [reached, setReached] = useState(0);
  const [open, setOpen] = useState(0);

  /* Il server rende tutte le fasi aperte. L'accordion si attiva solo dopo
     l'idratazione: senza JavaScript nessuna fase resta chiusa e nascosta. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* Una sola misura per fotogramma, agganciata al rendering del browser:
     niente listener che facciano lavoro pesante durante lo scorrimento. */
  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.55;
      const p = Math.max(0, Math.min(1, (anchor - r.top) / r.height));
      setProgress(p);
      setReached(Math.min(steps.length, Math.ceil(p * steps.length)));
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
    <ol ref={listRef} className="relative m-0 list-none p-0">
      {/* La guida: traccia ferma in grigio, riempimento cyan che avanza */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 left-[7px] w-px bg-line md:left-[calc(6rem+7px)]"
      >
        <div
          className="w-px bg-accent transition-[height] duration-150 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </div>

      {steps.map((s, i) => {
        const active = i < reached;
        const isOpen = open === i;
        return (
          <li key={s.n} className="relative pl-8 md:grid md:grid-cols-[6rem_1fr] md:gap-0 md:pl-0">
            {/* Colonna del nome della fase, solo su desktop */}
            <div className="hidden pt-8 md:block">
              <span className={`eyebrow ${active ? "text-max" : ""}`}>{s.name}</span>
            </div>

            <div className="md:pl-8">
              {/* Il pallino sulla guida */}
              <span
                aria-hidden="true"
                className={
                  "absolute left-0 mt-9 block h-[15px] w-[15px] rounded-full border transition-colors duration-300 md:left-24 " +
                  (active
                    ? "border-accent bg-accent"
                    : "border-line bg-bg")
                }
              />

              {/* Mobile: intestazione premibile, un pannello aperto per volta.
                  Desktop: intestazione statica, tutti i pannelli aperti. */}
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-baseline justify-between gap-4 py-8 text-left md:hidden"
              >
                <span>
                  <span className="eyebrow tabular">{s.n}</span>
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

              <div className="hidden py-8 md:block">
                <span className="eyebrow tabular">{s.n}</span>
                <h3 className="mt-2 text-h4 font-display font-semibold text-max">
                  {s.title}
                </h3>
              </div>

              <div className={`${!mounted || isOpen ? "block" : "hidden"} pb-8 md:block`}>
                <p className="measure-wide text-body text-copy">{s.body}</p>
                <p className="mt-4 font-mono text-data text-mute">{s.tags}</p>
              </div>

              <div className="border-b border-line" />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
