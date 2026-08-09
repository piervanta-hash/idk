import { asset } from "@/lib/asset";

/* ==========================================================================
   LA STRISCIA DEI MARCHI

   Nove committenti, in scala di grigi, su un livello solo che scorre di
   continuo appena sopra il footer — come i sottotitoli di un
   telegiornale. Nessun nome sotto: chi riconosce lo stemma del proprio
   comune lo riconosce, e chi non lo riconosce non lo leggerebbe comunque.
   I nomi per esteso stanno nella griglia dei casi, che e' il posto dove
   servono davvero — qui serve il colpo d'occhio.

   NON SI VEDONO TUTTI INSIEME, ed e' il punto. Con i marchi piccoli e
   stretti, una fila intera stava dentro uno schermo largo: si vedevano
   tutti e nove fermi, e lo scorrimento diventava un dettaglio inutile
   perche' non entrava e non usciva niente. Adesso i marchi sono piu'
   grandi e il passo fra l'uno e l'altro e' largo: una fila misura piu'
   dello schermo, quindi qualcuno e' sempre fuori e arriva. E' quello che
   fa sembrare una striscia una striscia.

   PERCHE' SCORRE. Sette stemmi comunali fermi in fila sono sette
   rettangoli simili: corona muraria, scudo, corona d'alloro, e in mezzo un
   dettaglio di pochi pixel che li distingue. Fermi si leggono come uno
   ripetuto sette volte. In movimento passano uno per volta davanti all'occhio, e la
   differenza si vede. E' anche il motivo per cui si ferma al passaggio del
   mouse: chi vuole guardarne uno deve poterlo fare.

   IL GRIGIO E' COTTO NEL FILE, non applicato con un filtro. Un filtro CSS
   su ventisette immagini e' lavoro che il telefono rifa a ogni fotogramma di
   una striscia che non si ferma mai; e sopra tutto, gli originali arrivano
   da nove fonti diverse con nove pesi diversi, e in fila si sarebbe visto
   solo il piu' chiaro. scripts/build-logos.mjs li porta tutti nella stessa
   banda di luminosita' una volta sola, in fase di costruzione.

   TRE COPIE DELLA STESSA FILA, e lo scorrimento arriva a un terzo esatto:
   nel momento in cui l'animazione riparte da capo, la seconda copia si
   trova dove stava la prima e non si vede nessun salto.

   Tre e non due. Una fila sola misura circa mille pixel; con due copie, su
   uno schermo largo, l'ultimo marchio finiva prima del bordo destro e per
   mezzo giro restava un vuoto. Le copie sono `aria-hidden`: per un lettore
   di schermo i committenti sono nove, non ventisette.

   FERMA — con «riduci movimento», e senza JavaScript: le copie spariscono
   e la fila resta una sola, ferma, che si sposta di lato con il dito. Il
   livello resta uno anche li': una striscia che va a capo su due righe non
   e' piu' una striscia. Lo scorrimento e' chiuso nel riquadro, la pagina
   non si muove.
   ========================================================================== */

const MARCHI = [
  { file: "koreja", w: 125, name: "Cantieri Teatrali Koreja" },
  { file: "galatina", w: 102, name: "Comune di Galatina" },
  { file: "squinzano", w: 103, name: "Comune di Squinzano" },
  { file: "matino", w: 103, name: "Comune di Matino" },
  { file: "curia", w: 102, name: "Curia Arcivescovile di Lecce" },
  { file: "avetrana", w: 104, name: "Comune di Avetrana" },
  { file: "torricella", w: 100, name: "Comune di Torricella" },
  { file: "maglie", w: 101, name: "Comune di Maglie" },
  { file: "otranto", w: 91, name: "Comune di Otranto" },
];

const H = 132;

function Fila({ copia = false }: { copia?: boolean }) {
  return (
    <ul
      className={
        "mk-fila m-0 list-none gap-x-22 p-0 md:gap-x-44 " + (copia ? "mk-copia" : "")
      }
      aria-hidden={copia || undefined}
    >
      {MARCHI.map((m) => (
        <li key={m.file} className="shrink-0">
          <picture>
            <source srcSet={asset(`/img/marchi/${m.file}.avif`)} type="image/avif" />
            <source srcSet={asset(`/img/marchi/${m.file}.webp`)} type="image/webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(`/img/marchi/${m.file}.png`)}
              alt={copia ? "" : m.name}
              width={m.w}
              height={H}
              loading="lazy"
              decoding="async"
              /* Larghezza e altezza dichiarate: la striscia sta in fondo e
                 le immagini arrivano tardi: senza le misure, ognuna che
                 atterra sposterebbe quello che c'e' sotto. */
              className="block h-10 w-auto md:h-14"
            />
          </picture>
        </li>
      ))}
    </ul>
  );
}

export function ClientMarks() {
  return (
    <div className="mk border-t border-line py-10 md:py-12">
      <div className="mk-track">
        <Fila />
        <Fila copia />
        <Fila copia />
      </div>
    </div>
  );
}
