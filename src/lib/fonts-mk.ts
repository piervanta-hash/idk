import { IBM_Plex_Mono, Roboto_Flex } from "next/font/google";

/* ==========================================================================
   I CARATTERI DEL MACEDONE

   Archivo non ha il cirillico. Non e' un dettaglio aggirabile: senza un
   carattere che lo contenga, l'intera versione macedone uscirebbe nel
   carattere di sistema del telefono di chi guarda — Arial su uno, Roboto
   su un altro, San Francisco su un terzo — e sarebbe l'unica lingua del
   sito a non avere una voce propria.

   Serve quindi un secondo carattere, e solo qui. La scelta e' Roboto Flex
   per una ragione precisa: e' uno dei pochissimi con il cirillico E l'asse
   della larghezza. Tutto il sistema tipografico del sito sta su quell'asse
   — i titoli sono a larghezza 106 — e un carattere a larghezza fissa
   avrebbe reso il macedone piu' stretto e piu' timido delle altre quattro
   lingue. Con lo stesso asse, le stesse regole danno lo stesso carattere
   di pagina.

   Si dichiara con lo stesso nome di variabile di Archivo: il foglio di
   stile non sa e non deve sapere che in questa lingua il disegno e' un
   altro.

   Questo file lo importa soltanto il layout macedone, quindi il carattere
   non viene ne' scaricato ne' precaricato nelle altre lingue.

   IBM Plex Mono il cirillico ce l'ha: resta lui, con il sottoinsieme in
   piu'.
   ========================================================================== */

const robotoFlex = Roboto_Flex({
  subsets: ["latin", "cyrillic"],
  axes: ["wdth"],
  variable: "--ff-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--ff-plex-mono",
  display: "swap",
});

export const fontsMk = `${robotoFlex.variable} ${plexMono.variable}`;
