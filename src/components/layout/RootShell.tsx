import { Intro } from "@/components/brand/Intro";
import { SkipLink } from "@/components/layout/SkipLink";
import { HTML_LANG, type Locale } from "@/lib/routes";

/* ==========================================================================
   IMPALCATURA DEL DOCUMENTO

   Il tag <html> deve dichiarare la lingua della pagina: `lang="it"` sulle
   pagine italiane e `lang="en"` su quelle inglesi. Non e' un dettaglio —
   e' quello che dice al lettore di schermo con che pronuncia leggere, e ai
   motori quale versione servire a chi.

   In Next il tag <html> vive nel layout radice, che non conosce la lingua.
   Per questo ci sono due layout radice, uno per gruppo di rotte, e
   condividono questa impalcatura: caratteri, metadati di base e ingresso
   sono scritti una volta sola.
   ========================================================================== */

/* I caratteri non stanno piu' qui: li porta il layout di ciascuna lingua,
   perche' il macedone ne usa uno diverso (vedi src/lib/fonts.ts e
   src/lib/fonts-mk.ts). */

export function RootShell({
  locale,
  fonts,
  children,
}: {
  locale: Locale;
  /** Le classi che dichiarano le variabili dei caratteri. */
  fonts: string;
  children: React.ReactNode;
}) {
  return (
    <html lang={HTML_LANG[locale]} className={fonts}>
      <body>
        {/* Marca la pagina come "JavaScript attivo". Le comparse in scroll si
            attivano solo da qui in poi: senza JS nulla viene mai nascosto. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <SkipLink locale={locale} />
        <Intro />
        {children}
      </body>
    </html>
  );
}
