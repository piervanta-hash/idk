/* ==========================================================================
   FOTOGRAFIE DELL'EVENTO ARCHILIVES

   Materiale proprietario e autentico: l'info day ARCHILIVES ai Cantieri
   Teatrali Koreja. Sono le uniche immagini vere del sito, e stanno tutte
   qui — un solo blocco, non sparse per il sito.

   IMPAGINAZIONE. Due file. Sopra le tre persone dell'azienda, piu' grandi,
   tre per riga; sotto le quattro immagini della giornata, quattro per riga
   e quindi piu' piccole. Il salto di scala dice da solo chi conta e chi fa
   da contorno, senza bisogno di scriverlo.

   I nomi stanno DENTRO il riquadro, in basso: una striscia sotto la foto
   sarebbe rimasta vuota su quelle senza nome, e le file non avrebbero piu'
   pareggiato.

   Niente carosello: quattro immagini stanno in riga senza scorrimento, e
   una cosa che non scorre non puo' sfondare lo schermo in orizzontale.

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
}: {
  shot: Shot;
  width: number;
  height: number;
  sizes: string;
}) {
  /* Il contenuto scrive «Nome · Ruolo» in un campo solo; qui si separa. */
  const [name, role] = (shot.credit ?? "").split(" · ");

  return (
    <figure className="group relative m-0 aspect-[4/3] overflow-hidden bg-surface-1">
      <picture>
        <source srcSet={`/img/archilives/${shot.base}.avif`} type="image/avif" sizes={sizes} />
        <source srcSet={`/img/archilives/${shot.base}.webp`} type="image/webp" sizes={sizes} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/img/archilives/${shot.base}.jpg`}
          alt={shot.alt}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover grayscale-[85%] brightness-90 contrast-[1.05] transition-[filter] duration-500 group-hover:grayscale-0"
        />
      </picture>

      {shot.credit && (
        <figcaption className="absolute inset-x-0 bottom-0">
          {/* Sfumatura appena percettibile: il nome deve leggersi anche su
              una parete chiara, senza che sembri una didascalia incollata.

              Nome e ruolo vanno su due righe decise da noi. Su una riga
              sola andrebbero a capo dove capita — «Pierluigi Vantaggiato ·
              / Co-Founder» — e un ritorno a capo casuale si vede. */}
          <span className="block bg-gradient-to-t from-bg/90 to-transparent px-4 pt-12 pb-4 font-mono text-data">
            <span className="block text-max">{name}</span>
            {role && <span className="block text-mute">{role}</span>}
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
}: {
  caption: string;
  source: string;
  featured: readonly Shot[];
  reel: readonly Shot[];
}) {
  return (
    <div>
      {/* Le persone. Tre per riga su schermo largo, una sotto l'altra sul
          telefono: a 390px tre riquadri affiancati renderebbero le facce
          troppo piccole per riconoscerle. */}
      <ul className="m-0 grid list-none gap-px bg-line p-0 sm:grid-cols-3">
        {featured.map((s) => (
          <li key={s.base}>
            <Frame
              shot={s}
              width={1400}
              height={1050}
              sizes="(min-width: 640px) 32vw, 100vw"
            />
          </li>
        ))}
      </ul>

      {/* La giornata. Quattro per riga, quindi piu' piccole: fanno da
          contorno, non competono con i ritratti. */}
      <ul className="m-0 mt-px grid list-none grid-cols-2 gap-px bg-line p-0 sm:grid-cols-4">
        {reel.map((s) => (
          <li key={s.base}>
            <Frame
              shot={s}
              width={900}
              height={675}
              sizes="(min-width: 640px) 24vw, 50vw"
            />
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-line pt-3">
        <p className="measure text-small text-copy">{caption}</p>
        <span className="eyebrow">{source}</span>
      </div>
    </div>
  );
}
