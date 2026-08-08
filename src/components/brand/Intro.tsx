"use client";

import { useEffect, useState } from "react";

/* ==========================================================================
   ANIMAZIONE D'INGRESSO — «IL SEGNO SCANDISCE»

   CONCEPT. Il marchio Paloryn e' gia' uno scanner planetario: arco, braccio
   della camera, tre raggi che convergono sul documento. L'ingresso non
   aggiunge una metafora nuova, fa fare al segno quello che il segno
   raffigura. Il marchio compare grande e spento; una lama di luce cyan lo
   percorre dall'alto in basso; dietro la lama il segno passa da grigio a
   bianco — entra a fuoco. Poi la lama si posa come linea di base, il segno
   rimpicciolisce verso l'angolo in cui vive nell'header, e il velo si alza.

   Un gesto solo, un secondo e mezzo, e il racconto della pagina e' gia'
   cominciato: dalla luce che scandisce nasce il dato.

   DISCIPLINA. Il brief ammette un solo momento orchestrato forte, l'hero.
   Questo ingresso non ne apre un secondo: fa la stessa cosa dell'hero con lo
   stesso vocabolario, e poi si toglie di mezzo.
   - una volta per sessione, non a ogni pagina;
   - si salta con un tocco, un clic o un tasto qualsiasi;
   - non parte affatto se il movimento e' disattivato;
   - il velo comincia a dissolversi a 0,8s per non trattenere il contenuto.
   ========================================================================== */

const KEY = "paloryn:intro";
const DURATION = 1500;

export function Intro() {
  /* Si parte sempre spenti: il server non sa se l'ingresso e' gia' stato
     visto, e un velo reso lato server che non si toglie sarebbe un disastro. */
  const [phase, setPhase] = useState<"off" | "run" | "done">("off");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* Modalita' privata o storage negato: si mostra e basta. */
    }
    if (reduced || seen) return;

    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}

    setPhase("run");
    const t = setTimeout(() => setPhase("done"), DURATION);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== "run") return;
    const skip = () => setPhase("done");
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, [phase]);

  if (phase === "off" || phase === "done") return null;

  return (
    <div className="intro" aria-hidden="true">
      <svg viewBox="0 0 200 200" className="intro-mark">
        <defs>
          {/* La parte gia' scandita: sotto la lama, e sale con lei. */}
          <clipPath id="intro-scanned" clipPathUnits="userSpaceOnUse">
            <rect className="intro-wipe" x="0" y="0" width="200" height="200" />
          </clipPath>
        </defs>

        {/* Il segno spento */}
        <g transform="translate(100 100) scale(1.55) translate(-50 -50)">
          <Mark stroke="var(--color-mute)" />
          <g clipPath="url(#intro-scanned)">
            <Mark stroke="var(--color-max)" />
          </g>
        </g>

        {/* La lama di luce */}
        <g className="intro-blade">
          <line x1="10" y1="0" x2="190" y2="0" stroke="var(--color-accent)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

/* Stessa geometria del marchio, senza riempimenti. */
function Mark({ stroke }: { stroke: string }) {
  return (
    <g
      transform="translate(0 -6)"
      fill="none"
      stroke={stroke}
      strokeWidth={7}
      strokeLinecap="round"
    >
      <path d="M28,58 Q50,28 72,58" />
      <line x1="39" y1="47" x2="39" y2="61" transform="rotate(-29.7 39 54)" />
      <line x1="50" y1="42" x2="50" y2="56" />
      <line x1="61" y1="47" x2="61" y2="61" transform="rotate(29.7 61 54)" />
    </g>
  );
}
