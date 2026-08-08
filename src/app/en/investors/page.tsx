import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Rule } from "@/components/ui/Rule";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { TextField, TextArea } from "@/components/ui/Field";
import { investors } from "@/content/investors";

const t = investors.en;

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: {
    canonical: "/en/investors",
    languages: { en: "/en/investors", it: "/it/investitori" },
  },
  openGraph: { title: t.meta.title, description: t.meta.description, locale: "en" },
  /* Non e' una pagina da posizionare: si arriva perche' si e' cercata. */
  robots: { index: true, follow: true },
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

export default function InvestorsEn() {
  return (
    <>
      <Header />

      <main id="main">
        <section className="shell pt-16 pb-16 md:pt-24 md:pb-20">
          <nav aria-label="Breadcrumb">
            <span className="eyebrow">Paloryn / {t.hero.eyebrow}</span>
          </nav>
          <h1 className="mt-8 text-d1 font-display font-bold text-max">{t.hero.title}</h1>
          <p className="measure-wide mt-8 text-body-l text-copy">{t.hero.lead}</p>
        </section>

        <div className="shell">
          <Section id="profile" eyebrow={t.profile.eyebrow} aside="01">
            <Reveal>
              <h2 className="text-d3 font-display font-semibold">{t.profile.title}</h2>
              <dl className="mt-12 grid gap-x-16 gap-y-10 md:grid-cols-2">
                {t.profile.items.map((i) => (
                  <div key={i.k} className="border-t border-line pt-4">
                    <dt className="eyebrow">{i.k}</dt>
                    <dd className="mt-3 text-body text-copy">{i.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Section>

          <Section id="governance" eyebrow={t.governance.eyebrow} aside="02">
            <Reveal>
              <h2 className="text-d3 font-display font-semibold">{t.governance.title}</h2>
              <p className="measure-wide mt-6 text-body-l text-copy">{t.governance.lead}</p>
              <dl className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                {t.governance.certs.map((c) => (
                  <div key={c.code} className="border-t border-line pt-4">
                    <dt className="font-mono text-data text-max">{c.code}</dt>
                    <dd className="eyebrow mt-2 block">{c.scope}</dd>
                  </div>
                ))}
              </dl>
              <p className="measure-wide mt-10 text-small text-mute">{t.governance.note}</p>
            </Reveal>
          </Section>

          <Section id="materials" eyebrow={t.materials.eyebrow} aside="03">
            <Reveal>
              <h2 className="text-d3 font-display font-semibold">{t.materials.title}</h2>
              <ul className="m-0 mt-10 list-none p-0">
                {t.materials.items.map((i, n) => (
                  <li key={i} className="flex gap-6 border-t border-line py-4">
                    <span className="eyebrow tabular shrink-0 pt-1">
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <span className="text-body text-copy">{i}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-line pt-4 font-mono text-data text-mute">
                {t.materials.note}
              </p>
            </Reveal>
          </Section>

          <Section id="contact" eyebrow={t.contact.eyebrow} aside="04">
            <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              <Reveal>
                <h2 className="text-d2 font-display font-bold">{t.contact.title}</h2>
                <p className="measure mt-8 text-body-l text-copy">{t.contact.lead}</p>
                <a
                  href={`mailto:${t.contact.email}`}
                  className="mt-10 inline-block border-b border-line pb-1 font-mono text-h5 text-max transition-colors hover:border-accent hover:text-accent"
                >
                  {t.contact.email}
                </a>
              </Reveal>

              <Reveal delay={120}>
                {/* Il modulo non e' ancora collegato a nulla: l'invio arriva
                    in Fase 7 insieme alla verifica anti-abuso. */}
                <form className="flex flex-col gap-8">
                  <TextField id="inv-org" label={t.contact.form.org} name="organisation" />
                  <TextField id="inv-name" label={t.contact.form.name} name="name" />
                  <TextField
                    id="inv-mail"
                    label={t.contact.form.mail}
                    name="email"
                    type="email"
                  />
                  <TextArea
                    id="inv-interest"
                    label={t.contact.form.interest}
                    hint={t.contact.form.interestHint}
                    name="interest"
                  />
                  <div>
                    <Button variant="primary" size="lg" type="submit">
                      {t.contact.form.send}
                    </Button>
                  </div>
                  <p className="text-small text-mute">{t.contact.form.privacy}</p>
                </form>
              </Reveal>
            </div>
          </Section>
        </div>
      </main>

      <Footer />
    </>
  );
}
