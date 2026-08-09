import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { privacy } from "@/content/privacy";
import { alternates, type Locale } from "@/lib/routes";

/* ==========================================================================
   INFORMATIVA

   Una pagina di solo testo, e va trattata come tale: nessun disegno,
   nessuna animazione, niente da guardare. Chi arriva qui sta cercando una
   riga precisa — quanto tenete i miei dati, a chi li date — e la deve
   trovare in pochi secondi.

   Per questo le nove voci sono numerate e ognuna ha un titolo che dice il
   contenuto: si scorre con l'occhio invece di leggere tutto. E la misura
   di lettura resta stretta come nel resto del sito: un'informativa a tutta
   larghezza non la legge nessuno, ed e' il trucco piu' vecchio per farsi
   leggere meno.
   ========================================================================== */

export function privacyMetadata(locale: Locale): Metadata {
  const t = privacy[locale];
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: alternates("privacy", locale),
    openGraph: { title: t.meta.title, description: t.meta.description, locale },
  };
}

export function PrivacyView({ locale }: { locale: Locale }) {
  const t = privacy[locale];

  return (
    <>
      {/* `page` serve allo scambio di lingua: senza, chi passa all'inglese
          da qui tornerebbe alla home invece di trovare la stessa pagina. */}
      <Header locale={locale} page="privacy" />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <section className="shell pt-16 pb-16 md:pt-24 md:pb-20">
          <nav aria-label="Breadcrumb">
            <span className="eyebrow">Paloryn / {t.hero.eyebrow}</span>
          </nav>
          <h1 className="mt-8 text-d2 font-display font-bold text-max">{t.hero.title}</h1>
          <p className="measure-wide mt-8 text-body-l text-copy">{t.hero.lead}</p>
          <p className="eyebrow mt-10 border-t border-line pt-4">
            {t.updated} · {t.updatedOn}
          </p>
        </section>

        <div className="shell pb-24 md:pb-32">
          <ol className="m-0 list-none p-0">
            {t.sections.map((s) => (
              <li key={s.n}>
                <Reveal>
                  <div className="grid gap-4 border-t border-line py-8 md:grid-cols-[5rem_1fr] md:gap-8 md:py-10">
                    <span className="eyebrow tabular md:pt-2">{s.n}</span>
                    <div>
                      <h2 className="text-h4 font-display font-semibold text-max">{s.title}</h2>
                      <p className="measure-wide mt-4 text-body text-copy">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </main>

      <Footer locale={locale} />
    </>
  );
}
