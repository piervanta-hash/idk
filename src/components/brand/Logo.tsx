/* ==========================================================================
   MARCHIO PALORYN

   Il segno e' quello gia' in uso accanto alla scritta Dematerializzare
   (`icon.svg` del sito attuale), ripreso qui alla geometria originale:
   un arco e tre raggi a terminali arrotondati che convergono in un punto
   sotto l'arco. E' la sagoma di uno scanner planetario — braccio della
   camera e fascio di luce sul documento — e da quella luce viene anche il
   cyan d'accento.

   Rispetto all'originale cambia solo il colore, che qui non e' mai fissato:
   lo eredita dal testo (`currentColor`), cosi' il segno resta bianco sul
   fondo nero e nero sulla tessera senza duplicare il file.

   Regole: non ruotare, non deformare, non ricolorare, nessuna ombra.
   Sotto i 24px si usa la tessera piena (`tile`); dove la tessera non e'
   praticabile, sotto i 20px il tratto si assottiglia da solo.
   ========================================================================== */

/* Riquadro utile del segno dentro il sistema di coordinate originale
   (100x100): l'arco e i raggi occupano solo questa porzione. Ritagliare qui
   evita che il marchio si rimpicciolisca dentro un quadrato mezzo vuoto. */
const BOX = { x: 23.5, y: 32.5, w: 53, h: 26 };
const RATIO = BOX.w / BOX.h;

/* Spessore del tratto. Sette e' l'originale e vale ovunque il marchio sia
   leggibile; cinque e' la variante sottile per le misure piccole.

   Il motivo e' geometrico, non estetico: i tre raggi distano undici unita'
   l'uno dall'altro, quindi con il tratto a sette ne restano quattro di
   spazio vuoto. Sotto i venti pixel quattro unita' valgono meno di due
   pixel e mezzo: i raggi si saldano fra loro e il segno diventa una
   macchia. Con il tratto a cinque lo spazio raddoppia e il segno resta
   leggibile.

   Rimane preferibile la tessera piena quando lo spazio e' davvero minimo:
   questa variante serve dove la tessera non si puo' usare, per esempio
   accanto a del testo. */
const STROKE = { regular: 7, thin: 5 } as const;

/* Geometria originale, invariata: cambia solo lo spessore del tratto. */
function Glyph({ weight = STROKE.regular }: { weight?: number }) {
  return (
    <g
      transform="translate(0 -6)"
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="round"
    >
      <path d="M28,58 Q50,28 72,58" />
      <line x1="39" y1="47" x2="39" y2="61" transform="rotate(-29.7 39 54)" />
      <line x1="50" y1="42" x2="50" y2="56" />
      <line x1="61" y1="47" x2="61" y2="61" transform="rotate(29.7 61 54)" />
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
