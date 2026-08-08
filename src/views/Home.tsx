import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Conversion } from "@/components/home/Conversion";
import { Matrix } from "@/components/home/Matrix";
import { Measurements } from "@/components/home/Measurements";
import { OperationsMap } from "@/components/home/OperationsMap";
import { SelectedWork } from "@/components/home/SelectedWork";
import { EventPhotos } from "@/components/home/EventPhotos";
import { home } from "@/content/home";
import { present } from "@/lib/photos";
import { alternates, type Locale } from "@/lib/routes";

/* ==========================================================================
   HOME

   L'unico momento orchestrato forte e' l'hero. Tutto il resto e' silenzioso:
   comparse sobrie in ingresso, un contatore sulle misure, un impulso lento
   sulla rotta della mappa.

   Ogni sezione si apre con un'etichetta mono su una hairline e poi da'
   subito la cosa concreta: nessun paragrafo introduttivo di raccordo.
   ========================================================================== */

const TITLE = {
  en: "Paloryn — a data company for paper archives",
  it: "Paloryn — società di dati per gli archivi di carta",
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
      locale,
      type: "website",
    },
  };
}

export function HomeView({ locale }: { locale: Locale }) {
  const t = home[locale];

  return (
    <>
      <Header locale={locale} page="home" />

      <main id="main">
        {/* LA TESTATA E' UNA SCHEDA, non un annuncio.

            Intestazione in alto come su una scheda di catalogo, poi una
            frase che dice che cosa e' l'azienda, poi - dentro la stessa
            cornice - la cosa che l'azienda fa, che avviene sotto gli occhi
            di chi legge. Testo e grafica non sono due blocchi affiancati:
            sono lo stesso oggetto, e per questo la pagina non somiglia a
            una qualunque pagina di lancio. */}
        <section className="shell pt-10 pb-24 md:pt-14 md:pb-32">
          <div className="border border-line">
            <div className="flex items-baseline justify-between gap-6 border-b border-line px-5 py-3 md:px-8">
              <span className="eyebrow">{t.hero.mark}</span>
              <span className="eyebrow text-right">{t.hero.place}</span>
            </div>

            <div className="px-5 py-12 md:px-8 md:py-16">
              <h1 className="measure-wide text-d2 font-display font-bold text-max">
                {t.hero.title}
              </h1>

              <p className="measure-wide mt-8 text-body-l text-copy">{t.hero.lead}</p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <ButtonLink href={t.hero.primary.href} variant="primary" size="lg">
                  {t.hero.primary.label}
                </ButtonLink>
                <ButtonLink href={t.hero.secondary.href} variant="secondary" size="lg" arrow>
                  {t.hero.secondary.label}
                </ButtonLink>
              </div>
            </div>

            <Conversion
              from={t.hero.convert.from}
              to={t.hero.convert.to}
              replay={t.hero.convert.replay}
              note={t.hero.convert.note}
              fields={t.hero.convert.fields}
            />
          </div>
        </section>

        <div className="shell">
          <Section id="capabilities" eyebrow={t.matrix.eyebrow} aside="01" size="lg">
            <Reveal>
              <h2 className="measure-wide mb-12 text-d3 font-display font-semibold">
                {t.matrix.title}
              </h2>
              <Matrix columns={t.matrix.columns} rows={t.matrix.rows} />
            </Reveal>
          </Section>

          <Section id="measurements" eyebrow={t.measurements.eyebrow} aside="02" size="lg">
            <Reveal>
              <Measurements items={t.measurements.items} />
            </Reveal>
          </Section>

          <Section id="operations" eyebrow={t.map.eyebrow} aside="03" size="lg">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
              <Reveal>
                <h2 className="text-d3 font-display font-semibold">{t.map.title}</h2>
                <p className="measure mt-6 text-body text-copy">{t.map.lead}</p>
                <div className="mt-10 border-t border-line pt-4">
                  <span className="eyebrow block text-max">{t.map.nodes.lecce.name}</span>
                  <span className="mt-1 block text-small text-mute">
                    {t.map.nodes.lecce.role}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <OperationsMap nodes={t.map.nodes} legend={t.map.legend} />
              </Reveal>
            </div>
          </Section>

          <Section id="work" eyebrow={t.work.eyebrow} aside="04" size="lg">
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
              dell'azienda: sta piu' in basso dei progetti, occupa una
              colonna piu' stretta e ha il respiro verticale normale
              invece di quello ampio. Le fotografie restano, il peso no. */}
          <Section id="field" eyebrow={t.photos.eyebrow} aside="05">
            <Reveal className="max-w-3xl">
              <EventPhotos
                caption={t.photos.caption}
                source={t.photos.source}
                featured={present(t.photos.featured)}
                reel={present(t.photos.reel)}
              />
            </Reveal>
          </Section>

          <Section id="contact" eyebrow={t.cta.eyebrow} aside="06" size="lg">
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
