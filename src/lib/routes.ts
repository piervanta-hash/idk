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

/* CINQUE LINGUE. Alle due di partenza si aggiungono albanese, serbo e
   macedone: sono le lingue dei paesi in cui l'azienda apre le prossime
   sedi (Durazzo, Belgrado, Skopje), e i film della campagna esistono gia'
   in tutte e cinque.

   Il serbo e' in alfabeto latino, come nei film: in Serbia i due alfabeti
   sono entrambi d'uso, e sul web il latino e' quello che si legge senza
   attrito. Il macedone e' in cirillico, perche' non ha alternativa. */
export const LOCALES = ["en", "it", "sq", "sr", "mk"] as const;
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
  | "about"
  | "privacy";

/** Come ogni lingua chiama se stessa: e' cosi' che va scritta nel selettore,
 *  perche' chi cerca la propria lingua la cerca col suo nome. */
export const LOCALE_NAME: Record<Locale, string> = {
  en: "English",
  it: "Italiano",
  sq: "Shqip",
  sr: "Srpski",
  mk: "Македонски",
};

/** Il codice dichiarato su <html lang> e negli hreflang. Per il serbo si
 *  dichiara anche l'alfabeto: `sr` da solo, per un motore di ricerca o un
 *  lettore di schermo, vuol dire cirillico. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  it: "it",
  sq: "sq",
  sr: "sr-Latn",
  mk: "mk",
};

type Entry = {
  path: Record<Locale, string>;
  label: Record<Locale, string>;
  /** Nel menu principale. Il brief ammette al massimo sei voci. */
  nav: boolean;
};

export const PAGES: Record<PageKey, Entry> = {
  home: {
    path: { en: "/en", it: "/it", sq: "/sq", sr: "/sr", mk: "/mk" },
    label: { en: "Home", it: "Home", sq: "Kreu", sr: "Početna", mk: "Почетна" },
    nav: false,
  },
  digitization: {
    path: {
      en: "/en/digitization",
      it: "/it/dematerializzazione",
      sq: "/sq/dixhitalizim",
      sr: "/sr/digitalizacija",
      mk: "/mk/digitalizacija",
    },
    label: {
      en: "Digitization",
      it: "Dematerializzazione",
      sq: "Dixhitalizim",
      sr: "Digitalizacija",
      mk: "Дигитализација",
    },
    nav: true,
  },
  anamnesis: {
    path: {
      en: "/en/anamnesis",
      it: "/it/anamnesis",
      sq: "/sq/anamnesis",
      sr: "/sr/anamnesis",
      mk: "/mk/anamnesis",
    },
    /* Nome di prodotto: resta in caratteri latini anche in macedone, come
       nei film. */
    label: { en: "Anamnesis", it: "Anamnesis", sq: "Anamnesis", sr: "Anamnesis", mk: "Anamnesis" },
    nav: true,
  },
  customers: {
    path: {
      en: "/en/customers",
      it: "/it/clienti",
      sq: "/sq/kliente",
      sr: "/sr/klijenti",
      mk: "/mk/klienti",
    },
    label: { en: "Customers", it: "Clienti", sq: "Klientë", sr: "Klijenti", mk: "Клиенти" },
    nav: true,
  },
  investors: {
    path: {
      en: "/en/investors",
      it: "/it/investitori",
      sq: "/sq/investitore",
      sr: "/sr/investitori",
      mk: "/mk/investitori",
    },
    label: {
      en: "Investors",
      it: "Investitori",
      sq: "Investitorë",
      sr: "Investitori",
      mk: "Инвеститори",
    },
    nav: true,
  },
  about: {
    path: {
      en: "/en/about",
      it: "/it/azienda",
      sq: "/sq/kompania",
      sr: "/sr/kompanija",
      mk: "/mk/kompanija",
    },
    label: { en: "About", it: "Azienda", sq: "Kompania", sr: "Kompanija", mk: "Компанија" },
    nav: true,
  },
  /* Fuori dal menu: il brief ne ammette sei voci e sono gia' cinque piu' la
     home. L'informativa si raggiunge dal footer e da sotto i due moduli,
     che e' dove la si cerca davvero. */
  privacy: {
    path: {
      en: "/en/privacy",
      it: "/it/privacy",
      sq: "/sq/privatesia",
      sr: "/sr/privatnost",
      mk: "/mk/privatnost",
    },
    label: {
      en: "Privacy notice",
      it: "Informativa privacy",
      sq: "Njoftim privatësie",
      sr: "Obaveštenje o privatnosti",
      mk: "Известување за приватност",
    },
    nav: false,
  },
};

export const NAV = (Object.keys(PAGES) as PageKey[]).filter((k) => PAGES[k].nav);

export const href = (key: PageKey, locale: Locale) => PAGES[key].path[locale];

/** L'ancora dei contatti dentro la pagina Azienda. E' la stessa in tutte le
 *  lingue: e' un identificativo, non un testo, e tenerla unica evita che
 *  un pulsante punti a un'ancora che in quella lingua si chiama diversa. */
export const contactHref = (locale: Locale) => `${href("about", locale)}#contact`;

/** Blocco `alternates` per i metadati di Next: canonical piu' hreflang.
 *  `x-default` punta all'inglese, che e' la lingua predefinita. */
export function alternates(key: PageKey, locale: Locale) {
  return {
    canonical: href(key, locale),
    languages: {
      ...Object.fromEntries(LOCALES.map((l) => [HTML_LANG[l], href(key, l)])),
      "x-default": href(key, DEFAULT_LOCALE),
    },
  };
}

/* L'unica pagina legale e' l'informativa privacy, e c'e' perche' un modulo
   che raccoglie nome e indirizzo email la rende dovuta: e' un obbligo, non
   una scelta di stile. Le altre — note legali, condizioni — restano fuori
   per decisione del committente. */
