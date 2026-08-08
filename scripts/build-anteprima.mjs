/* ==========================================================================
   ANTEPRIMA IN UNA PAGINA SOLA

   Impacchetta TUTTE le pagine del sito, nelle due lingue, in un unico file
   HTML che non fa nessuna richiesta esterna: caratteri e fotografie
   diventano dati incorporati, gli script del framework spariscono, e quel
   poco di comportamento che serve viene riscritto in linea.

   I collegamenti funzionano: un piccolo instradatore intercetta i clic e
   scambia il contenuto, cosi' si gira il sito come se fosse in rete. Anche
   il menu del telefono e lo scambio di lingua.

   Serve a far vedere il sito a chi non ha un computer da sviluppatore: un
   file, un indirizzo, si apre anche dal telefono e anche senza rete.

   Non e' il sito: e' una sua fotografia funzionante. Le animazioni fatte in
   CSS ci sono tutte, e le due che contano - la scaffalatura e l'estrazione
   - vengono riavviate a ogni cambio pagina. Quello che dipende davvero da
   React, come il filtro dei casi studio o l'invio dei moduli, resta fermo
   nel suo stato di riposo.

   Si rilancia con il sito acceso su localhost:3000:

       node scripts/build-anteprima.mjs
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";

const BASE = "http://localhost:3000";
const ROOT = process.cwd();

const PAGES = [
  "/it",
  "/it/dematerializzazione",
  "/it/anamnesis",
  "/it/clienti",
  "/it/investitori",
  "/it/azienda",
  "/en",
  "/en/digitization",
  "/en/anamnesis",
  "/en/customers",
  "/en/investors",
  "/en/about",
];

const get = async (u) => (await fetch(BASE + u)).text();
const getBuf = async (u) => Buffer.from(await (await fetch(BASE + u)).arrayBuffer());

/* --- 1. Il foglio di stile, una volta sola ------------------------------- */
const first = await get(PAGES[0]);
const cssHref = first.match(/href="(\/_next\/static\/[^"]+\.css)"/)?.[1];
if (!cssHref) throw new Error("foglio di stile non trovato");
let css = await get(cssHref);

/* --- 2. I caratteri, come dati incorporati ------------------------------- */
const fonts = [...new Set([...css.matchAll(/url\(\.\.\/media\/([^)]+\.woff2)\)/g)].map((m) => m[1]))];
for (const f of fonts) {
  const b = await getBuf("/_next/static/media/" + f);
  css = css.split("../media/" + f).join(`data:font/woff2;base64,${b.toString("base64")}`);
}
console.log(`caratteri incorporati: ${fonts.length}`);

/* --- 3. Le fotografie ----------------------------------------------------
   Compaiono su piu' pagine, e ripetere la stessa immagine dodici volte
   gonfierebbe il file. Vanno in una tabella sola, e nelle pagine restano dei
   segnaposti che l'instradatore sostituisce al momento di mostrarle. */
const photos = new Map();
for (const rel of fs.readdirSync(path.join(ROOT, "public/img/archilives"))) {
  if (!rel.endsWith(".avif")) continue;
  const b = fs.readFileSync(path.join(ROOT, "public/img/archilives", rel));
  photos.set(rel.replace(".avif", ""), `data:image/avif;base64,${b.toString("base64")}`);
}
console.log(`fotografie incorporate: ${photos.size}`);

/* --- 4. Ogni pagina ------------------------------------------------------ */
const bodies = {};
let htmlClass = "";

for (const url of PAGES) {
  let html = url === PAGES[0] ? first : await get(url);
  htmlClass ||= html.match(/<html[^>]*class="([^"]*)"/)?.[1] ?? "";

  let body = html.match(/<body[^>]*>([\s\S]*)<\/body>/)?.[1] ?? "";

  body = body
    .replace(/<script[^>]*src="[^"]*"[^>]*><\/script>/g, "")
    .replace(/<script>self\.__next[\s\S]*?<\/script>/g, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/g, "");

  /* Le tre estensioni della stessa foto puntano al medesimo segnaposto. */
  for (const base of photos.keys()) {
    for (const ext of ["avif", "webp", "jpg"]) {
      body = body.split(`/img/archilives/${base}.${ext}`).join(`#foto:${base}`);
    }
  }

  /* Fuori dall'ASCII si passa alle entita' numeriche: la pagina resta
     corretta qualunque codifica dichiari chi la ospita. */
  bodies[url] = body.replace(/[^\x00-\x7F]/g, (ch) => "&#" + ch.codePointAt(0) + ";");
}

/* --- 5. Le variabili dei caratteri ---------------------------------------
   Sono definite su una classe che nel sito sta su <html>. Qui l'involucro e'
   un div, e i token che le usano stanno su :root, che non le vedrebbe. */
const vars = [...new Set([...css.matchAll(/(--ff-[a-z-]+:[^;}]+)/g)].map((m) => m[1]))];

/* --- 6. L'instradatore, in linea ----------------------------------------- */
const script = `
(function () {
  var PAGES = ${JSON.stringify(Object.keys(bodies))};
  var FOTO = ${JSON.stringify(Object.fromEntries(photos))};
  var store = document.getElementById('pagine');
  var view = document.getElementById('vista');
  document.documentElement.classList.add('js');

  function reveal(root) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    root.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    // l'estrazione parte quando arriva sullo schermo, come nel sito
    var io2 = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('ex-run'); io2.unobserve(e.target); }
      });
    }, { threshold: 0.25 });
    root.querySelectorAll('.ex-root').forEach(function (el) { io2.observe(el); });
  }

  function menu(root) {
    // Il menu del telefono nel sito lo apre React. Qui se ne costruisce uno
    // essenziale con gli stessi collegamenti: serve a girare le pagine.
    var btn = root.querySelector('header button');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var open = document.getElementById('menu-anteprima');
      if (open) { open.remove(); return; }
      var box = document.createElement('div');
      box.id = 'menu-anteprima';
      box.style.cssText = 'position:fixed;inset:4rem 0 0;z-index:90;background:var(--color-bg);padding:2rem 1.25rem;display:flex;flex-direction:column;gap:1.25rem';
      root.querySelectorAll('header nav a, header a[href^="/"]').forEach(function (a) {
        if (!a.getAttribute('href') || a.closest('[aria-label="Paloryn"]')) return;
        var c = a.cloneNode(true);
        c.style.cssText = 'font-family:var(--font-mono);font-size:1.125rem;color:var(--color-max);text-transform:uppercase;letter-spacing:.08em';
        box.appendChild(c);
      });
      root.appendChild(box);
    });
  }

  function mostra(url) {
    if (!PAGES.includes(url)) url = PAGES[0];
    var tpl = store.querySelector('template[data-url="' + url + '"]');
    view.innerHTML = tpl.innerHTML;
    // le fotografie tornano al loro posto
    view.querySelectorAll('img, source').forEach(function (el) {
      ['src', 'srcset'].forEach(function (attr) {
        var v = el.getAttribute(attr);
        if (v && v.indexOf('#foto:') === 0) el.setAttribute(attr, FOTO[v.slice(6)] || '');
      });
    });
    reveal(view);
    menu(view);
    window.scrollTo(0, 0);
    try { history.replaceState(null, '', '#' + url); } catch (e) {}
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="/"]');
    if (!a) return;
    var href = a.getAttribute('href').split('#')[0];
    var frag = a.getAttribute('href').split('#')[1];
    if (PAGES.includes(href)) {
      e.preventDefault();
      var m = document.getElementById('menu-anteprima');
      if (m) m.remove();
      mostra(href);
      if (frag) {
        var t = view.querySelector('#' + frag);
        if (t) t.scrollIntoView();
      }
    } else if (href.indexOf('/') === 0) {
      // pagina non impacchettata: si resta dove si e'
      e.preventDefault();
    }
  });

  mostra((location.hash || '').slice(1) || PAGES[0]);
})();
`;

const out = `<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Paloryn — anteprima del sito</title>
<style>${css}
:root{${vars.join(";")}}
/* L'anteprima vive dentro la pagina che la ospita: il fondo va imposto. */
body { margin:0; background: var(--color-bg, #0a0a0a); }
</style>
<div id="vista" class="${htmlClass}"></div>
<div id="pagine" hidden>${Object.entries(bodies)
  .map(([url, b]) => `<template data-url="${url}">${b}</template>`)
  .join("")}</div>
<script>${script}<\/script>`;

fs.writeFileSync(path.join(ROOT, "anteprima-home.html"), out);
console.log(`pagine: ${PAGES.length} — scritto ${(out.length / 1024 / 1024).toFixed(2)} MB`);
