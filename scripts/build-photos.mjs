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

/* nome in uscita → file sorgente, larghezza di destinazione e, dove serve,
   il ritaglio da applicare prima di ridimensionare.

   Il ritaglio e' in frazioni del fotogramma, non in pixel: cosi' vale
   qualunque sia la risoluzione dell'originale, telefono o reflex. */
const JOBS = [
  { out: "vantaggiato", src: "full-4.png", w: 1400 },
  { out: "perrone", src: "full-6.png", w: 1400 },

  /* Martino Castellana. L'originale e' verticale e mal inquadrato: il
     soggetto sta nel terzo sinistro, sotto c'e' mezzo metro di pavimento
     vuoto e sopra un'ampia fascia di parete.

     Il taglio prende la fascia alta a tutta larghezza e la porta a un
     formato orizzontale vicino al 4:3, coerente con le altre. Tiene la
     testa a circa un sesto dall'alto, chiude all'altezza della coscia, e
     soprattutto **tiene lo schermo con il portale d'archivio**, che e' la
     cosa piu' preziosa dell'inquadratura: mostra il prodotto in funzione.
     Via il pavimento vuoto, via la parete morta. */
  {
    out: "castellana",
    src: "martino",
    w: 1400,
    crop: { left: 0, top: 0.11, width: 1, height: 0.57 },
  },

  { out: "room-01", src: "2.png", w: 900 },
  { out: "reading", src: "7.png", w: 900 },
  { out: "performance", src: "8.png", w: 900 },
  { out: "duo", src: "9.png", w: 900 },
];

/* Il sorgente puo' arrivare con qualsiasi estensione: si cerca il nome. */
const EXT = ["", ".jpg", ".jpeg", ".png", ".webp", ".avif", ".tif", ".tiff"];
function resolveSource(dir, name) {
  for (const e of EXT) {
    const p = path.join(dir, name + e);
    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }
  return null;
}

fs.mkdirSync(OUT, { recursive: true });

let total = 0;

for (const job of JOBS) {
  const input = resolveSource(SRC, job.src);
  if (!input) {
    console.warn(`manca ${job.src} in ${SRC}, salto — la foto non comparira' in pagina`);
    continue;
  }

  let pipeline = sharp(input).rotate(); // rispetta l'orientamento EXIF

  if (job.crop) {
    const meta = await pipeline.metadata();
    const W = meta.width ?? 0;
    const H = meta.height ?? 0;
    pipeline = pipeline.extract({
      left: Math.round(job.crop.left * W),
      top: Math.round(job.crop.top * H),
      width: Math.round(job.crop.width * W),
      height: Math.round(job.crop.height * H),
    });
  }

  const base = pipeline.resize({ width: job.w, withoutEnlargement: true });

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
