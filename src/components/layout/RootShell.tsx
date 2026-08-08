import { Sora, Archivo, IBM_Plex_Mono } from "next/font/google";
import { Intro } from "@/components/brand/Intro";
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

/* I tre caratteri ufficiali. next/font li scarica in fase di costruzione e
   li serve dal nostro dominio: zero richieste esterne, zero salto di
   layout al caricamento. Importati qui una volta, valgono per entrambi i
   layout senza essere scaricati due volte. */
const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--ff-sora",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500"],
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
      className={`${sora.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body>
        {/* Marca la pagina come "JavaScript attivo". Le comparse in scroll si
            attivano solo da qui in poi: senza JS nulla viene mai nascosto. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <Intro />
        {children}
      </body>
    </html>
  );
}
