"use client";

import { useEffect, useRef } from "react";

/* ==========================================================================
   COMPORTAMENTO DI UNA FINESTRA MODALE

   Una finestra dichiarata `aria-modal` fa una promessa: finche' e' aperta,
   il resto della pagina non esiste. Va mantenuta, e non basta il tasto Esc.

   TRE COSE, tutte e tre necessarie:

   1. Il fuoco entra. All'apertura si porta il fuoco dentro il pannello,
      altrimenti chi naviga da tastiera resta fermo dov'era e non capisce
      che e' successo qualcosa.

   2. Il fuoco non esce. Con Tab si gira dentro la finestra e si ricomincia
      da capo; con Maiusc+Tab si gira all'indietro. Senza questo, dopo due
      Tab si finisce a navigare la pagina sotto — che e' coperta, quindi si
      sta muovendo un fuoco invisibile. E' il difetto piu' sgradevole che
      possa avere una modale, ed e' anche il piu' facile da non accorgersene
      guardandola col mouse.

   3. Il fuoco torna. Alla chiusura si rimette dove stava: sul comando che
      ha aperto la finestra. Chi usa la tastiera riprende esattamente da
      dove aveva lasciato invece di ripartire dall'inizio della pagina.

   Anche il corpo della pagina viene bloccato: senza, lo sfondo scorre
   sotto la finestra e chi legge perde il segno.
   ========================================================================== */

const FUOCABILI =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function useDialog(aperta: boolean, chiudi: () => void) {
  const panelRef = useRef<HTMLDivElement>(null);
  /* Chi aveva il fuoco prima che si aprisse: e' li' che va rimesso. */
  const prima = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!aperta) return;

    prima.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    panel?.focus();

    const bloccato = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        chiudi();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const dentro = [...panel.querySelectorAll<HTMLElement>(FUOCABILI)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!dentro.length) {
        /* Nessun comando dentro: il fuoco resta sul pannello. */
        e.preventDefault();
        panel.focus();
        return;
      }

      const primo = dentro[0];
      const ultimo = dentro[dentro.length - 1];
      const attivo = document.activeElement;

      if (e.shiftKey && (attivo === primo || attivo === panel)) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && attivo === ultimo) {
        e.preventDefault();
        primo.focus();
      } else if (!panel.contains(attivo)) {
        /* Il fuoco e' scappato fuori: lo si riporta all'inizio. */
        e.preventDefault();
        primo.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = bloccato;
      prima.current?.focus();
    };
  }, [aperta, chiudi]);

  return panelRef;
}
