/* ==========================================================================
   ROTTE E LINGUE

   Le due lingue sono alla pari, ma gli indirizzi divergono di proposito.
   In inglese il servizio si chiama "digitization"; in italiano resta
   "dematerializzazione", che e' il termine con cui la Pubblica
   Amministrazione cerca e appalta. Non e' un'incoerenza: e' la decisione
   presa nel brief, e vale anche per gli URL.

   Questa e' l'unica tabella che sa dove sta ogni pagina. Menu, switch di
   lingua, hreflang, sitemap e briciole leggono tutti da qui: cambiare un
   indirizzo si fa in un posto solo.
   ========================================================================== */

export const LOCALES = ["en", "it"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Dominio di produzione: serve per gli indirizzi assoluti di hreflang,
 *  canonical, sitemap e Open Graph. */
export const SITE = "https://paloryn.com";

export type PageKey =
  | "home"
  | "digitization"
  | "anamnesis"
  | "customers"
  | "investors"
  | "about";

type Entry = {
  path: Record<Locale, string>;
  label: Record<Locale, string>;
  /** Nel menu principale. Il brief ammette al massimo sei voci. */
  nav: boolean;
};

export const PAGES: Record<PageKey, Entry> = {
  home: {
    path: { en: "/en", it: "/it" },
    label: { en: "Home", it: "Home" },
    nav: false,
  },
  digitization: {
    path: { en: "/en/digitization", it: "/it/dematerializzazione" },
    label: { en: "Digitization", it: "Dematerializzazione" },
    nav: true,
  },
  anamnesis: {
    path: { en: "/en/anamnesis", it: "/it/anamnesis" },
    label: { en: "Anamnesis", it: "Anamnesis" },
    nav: true,
  },
  customers: {
    path: { en: "/en/customers", it: "/it/clienti" },
    label: { en: "Customers", it: "Clienti" },
    nav: true,
  },
  investors: {
    path: { en: "/en/investors", it: "/it/investitori" },
    label: { en: "Investors", it: "Investitori" },
    nav: true,
  },
  about: {
    path: { en: "/en/about", it: "/it/azienda" },
    label: { en: "About", it: "Azienda" },
    nav: true,
  },
};

export const NAV = (Object.keys(PAGES) as PageKey[]).filter((k) => PAGES[k].nav);

export const href = (key: PageKey, locale: Locale) => PAGES[key].path[locale];

/** L'indirizzo della stessa pagina nell'altra lingua. */
export const other = (locale: Locale): Locale => (locale === "en" ? "it" : "en");

/** Blocco `alternates` per i metadati di Next: canonical piu' hreflang.
 *  `x-default` punta all'inglese, che e' la lingua predefinita. */
export function alternates(key: PageKey, locale: Locale) {
  return {
    canonical: href(key, locale),
    languages: {
      en: href(key, "en"),
      it: href(key, "it"),
      "x-default": href(key, DEFAULT_LOCALE),
    },
  };
}

/* Pagine legali: esistono in entrambe le lingue ma non stanno nel menu. */
export const LEGAL = [
  {
    key: "privacy",
    path: { en: "/en/legal/privacy", it: "/it/note-legali/privacy" },
    label: { en: "Privacy", it: "Privacy" },
  },
  {
    key: "cookie",
    path: { en: "/en/legal/cookie", it: "/it/note-legali/cookie" },
    label: { en: "Cookie", it: "Cookie" },
  },
  {
    key: "accessibility",
    path: {
      en: "/en/legal/accessibility",
      it: "/it/note-legali/accessibilita",
    },
    label: { en: "Accessibility", it: "Accessibilità" },
  },
] as const;
