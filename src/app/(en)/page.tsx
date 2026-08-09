"use client";

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

export default function RootRedirect() {
  useEffect(() => {
    const locale = remembered() ?? preferred() ?? DEFAULT_LOCALE;
    window.location.replace(`/${locale}`);
  }, []);

  return (
    <main id="main" tabIndex={-1} className="shell flex min-h-dvh items-center focus:outline-none">
      <p className="eyebrow">Paloryn</p>
      {/* Senza JavaScript e senza server: restano due collegamenti veri. */}
      <noscript>
        <ul className="ml-8 flex list-none gap-6 p-0">
          <li>
            <a href="/en" hrefLang="en" className="eyebrow hover:text-max">
              English
            </a>
          </li>
          <li>
            <a href="/it" hrefLang="it" className="eyebrow hover:text-max">
              Italiano
            </a>
          </li>
        </ul>
      </noscript>
    </main>
  );
}
