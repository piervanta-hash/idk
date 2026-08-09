import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { Headline } from "@/components/home/Headline";
import { Stacks } from "@/components/home/Stacks";
import { Extraction } from "@/components/pages/Extraction";
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
  it: "Paloryn — società di dati per gli archivi cartacei",
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

      <main id="main" tabIndex={-1} className="focus:outline-none">
        {/* LA TESTATA.

            Niente cornice. Un riquadro con dentro titolo, testo e diagramma
            si legge come un documento stampato, non come l'apertura di un
            sito: la cornice era l'errore, non le parole.

            Adesso la prima schermata e' fatta di tre cose: una riga
            sottile di intestazione, il titolo alla scala del manifesto e la
            scaffalatura disegnata che gli sta a fianco. Il titolo dice
            «materia» e la materia e' li' accanto; dice «dato», e il dato
            arriva subito sotto, scendendo.

            Nota per chi tocchera' il titolo: e' volutamente concettuale e
            non contiene nessuna parola per cui qualcuno cerchi. Il peso
            descrittivo lo portano il titolo del documento - che dice
            «societa' di dati per gli archivi cartacei» - e la riga di testo
            sotto il titolo. Se si toglie una delle due, la pagina smette di
            dire di che cosa parla. */}
        <section>
          <div className="shell">
            <div className="flex items-baseline justify-between gap-6 border-b border-line pt-4 pb-3">
              <span className="eyebrow">{t.hero.mark}</span>
              <span className="eyebrow text-right">{t.hero.place}</span>
            </div>

            {/* Due colonne. A sinistra le parole, a destra l'archivio
                disegnato: il titolo dice «materia» e accanto c'e' la
                materia, sei ripiani di faldoni.

                Le colonne non sono uguali: il testo prende sette parti su
                dodici e il disegno cinque. Meta' e meta' avrebbero fatto
                due blocchi che si guardano; cosi' invece si legge prima il
                titolo e il disegno gli sta a fianco.

                Sul telefono il disegno va sotto, non sparisce: e' la
                seconda cosa che si vede scorrendo, e regge da sola. */}
            <div className="grid items-start gap-12 pt-12 pb-16 md:pt-20 md:pb-24 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Headline text={t.hero.title} />

                <p className="measure mt-10 text-body-l text-copy md:mt-12">{t.hero.lead}</p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <ButtonLink href={t.hero.primary.href} variant="primary" size="lg">
                    {t.hero.primary.label}
                  </ButtonLink>
                  <ButtonLink
                    href={t.hero.secondary.href}
                    variant="secondary"
                    size="lg"
                    arrow
                  >
                    {t.hero.secondary.label}
                  </ButtonLink>
                </div>
              </div>

              <div className="lg:col-span-5 lg:pt-2">
                <Stacks label={t.hero.stacks} />
              </div>
            </div>
          </div>

        </section>

        {/* L'ESTRAZIONE, subito sotto la testata.

            Il titolo dice «al dato»: qui si vede come. E' la stessa
            animazione della pagina Anamnesis, ed e' giusto che sia la
            stessa - e' la cosa che l'azienda fa. In home apre il discorso,
            li' viene spiegata.

            Parte quando arriva sullo schermo, non al caricamento: si vede
            scendendo, che e' il momento in cui si sta guardando. */}
        <div className="shell">
          <Section id="extraction" eyebrow={t.hero.extraction.eyebrow} aside="01">
            <Extraction
              fields={t.hero.extraction.fields}
              labels={t.hero.extraction.labels}
              docHead={t.hero.extraction.docHead}
              note={t.hero.extraction.note}
            />
          </Section>
        </div>

        <div className="shell">
          <Section id="capabilities" eyebrow={t.matrix.eyebrow} aside="02" size="lg">
            <Reveal>
              <h2 className="measure-wide mb-12 text-d3 font-display font-semibold">
                {t.matrix.title}
              </h2>
              <Matrix columns={t.matrix.columns} rows={t.matrix.rows} />
            </Reveal>
          </Section>

          <Section id="measurements" eyebrow={t.measurements.eyebrow} aside="03" size="lg">
            <Reveal>
              <Measurements items={t.measurements.items} />
            </Reveal>
          </Section>

          <Section id="operations" eyebrow={t.map.eyebrow} aside="04" size="lg">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
              <Reveal>
                <h2 className="text-d3 font-display font-semibold">{t.map.title}</h2>
                <p className="measure mt-6 text-body text-copy">{t.map.lead}</p>
                <div className="mt-10 border-t border-line pt-4">
                  <span className="eyebrow block text-max">{t.map.nodes.lecce.name}</span>
                  <span className="mt-1 block text-small text-label">
                    {t.map.nodes.lecce.role}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <OperationsMap nodes={t.map.nodes} legend={t.map.legend} />
              </Reveal>
            </div>
          </Section>

          <Section id="work" eyebrow={t.work.eyebrow} aside="05" size="lg">
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
          <Section id="field" eyebrow={t.photos.eyebrow} aside="06">
            <Reveal className="max-w-3xl">
              <EventPhotos
                caption={t.photos.caption}
                source={t.photos.source}
                featured={present(t.photos.featured)}
                reel={present(t.photos.reel)}
              />
            </Reveal>
          </Section>

          <Section id="contact" eyebrow={t.cta.eyebrow} aside="07" size="lg">
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
