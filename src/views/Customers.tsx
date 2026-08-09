import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { CaseGrid } from "@/components/pages/CaseGrid";
import { customers } from "@/content/customers";
import { alternates, type Locale } from "@/lib/routes";

export function customersMetadata(locale: Locale): Metadata {
  const t = customers[locale];
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: alternates("customers", locale),
    openGraph: { title: t.meta.title, description: t.meta.description, locale },
  };
}

export function CustomersView({ locale }: { locale: Locale }) {
  const t = customers[locale];

  return (
    <>
      <Header locale={locale} page="customers" />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <section className="shell pt-16 pb-16 md:pt-24 md:pb-20">
          <nav aria-label="Breadcrumb">
            <span className="eyebrow">Paloryn / {t.hero.eyebrow}</span>
          </nav>
          <h1 className="mt-8 text-d1 font-display font-bold text-max">{t.hero.title}</h1>
          <p className="measure-wide mt-8 text-body-l text-copy">{t.hero.lead}</p>
        </section>

        <div className="shell">
          <div className="pb-24 md:pb-32">
            <CaseGrid cases={t.cases} filter={t.filter} detail={t.detail} />

            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <p className="eyebrow">
                {t.also.label} <span className="text-copy">{t.also.items.join(" · ")}</span>
              </p>
              <p className="text-small text-label sm:max-w-md sm:text-right">{t.also.note}</p>
            </div>
          </div>

          {/* La regola di trattamento dei marchi dei committenti sta in
              docs/fase-5-customers-investors.md: e' una nota di lavorazione,
              non contenuto da mettere in una pagina pubblica. La striscia dei
              loghi entra qui quando arrivano i file. */}

          <Section id="contact" eyebrow={t.cta.eyebrow} aside="01">
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
