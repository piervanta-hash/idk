"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";

/* ==========================================================================
   IL FONDO DELLA TESTATA

   Sei secondi del film della campagna — la signora alla scrivania — senza
   audio e senza scritte, che girano in tondo. Sono presi dal tratto in cui
   il film non ha testi impressi, con il fondo dell'inquadratura tagliato
   dove stava il sottotitolo, e la giunta e' una dissolvenza: il giro non
   ha stacchi. Cosi' sopra ci possono stare il titolo e i pulsanti senza
   finire addosso alle frasi del film. Il film intero, con l'audio, sta piu'
   in basso nella pagina.

   Pesa 730 KB. Parte solo se chi guarda non ha chiesto meno movimento ne'
   il risparmio dati; altrimenti resta il fotogramma fermo. Si ferma quando
   esce dallo schermo.

   E' decorazione: per un lettore di schermo non c'e' (`aria-hidden`). Il
   contenuto della testata sono il titolo e i pulsanti.
   ========================================================================== */

export function HeroLoop() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const meno = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const risparmio =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
      true;
    if (meno || risparmio) return;

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover object-[64%_20%]"
      src={asset("/video/apertura.mp4")}
      poster={asset("/video/apertura.webp")}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
