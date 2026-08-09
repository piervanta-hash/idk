import type { Locale } from "@/lib/routes";

/* ==========================================================================
   SALTO AL CONTENUTO

   Il primo Tab di ogni pagina finiva sul logo, poi sulle sei voci di menu,
   poi sullo scambio di lingua: nove passaggi identici prima di arrivare al
   testo, ripetuti a ogni pagina che si apre. Col mouse non esiste — si
   guarda dove si vuole. Da tastiera, o con un lettore di schermo, e' una
   tassa che si paga dodici volte per visitare dodici pagine.

   Questo e' il rimedio consueto: un collegamento che sta per primo nel
   documento, invisibile finche' non lo si raggiunge col Tab, e che al
   primo colpo porta all'inizio del contenuto.

   NON e' nascosto con `display:none` ne' con `visibility:hidden`: quelli
   lo toglierebbero anche dal percorso della tastiera, e il collegamento
   non servirebbe piu' a niente. Sta fuori dallo schermo e rientra quando
   prende il fuoco.
   ========================================================================== */

const TESTO: Record<Locale, string> = {
  it: "Salta al contenuto",
  en: "Skip to content",
};

export function SkipLink({ locale }: { locale: Locale }) {
  return (
    <a
      href="#main"
      className="eyebrow fixed top-0 left-0 z-[100] flex min-h-11 -translate-y-full items-center border border-line bg-bg px-5 text-max transition-transform duration-150 focus:translate-y-0"
    >
      {TESTO[locale]}
    </a>
  );
}
