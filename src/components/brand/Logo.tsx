/* ==========================================================================
   MARCHIO PALORYN
   "Segno simmetrico a tre punti equidistanti con terminali arrotondati."

   Il file vettoriale originale non era disponibile, quindi il segno e' stato
   ridisegnato da quella descrizione. Ne esistono due letture, entrambe
   costruite qui e messe a confronto nella pagina di stile: va scelta una.

   Regole valide per entrambe: non ruotare, non deformare, non ricolorare,
   nessuna ombra. Sotto i 24px si usa la tessera piena (variant "tile").
   ========================================================================== */

type Mark = "triad" | "node";

type LogoProps = {
  /** "triad": tre punti pieni. "node": tre tratti convergenti. */
  mark?: Mark;
  /** Lato del segno in px. Sotto 24 passare a tile. */
  size?: number;
  /** Tessera piena: il segno e' ritagliato dentro un quadrato pieno. */
  tile?: boolean;
  className?: string;
  title?: string;
};

/* Geometria condivisa: tre posizioni a 120 gradi, vertice in alto.
   Centro 50,50 su viewBox 100. */
const ANGLES = [-90, 30, 150] as const;
const point = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180;
  return [50 + r * Math.cos(rad), 50 + r * Math.sin(rad)] as const;
};

export function Logo({
  mark = "triad",
  size = 32,
  tile = false,
  className,
  title = "Paloryn",
}: LogoProps) {
  const id = `logo-${mark}${tile ? "-tile" : ""}`;

  /* Lettura 1 — TRIADE: i tre punti sono tre dischi equidistanti. */
  const triad = ANGLES.map((a) => {
    const [cx, cy] = point(a, 30);
    return <circle key={a} cx={cx} cy={cy} r={11.5} />;
  });

  /* Lettura 2 — NODO: i tre punti sono i terminali arrotondati di tre
     tratti che convergono al centro senza toccarsi. */
  const node = ANGLES.map((a) => {
    const [x1, y1] = point(a, 14);
    const [x2, y2] = point(a, 34);
    return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} />;
  });

  /* Il colore non e' mai dichiarato sui singoli elementi: lo impone il <g>
     che li contiene. Serve perche' nella tessera il segno va sottratto in
     nero dentro la maschera, e un colore inline la romperebbe. */
  const glyph = (paint: string) => (
    <g
      fill={mark === "triad" ? paint : "none"}
      stroke={mark === "node" ? paint : "none"}
      strokeWidth={13}
      strokeLinecap="round"
    >
      {mark === "triad" ? triad : node}
    </g>
  );

  if (tile) {
    /* Tessera piena: il segno e' sottratto dal quadrato, non sovrapposto.
       Il glifo e' rimpicciolito per lasciare un margine dentro la tessera,
       altrimenti sotto i 24px i terminali toccano il bordo. */
    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className={className}
        role="img"
        aria-label={title}
      >
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
          <rect width="100" height="100" fill="#fff" />
          <g transform="translate(50 50) scale(0.74) translate(-50 -50)">
            {glyph("#000")}
          </g>
        </mask>
        <rect width="100" height="100" fill="currentColor" mask={`url(#${id})`} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label={title}
    >
      {glyph("currentColor")}
    </svg>
  );
}
