/* ==========================================================================
   ANTEPRIMA IN UNA PAGINA SOLA

   Impacchetta la home in un unico file HTML che non fa nessuna richiesta
   esterna: caratteri e fotografie diventano dati incorporati, gli script
   del framework spariscono, e quel poco di comportamento che serve viene
   riscritto in linea.

   Serve a far vedere il sito a chi non ha un computer da sviluppatore:
   un file, un indirizzo, si apre anche dal telefono.

   Non e' il sito: e' una sua fotografia funzionante. Le animazioni fatte
   in CSS ci sono tutte; quello che dipende da React - il menu del
   telefono, il filtro dei casi studio, l'invio dei moduli - resta fermo
   nel suo stato di riposo.

   Si rilancia con il sito acceso su localhost:3000:

       node scripts/build-anteprima.mjs
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";

/* Impacchetta la home in un file solo: niente richieste esterne, quindi
   caratteri e immagini diventano dati incorporati. */
const BASE = "http://localhost:3000";
const ROOT = "/home/user/idk";

const get = async (u) => (await fetch(BASE + u)).text();
const getBuf = async (u) => Buffer.from(await (await fetch(BASE + u)).arrayBuffer());

let html = await get("/it");

// 1. il foglio di stile, incorporato
const cssHref = html.match(/href="(\/_next\/static\/[^"]+\.css)"/)?.[1];
if (!cssHref) throw new Error("foglio di stile non trovato");
let css = await get(cssHref);

// 2. i caratteri, come dati incorporati
const fonts = [...new Set([...css.matchAll(/url\(\.\.\/media\/([^)]+\.woff2)\)/g)].map(m => m[1]))];
for (const f of fonts) {
  const b = await getBuf("/_next/static/media/" + f);
  css = css.split("../media/" + f).join(`data:font/woff2;base64,${b.toString("base64")}`);
  console.log("carattere", path.basename(f), (b.length/1024).toFixed(0)+"KB");
}

// 3. le fotografie: si tiene solo l'AVIF, che pesa meno
const imgs = [...new Set([...html.matchAll(/\/img\/archilives\/([a-z0-9-]+)\.(avif|webp|jpg)/g)].map(m => m[0]))];
const dataFor = new Map();
for (const rel of imgs) {
  if (!rel.endsWith(".avif")) continue;
  const b = fs.readFileSync(path.join(ROOT, "public", rel));
  dataFor.set(rel, `data:image/avif;base64,${b.toString("base64")}`);
}
// srcset AVIF -> dati; le altre <source> e l'<img> puntano allo stesso dato
for (const [rel, d] of dataFor) {
  const base = rel.replace(".avif", "");
  html = html.split(base + ".avif").join(d).split(base + ".webp").join(d).split(base + ".jpg").join(d);
}

// 4. via tutti gli script del framework e i precaricamenti
html = html.replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, "");
html = html.replace(/<script>self\.__next[\s\S]*?<\/script>/g, "");
html = html.replace(/<link rel="preload"[^>]*as="script"[^>]*\/?>/g, "");
html = html.replace(/<link rel="preload"[^>]*as="font"[^>]*\/?>/g, "");
html = html.replace(/<link rel="stylesheet"[^>]*\/?>/g, "");

// 5. le classi dei caratteri stanno su <html>: si spostano su un involucro
const htmlClass = html.match(/<html[^>]*class="([^"]*)"/)?.[1] ?? "";
const body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] ?? "";

// 6. un po' di comportamento, tutto in linea
const script = `
  document.documentElement.classList.add('js');
  var root = document.getElementById('preview');
  // le comparse in scroll
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -10% 0px' });
  root.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  // la conversione parte quando si vede
  var conv = root.querySelector('.rs-run, [class*="rs-"]')?.closest('div');
  var band = root.querySelector('.st-run')?.closest('section');
  var target = root.querySelector('#field') ? null : null;
  var c = root.querySelector('div.relative.overflow-hidden');
  if (c) {
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('rs-run'); io2.unobserve(e.target); } });
    }, { threshold: 0.3 });
    io2.observe(c);
  }
`;

// 7. le variabili dei caratteri sono definite su una classe applicata a
//    <html>: qui l'involucro e' un div, e i token che le usano stanno su
//    :root, che non le vedrebbe. Si ridichiarano su :root.
const vars = [...css.matchAll(/(--ff-[a-z-]+:[^;}]+)/g)].map(m => m[1]);
const rootVars = ':root{' + [...new Set(vars)].join(';') + '}';

// 8. i caratteri non ASCII diventano entita' numeriche: cosi' la pagina
//    e' corretta qualunque codifica dichiari chi la ospita, e non
//    dipende da un <meta charset> che non controlliamo.
const safeBody = body.replace(/[^\x00-\x7F]/g, (ch) => '&#' + ch.codePointAt(0) + ';');

const out = `<style>${css}${rootVars}
/* L'anteprima vive dentro la pagina dell'artefatto: il fondo va imposto. */
body { margin:0; background: var(--color-bg, #0a0a0a); }
</style>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Paloryn — anteprima della home</title>
<div id="preview" class="${htmlClass}">${safeBody}</div>
<script>${script}<\/script>`;

fs.writeFileSync("/home/user/idk/anteprima-home.html", out);
console.log("scritto:", (out.length/1024/1024).toFixed(2), "MB");
