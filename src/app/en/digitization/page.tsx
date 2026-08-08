import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";
import { Reveal } from "@/components/ui/Reveal";
import { Process } from "@/components/pages/Process";
import { LabPlate } from "@/components/pages/LabPlate";
import { digitization } from "@/content/digitization";

const t = digitization.en;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: "/en/digitization",
    languages: { en: "/en/digitization", it: "/it/dematerializzazione" },
  },
  openGraph: { title: t.meta.title, description: t.meta.description, locale: "en" },
};

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
    <section id={id} className="scroll-mt-24 py-24 md:py-32">
      <Reveal as="header" className="mb-12 md:mb-16">
        <div className="flex items-baseline justify-between gap-6">
          <span className="eyebrow">{eyebrow}</span>
          {aside && <span className="eyebrow">{aside}</span>}
        </div>
        <Rule className="mt-3" />
      </Reveal>
      {children}
    </section>
  );
}

export default function DigitizationEn() {
  return (
    <>
      <Header />

      <main id="main">
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
            <Process steps={t.process.steps} />
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
                    <p className="mt-8 border-t border-line pt-4 font-mono text-data text-mute">
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

      <Footer />
    </>
  );
}
