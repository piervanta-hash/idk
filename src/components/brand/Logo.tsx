/* ==========================================================================
   MARCHIO PALORYN

   Il segno e' quello dei film e delle felpe: un arco e tre raggi a terminali
   arrotondati che partono dall'arco e convergono verso un punto sotto di
   esso. E' la sagoma di uno scanner planetario — braccio della camera e
   fascio di luce sul documento — e da quella luce viene anche il cyan
   d'accento.

   La versione precedente teneva i tre raggi staccati dall'arco. In quella
   attuale lo toccano e lo attraversano appena: il segno e' un pezzo solo, e
   regge meglio in piccolo perche' non ha piu' fessure sottili che si
   chiudono.

   La geometria e' stata ricalcata sul fotogramma finale del film principale
   (sovrapposizione al 99%), non ridisegnata a occhio.

   Il colore non e' mai fissato: lo eredita dal testo (`currentColor`), cosi'
   il segno resta bianco sul fondo nero e nero sulla tessera senza duplicare
   il file.

   Regole: non ruotare, non deformare, non ricolorare, nessuna ombra.
   Sotto i 24px si usa la tessera piena (`tile`).
   ========================================================================== */

/* Riquadro utile del segno dentro il sistema di coordinate (100x100):
   l'arco e i raggi occupano solo questa porzione. Ritagliare qui evita che
   il marchio si rimpicciolisca dentro un quadrato mezzo vuoto. */
const BOX = { x: 23.5, y: 32.5, w: 53, h: 26 };
const RATIO = BOX.w / BOX.h;

/* Spessore del tratto. 5,3 e' quello del marchio; 4,4 e' la variante
   sottile per le misure piccole, dove un tratto pieno chiuderebbe gli
   angoli fra i raggi e l'arco. */
const STROKE = { regular: 5.3, thin: 4.4 } as const;

/* L'UNICA copia della geometria. L'animazione d'ingresso la importa da qui;
   l'icona del browser (`src/app/icon.svg`) e' un file statico e ne tiene
   una copia a mano: se cambia questa, va cambiata anche quella. */
export function Glyph({ weight = STROKE.regular }: { weight?: number }) {
  return (
    <g fill="none" stroke="currentColor" strokeWidth={weight} strokeLinecap="round">
      <path d="M26.64,52.91 C32.71,44.99 40.17,37.07 50,37.07 S67.29,44.99 73.36,52.91" />
      <line x1="34.62" y1="42.22" x2="42.01" y2="55.15" />
      <line x1="50" y1="35.95" x2="50" y2="50.8" />
      <line x1="65.38" y1="42.22" x2="57.99" y2="55.15" />
    </g>
  );
}

type LogoProps = {
  /** Altezza in px del segno. La larghezza segue le proporzioni originali. */
  height?: number;
  /** Tessera piena: quadrato pieno con il segno ritagliato dentro. */
  tile?: boolean;
  /** Lato della tessera in px. Usato solo con `tile`. */
  size?: number;
  /** Forza il tratto sottile. Se non specificato lo decide l'altezza. */
  thin?: boolean;
  className?: string;
  title?: string;
};

export function Logo({
  height = 20,
  tile = false,
  size = 32,
  thin,
  className,
  title = "Paloryn",
}: LogoProps) {
  /* Sotto i venti pixel il tratto si assottiglia da solo: chi usa il
     marchio non deve ricordarsi una regola, la regola e' nel componente. */
  const weight = (thin ?? height < 20) ? STROKE.thin : STROKE.regular;

  if (tile) {
    /* Il segno e' sottratto dal quadrato, non sovrapposto: sotto i 24px la
       silhouette piena e' l'unica cosa che resta leggibile. Ingrandito di
       1,35 perche' alla scala naturale lascerebbe troppo margine. */
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={className}
        role="img"
        aria-label={title}
      >
        <mask id="paloryn-tile" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="#fff" />
          <g
            transform="translate(50 45.55) scale(1.35) translate(-50 -45.55)"
            style={{ color: "#000" }}
          >
            <Glyph />
          </g>
        </mask>
        <rect width="100" height="100" fill="currentColor" mask="url(#paloryn-tile)" />
      </svg>
    );
  }

  return (
    <svg
      viewBox={`${BOX.x} ${BOX.y} ${BOX.w} ${BOX.h}`}
      width={Math.round(height * RATIO)}
      height={height}
      className={className}
      role="img"
      aria-label={title}
    >
      <Glyph weight={weight} />
    </svg>
  );
}
