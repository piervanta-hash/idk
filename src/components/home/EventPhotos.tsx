"use client";

import { useRef } from "react";

/* ==========================================================================
   FOTOGRAFIE DELL'EVENTO

   Materiale proprietario e autentico: l'info day ARCHILIVES ai Cantieri
   Teatrali Koreja. Sono le uniche immagini vere del sito e valgono piu' di
   qualsiasi stock.

   IMPAGINAZIONE. Due grandi a sinistra, quelle con il nome, e a destra un
   carosello di quattro piu' piccole: il salto di scala fa da confronto e da
   ritmo. I nomi stanno dentro il riquadro, in basso: una striscia sotto
   ogni foto sarebbe rimasta vuota su quelle senza nome, e vuota e' brutta.

   TRATTAMENTO, come da brief: sempre dentro un riquadro, mai a pieno
   formato invasivo, desaturate perche' convivano con la palette. Il colore
   torna al passaggio del mouse — non decora, dice che la foto e' vera.

   FORMATI. AVIF con ricaduta su WebP e JPEG, generati da
   scripts/build-photos.mjs alla misura in cui compaiono davvero. Tutte
   caricate pigramente: stanno sotto la prima schermata.
   ========================================================================== */

type Shot = { base: string; alt: string; credit?: string };

function Frame({
  shot,
  width,
  height,
  sizes,
  priority = false,
}: {
  shot: Shot;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure className="group relative m-0 overflow-hidden bg-surface-1">
      <picture>
        <source srcSet={`/img/archilives/${shot.base}.avif`} type="image/avif" sizes={sizes} />
        <source srcSet={`/img/archilives/${shot.base}.webp`} type="image/webp" sizes={sizes} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/img/archilives/${shot.base}.jpg`}
          alt={shot.alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="block h-full w-full object-cover grayscale-[85%] brightness-90 contrast-[1.05] transition-[filter] duration-500 group-hover:grayscale-0"
        />
      </picture>

      {shot.credit && (
        <figcaption className="absolute inset-x-0 bottom-0">
          {/* Sfumatura appena percettibile: il nome deve leggersi anche su
              una parete chiara, senza che sembri una didascalia incollata. */}
          <span className="block bg-gradient-to-t from-bg/85 to-transparent px-4 pt-10 pb-4 font-mono text-data text-max">
            {shot.credit}
          </span>
        </figcaption>
      )}
    </figure>
  );
}

export function EventPhotos({
  caption,
  source,
  featured,
  reel,
  reelLabel,
  nav,
}: {
  caption: string;
  source: string;
  featured: readonly Shot[];
  reel: readonly Shot[];
  reelLabel: string;
  nav: { prev: string; next: string };
}) {
  const reelRef = useRef<HTMLUListElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = reelRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    /* Le due colonne non hanno la stessa altezza — due foto grandi impilate
       valgono il doppio di una fila di piccole — e forzarle a pareggiare
       vorrebbe dire ritagliare via mezzo fotogramma. Restano allineate in
       alto, e lo spazio che avanza a destra lo occupa la didascalia. */
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-start lg:gap-8">
      {/* Le due grandi, con il nome dentro il riquadro */}
      <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-1">
        {featured.map((s) => (
          <div key={s.base} className="aspect-[4/3] bg-bg lg:aspect-[3/2]">
            <Frame shot={s} width={1400} height={1050} sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        ))}
      </div>

      {/* Il carosello, piu' piccolo: e' il confronto di scala */}
      <div>
        <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
          <span className="eyebrow">{reelLabel}</span>
          <span className="flex gap-px">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              className="flex h-11 w-11 items-center justify-center border border-line text-strong transition-colors hover:border-accent hover:text-max"
            >
              <span className="sr-only">{nav.prev}</span>
              <span aria-hidden="true">&larr;</span>
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              className="flex h-11 w-11 items-center justify-center border border-line text-strong transition-colors hover:border-accent hover:text-max"
            >
              <span className="sr-only">{nav.next}</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </span>
        </div>

        <ul
          ref={reelRef}
          className="m-0 mt-px flex snap-x snap-mandatory list-none gap-px overflow-x-auto p-0"
        >
          {reel.map((s) => (
            <li
              key={s.base}
              className="aspect-[4/3] w-[62%] shrink-0 snap-start bg-surface-1 sm:w-[42%] lg:w-[52%]"
            >
              <Frame shot={s} width={900} height={675} sizes="(min-width: 1024px) 24vw, 60vw" />
            </li>
          ))}
        </ul>

        <div className="mt-4 border-t border-line pt-3">
          <p className="text-small text-copy">{caption}</p>
          <span className="eyebrow mt-2 block">{source}</span>
        </div>
      </div>
    </div>
  );
}
