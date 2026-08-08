import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";
import { Reveal } from "@/components/ui/Reveal";
import { LinearMetre } from "@/components/home/LinearMetre";
import { Matrix } from "@/components/home/Matrix";
import { Measurements } from "@/components/home/Measurements";
import { OperationsMap } from "@/components/home/OperationsMap";
import { SelectedWork } from "@/components/home/SelectedWork";
import { EventPhotos } from "@/components/home/EventPhotos";
import { home } from "@/content/home";

const t = home.en;

export const metadata: Metadata = {
  title: "Paloryn — data, extracted from paper",
  description: t.hero.lead,
  alternates: {
    canonical: "/en",
    languages: { en: "/en", it: "/it" },
  },
  openGraph: {
    title: "Paloryn — data, extracted from paper",
    description: t.hero.lead,
    locale: "en",
    type: "website",
  },
};

/* ==========================================================================
   HOME — INGLESE

   L'unico momento orchestrato forte e' l'hero, come prescritto dal brief.
   Tutto il resto e' silenzioso: comparse sobrie all'ingresso di sezione, un
   contatore sulle misure, un impulso lento sulla rotta della mappa.

   Ogni sezione si apre con un'etichetta mono su una hairline e poi da'
   subito la cosa concreta. Nessun paragrafo introduttivo di raccordo.
   ========================================================================== */

function Section({
  id,
  eyebrow,
  aside,
  children,
}: {
  id: string;
  eyebrow: string;
  aside?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-24 md:py-32 lg:py-40">
      <Reveal as="header" className="mb-12 md:mb-16">
        <div className="flex items-baseline justify-between gap-6">
          <span className="eyebrow">{eyebrow}</span>
          {aside && <span className="eyebrow text-right">{aside}</span>}
        </div>
        <Rule className="mt-3" />
      </Reveal>
      {children}
    </section>
  );
}

export default function HomeEn() {
  return (
    <>
      <Header />

      <main id="main">
        {/* ---------------- HERO ---------------- */}
        <section className="shell pt-16 pb-24 md:pt-24 md:pb-32">
          <span className="eyebrow">{t.hero.eyebrow}</span>

          <h1 className="mt-8 text-d1 font-display font-bold text-max">
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

          {/* Il signature element prende tutta la larghezza: e' un righello,
              e un righello si legge per quanto e' lungo. */}
          <div className="mt-20 md:mt-28">
            <LinearMetre labels={t.hero.scanLabels} readout={t.hero.readout} />
          </div>
        </section>

        <div className="shell">
          {/* ---------------- DOPPIA MATRICE ---------------- */}
          <Section id="capabilities" eyebrow={t.matrix.eyebrow} aside="01">
            <Reveal>
              <h2 className="measure-wide mb-12 text-d3 font-display font-semibold">
                {t.matrix.title}
              </h2>
              <Matrix columns={t.matrix.columns} rows={t.matrix.rows} />
            </Reveal>
          </Section>

          {/* ---------------- MISURE ---------------- */}
          <Section id="measurements" eyebrow={t.measurements.eyebrow} aside="02">
            <Reveal>
              <Measurements items={t.measurements.items} />
            </Reveal>
          </Section>

          {/* ---------------- MAPPA OPERATIVA ---------------- */}
          <Section id="operations" eyebrow={t.map.eyebrow} aside="03">
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

          {/* ---------------- PROVA SOCIALE ---------------- */}
          <Section id="work" eyebrow={t.work.eyebrow} aside="04">
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

          {/* ---------------- FOTOGRAFIE DELL'EVENTO ---------------- */}
          <Section id="field" eyebrow={t.photos.eyebrow} aside="05">
            <Reveal>
              <EventPhotos
                caption={t.photos.caption}
                source={t.photos.source}
                featured={t.photos.featured}
                reel={t.photos.reel}
                reelLabel={t.photos.reelLabel}
                nav={t.photos.nav}
              />
            </Reveal>
          </Section>

          {/* ---------------- CHIAMATA ALL'AZIONE ---------------- */}
          <Section id="contact" eyebrow={t.cta.eyebrow} aside="06">
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

      <Footer />
    </>
  );
}
