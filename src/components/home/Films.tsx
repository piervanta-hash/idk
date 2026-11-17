"use client";

import { useCallback, useState } from "react";
import { asset } from "@/lib/asset";
import { useDialog } from "@/lib/useDialog";

/* ==========================================================================
   I QUATTRO FILM DI SCENARIO

   Quattro situazioni, quattro mercati: l'accesso agli atti in un comune,
   l'esposizione di una banca dopo un'alluvione, la storia di una rete, la
   portata di un viadotto. Stessa domanda in tutti e quattro: la risposta
   esiste, sta sulla carta, e qualcuno deve trovarla adesso.

   IN PAGINA ci sono quattro fotogrammi fermi, non quattro video. Un video
   pesa uno o due megabyte; quattro video che partono insieme pesano come
   tutto il resto del sito messo assieme, e nessuno ne guarda quattro alla
   volta. Il film si scarica solo quando lo si apre.

   SI APRE IN UNA FINESTRA, grande, con i comandi veri del browser (pausa,
   volume, schermo intero). I film sono verticali e hanno i testi a schermo:
   dentro una scheda larga 280 pixel i testi non si leggerebbero.

   LA LINGUA. Ogni film e' nella lingua della pagina quando quella versione
   esiste. Dove non esiste si mostra quella inglese e lo si dichiara con la
   sigla sulla scheda: meglio un film in inglese con scritto «EN» che una
   scheda che manca.
   ========================================================================== */

export type Film = {
  id: string;
  /** Il mercato: «Comuni», «Banche e assicurazioni»… */
  sector: string;
  /** La frase del film. */
  title: string;
  /** Durata gia' scritta, es. «0:30». */
  duration: string;
  src: string;
  poster: string;
  /** Proporzione del video, per riservargli lo spazio giusto. */
  ratio: "4/5" | "9/16";
  /** Sigla della lingua del video, se non e' quella della pagina. */
  lang?: string;
};

type Labels = { watch: string; close: string };

export function Films({ items, labels }: { items: readonly Film[]; labels: Labels }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = items.find((f) => f.id === openId) ?? null;

  /* Stabile: se cambiasse a ogni disegno, la finestra si rimonterebbe da
     sola e il fuoco tornerebbe indietro mentre e' ancora aperta. */
  const chiudi = useCallback(() => setOpenId(null), []);
  const panelRef = useDialog(!!open, chiudi);

  return (
    <>
      {/* SUL TELEFONO sono righe, non schede: anteprima stretta a sinistra e
          testo a destra. In due colonne da 160 pixel i titoli andavano a
          capo a ogni parola — in macedone «хипотекарен» occupava una riga
          da solo. Da 640 pixel in su tornano schede, due e poi quattro. */}
      <ul className="m-0 grid list-none gap-px border border-line bg-line p-0 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((f, i) => (
          <li key={f.id} className="bg-bg">
            <button
              type="button"
              onClick={() => setOpenId(f.id)}
              className="group flex h-full w-full flex-row text-left sm:flex-col"
            >
              <span className="relative block aspect-[4/5] w-28 shrink-0 self-start overflow-hidden bg-surface-1 sm:w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={asset(f.poster)}
                  alt=""
                  width={720}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="block h-full w-full object-cover brightness-90 transition-[filter,transform] duration-500 group-hover:scale-[1.02] group-hover:brightness-100"
                />
              </span>

              {/* NIENTE SOPRA L'IMMAGINE. I fotogrammi hanno gia' i testi
                  del film impressi dentro, e tutte le inquadrature ne hanno
                  uno: qualunque cosa ci si appoggi sopra finisce addosso a
                  una frase. Numero, comando e durata stanno quindi sotto,
                  nella riga che apre la scheda. */}
              <span className="flex min-w-0 flex-1 flex-col gap-3 p-4 md:p-5">
                <span className="flex items-center justify-between gap-3">
                  <span className="eyebrow tabular">{String(i + 1).padStart(2, "0")}</span>
                  <span className="eyebrow tabular inline-flex items-center gap-2 text-strong transition-colors group-hover:text-accent">
                    <svg width="8" height="10" viewBox="0 0 12 14" aria-hidden="true">
                      <path d="M0 0 L12 7 L0 14 Z" fill="currentColor" />
                    </svg>
                    {f.lang ? `${f.lang} · ` : ""}
                    {f.duration}
                  </span>
                </span>
                <span className="eyebrow">{f.sector}</span>
                <span className="text-body font-display font-semibold text-strong text-pretty transition-colors group-hover:text-max md:text-body-l">
                  {f.title}
                </span>
                <span className="sr-only">
                  {labels.watch} · {f.duration}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-bg/95 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${open.sector} — ${open.title}`}
          onClick={(e) => e.target === e.currentTarget && chiudi()}
        >
          <div
            ref={panelRef}
            tabIndex={-1}
            className="flex max-h-full flex-col border border-line bg-bg focus:outline-none"
          >
            <div className="flex items-center justify-between gap-6 border-b border-line px-4">
              <span className="eyebrow">{open.sector}</span>
              <button
                type="button"
                onClick={chiudi}
                className="eyebrow inline-flex min-h-11 items-center gap-2 transition-colors hover:text-max"
              >
                {labels.close}
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            {/* Il film e' verticale: deve starci tutto, in altezza e in
                larghezza, senza scorrere. La larghezza e' la piu' piccola
                fra quella dello schermo e quella che l'altezza disponibile
                consente; l'altezza segue dalla proporzione. */}
            <video
              key={open.id}
              className="block h-auto bg-bg"
              style={{
                aspectRatio: open.ratio,
                width: `min(calc(100vw - 2rem - 2px), calc((100dvh - 7rem) * ${
                  open.ratio === "4/5" ? 0.8 : 0.5625
                }), 720px)`,
              }}
              src={asset(open.src)}
              poster={asset(open.poster)}
              controls
              autoPlay
              playsInline
              aria-label={open.title}
            />
          </div>
        </div>
      )}
    </>
  );
}
