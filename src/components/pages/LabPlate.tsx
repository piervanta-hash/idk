/* ==========================================================================
   LABORATORIO — SCHEMA DISEGNATO

   Serviva una fotografia di laboratorio. In questo ambiente non posso
   generare immagini fotografiche, quindi al suo posto c'e' un disegno nel
   linguaggio del sito: scanner planetario, braccio della camera, culla a
   supporto regolabile, cono di luce fredda sul documento.

   E' onesto — si vede a colpo d'occhio che e' un disegno, non una foto finta
   — e riprende la stessa figura del marchio, che e' uno scanner planetario.

   Il riquadro e' in 16:9, le proporzioni del prompt fotografico lasciato in
   docs/prompt-immagine-laboratorio.md: quando arriva la fotografia vera si
   sostituisce senza toccare il resto della pagina.
   ========================================================================== */

export function LabPlate({ caption, note }: { caption: string; note: string }) {
  return (
    <figure className="m-0">
      <div className="relative border border-line bg-surface-1">
        <svg viewBox="0 0 1600 900" className="block h-auto w-full" aria-hidden="true">
          {/* Scaffalature che rientrano in profondita' */}
          <g stroke="var(--color-line)" strokeWidth={1} fill="none">
            {[0, 1, 2, 3].map((i) => {
              const x = 60 + i * 150;
              const inset = i * 26;
              return (
                <g key={`l${i}`}>
                  <path d={`M ${x} ${210 + inset} H ${x + 118} V ${700 - inset} H ${x} Z`} />
                  {[0, 1, 2, 3, 4].map((r) => (
                    <line
                      key={r}
                      x1={x}
                      y1={210 + inset + ((490 - inset * 2) / 5) * (r + 1)}
                      x2={x + 118}
                      y2={210 + inset + ((490 - inset * 2) / 5) * (r + 1)}
                    />
                  ))}
                </g>
              );
            })}
            {[0, 1, 2, 3].map((i) => {
              const x = 1540 - i * 150;
              const inset = i * 26;
              return (
                <g key={`r${i}`}>
                  <path d={`M ${x} ${210 + inset} H ${x - 118} V ${700 - inset} H ${x} Z`} />
                  {[0, 1, 2, 3, 4].map((r) => (
                    <line
                      key={r}
                      x1={x}
                      y1={210 + inset + ((490 - inset * 2) / 5) * (r + 1)}
                      x2={x - 118}
                      y2={210 + inset + ((490 - inset * 2) / 5) * (r + 1)}
                    />
                  ))}
                </g>
              );
            })}
          </g>

          {/* Faldoni sui ripiani: la massa che entra in lavorazione */}
          <g fill="rgb(255 255 255 / 0.05)" stroke="var(--color-line)" strokeWidth={0.75}>
            {[0, 1, 2, 3].map((i) =>
              [0, 1, 2, 3, 4].map((r) => {
                const inset = i * 26;
                const x = 60 + i * 150;
                const h = (490 - inset * 2) / 5;
                const y = 210 + inset + h * r;
                return (
                  <rect key={`lb${i}${r}`} x={x + 6} y={y + h * 0.3} width={106} height={h * 0.62} />
                );
              }),
            )}
            {[0, 1, 2, 3].map((i) =>
              [0, 1, 2, 3, 4].map((r) => {
                const inset = i * 26;
                const x = 1540 - i * 150;
                const h = (490 - inset * 2) / 5;
                const y = 210 + inset + h * r;
                return (
                  <rect key={`rb${i}${r}`} x={x - 112} y={y + h * 0.3} width={106} height={h * 0.62} />
                );
              }),
            )}
          </g>

          {/* Pavimento del corridoio */}
          <g stroke="var(--color-line)" strokeWidth={0.75} opacity={0.7}>
            <line x1={660} y1={700} x2={790} y2={452} />
            <line x1={940} y1={700} x2={810} y2={452} />
            <line x1={718} y1={590} x2={882} y2={590} />
            <line x1={690} y1={645} x2={910} y2={645} />
          </g>

          {/* Scanner planetario in primo piano: colonna, braccio, camera */}
          <g stroke="var(--color-mute)" strokeWidth={2} fill="none" strokeLinecap="round">
            <line x1={800} y1={860} x2={800} y2={560} />
            <line x1={700} y1={860} x2={900} y2={860} />
            <path d="M 800 560 Q 800 500 870 500" />
            <rect x={846} y={470} width={52} height={34} rx={2} fill="var(--color-surface-2)" />
          </g>

          {/* Cono di luce fredda sul documento: unico cyan della figura */}
          <path
            d="M 872 508 L 986 690 L 758 690 Z"
            fill="rgb(0 194 209 / 0.07)"
            stroke="var(--color-accent)"
            strokeWidth={0.75}
            strokeDasharray="4 5"
          />

          {/* Culla a supporto regolabile e documento aperto */}
          <g stroke="var(--color-mute)" strokeWidth={2} fill="none" strokeLinecap="round">
            <path d="M 736 700 L 872 676 L 1008 700" />
            <path d="M 748 712 L 872 690 L 996 712" />
            <line x1={872} y1={676} x2={872} y2={700} />
          </g>
          {/* Le due facciate del documento aperto sulla culla */}
          <g fill="rgb(255 255 255 / 0.07)" stroke="var(--color-mute)" strokeWidth={1}>
            <path d="M 752 696 L 868 678 L 868 700 L 760 716 Z" />
            <path d="M 876 678 L 992 696 L 984 716 L 876 700 Z" />
          </g>
          <g stroke="var(--color-line)" strokeWidth={1}>
            {[0, 1, 2, 3].map((i) => (
              <line key={`a${i}`} x1={766} y1={702 + i * 3} x2={860} y2={688 + i * 3} />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <line key={`b${i}`} x1={884} y1={688 + i * 3} x2={978} y2={702 + i * 3} />
            ))}
          </g>
        </svg>
      </div>

      <figcaption className="mt-3 flex flex-col gap-2 border-t border-line pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <span className="text-small text-copy">{caption}</span>
        <span className="eyebrow shrink-0">{note}</span>
      </figcaption>
    </figure>
  );
}
