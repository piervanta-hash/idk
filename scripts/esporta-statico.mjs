/* ==========================================================================
   ESPORTAZIONE STATICA

   Costruisce il sito come cartella di file, da mettere su qualunque spazio
   web senza server — GitHub Pages compreso. Serve a far vedere il sito
   funzionante a chi non ha un computer da sviluppatore: le animazioni, le
   modali, i moduli, il menu del telefono, tutto quello che dipende dal
   browser c'e' davvero, perche' e' lo stesso codice.

   Due cose non possono esserci senza un server, e vengono tolte prima di
   costruire:
     - l'endpoint che spedisce i moduli (src/app/api);
     - il reindirizzamento di lingua sulla radice (src/proxy.ts).

   I due file vengono spostati fuori, non cancellati, e rimessi al loro
   posto alla fine — anche se la costruzione fallisce.

   NOTA PER CHI TOCCHERA' QUESTO SCRIPT. La prima versione teneva la riserva
   in una cartella dentro il progetto e la ripuliva all'avvio: lanciandolo
   due volte di fila, la seconda ripulitura cancellava i file della prima e
   se li portava via. Adesso la riserva sta fuori dal progetto, in una
   cartella temporanea nuova a ogni esecuzione, e il ripristino e' in un
   `finally`. Non spostare mai un file senza aver gia' scritto la riga che
   lo rimette a posto.

   Uso:  node scripts/esporta-statico.mjs [percorso-di-base]
   ========================================================================== */

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = process.cwd();
const BASE_PATH = process.argv[2] ?? "";

/* Ogni voce: dove sta nel progetto, e dove viene messa al riparo. */
const riparo = fs.mkdtempSync(path.join(os.tmpdir(), "paloryn-export-"));
const SPOSTATI = ["src/app/api", "src/proxy.ts"]
  .map((rel) => ({ rel, from: path.join(ROOT, rel), to: path.join(riparo, rel.replace(/\//g, "__")) }))
  .filter((f) => fs.existsSync(f.from));

function metti_al_riparo() {
  for (const f of SPOSTATI) {
    fs.renameSync(f.from, f.to);
    console.log(`fuori dal build: ${f.rel}`);
  }
}

function rimetti_a_posto() {
  for (const f of SPOSTATI) {
    if (!fs.existsSync(f.to)) continue;
    fs.mkdirSync(path.dirname(f.from), { recursive: true });
    fs.renameSync(f.to, f.from);
    console.log(`rimesso: ${f.rel}`);
  }
  fs.rmSync(riparo, { recursive: true, force: true });
}

metti_al_riparo();
try {
  execFileSync("npx", ["next", "build"], {
    stdio: "inherit",
    env: { ...process.env, ANTEPRIMA: "1", BASE_PATH },
  });
} finally {
  rimetti_a_posto();
}

/* GitHub Pages passa i file attraverso Jekyll, che ignora tutto quello che
   comincia per underscore — e Next mette i suoi file proprio in `_next`.
   Questo file vuoto disattiva Jekyll. */
fs.writeFileSync(path.join(ROOT, "out", ".nojekyll"), "");

const pagine = fs
  .readdirSync(path.join(ROOT, "out"), { recursive: true })
  .filter((f) => String(f).endsWith("index.html")).length;
console.log(`\nesportate ${pagine} pagine in out/${BASE_PATH ? ` (base ${BASE_PATH})` : ""}`);
