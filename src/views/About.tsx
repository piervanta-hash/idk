import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ContactForm } from "@/components/pages/ContactForm";
import { about } from "@/content/about";
import { alternates, type Locale } from "@/lib/routes";

export function aboutMetadata(locale: Locale): Metadata {
  const t = about[locale];
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: alternates("about", locale),
    openGraph: { title: t.meta.title, description: t.meta.description, locale },
  };
}

export function AboutView({ locale }: { locale: Locale }) {
  const t = about[locale];

  return (
    <>
      <Header locale={locale} page="about" />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <section className="shell pt-16 pb-16 md:pt-24 md:pb-20">
          <nav aria-label="Breadcrumb">
            <span className="eyebrow">Paloryn / {t.hero.eyebrow}</span>
          </nav>
          <h1 className="mt-8 text-d1 font-display font-bold text-max">{t.hero.title}</h1>
          <p className="measure-wide mt-8 text-body-l text-copy">{t.hero.lead}</p>
        </section>

        <div className="shell">
          <Section id="credentials" eyebrow={t.credentials.eyebrow} aside="01">
            <Reveal>
              <h2 className="text-d3 font-display font-semibold">{t.credentials.title}</h2>
              <ul className="m-0 mt-12 list-none p-0">
                {t.credentials.items.map((c) => (
                  <li
                    key={c.n}
                    className="grid gap-4 border-t border-line py-6 md:grid-cols-[5rem_1fr] md:gap-8"
                  >
                    <span className="eyebrow tabular md:pt-1">{c.n}</span>
                    <p className="measure-wide text-body-l text-copy">{c.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </Section>

          <Section id="certifications" eyebrow={t.certifications.eyebrow} aside="02">
            <Reveal>
              <h2 className="text-d3 font-display font-semibold">
                {t.certifications.title}
              </h2>
              <p className="measure-wide mt-6 text-body-l text-copy">
                {t.certifications.lead}
              </p>
              <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {t.certifications.items.map((c) => (
                  <div key={c.code} className="border-t border-line pt-4">
                    <dt className="font-mono text-data text-max">{c.code}</dt>
                    <dd className="eyebrow mt-2 block">{c.scope}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Section>

          <Section id="contact" eyebrow={t.contact.eyebrow} aside="03">
            <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
              <Reveal>
                <h2 className="text-d2 font-display font-bold">{t.contact.title}</h2>
                <p className="measure mt-8 text-body-l text-copy">{t.contact.lead}</p>

                <div className="mt-12 border-t border-line pt-4">
                  <span className="eyebrow">{t.contact.office.label}</span>
                  <address className="mt-4 font-mono text-data text-copy not-italic">
                    {t.contact.office.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                    <span className="mt-4 block">{t.contact.office.vat}</span>
                    <a
                      href={`mailto:${t.contact.office.mail}`}
                      className="mt-4 flex min-h-11 w-fit items-center transition-colors hover:text-max"
                    >
                      {t.contact.office.mail}
                    </a>
                    <a
                      href={`tel:${t.contact.office.phoneHref}`}
                      className="flex min-h-11 w-fit items-center transition-colors hover:text-max"
                    >
                      {t.contact.office.phone}
                    </a>
                  </address>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <ContactForm
                  profileLabel={t.contact.profileLabel}
                  profiles={t.contact.profiles}
                  form={t.contact.form}
                  to={t.contact.office.mail}
                />
              </Reveal>
            </div>
          </Section>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
