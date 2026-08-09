import type { NextConfig } from "next";

/* ==========================================================================
   CONFIGURAZIONE

   Due modi di costruire lo stesso sito.

   NORMALE — quello che va in produzione. Il sito gira su un server: il
   modulo di contatto spedisce davvero e il reindirizzamento di lingua sulla
   radice avviene prima che la pagina parta.

   ANTEPRIMA STATICA — `ANTEPRIMA=1 npm run build`. Sputa una cartella di
   file che si possono mettere su qualunque spazio web, GitHub Pages
   compreso, senza avere un server. Serve a far vedere il sito funzionante a
   chi non ha un computer da sviluppatore: le animazioni, i moduli, le
   modali, tutto quello che dipende dal browser c'e'.

   Le due cose che in anteprima non ci sono, e non possono esserci senza un
   server:
     - l'invio dei moduli, che infatti dichiara di non essere riuscito e
       mostra l'indirizzo da copiare;
     - il reindirizzamento di lingua sulla radice, che viene fatto dalla
       pagina stessa appena si apre.

   Il percorso di base serve perche' su GitHub Pages un progetto vive dentro
   una sottocartella con il nome del repository, non sulla radice del
   dominio.
   ========================================================================== */

const anteprima = process.env.ANTEPRIMA === "1";
const base = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* Il prefisso deve arrivare anche al browser: `src` e `srcSet` scritti a
     mano non li tocca nessuno, e senza questo le fotografie sull'anteprima
     venivano cercate un livello sopra dove stanno. Vedi src/lib/asset.ts. */
  env: { NEXT_PUBLIC_BASE_PATH: base },
  images: {
    formats: ["image/avif", "image/webp"],
    /* Senza server non c'e' chi ridimensioni le immagini al volo. Le nostre
       sono gia' preparate alla misura giusta da scripts/build-photos.mjs,
       quindi non si perde niente. */
    unoptimized: anteprima,
  },
  ...(anteprima
    ? {
        output: "export" as const,
        basePath: base || undefined,
        assetPrefix: base || undefined,
        /* Ogni pagina diventa una cartella con dentro index.html: e' il
           modo in cui uno spazio web statico serve gli indirizzi senza
           estensione. */
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
