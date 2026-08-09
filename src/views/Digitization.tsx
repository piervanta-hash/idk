import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Process } from "@/components/pages/Process";
import { LabPlate } from "@/components/pages/LabPlate";
import { digitization } from "@/content/digitization";
import { alternates, type Locale } from "@/lib/routes";

export function digitizationMetadata(locale: Locale): Metadata {
  const t = digitization[locale];
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: alternates("digitization", locale),
    openGraph: { title: t.meta.title, description: t.meta.description, locale },
  };
}

export function DigitizationView({ locale }: { locale: Locale }) {
  const t = digitization[locale];

  return (
    <>
      <Header locale={locale} page="digitization" />

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
        </section>

        <div className="shell">
          <Reveal>
            <LabPlate caption={t.plate.caption} note={t.plate.note} />
          </Reveal>

          <Section id="process" eyebrow={t.process.eyebrow} aside="01">
            <Reveal>
              <h2 className="text-d3 font-display font-semibold">{t.process.title}</h2>
              <p className="measure-wide mt-6 mb-16 text-body-l text-copy">
                {t.process.lead}
              </p>
            </Reveal>
            <Process steps={t.process.steps} caption={t.process.caption} />
          </Section>

          <Section id="markets" eyebrow={t.markets.eyebrow} aside="02">
            <Reveal>
              <h2 className="measure-wide mb-12 text-d3 font-display font-semibold">
                {t.markets.title}
              </h2>
              <div className="grid gap-px bg-line md:grid-cols-2">
                {t.markets.columns.map((c) => (
                  <div key={c.name} className="bg-bg p-6 md:p-10">
                    <h3 className="text-h4 font-display font-semibold text-max">{c.name}</h3>
                    <p className="mt-4 text-body text-copy">{c.body}</p>
                    <p className="mt-8 border-t border-line pt-4 font-mono text-data text-label">
                      {c.tags}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </Section>

          <Section id="standards" eyebrow={t.standards.eyebrow} aside="03">
            <Reveal>
              <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {t.standards.items.map((s) => (
                  <div key={s.k} className="border-t border-line pt-4">
                    <dt className="eyebrow">{s.k}</dt>
                    <dd className="mt-3 font-mono text-data text-strong">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Section>

          <Section id="contact" eyebrow={t.cta.eyebrow} aside="04">
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
