"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

/* ==========================================================================
   IL FILM IN TESTATA

   E' il film della campagna, nella lingua di chi legge: l'archivista che
   va in pensione, la domanda «da domani, chi risponde?», la risposta di
   Paloryn. In quarantasette secondi dice quello che la pagina spiega sotto.

   COME SI COMPORTA, e perche'.

   Parte da solo, senza audio. Un video che parte con l'audio e' il modo
   piu' rapido per far chiudere una scheda; i browser infatti lo vietano. Il
   film e' fatto per reggere muto: ha i testi a schermo. L'audio si accende
   con un tocco, ed e' un comando vero, non un'icona da indovinare.

   Parte solo quando e' sullo schermo, e si ferma quando esce: un video che
   continua a girare mentre si legge altro consuma batteria e traffico per
   niente.

   Non scarica nulla finche' non serve (`preload="none"`). Prima c'e' un
   fotogramma fermo di poche decine di kilobyte: la pagina si apre alla
   stessa velocita' di prima, e i tre megabyte del film arrivano dopo.

   Non parte affatto se chi guarda ha chiesto meno movimento o il risparmio
   dati. In quel caso resta il fotogramma con il comando «Riproduci»: il
   film si puo' vedere lo stesso, ma lo decide chi guarda.
   ========================================================================== */

type Labels = {
  /** Che cos'e' il video, per chi non lo vede. */
  title: string;
  play: string;
  pause: string;
  soundOn: string;
  soundOff: string;
};

export function HeroFilm({
  src,
  poster,
  labels,
  inset = false,
}: {
  src: string;
  poster: string;
  labels: Labels;
  /** Dentro la colonna della pagina invece che da bordo a bordo. */
  inset?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  /* Se l'ha fermato chi guarda, non lo si fa ripartire da soli quando
     torna sullo schermo: una pausa chiesta e' una pausa. */
  const fermatoAMano = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const meno = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const risparmio =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
      true;
    if (meno || risparmio) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!fermatoAMano.current) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      fermatoAMano.current = false;
      v.play().catch(() => {});
    } else {
      fermatoAMano.current = true;
      v.pause();
    }
  };

  const sound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    /* Chi accende l'audio vuole sentire il film: se era fermo, riparte. */
    if (!next && v.paused) {
      fermatoAMano.current = false;
      v.play().catch(() => {});
    }
  };

  return (
    <figure className="m-0">
      {/* A TUTTA LARGHEZZA. Il film e' la cosa piu' forte che l'azienda ha:
          in una colonna da 780 pixel, con un bordo intorno, sembrava una
          foto d'archivio. Qui va da un bordo all'altro dello schermo, come
          al cinema. Non viene mai ritagliato: i testi impressi stanno in alto
          e in basso, e un ritaglio li taglierebbe a meta'. Solo sugli
          schermi piu' larghi del 16:9 (gli ultrawide) il film si ferma
          all'altezza dello schermo e restano due bande ai lati, nere come
          il fondo. */}
      <div className={"relative bg-bg" + (inset ? " border border-line" : "")}>
        <video
          ref={ref}
          className="mx-auto block aspect-video max-h-[100svh] w-full object-contain"
          src={asset(src)}
          poster={asset(poster)}
          width={1280}
          height={720}
          muted
          loop
          playsInline
          preload="none"
          aria-label={labels.title}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>

      {/* I comandi stanno sotto il film, non sopra: sopra coprirebbero i
          testi a schermo, che sono meta' del film. */}
      <figcaption
        className={
          (inset ? "" : "shell ") + "flex items-center justify-between gap-4 border-b border-line"
        }
      >
        <button
          type="button"
          onClick={toggle}
          className="eyebrow inline-flex min-h-11 items-center gap-3 transition-colors hover:text-max"
        >
          <span
            aria-hidden="true"
            className={
              "block h-1.5 w-1.5 rounded-full " + (playing ? "bg-accent" : "bg-mute")
            }
          />
          {playing ? labels.pause : labels.play}
        </button>
        <button
          type="button"
          onClick={sound}
          aria-pressed={!muted}
          className="eyebrow inline-flex min-h-11 items-center transition-colors hover:text-max"
        >
          {muted ? labels.soundOn : labels.soundOff}
        </button>
      </figcaption>
    </figure>
  );
}
