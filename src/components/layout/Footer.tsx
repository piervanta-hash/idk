import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ClientMarks } from "@/components/layout/ClientMarks";
import { Rule } from "@/components/ui/Rule";
import { NAV, PAGES, href, type Locale } from "@/lib/routes";

/* ==========================================================================
   FOOTER
   Registro anagrafico: sede, partita IVA, certificazioni.
   La titolarita' resta a Cosma Alessandro, come da indicazione.
   ========================================================================== */

const CERTS = {
  en: [
    { code: "ISO 9001", scope: "quality" },
    { code: "ISO/IEC 27001", scope: "information security" },
    { code: "ISO/IEC 27017", scope: "cloud security" },
    { code: "ISO/IEC 27018", scope: "personal data in cloud" },
  ],
  it: [
    { code: "ISO 9001", scope: "qualità" },
    { code: "ISO/IEC 27001", scope: "sicurezza delle informazioni" },
    { code: "ISO/IEC 27017", scope: "sicurezza dei servizi cloud" },
    { code: "ISO/IEC 27018", scope: "dati personali nel cloud" },
  ],
} as const;

const COPY = {
  en: {
    blurb:
      "Paloryn turns paper archives into structured, queryable data and connects them to public digital infrastructure.",
    site: "Site",
    office: "Office",
    certs: "Certifications",
    rights: "all rights reserved",
  },
  it: {
    blurb:
      "Paloryn trasforma gli archivi cartacei in dati strutturati e interrogabili, e li collega all'infrastruttura digitale pubblica.",
    site: "Sito",
    office: "Sede",
    certs: "Certificazioni",
    rights: "tutti i diritti riservati",
  },
} as const;

export function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = COPY[locale];

  return (
    <footer className="mt-32">
      {/* I marchi stanno qui e in nessun altro punto del sito: sempre
          nell'ultimo respiro prima dei dati anagrafici, uguale su ogni
          pagina. Sta dentro il footer e non nelle singole pagine proprio
          per questo — messo pagina per pagina, prima o poi finirebbe in un
          posto diverso o mancherebbe da qualcuna. */}
      <ClientMarks />

      <div className="shell border-t border-line pt-16 pb-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo height={28} className="text-max" />
            <p className="measure mt-6 text-body text-copy">{t.blurb}</p>
          </div>

          <nav aria-label="Sitemap" className="md:col-span-2">
            <span className="eyebrow">{t.site}</span>
            {/* Righe alte 44px invece di 17: da telefono cinque voci di
                menu incolonnate a distanza di otto pixel si sbagliano di
                continuo. Il footer si allunga di un centinaio di pixel —
                un prezzo che si paga volentieri. */}
            <ul className="mt-2">
              {NAV.map((key) => (
                <li key={key}>
                  <Link
                    href={href(key, locale)}
                    className="flex min-h-11 w-fit items-center font-mono text-data text-copy transition-colors hover:text-max"
                  >
                    {PAGES[key].label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <span className="eyebrow">{t.office}</span>
            <address className="mt-4 font-mono text-data text-copy not-italic">
              Via D. Cantatore 1/3
              <br />
              73100 Lecce (LE), Italia
              <br />
              <br />
              P. IVA 04522160755
              <br />
              <a
                href="mailto:info@paloryn.com"
                className="flex min-h-11 w-fit items-center transition-colors hover:text-max"
              >
                info@paloryn.com
              </a>
              <br />
              <a
                href="tel:+393520690071"
                className="flex min-h-11 w-fit items-center transition-colors hover:text-max"
              >
                +39 352 069 0071
              </a>
            </address>
          </div>

          <div className="md:col-span-3">
            <span className="eyebrow">{t.certs}</span>
            <ul className="mt-4 space-y-2">
              {CERTS[locale].map((c) => (
                <li key={c.code} className="font-mono text-data">
                  <span className="text-strong">{c.code}</span>{" "}
                  <span className="text-label">— {c.scope}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Rule className="mt-16" />

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span className="eyebrow">
            &copy; {new Date().getFullYear()} Cosma Alessandro — {t.rights}
          </span>
          {/* L'unica pagina legale del sito. Sta qui in fondo, piccola, dove
              la si cerca: nessuno arriva su un sito per leggere
              un'informativa, ma chi la cerca deve trovarla al primo colpo
              d'occhio e senza andarla a scovare in un menu. */}
          <Link
            href={href("privacy", locale)}
            className="eyebrow flex min-h-11 w-fit items-center transition-colors hover:text-max"
          >
            {PAGES.privacy.label[locale]}
          </Link>
        </div>
      </div>
    </footer>
  );
}
