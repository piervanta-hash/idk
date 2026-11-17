import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Headline } from "@/components/home/Headline";
import { Extraction } from "@/components/pages/Extraction";
import { Measurements } from "@/components/home/Measurements";
import { OperationsMap } from "@/components/home/OperationsMap";
import { SelectedWork } from "@/components/home/SelectedWork";
import { EventPhotos } from "@/components/home/EventPhotos";
import { HeroFilm } from "@/components/home/HeroFilm";
import { Films } from "@/components/home/Films";
import { HeroLoop } from "@/components/home/HeroLoop";
import { asset } from "@/lib/asset";
import { filmFor, heroFilm } from "@/lib/films";
import { home } from "@/content/home";
import { hasPhoto, present } from "@/lib/photos";
import { HTML_LANG, alternates, type Locale } from "@/lib/routes";

/* ==========================================================================
   HOME

   L'unico momento orchestrato forte e' l'hero. Tutto il resto e' silenzioso:
   comparse sobrie in ingresso, un contatore sulle misure, un impulso lento
   sulla rotta della mappa.

   Ogni sezione si apre con un'etichetta mono su una hairline e poi da'
   subito la cosa concreta: nessun paragrafo introduttivo di raccordo.
   ========================================================================== */

/* Il titolo del documento porta il peso descrittivo che la testata, volutamente
   concettuale, non porta: e' quello che compare nei risultati di ricerca. */
const TITLE: Record<Locale, string> = {
  en: "Paloryn — memory that answers, for paper archives",
  it: "Paloryn — la memoria che risponde, per gli archivi cartacei",
  sq: "Paloryn — kujtesa që përgjigjet, për arkivat në letër",
  sr: "Paloryn — memorija koja odgovara, za papirne arhive",
  mk: "Paloryn — меморија што одговара, за хартиени архиви",
};

export function homeMetadata(locale: Locale): Metadata {
  const t = home[locale];
  return {
    title: TITLE[locale],
    description: t.hero.lead,
    alternates: alternates("home", locale),
    openGraph: {
      title: TITLE[locale],
      description: t.hero.lead,
      locale: HTML_LANG[locale].replace("-", "_"),
      type: "website",
    },
  };
}

export function HomeView({ locale }: { locale: Locale }) {
  const t = home[locale];
  const film = heroFilm(locale);
  const films = t.films.items.map((f) => ({ ...f, ...filmFor(f.id, locale) }));
  const team = hasPhoto(t.team.base);

  /* I numeri a destra delle sezioni si contano, non si scrivono: la foto
     di gruppo compare solo quando c'e' il file, e senza di lei i numeri
     non devono saltare da 06 a 08. */
  let n = 0;
  const next = () => String(++n).padStart(2, "0");

  return (
    <>
      <Header locale={locale} page="home" />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        {/* LA TESTATA: IL FILM, CON DENTRO LE PAROLE.

            Il riquadro e' il film, da un bordo all'altro dello schermo, e il
            titolo, la frase e i pulsanti ci stanno dentro, in basso a
            sinistra. Il film qui e' il giro muto di sei secondi senza scritte
            (vedi HeroLoop): con il film intero le frasi impresse finivano
            sotto il titolo. Il film completo, con l'audio, si apre dal
            comando «Riproduci il film», che porta alla sezione Campagna.

            Due velature tengono leggibile il testo: da sinistra sul computer,
            dove la signora sta a destra; dal basso sul telefono, dove il
            riquadro e' verticale e il testo sta sotto di lei.

            Sul telefono il riquadro e' alto quasi quanto lo schermo e il
            film e' ritagliato sulla signora; sul computer ha le proporzioni
            del film (766 su 1600, cioe' il 47,875% della larghezza), mai meno
            di 600 pixel e mai piu' del 92% dello schermo. NON usare
            `aspect-ratio` insieme a un'altezza minima: il browser trasferisce
            il minimo alla larghezza, e su un tablet il riquadro usciva dallo
            schermo di 500 pixel.

            Nota per chi tocchera' il titolo: e' volutamente concettuale. Il
            peso descrittivo lo portano il titolo del documento e la riga di
            testo sotto; se si toglie una delle due, la pagina smette di dire
            di che cosa parla. */}
        <section className="relative isolate flex min-h-[86svh] flex-col justify-end overflow-hidden border-b border-line md:h-[clamp(600px,47.875vw,92svh)] md:min-h-0">
          <HeroLoop />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-bg from-30% via-bg/75 via-60% to-bg/10 md:bg-gradient-to-r md:from-0% md:via-50% md:from-bg/95 md:via-bg/55 md:to-bg/0"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 hidden h-1/3 bg-gradient-to-t from-bg/80 to-bg/0 md:block"
          />

          <div className="shell relative pt-28 pb-10 md:pb-14">
            <span className="eyebrow block text-strong">{t.hero.place}</span>
            <div className="mt-5 max-w-[48rem]">
              <Headline text={t.hero.title} max="6rem" />
            </div>
            <p className="measure mt-6 text-body-l text-strong">{t.hero.lead}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <ButtonLink href={t.hero.primary.href} variant="primary" size="md">
                {t.hero.primary.label}
              </ButtonLink>
              <ButtonLink
                href={t.hero.secondary.href}
                variant="secondary"
                size="md"
                arrow
                className="bg-bg/40 backdrop-blur-sm"
              >
                {t.hero.secondary.label}
              </ButtonLink>
              <a
                href="#film"
                className="eyebrow inline-flex min-h-11 items-center gap-2 text-strong transition-colors hover:text-accent sm:ml-4"
              >
                <svg width="8" height="10" viewBox="0 0 12 14" aria-hidden="true">
                  <path d="M0 0 L12 7 L0 14 Z" fill="currentColor" />
                </svg>
                {t.hero.film.play} · 0:47
              </a>
            </div>
          </div>
        </section>

        <div className="shell">
          {/* PALORYN RISPONDE. E INDICA LA FONTE. La frase dei film, e sotto
              l'estrazione che la fa vedere: un campo alla volta, e toccando
              un campo il documento mostra da dove viene. */}
          <Section id="extraction" eyebrow={t.data.extraction.eyebrow} aside={next()} size="sm">
            <Reveal>
              <h2 className="measure-wide mb-14 text-d2 font-display font-bold text-max text-balance">
                {t.data.title}
              </h2>
            </Reveal>
            <Extraction
              fields={t.data.extraction.fields}
              labels={t.data.extraction.labels}
              docHead={t.data.extraction.docHead}
              note={t.data.extraction.note}
              pace="40vh"
            />
          </Section>

          <Section id="measurements" eyebrow={t.measurements.eyebrow} aside={next()} size="sm">
            <Reveal>
              <Measurements items={t.measurements.items} />
            </Reveal>
          </Section>

          <Section id="operations" eyebrow={t.map.eyebrow} aside={next()} size="sm">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
              <Reveal>
                <h2 className="text-d3 font-display font-semibold">{t.map.title}</h2>
                <p className="measure mt-6 text-body text-copy">{t.map.lead}</p>

                {/* IL TEAM. La foto di gruppo e' uno scatto da telefono largo
                    1125 pixel: a tutta pagina si sgranava, in un francobollo
                    non si riconosceva nessuno. Prende la larghezza della
                    colonna di sinistra (circa 600 pixel), dove regge, nello
                    spazio che la mappa lasciava vuoto sotto il testo: le
                    persone accanto ai posti in cui lavorano, senza una
                    sezione in piu' da scorrere. */}
                {team && (
                  <figure className="m-0 mt-10 border-t border-line pt-6">
                    <picture className="block">
                      <source srcSet={asset(`/img/archilives/${t.team.base}.avif`)} type="image/avif" />
                      <source srcSet={asset(`/img/archilives/${t.team.base}.webp`)} type="image/webp" />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={asset(`/img/archilives/${t.team.base}.jpg`)}
                        alt={t.team.alt}
                        width={1125}
                        height={810}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full border border-line"
                      />
                    </picture>
                    <figcaption className="mt-3 font-mono text-data text-copy">{t.team.caption}</figcaption>
                  </figure>
                )}
              </Reveal>
              <Reveal delay={120}>
                <OperationsMap nodes={t.map.nodes} legend={t.map.legend} />
              </Reveal>
            </div>
          </Section>

          <Section id="work" eyebrow={t.work.eyebrow} aside={next()} size="sm">
            <Reveal>
              <h2 className="measure-wide mb-12 text-d3 font-display font-semibold">
                {t.work.title}
              </h2>
              <SelectedWork
                items={t.work.items}
                alsoLabel={t.work.alsoLabel}
                also={t.work.also}
                cta={t.work.cta}
              />
            </Reveal>
          </Section>

          {/* ARCHILIVES e' una commessa fra le altre, non il mestiere
              dell'azienda: sta piu' in basso dei progetti e ha il respiro
              verticale normale invece di quello ampio. La gerarchia la fanno
              la posizione e l'altezza dei riquadri, non una larghezza
              mozzata: con un `max-w-3xl` le persone venivano tagliate. */}
          <Section id="field" eyebrow={t.photos.eyebrow} aside={next()} size="sm">
            <Reveal>
              <EventPhotos
                caption={t.photos.caption}
                source={t.photos.source}
                featured={present(t.photos.featured)}
                reel={present(t.photos.reel)}
              />
            </Reveal>
          </Section>

          {/* LA CAMPAGNA. I film stanno qui, verso la fine, e si chiamano per
              quello che sono: film della campagna, con scene ricostruite.
              Prima il principale, in grande; poi i quattro scenari, uno per
              mercato. Messi in apertura facevano sembrare l'azienda uno spot;
              qui, dopo le foto vere, i clienti e i numeri, raccontano lo
              stesso lavoro in un'altra forma. */}
          <Section id="scenarios" eyebrow={t.films.eyebrow} aside={next()} size="sm">
            <Reveal>
              <h2 className="measure-wide mb-12 text-d3 font-display font-semibold text-balance">
                {t.films.title}
              </h2>
            </Reveal>
            <div id="film" className="mb-px scroll-mt-24">
              <HeroFilm src={film.src} poster={film.poster} labels={t.hero.film} inset />
            </div>
            <div className="mt-10">
              <Films items={films} labels={t.films.labels} />
            </div>
            <p className="mt-4 text-small text-label">{t.films.note}</p>
          </Section>

          <Section id="contact" eyebrow={t.cta.eyebrow} aside={next()}>
            <Reveal>
              <h2 className="text-d2 font-display font-bold">{t.cta.title}</h2>
              <p className="measure-wide mt-8 text-body-l text-copy">{t.cta.lead}</p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink href={t.cta.primary.href} variant="primary" size="lg">
                  {t.cta.primary.label}
                </ButtonLink>
                <ButtonLink href={t.cta.secondary.href} variant="secondary" size="lg" arrow>
                  {t.cta.secondary.label}
                </ButtonLink>
              </div>
            </Reveal>
          </Section>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
