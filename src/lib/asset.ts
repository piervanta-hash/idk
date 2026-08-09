/* ==========================================================================
   INDIRIZZO DI UN FILE STATICO

   Next scrive da solo il prefisso della sottocartella dentro `Link` e
   dentro i suoi componenti — ma non dentro un `src` o un `srcSet` scritti a
   mano. Quelli restano com'e' scritto.

   E' costato le fotografie: nell'HTML pubblicato chiedevano
   `/img/archilives/…` mentre i file stavano in `/idk/img/archilives/…`.
   Sul dominio vero funzionava, sull'anteprima no, e la differenza non si
   vedeva finche' non si apriva l'anteprima. Erano semplicemente assenti,
   senza nessun errore in pagina: un riquadro vuoto non si lamenta.

   Da qui in avanti ogni percorso di un file dentro `public/` passa da
   questa funzione. Il valore arriva da next.config.ts al momento della
   costruzione: vuoto in produzione, `/idk` in anteprima.
   ========================================================================== */

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE}${path}`;
