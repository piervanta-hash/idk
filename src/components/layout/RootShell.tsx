import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Intro } from "@/components/brand/Intro";
import { SkipLink } from "@/components/layout/SkipLink";
import type { Locale } from "@/lib/routes";

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

/* DUE CARATTERI, NON TRE.

   Archivo fa sia i titoli sia il testo, perche' e' un carattere variabile
   con due assi: il peso e **la larghezza**. Non e' un ripiego per
   risparmiare un file, e' il contrario: un solo disegno che si allarga e
   si ingrossa dove serve tiene la pagina piu' unita di due caratteri
   diversi che si somigliano.

   L'asse della larghezza e' la ragione della scelta. Alla scala del
   manifesto un grottesco largo e a fianchi dritti regge; le lettere
   geometriche e rotonde si gonfiano e diventano molli. Con `wdth` il
   titolo puo' essere davvero espanso invece di essere solo grande.

   Un file solo per tutti i pesi e tutte le larghezze: scaricare la
   versione variabile costa meno di scaricare due tagli statici.

   next/font lo prende in fase di costruzione e lo serve dal nostro
   dominio: zero richieste esterne, zero salto di layout al caricamento. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--ff-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ff-plex-mono",
  display: "swap",
});

export function RootShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={locale}
      className={`${archivo.variable} ${plexMono.variable}`}
    >
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
