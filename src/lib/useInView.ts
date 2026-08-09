"use client";

import { useEffect, useRef, useState } from "react";

/* ==========================================================================
   INGRESSO NELLA VISTA
   Un solo IntersectionObserver per elemento, che si stacca appena ha fatto
   il suo lavoro: nessuna libreria, nessun listener sullo scroll, niente che
   possa rallentare lo scorrimento su mobile.
   ========================================================================== */

export function useInView<T extends HTMLElement>(options?: {
  /** Quanto dell'elemento deve essere visibile prima di far scattare. */
  threshold?: number;
  /** Margine di anticipo rispetto al bordo della finestra. */
  rootMargin?: string;
}) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Se il browser non lo supporta, mostriamo tutto subito: l'assenza
       dell'animazione non deve mai nascondere il contenuto. */
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      {
        threshold: options?.threshold ?? 0.25,
        rootMargin: options?.rootMargin ?? "0px 0px -10% 0px",
      },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return { ref, inView };
}
