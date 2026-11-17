/* ==========================================================================
   PREPARAZIONE DELLE FOTOGRAFIE DEL LABORATORIO

   Sono le fotografie vere del laboratorio di Lecce, scattate col telefono:
   verticali, grandangolari, con mezzo soffitto in cima. Qui si ritaglia la
   parte che conta — le persone al lavoro, i fascicoli, gli scaffali — e si
   esporta in AVIF e WebP con un JPEG di riserva, alla misura in cui
   compaiono.

   Il colore resta. Le foto vere sono quelle che dicono che l'azienda
   esiste: in bianco e nero sembravano d'archivio, e accanto ai film della
   campagna, che sono a colori, perdevano. Si toglie solo un po' di
   saturazione, perche' i neon e i faldoni rossi non gridino sul fondo nero.

   Il ritaglio e' in frazioni dell'immagine, non in pixel: vale qualunque
   sia la risoluzione dell'originale.

   Gli originali stanno su Higgsfield (identificativi qui sotto), non nel
   repository: sono file da diversi megabyte l'uno.

   Uso:  node scripts/build-lab.mjs <cartella-con-gli-originali>
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2];
const OUT = "public/img/laboratorio";

if (!SRC) {
  console.error("Uso: node scripts/build-lab.mjs <cartella-con-gli-originali>");
  process.exit(1);
}

const LAVORI = [
  /* L'apertura della home: due persone agli scanner, i fascicoli sul
     tavolo. Una fascia orizzontale presa a meta' altezza della foto
     verticale: sopra c'e' solo soffitto, sotto solo pavimento. */
  {
    out: "apertura",
    src: "469eb397.jpg", // Higgsfield 469eb397
    w: 2400,
    crop: { left: 0, top: 0.36, width: 1, height: 0.34 },
  },
  /* Le tre del blocco «Laboratorio», tutte in 4:5 perche' stiano in fila. */
  {
    out: "lavorazione",
    src: "7d0a87de.jpg", // Higgsfield 7d0a87de
    w: 900,
    crop: { left: 0, top: 0.4, width: 0.62, height: 0.58 },
  },
  {
    out: "galatina",
    src: "1f0a4b81.jpg", // Higgsfield 1f0a4b81
    w: 900,
    crop: { left: 0, top: 0.12, width: 1, height: 0.7 },
  },
  {
    out: "squadra",
    src: "d462dc5f.jpg", // Higgsfield d462dc5f
    w: 900,
    crop: { left: 0, top: 0.28, width: 1, height: 0.7 },
  },
];

fs.mkdirSync(OUT, { recursive: true });

for (const job of LAVORI) {
  const file = path.join(SRC, job.src);
  if (!fs.existsSync(file)) {
    console.warn(`manca ${job.src}: la foto non comparira' in pagina`);
    continue;
  }
  /* Prima si raddrizza secondo l'EXIF, poi si misura: le foto del telefono
     arrivano coricate e con l'orientamento scritto a parte. */
  const dritta = await sharp(file).rotate().toBuffer();
  const { width: W = 0, height: H = 0 } = await sharp(dritta).metadata();
  const base = sharp(dritta)
    .extract({
      left: Math.round(job.crop.left * W),
      top: Math.round(job.crop.top * H),
      width: Math.round(job.crop.width * W),
      height: Math.round(job.crop.height * H),
    })
    .resize({ width: job.w, withoutEnlargement: true })
    .modulate({ saturation: 0.85 })
    .linear(1.04, -4);

  await base.clone().avif({ quality: 52, effort: 6 }).toFile(`${OUT}/${job.out}.avif`);
  await base.clone().webp({ quality: 72 }).toFile(`${OUT}/${job.out}.webp`);
  await base.clone().jpeg({ quality: 78, mozjpeg: true }).toFile(`${OUT}/${job.out}.jpg`);
  const meta = await sharp(`${OUT}/${job.out}.jpg`).metadata();
  const kb = (fs.statSync(`${OUT}/${job.out}.avif`).size / 1024).toFixed(0);
  console.log(`${job.out.padEnd(12)} ${meta.width}x${meta.height}  avif ${kb} KB`);
}
