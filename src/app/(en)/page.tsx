"use client";

import Link from "next/link";
import { useEffect } from "react";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/routes";

/* ==========================================================================
   RADICE — RICADUTA LATO CLIENT

   Normalmente questa pagina non si vede: il rimando di lingua avviene sul
   server, in src/middleware.ts, prima che il browser arrivi qui.

   Serve nel caso in cui il sito venga servito come statico puro, dove il
   middleware non gira. Stessa regola, stesso ordine: scelta ricordata,
   lingua del browser, inglese.
   ========================================================================== */

const COOKIE = "paloryn-lang";

function remembered(): Locale | null {
  const m = document.cookie.match(new RegExp(`(?:^|; )${COOKIE}=([^;]*)`));
  const v = m?.[1];
  return LOCALES.includes(v as Locale) ? (v as Locale) : null;
}

function preferred(): Locale | null {
  for (const tag of navigator.languages ?? [navigator.language]) {
    const base = tag.split("-")[0].toLowerCase();
    if (LOCALES.includes(base as Locale)) return base as Locale;
  }
  return null;
}

/* DA DOVE COMINCIA IL SITO.

   Questa pagina non sa a che indirizzo e' stata messa. Sul dominio vero sta
   sulla radice; sull'anteprima sta dentro una sottocartella col nome del
   repository. Se il rimando scrive `/it` secco, sull'anteprima manda a un
   indirizzo che non esiste — ed e' esattamente quello che succedeva: chi
   apriva il collegamento trovava la pagina di errore di GitHub.

   Il percorso si legge da dove siamo adesso, invece di darlo per scontato:
   questa e' la pagina radice, quindi tutto quello che sta prima della barra
   finale e' il prefisso da tenere. Vale in tutti e due i casi senza doverlo
   configurare da nessuna parte. */
function radice() {
  return window.location.pathname.replace(/\/?(?:index\.html)?$/, "");
}

export default function RootRedirect() {
  useEffect(() => {
    const locale = remembered() ?? preferred() ?? DEFAULT_LOCALE;
    window.location.replace(`${radice()}/${locale}`);
  }, []);

  return (
    <main id="main" tabIndex={-1} className="shell flex min-h-dvh items-center focus:outline-none">
      <p className="eyebrow">Paloryn</p>
      {/* Senza JavaScript e senza server: restano due collegamenti veri.
          Con `Link` e non con `<a>`: e' Next a scrivere il prefisso della
          sottocartella nell'indirizzo, e senza quello questi due
          collegamenti puntavano fuori dal sito come il rimando qui sopra. */}
      <noscript>
        <ul className="ml-8 flex list-none gap-6 p-0">
          <li>
            <Link href="/en" hrefLang="en" className="eyebrow hover:text-max">
              English
            </Link>
          </li>
          <li>
            <Link href="/it" hrefLang="it" className="eyebrow hover:text-max">
              Italiano
            </Link>
          </li>
        </ul>
      </noscript>
    </main>
  );
}
