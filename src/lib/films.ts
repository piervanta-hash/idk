import type { Locale } from "@/lib/routes";

/* ==========================================================================
   QUALE FILM, IN QUALE LINGUA

   I film della campagna non esistono in tutte le lingue: il film principale
   e quello sull'accesso agli atti si', gli altri in due o quattro. Questa
   tabella dice quale file c'e'; dove manca, la pagina mostra la versione
   inglese e lo dichiara con la sigla sulla scheda.

   I file stanno in public/video/: `<nome>-<lingua>.mp4` e il fotogramma di
   anteprima `<nome>-<lingua>.webp`, preparati da scripts/build-films.sh.
   ========================================================================== */

const LINGUE: Record<string, readonly Locale[]> = {
  atti: ["en", "it", "sq", "sr", "mk"],
  fiume: ["en", "it", "sq", "sr"],
  reti: ["en", "it"],
  viadotto: ["en", "it"],
};

/* Il film sull'alluvione e' l'unico che in albanese e serbo esiste solo in
   formato verticale da telefono (9:16); gli altri sono 4:5. */
const VERTICALI = new Set(["fiume-sq", "fiume-sr"]);

const DURATA: Record<string, string> = {
  atti: "0:30",
  fiume: "0:45",
  reti: "0:33",
  viadotto: "0:15",
};

export function filmFor(id: string, locale: Locale) {
  const lang = LINGUE[id]?.includes(locale) ? locale : "en";
  const file = `${id}-${lang}`;
  return {
    src: `/video/${file}.mp4`,
    poster: `/video/${file}.webp`,
    ratio: VERTICALI.has(file) ? ("9/16" as const) : ("4/5" as const),
    duration: DURATA[id] ?? "",
    lang: lang === locale ? undefined : lang.toUpperCase(),
  };
}

/** Il film principale esiste in tutte e cinque le lingue. */
export function heroFilm(locale: Locale) {
  return { src: `/video/film-${locale}.mp4`, poster: "/video/film-poster.webp" };
}
