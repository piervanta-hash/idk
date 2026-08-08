import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { LinearMetre } from "@/components/home/LinearMetre";
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
  en: "Paloryn — data, extracted from paper",
  it: "Paloryn — dati, estratti dalla carta",
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
        <section className="shell pt-16 pb-24 md:pt-24 md:pb-32">
          <span className="eyebrow">{t.hero.eyebrow}</span>

          <h1 className="mt-8 text-d1 font-display font-bold text-max">{t.hero.title}</h1>

          <p className="measure-wide mt-8 text-body-l text-copy">{t.hero.lead}</p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <ButtonLink href={t.hero.primary.href} variant="primary" size="lg">
              {t.hero.primary.label}
            </ButtonLink>
            <ButtonLink href={t.hero.secondary.href} variant="secondary" size="lg" arrow>
              {t.hero.secondary.label}
            </ButtonLink>
          </div>

          {/* Il signature element prende tutta la larghezza: e' un righello,
              e un righello si legge per quanto e' lungo. */}
          <div className="mt-20 md:mt-28">
            <LinearMetre labels={t.hero.scanLabels} readout={t.hero.readout} />
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

          <Section id="field" eyebrow={t.photos.eyebrow} aside="05" size="lg">
            <Reveal>
              <EventPhotos
                caption={t.photos.caption}
                source={t.photos.source}
                featured={present(t.photos.featured)}
                reel={present(t.photos.reel)}
                reelLabel={t.photos.reelLabel}
                nav={t.photos.nav}
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
