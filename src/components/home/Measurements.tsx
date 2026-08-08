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
            {m.unit && <span className="text-d3 text-mute">{m.unit}</span>}
          </div>
          <span className="eyebrow mt-4 block">{m.label}</span>
          {m.note && <span className="mt-2 text-small text-mute">{m.note}</span>}
        </div>
      ))}
    </div>
  );
}

function Counter({ value, run }: { value: string; run: boolean }) {
  const target = Number(value);
  const numeric = Number.isFinite(target);
  const [shown, setShown] = useState(numeric ? 0 : target);

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
