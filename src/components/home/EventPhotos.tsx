/* ==========================================================================
   FOTOGRAFIE DELL'EVENTO

   Materiale proprietario e autentico: l'info day ARCHILIVES ai Cantieri
   Teatrali Koreja. Sono le prime immagini vere del sito e valgono piu' di
   qualsiasi stock.

   Trattamento come da brief: sempre dentro un riquadro, mai a pieno formato
   invasivo, con una desaturazione decisa perche' convivano con la palette.
   Il colore torna al passaggio del mouse — non decora, dice che la foto e'
   vera e che sotto la patina tecnica c'e' una sala piena di gente.

   NOTA OPERATIVA. I quattro file non sono nel repository: non posso scrivere
   immagini su disco da questa sessione. Il componente e' pronto e mostra un
   riquadro dimensionato finche' `available` resta false. Per attivarle:
   mettere i file in public/img/archilives/ con i nomi indicati qui sotto e
   passare `available: true` nel contenuto.
   ========================================================================== */

type Photo = {
  src: string;
  alt: string;
  credit?: string;
};

export function EventPhotos({
  caption,
  source,
  photos,
  available,
  pending,
}: {
  caption: string;
  source: string;
  photos: readonly Photo[];
  available: boolean;
  pending: string;
}) {
  return (
    <figure className="m-0">
      <div className="grid grid-cols-2 gap-px bg-line lg:grid-cols-4">
        {photos.map((p) => (
          <div key={p.src} className="group flex flex-col bg-bg">
            <div className="relative aspect-[4/3] overflow-hidden bg-surface-1">
              {available ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover grayscale-[85%] brightness-90 contrast-[1.05] transition-[filter] duration-500 group-hover:grayscale-0"
                />
              ) : (
                <div className="flex h-full w-full items-end p-4">
                  <span className="eyebrow text-mute">{pending}</span>
                </div>
              )}
            </div>
            {/* Striscia di attribuzione ad altezza fissa: le celle restano
                allineate anche quando il nome non c'e'. */}
            <div className="flex min-h-11 items-center px-3 py-2">
              {p.credit && (
                <span className="font-mono text-data text-strong">{p.credit}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <figcaption className="mt-3 flex flex-col gap-2 border-t border-line pt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <span className="text-small text-copy">{caption}</span>
        <span className="eyebrow shrink-0">{source}</span>
      </figcaption>
    </figure>
  );
}
