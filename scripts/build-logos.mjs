/* ==========================================================================
   PREPARAZIONE DEI MARCHI DEI COMMITTENTI

   Gli originali sono materiale disomogeneo: stemmi comunali in SVG da mezzo
   megabyte l'uno (uno arriva a cinque), un paio di PNG a bassa risoluzione,
   un logo bianco su trasparente. Metterli in pagina cosi' com'e' sarebbe
   scaricare qualche megabyte per una striscia alta quaranta pixel.

   Qui vengono portati tutti alla stessa condizione:

     1. RASTERIZZATI a tre volte l'altezza a cui compaiono. Gli SVG degli
        stemmi hanno migliaia di tracciati: disegnarli e' lavoro per il
        telefono a ogni ridisegno della striscia, che qui scorre di
        continuo. Un raster della misura giusta si disegna una volta.

     2. RIFILATI dei margini trasparenti. Ogni file ne ha di suoi, e senza
        rifilarli i marchi in fila sembrano allineati male anche quando
        non lo sono.

     3. IN SCALA DI GRIGI e riportati in una banda di luminosita' comune.
        Sul nero un marchio scuro sparisce e uno bianco pieno acceca; e
        soprattutto, otto marchi presi da otto fonti diverse hanno otto
        pesi diversi, e in fila si vede solo il piu' chiaro. La mappatura
        li porta tutti nella stessa banda: nessuno domina, la striscia si
        legge come una striscia.

     4. SCRITTI in AVIF e WebP, con un PNG di riserva.

   Si rilancia con:  node scripts/build-logos.mjs <cartella-sorgenti>
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = process.argv[2];
const OUT = "public/img/marchi";

if (!SRC) {
  console.error("Uso: node scripts/build-logos.mjs <cartella-sorgenti>");
  process.exit(1);
}

/* Altezza in pagina: 44px. Si esporta a tre volte tanto per gli schermi ad
   alta densita' e non oltre — un marchio non e' una fotografia. */
const H = 132;

/* nome in uscita → file sorgente, e dove serve il ritaglio da applicare
   prima di tutto il resto.

   L'ordine e' quello in cui compaiono nella striscia: i due marchi con un
   disegno proprio — il teatro e la curia — stanno distanziati, cosi' non
   si formano blocchi di scudi comunali tutti uguali di fila.

   IL RITAGLIO DELLA CURIA. Il file consegnato dal committente ha il nome
   scritto sotto l'emblema, su tre righe. Gli altri otto marchi sono soli
   emblemi, e la striscia non porta nomi: lasciarlo intero avrebbe messo
   in fila otto figure e una scritta. Si tiene la sola edicola con il
   vescovo, che e' il segno; il nome per esteso resta dove serve, nella
   griglia dei casi studio.

   Il ritaglio e' in pixel perche' questo file e' uno solo e non cambia.
   Se un giorno arriva una versione diversa, il numero va rimisurato: la
   scritta comincia a 592 pixel dall'alto. */
const MARCHI = [
  { out: "koreja", src: "koreja-bianco.png" },
  { out: "galatina", src: "Galatina-Stemma.png" },
  { out: "squinzano", src: "Squinzano-Stemma.svg" },
  { out: "matino", src: "Matino-Stemma.svg" },
  {
    out: "curia",
    src: "curia.jpg",
    crop: { left: 0, top: 0, width: 900, height: 560 },
  },
  { out: "avetrana", src: "Avetrana-Stemma.svg" },
  { out: "torricella", src: "Torricella-Stemma.png" },
  { out: "maglie", src: "Maglie-Stemma.png" },
  { out: "otranto", src: "Otranto-Stemma.png" },
];

/* La banda di luminosita' in cui devono cadere tutti. Non si arriva mai al
   bianco pieno: su fondo nero un bianco pieno e' piu' acceso del testo dei
   titoli, e la striscia dei clienti non deve gridare piu' della pagina. */
const MIN = 78;
const MAX = 214;

/* IL FONDO BIANCO VA TOLTO, E NON BASTA RIFILARE.

   Meta' degli stemmi arriva come PNG opaco con il fondo bianco: rifilare i
   bordi non serve a niente, perche' il bianco non e' un margine, e' dentro
   l'immagine. In fila su nero diventavano quattro rettangoli chiari con
   dentro uno stemma — l'esatto contrario di una striscia di marchi.

   Non si puo' pero' cancellare "tutto il bianco": dentro lo scudo di
   bianco ce n'e', ed e' disegno. Quello da togliere e' il bianco che
   circonda lo stemma, cioe' quello raggiungibile dal bordo senza mai
   attraversare una linea. Si parte dai quattro lati e ci si allarga
   finche' il colore resta vicino a quello di partenza: dove comincia il
   contorno dello stemma l'espansione si ferma da sola, e il bianco
   interno resta al suo posto perche' non e' raggiungibile da fuori. */
async function scontorna(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: c } = info;

  /* Se e' gia' trasparente attorno, non c'e' niente da fare. */
  let opachi = 0;
  for (let i = 3; i < data.length; i += c) if (data[i] > 250) opachi++;
  if (opachi / (w * h) < 0.95) return buf;

  const seme = [data[0], data[1], data[2]];
  /* Un fondo bianco e' bianco. Se l'angolo e' scuro non e' un fondo: e'
     disegno che arriva fino al bordo, e allora meglio non toccare niente. */
  if (seme[0] < 200 || seme[1] < 200 || seme[2] < 200) return buf;

  const TOLL = 34;
  const visto = new Uint8Array(w * h);
  const coda = [];
  const spingi = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = y * w + x;
    if (visto[p]) return;
    const i = p * c;
    if (
      Math.abs(data[i] - seme[0]) > TOLL ||
      Math.abs(data[i + 1] - seme[1]) > TOLL ||
      Math.abs(data[i + 2] - seme[2]) > TOLL
    )
      return;
    visto[p] = 1;
    coda.push(p);
  };

  for (let x = 0; x < w; x++) {
    spingi(x, 0);
    spingi(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    spingi(0, y);
    spingi(w - 1, y);
  }

  for (let k = 0; k < coda.length; k++) {
    const p = coda[k];
    const x = p % w;
    const y = (p - x) / w;
    spingi(x + 1, y);
    spingi(x - 1, y);
    spingi(x, y + 1);
    spingi(x, y - 1);
  }

  for (let p = 0; p < w * h; p++) if (visto[p]) data[p * c + 3] = 0;

  return sharp(data, { raw: { width: w, height: h, channels: c } }).png().toBuffer();
}

fs.mkdirSync(OUT, { recursive: true });

for (const m of MARCHI) {
  const file = path.join(SRC, m.src);
  if (!fs.existsSync(file)) {
    console.error(`  manca: ${m.src}`);
    continue;
  }

  /* Gli SVG si rasterizzano dichiarando la densita': altrimenti sharp li
     disegna alla misura nominale del file, che per uno stemma e' spesso
     un francobollo. */
  const base = sharp(file, { density: 600 });
  const meta = await base.metadata();
  if (m.crop) base.extract(m.crop);

  /* Prima si porta alla misura di lavoro, poi si scontorna, poi si rifila:
     scontornare sull'originale da tremila pixel costerebbe venti volte
     tanto per lo stesso risultato. */
  const grande = await base.resize({ height: H * 2, fit: "inside", withoutEnlargement: false }).toBuffer();
  const pulito = await scontorna(grande);

  const grigio = await sharp(pulito).trim({ threshold: 1 }).greyscale().toBuffer();

  /* Dove cade oggi questo marchio: si misura solo sui pixel che si vedono,
     perche' la media su tutta la tela la deciderebbe la trasparenza. */
  const { data, info } = await sharp(grigio)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let somma = 0;
  let n = 0;
  let minVisto = 255;
  let maxVisto = 0;
  for (let i = 0; i < data.length; i += info.channels) {
    if (data[i + 3] < 40) continue;
    const v = data[i];
    somma += v;
    n++;
    if (v < minVisto) minVisto = v;
    if (v > maxVisto) maxVisto = v;
  }
  const media = n ? somma / n : 128;

  /* Portata la gamma vista dentro la banda comune. Se il marchio e' gia'
     piatto (un logo di un colore solo) non c'e' gamma da stirare: lo si
     sposta e basta, sul valore medio della banda. */
  const gamma = maxVisto - minVisto;
  let slope;
  let offset;
  if (gamma < 24) {
    slope = 1;
    offset = (MIN + MAX) / 2 - media;
  } else {
    slope = (MAX - MIN) / gamma;
    offset = MIN - minVisto * slope;
  }

  const finale = sharp(grigio).linear(slope, offset).resize({ height: H, fit: "inside" });

  await finale.clone().avif({ quality: 62 }).toFile(path.join(OUT, `${m.out}.avif`));
  await finale.clone().webp({ quality: 82 }).toFile(path.join(OUT, `${m.out}.webp`));
  await finale.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT, `${m.out}.png`));

  const peso = fs.statSync(path.join(OUT, `${m.out}.avif`)).size;
  console.log(
    `  ${m.out.padEnd(12)} ${String(meta.format).padEnd(4)} ${String(meta.width) + "x" + meta.height}`.padEnd(34) +
      `→ media ${Math.round(media)} (${minVisto}-${maxVisto}) → ${Math.round(peso / 102.4) / 10} KB`,
  );
}

console.log(`\nmarchi in ${OUT}/`);
