/* ==========================================================================
   GENERAZIONE DELLA MAPPA DELLE SEDI

   La geometria e' quella vera: Natural Earth 1:50m, di pubblico dominio,
   distribuita nel pacchetto `world-atlas`. Non e' una costa ridisegnata a
   mano, sono i contorni reali.

   Lo script proietta i paesi che entrano nell'inquadratura, ritaglia sul
   riquadro, semplifica e scrive un file TypeScript con i tracciati gia'
   pronti. In pagina non arriva nessuna libreria di mappe, nessuna tessera,
   nessuna richiesta a servizi esterni: solo un SVG nostro, servito dal
   nostro dominio.

   Si rilancia con:  node scripts/build-map.mjs
   ========================================================================== */

import fs from "node:fs";
import { createRequire } from "node:module";
import * as topojson from "topojson-client";

const require = createRequire(import.meta.url);
const world = require("world-atlas/countries-50m.json");

/* --- Inquadratura -------------------------------------------------------
   Deve contenere Nizza a ovest, Zagabria a nord, l'Albania a est e il
   Salento a sud, con un po' di respiro attorno. */
const LON0 = 4.5;
const LON1 = 22.5;
const LAT0 = 37.5;
const LAT1 = 47.5;

const W = 900;
/* Correzione della latitudine media: senza, l'Italia esce schiacciata. */
const LAT_MID = ((LAT0 + LAT1) / 2) * (Math.PI / 180);
const H = Math.round((W * (LAT1 - LAT0)) / ((LON1 - LON0) * Math.cos(LAT_MID)));

const sx = W / (LON1 - LON0);
const sy = H / (LAT1 - LAT0);

const px = (lon) => (lon - LON0) * sx;
const py = (lat) => (LAT1 - lat) * sy;

/* Paesi che entrano nella vista. Il resto e' fuori riquadro e non serve. */
const KEEP = new Set([
  "Italy",
  "France",
  "Monaco",
  "Switzerland",
  "Austria",
  "Slovenia",
  "Croatia",
  "Bosnia and Herz.",
  "Montenegro",
  "Serbia",
  "Kosovo",
  "Albania",
  "North Macedonia",
  "Greece",
  "Hungary",
  "Slovakia",
  "Germany",
  "Czechia",
  "Tunisia",
  "Algeria",
  "Malta",
  "San Marino",
  "Vatican",
  "Andorra",
  "Spain",
]);

const fc = topojson.feature(world, world.objects.countries);
const margin = 2; // gradi di tolleranza sul ritaglio

function ringToPath(ring) {
  /* Fuori riquadro con margine: si scarta l'anello intero. */
  let anyInside = false;
  for (const [lon, lat] of ring) {
    if (
      lon > LON0 - margin &&
      lon < LON1 + margin &&
      lat > LAT0 - margin &&
      lat < LAT1 + margin
    ) {
      anyInside = true;
      break;
    }
  }
  if (!anyInside) return null;

  const pts = [];
  let prev = null;
  for (const [lon, lat] of ring) {
    const x = Math.round(px(lon) * 10) / 10;
    const y = Math.round(py(lat) * 10) / 10;
    /* Punti troppo vicini fra loro non aggiungono nulla al disegno e
       gonfiano il file: si saltano. */
    if (prev && Math.abs(x - prev[0]) < 1.1 && Math.abs(y - prev[1]) < 1.1) continue;
    pts.push([x, y]);
    prev = [x, y];
  }
  if (pts.length < 5) return null;

  /* Isolotti sotto i due pixel di lato: a schermo sono sporco. */
  const xs = pts.map((p) => p[0]);
  const ys = pts.map((p) => p[1]);
  const w = Math.max(...xs) - Math.min(...xs);
  const h = Math.max(...ys) - Math.min(...ys);
  if (w < 3 && h < 3) return null;

  return `M${pts.map(([x, y]) => `${x} ${y}`).join("L")}Z`;
}

const paths = [];
let kept = 0;

for (const f of fc.features) {
  const name = f.properties?.name;
  if (!KEEP.has(name)) continue;
  kept++;

  const polys =
    f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;

  for (const poly of polys) {
    for (const ring of poly) {
      const d = ringToPath(ring);
      if (d) paths.push(d);
    }
  }
}

const out = `/* GENERATO DA scripts/build-map.mjs — non modificare a mano.

   Confini reali, Natural Earth 1:50m (pubblico dominio) via world-atlas.
   Proiezione equirettangolare corretta sulla latitudine media
   dell'inquadratura. Ritagliato su longitudine ${LON0}-${LON1} e latitudine
   ${LAT0}-${LAT1}, semplificato per il disegno a schermo.

   Paesi inclusi: ${kept}. Anelli: ${paths.length}. */

export const MAP_W = ${W};
export const MAP_H = ${H};
export const MAP_LON0 = ${LON0};
export const MAP_LON1 = ${LON1};
export const MAP_LAT0 = ${LAT0};
export const MAP_LAT1 = ${LAT1};

/** Da coordinate geografiche a unita' di disegno della mappa. */
export const mapX = (lon: number) => (lon - ${LON0}) * ${sx.toFixed(6)};
export const mapY = (lat: number) => (${LAT1} - lat) * ${sy.toFixed(6)};

export const MAP_PATHS: readonly string[] = [
${paths.map((d) => `  "${d}",`).join("\n")}
];
`;

fs.mkdirSync("src/lib", { recursive: true });
fs.writeFileSync("src/lib/map-data.ts", out);

console.log(
  `paesi ${kept} · anelli ${paths.length} · viewBox ${W}x${H} · ${(out.length / 1024).toFixed(0)} KB`,
);
