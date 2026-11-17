import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Headline } from "@/components/home/Headline";
import { Extraction } from "@/components/pages/Extraction";
import { Matrix } from "@/components/home/Matrix";
import { Measurements } from "@/components/home/Measurements";
import { OperationsMap } from "@/components/home/OperationsMap";
import { SelectedWork } from "@/components/home/SelectedWork";
import { EventPhotos } from "@/components/home/EventPhotos";
import { HeroFilm } from "@/components/home/HeroFilm";
import { Films } from "@/components/home/Films";
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
        {/* LA TESTATA.

            Due righe e il film. In alto la frase della campagna, a sinistra,
            e accanto — in basso, allineate alla sua ultima riga — la frase
            che dice che cosa fa l'azienda e i due comandi. Sotto, il film da
            un bordo all'altro dello schermo.

            Prima il film stava in una colonna, dentro un bordo, sotto un
            titolo su tre righe: a uno schermo di computer se ne vedeva un
            quarto, e sembrava una fotografia d'archivio. Adesso la prima
            schermata e' quasi tutta film, ed e' giusto: e' la cosa piu'
            forte che l'azienda ha, e dice in quarantasette secondi quello
            che la pagina dice in tutto il resto.

            Nota per chi tocchera' il titolo: e' volutamente concettuale. Il
            peso descrittivo lo portano il titolo del documento e la riga di
            testo accanto; se si toglie una delle due, la pagina smette di
            dire di che cosa parla. */}
        <section>
          <div className="shell">
            <div className="flex items-baseline justify-between gap-6 border-b border-line pt-4 pb-3">
              <span className="eyebrow">{t.hero.mark}</span>
              <span className="eyebrow text-right">{t.hero.place}</span>
            </div>

            {/* Il titolo prende tutta la riga: in una colonna da otto
                dodicesimi «memoria» non ci stava e il browser la spezzava in
                «memo-ria». Sotto, in una riga sola, la frase e i comandi. */}
            <div className="pt-10 pb-10 md:pt-14 lg:pb-12">
              <Headline text={t.hero.title} />
              <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
                <p className="measure text-body-l text-copy">{t.hero.lead}</p>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                  <ButtonLink href={t.hero.primary.href} variant="primary" size="md">
                    {t.hero.primary.label}
                  </ButtonLink>
                  <ButtonLink href={t.hero.secondary.href} variant="secondary" size="md" arrow>
                    {t.hero.secondary.label}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>

          <HeroFilm src={film.src} poster={film.poster} labels={t.hero.film} />
        </section>

        <div className="shell">
          {/* PALORYN RISPONDE. E INDICA LA FONTE. La frase dei film, e sotto
              l'estrazione che la fa vedere: un campo alla volta, e toccando
              un campo il documento mostra da dove viene. */}
          <Section id="extraction" eyebrow={t.data.extraction.eyebrow} aside={next()}>
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
            />
          </Section>

          {/* GLI SCENARI. Quattro film, quattro mercati, la stessa domanda.
              Stanno subito dopo l'estrazione perche' rispondono alla domanda
              che l'estrazione lascia aperta: d'accordo, ma a chi serve? */}
          <Section id="scenarios" eyebrow={t.films.eyebrow} aside={next()}>
            <Reveal>
              <h2 className="measure-wide mb-12 text-d3 font-display font-semibold text-balance">
                {t.films.title}
              </h2>
            </Reveal>
            <Films items={films} labels={t.films.labels} />
            <p className="mt-4 text-small text-label">{t.films.note}</p>
          </Section>

          {/* LA SQUADRA. Una fotografia sola, grande, a colori: e' l'unico
              punto della pagina in cui l'azienda mostra chi la fa. Sta
              subito dopo gli scenari: dopo «che cosa succede» viene «chi lo
              fa», prima dei numeri. Compare
              solo se il file c'e' — vedi src/lib/photos.ts. */}
          {team && (
            <Section id="team" eyebrow={t.team.eyebrow} aside={next()}>
              <Reveal>
                <figure className="m-0">
                  <picture>
                    <source srcSet={asset(`/img/archilives/${t.team.base}.avif`)} type="image/avif" />
                    <source srcSet={asset(`/img/archilives/${t.team.base}.webp`)} type="image/webp" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asset(`/img/archilives/${t.team.base}.jpg`)}
                      alt={t.team.alt}
                      width={1600}
                      height={1000}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full border border-line"
                    />
                  </picture>
                  <figcaption className="mt-3 font-mono text-data text-label">
                    {t.team.caption}
                  </figcaption>
                </figure>
              </Reveal>
            </Section>
          )}

          <Section id="capabilities" eyebrow={t.matrix.eyebrow} aside={next()}>
            <Reveal>
              <h2 className="measure-wide mb-12 text-d3 font-display font-semibold">
                {t.matrix.title}
              </h2>
              <Matrix columns={t.matrix.columns} rows={t.matrix.rows} />
            </Reveal>
          </Section>

          <Section id="measurements" eyebrow={t.measurements.eyebrow} aside={next()}>
            <Reveal>
              <Measurements items={t.measurements.items} />
            </Reveal>
          </Section>

          <Section id="operations" eyebrow={t.map.eyebrow} aside={next()}>
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
              <Reveal>
                <h2 className="text-d3 font-display font-semibold">{t.map.title}</h2>
                <p className="measure mt-6 text-body text-copy">{t.map.lead}</p>
              </Reveal>
              <Reveal delay={120}>
                <OperationsMap nodes={t.map.nodes} legend={t.map.legend} />
              </Reveal>
            </div>
          </Section>

          <Section id="work" eyebrow={t.work.eyebrow} aside={next()}>
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
          <Section id="field" eyebrow={t.photos.eyebrow} aside={next()}>
            <Reveal>
              <EventPhotos
                caption={t.photos.caption}
                source={t.photos.source}
                featured={present(t.photos.featured)}
                reel={present(t.photos.reel)}
              />
            </Reveal>
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
