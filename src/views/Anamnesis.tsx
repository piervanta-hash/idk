import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Extraction } from "@/components/pages/Extraction";
import { Interop } from "@/components/pages/Interop";
import { ParcelMap } from "@/components/pages/ParcelMap";
import { Retrieval } from "@/components/pages/Retrieval";
import { anamnesis } from "@/content/anamnesis";
import { alternates, type Locale } from "@/lib/routes";

export function anamnesisMetadata(locale: Locale): Metadata {
  const t = anamnesis[locale];
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: alternates("anamnesis", locale),
    openGraph: { title: t.meta.title, description: t.meta.description, locale },
  };
}

export function AnamnesisView({ locale }: { locale: Locale }) {
  const t = anamnesis[locale];
  /* Il record agganciato all'esploso di mappa e' lo stesso campo catastale
     estratto piu' sopra: e' la stessa informazione che prosegue. */
  const cadastral = t.extraction.fields[3];

  return (
    <>
      <Header locale={locale} page="anamnesis" />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <section className="shell pt-16 pb-20 md:pt-24 md:pb-28">
          <nav aria-label="Breadcrumb">
            <span className="eyebrow">Paloryn / {t.hero.eyebrow}</span>
          </nav>

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

          <dl className="mt-16 grid gap-x-8 gap-y-8 border-t border-line pt-8 sm:grid-cols-3">
            {t.hero.claims.map((c) => (
              <div key={c.k}>
                <dt className="eyebrow">{c.k}</dt>
                <dd className="mt-2 font-mono text-data text-strong">{c.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="shell">
          <Section id="extraction" eyebrow={t.extraction.eyebrow} aside="01">
            <Reveal>
              <h2 className="text-d3 font-display font-semibold">{t.extraction.title}</h2>
              <p className="measure-wide mt-6 mb-16 text-body-l text-copy">
                {t.extraction.lead}
              </p>
            </Reveal>
            <Extraction
              fields={t.extraction.fields}
              labels={t.extraction.labels}
              note={t.extraction.note}
            />
          </Section>

          <Section id="interoperability" eyebrow={t.interop.eyebrow} aside="02">
            <Reveal>
              <h2 className="text-d3 font-display font-semibold">{t.interop.title}</h2>
              <p className="measure-wide mt-6 mb-16 text-body-l text-copy">{t.interop.lead}</p>
            </Reveal>
            <Reveal>
              <Interop
                chain={t.interop.chain}
                endpoints={t.interop.endpoints}
                hint={t.interop.hint}
              />
            </Reveal>
          </Section>

          <Section id="geolocation" eyebrow={t.geo.eyebrow} aside="03">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
              <Reveal>
                <h2 className="text-d3 font-display font-semibold">{t.geo.title}</h2>
                <p className="measure mt-6 text-body text-copy">{t.geo.lead}</p>
              </Reveal>
              <Reveal delay={120}>
                <ParcelMap
                  layers={t.geo.layers}
                  record={{ label: cadastral.label, value: cadastral.value }}
                  note={t.geo.note}
                  modal={t.geo.modal}
                />
              </Reveal>
            </div>
          </Section>

          <Section id="retrieval" eyebrow={t.retrieval.eyebrow} aside="04">
            <Reveal>
              <h2 className="text-d3 font-display font-semibold">{t.retrieval.title}</h2>
              <p className="measure-wide mt-6 mb-16 text-body-l text-copy">
                {t.retrieval.lead}
              </p>
              <Retrieval manual={t.retrieval.manual} platform={t.retrieval.platform} />
            </Reveal>
          </Section>

          <Section id="licence" eyebrow={t.licence.eyebrow} aside="05">
            <Reveal>
              <h2 className="measure-wide text-d3 font-display font-semibold">
                {t.licence.title}
              </h2>
              <p className="measure-wide mt-6 text-body-l text-copy">{t.licence.lead}</p>
              <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-3">
                {t.licence.items.map((i) => (
                  <div key={i.k} className="border-t border-line pt-4">
                    <dt className="eyebrow">{i.k}</dt>
                    <dd className="mt-3 font-mono text-data text-strong">{i.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Section>

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

      <Footer locale={locale} />
    </>
  );
}
