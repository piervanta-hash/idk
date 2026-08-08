/* ==========================================================================
   PREPARAZIONE DELLE FOTOGRAFIE DELL'EVENTO

   Gli originali arrivano come PNG da oltre un megabyte l'uno: in pagina
   sarebbero un disastro. Qui vengono ridimensionati alle misure in cui
   compaiono davvero e riscritti in AVIF e WebP, con un JPEG di riserva.

   Le due grandi con il nome escono a 1400px di lato lungo, le quattro del
   carosello a 900px: il doppio della dimensione a schermo, per gli schermi
   ad alta densita' e non oltre.

   Si rilancia con:  node scripts/build-photos.mjs
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2];
const OUT = "public/img/archilives";

if (!SRC) {
  console.error("Uso: node scripts/build-photos.mjs <cartella-sorgenti>");
  process.exit(1);
}

/* nome in uscita → file sorgente e larghezza di destinazione */
const JOBS = [
  { out: "vantaggiato", src: "full-4.png", w: 1400 },
  { out: "perrone", src: "full-6.png", w: 1400 },
  { out: "room-01", src: "2.png", w: 900 },
  { out: "reading", src: "7.png", w: 900 },
  { out: "performance", src: "8.png", w: 900 },
  { out: "duo", src: "9.png", w: 900 },
];

fs.mkdirSync(OUT, { recursive: true });

let total = 0;

for (const job of JOBS) {
  const input = path.join(SRC, job.src);
  if (!fs.existsSync(input)) {
    console.warn(`manca ${input}, salto`);
    continue;
  }

  const base = sharp(input).resize({ width: job.w, withoutEnlargement: true });

  await base.clone().avif({ quality: 55, effort: 6 }).toFile(`${OUT}/${job.out}.avif`);
  await base.clone().webp({ quality: 72 }).toFile(`${OUT}/${job.out}.webp`);
  await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${OUT}/${job.out}.jpg`);

  const sizes = ["avif", "webp", "jpg"].map((ext) => {
    const kb = fs.statSync(`${OUT}/${job.out}.${ext}`).size / 1024;
    total += ext === "avif" ? kb : 0;
    return `${ext} ${kb.toFixed(0)}KB`;
  });
  console.log(`${job.out.padEnd(14)} ${job.w}px  ${sizes.join(" · ")}`);
}

console.log(`\ntotale servito (AVIF): ${total.toFixed(0)} KB`);
