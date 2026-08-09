import fs from "node:fs";
import path from "node:path";

/* ==========================================================================
   FOTOGRAFIE PRESENTI

   Le fotografie non compaiono in pagina se il file non c'e'. Il controllo
   avviene in fase di costruzione, dentro un componente di server: non c'e'
   nessun segnaposto da accendere e spegnere a mano e nessun riquadro vuoto
   che aspetta.

   Basta mettere il file in public/img/archilives/ e ricostruire: la foto
   entra da sola. Toglierlo la fa sparire, senza lasciare buchi.
   ========================================================================== */

const DIR = path.join(process.cwd(), "public", "img", "archilives");

export function hasPhoto(base: string): boolean {
  return ["avif", "webp", "jpg"].every((ext) =>
    fs.existsSync(path.join(DIR, `${base}.${ext}`)),
  );
}

/** La forma di una fotografia in pagina. Volutamente larga: i contenuti
 *  sono dichiarati `as const`, e un tipo stretto non accetterebbe insieme
 *  la versione inglese e quella italiana. */
export type Shot = { base: string; alt: string; credit?: string };

export function present(shots: readonly Shot[]): Shot[] {
  return shots.filter((s) => hasPhoto(s.base));
}
