"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/lib/useInView";

/* ==========================================================================
   MISURE
   Cifre in IBM Plex Mono, appese a una hairline: la lettura di uno strumento,
   non una fila di trofei. Il contatore sale una volta sola, all'ingresso
   nella vista, e si ferma. Chi ha disattivato le animazioni vede subito il
   valore finale.
   ========================================================================== */

type Item = {
  value: string;
  unit?: string;
  label: string;
  note?: string;
};

export function Measurements({ items }: { items: readonly Item[] }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-5"
    >
      {items.map((m) => (
        <div key={m.label} className="flex flex-col border-t border-line pt-4">
          <div className="flex items-baseline gap-1 font-mono text-metric text-max tabular">
            <Counter value={m.value} run={inView} />
            {m.unit && <span className="text-d3 text-label">{m.unit}</span>}
          </div>
          <span className="eyebrow mt-4 block">{m.label}</span>
          {m.note && <span className="mt-2 text-small text-label">{m.note}</span>}
        </div>
      ))}
    </div>
  );
}

function Counter({ value, run }: { value: string; run: boolean }) {
  const target = Number(value);
  const numeric = Number.isFinite(target);

  /* IL VALORE DI PARTENZA E' QUELLO FINALE, non zero.

     Partiva da zero, e chi apriva la pagina senza JavaScript vedeva
     «0 pagine digitalizzate» e «0 metri lineari in gestione». Una cifra
     sbagliata e' peggio di nessuna cifra: il conteggio e' un vezzo, il
     numero e' un'informazione, e il vezzo non puo' mangiarsi
     l'informazione.

     Adesso il numero e' gia' giusto nell'HTML. Il conteggio, se serve,
     azzera il contatore appena il browser prende in mano la pagina — cioe'
     mentre la sezione e' ancora sotto la piega, dove nessuno la sta
     guardando — e poi lo fa salire quando arriva sullo schermo. Se la
     sezione fosse gia' visibile al caricamento non si azzera affatto: si
     rinuncia al conteggio piuttosto che far vedere un numero falso. */
  const [shown, setShown] = useState(target);

  useEffect(() => {
    if (!numeric || run) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setShown(0);
  }, [numeric, run]);

  useEffect(() => {
    if (!numeric || !run) return;

    /* Il conteggio e' un vezzo: se il movimento e' stato disattivato si
       salta direttamente al valore, senza discussioni. */
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setShown(target);
      return;
    }

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [numeric, run, target]);

  if (!numeric) return <span>{value}</span>;
  return <span>{shown}</span>;
}
