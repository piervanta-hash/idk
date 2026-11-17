import { Archivo, IBM_Plex_Mono } from "next/font/google";

/* ==========================================================================
   I CARATTERI DELLE LINGUE IN ALFABETO LATINO
   (inglese, italiano, albanese, serbo)

   DUE CARATTERI, NON TRE.

   Archivo fa sia i titoli sia il testo, perche' e' un carattere variabile
   con due assi: il peso e **la larghezza**. Non e' un ripiego per
   risparmiare un file, e' il contrario: un solo disegno che si allarga e
   si ingrossa dove serve tiene la pagina piu' unita di due caratteri
   diversi che si somigliano.

   L'asse della larghezza e' la ragione della scelta. Alla scala del
   manifesto un grottesco largo e a fianchi dritti regge; le lettere
   geometriche e rotonde si gonfiano e diventano molli. Con `wdth` il
   titolo puo' essere davvero espanso invece di essere solo grande.

   `latin-ext` c'e' per l'albanese e il serbo: ë, ç, č, ć, đ, š, ž stanno
   li'. Senza, quelle lettere cadrebbero sul carattere di sistema e ogni
   parola che le contiene avrebbe una lettera di un'altra mano.

   next/font li prende in fase di costruzione e li serve dal nostro
   dominio: zero richieste esterne, zero salto di layout al caricamento.
   ========================================================================== */

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--ff-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400"],
  variable: "--ff-plex-mono",
  display: "swap",
});

export const fontsLatin = `${archivo.variable} ${plexMono.variable}`;
