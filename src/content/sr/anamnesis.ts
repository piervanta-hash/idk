/* ANAMNESIS — SRPSKI. Stessa forma di `en` in src/content/anamnesis.ts. */

export const sr = {
  meta: {
    title: "Anamnesis — Paloryn",
    description:
      "AI ekstrakcija polja sa indeksom pouzdanosti, katastarska geolokacija i interoperabilnost sa PDND, pagoPA, SPID/CIE i App IO.",
  },
  hero: {
    eyebrow: "Softver",
    title: "Anamnesis",
    lead: "Anamnesis pretvara digitalizovani fond u pretraživ skup podataka i povezuje ga sa javnom digitalnom infrastrukturom koju institucija već koristi.",
    primary: { label: "Zatražite demonstraciju", href: "/sr/kompanija#contact" },
    secondary: { label: "Pogledajte uslugu", href: "/sr/digitalizacija" },
    claims: [
      { k: "Ekstrakcija", v: "AI, pouzdanost po polju" },
      { k: "Poreklo", v: "položaj na stranici" },
      { k: "Interoperabilnost", v: "PDND · pagoPA · SPID/CIE · App IO" },
      { k: "Kvalifikacija", v: "ACN · AgID" },
    ],
  },

  extraction: {
    eyebrow: "Ekstrakcija",
    title: "Stranica postaje zapis.",
    lead: "OCR prolazi kroz ceo fond. Relevantna polja izdvajaju se jedno po jedno, svako sa čitljivim indeksom pouzdanosti i položajem na stranici sa kog je preuzeto — tako da se svaka vrednost može proveriti u originalu.",
    labels: {
      document: "Izvorna stranica",
      table: "Izdvojeni zapis",
      replay: "Ponovi",
      locate: "Dodirnite polje da vidite odakle potiče",
      located: "Prikazano na dokumentu",
    },
    docHead: "OPŠTINA LEĆE · GRAĐEVINSKE DOZVOLE",
    fields: [
      { label: "Br. predmeta", docLabel: "GRAĐEVINSKI PREDMET BR.", value: "1962 / 4471", score: 99 },
      { label: "Podnosilac", docLabel: "PODNOSILAC ZAHTEVA", value: "Paloryn", score: 96 },
      {
        label: "Adresa",
        docLabel: "LOKACIJA NEPOKRETNOSTI",
        value: "Via D. Cantatore 1/3 — Lecce",
        score: 94,
      },
      {
        label: "Katastar",
        docLabel: "KATASTARSKI PODACI",
        value: "List 12 · parcele 417, 418",
        score: 87,
      },
      {
        label: "Predmet",
        docLabel: "PREDMET ZAHTEVA",
        value: "Dogradnja i promena namene",
        score: 91,
      },
    ],
    note: "Primer podataka. Ovde se ne pretražuje nijedna stvarna arhiva.",
  },

  interop: {
    eyebrow: "Interoperabilnost",
    title: "Povezan sa sistemima same institucije.",
    lead: "Anamnesis nije izolovani sistem sa dugmetom za izvoz. Nalazi se između građanina i sistema institucije i govori jezikom nacionalnog sloja interoperabilnosti.",
    chain: ["Građanin", "Institucija", "Anamnesis"],
    endpoints: [
      {
        id: "pdnd",
        name: "PDND",
        body: "Piattaforma Digitale Nazionale Dati: e-usluge objavljene i korišćene preko italijanskog nacionalnog sloja interoperabilnosti.",
      },
      {
        id: "pagopa",
        name: "pagoPA",
        body: "Takse za pretragu i uvid plaćaju se u okviru istog zahteva, ne u posebnom redu.",
      },
      {
        id: "spid",
        name: "SPID / CIE",
        body: "Identifikacija građanina nacionalnim digitalnim identitetom, u trenutku podnošenja zahteva.",
      },
      {
        id: "appio",
        name: "App IO",
        body: "Obaveštenja stižu građaninu u aplikaciju javnih usluga koju već ima.",
      },
      {
        id: "portals",
        name: "Portali institucije",
        body: "Interfejsi ka sistemima koje institucija već ima u radu. Nije potrebna nikakva zamena.",
      },
      {
        id: "gis",
        name: "GIS · QGIS",
        body: "Izdvojeni katastarski podaci predaju se kao georeferencirani slojevi, koji se otvaraju u QGIS-u.",
      },
    ],
    hint: "Izaberite vezu",
  },

  geo: {
    eyebrow: "Geolokacija",
    title: "Parcele na mapi.",
    lead: "Katastarski podaci izdvojeni iz dokumenata postavljaju se na mapu. Rastavljeni prikaz deli list na parcele, pa se zahtev rešava pokazivanjem na teren umesto čitanjem registra.",
    layers: ["List", "Parcele", "Izdvojeni zapis"],
    note: "Šematski prikaz. Prikazana geometrija parcela je ilustrativna.",
    modal: {
      open: "Postavite na mapu",
      title: "Izdvojeni zapis, lociran",
      territory: "Teritorija",
      detail: "List i parcela",
      note: "Primer zapisa na demonstracionom položaju. Stvarni fondovi se postavljaju na sopstvene koordinate.",
      close: "Zatvori",
    },
  },

  retrieval: {
    eyebrow: "Pronalaženje",
    title: "Građevinska dozvola iz 1962.",
    lead: "Nije važno to što je AI uključen. Važno je vreme između zahteva građanina i odgovora institucije.",
    manual: {
      name: "U arhivi",
      steps: [
        "Zahtev se zavodi na šalteru",
        "Oznaka se traži u papirnom registru",
        "Silazak u depo, pronalaženje police",
        "Vadi se kutija, listaju se spisi",
        "Kopiranje, sređivanje, vraćanje na policu",
      ],
      value: "3",
      unit: "radna dana",
    },
    platform: {
      name: "U Anamnesis-u",
      step: "Pretraži, filtriraj, otvori. Isti zahtev, jedan korak.",
      value: "4",
      unit: "sekunde",
    },
  },

  licence: {
    eyebrow: "Licenca",
    title: "Licenca i white-label.",
    lead: "Mašina za ekstrakciju, indeks pouzdanosti, geolokacija i API-ji dostupni su pod licencom ili kao white-label, za operatere koji nemaju razvojni tim.",
    items: [
      { k: "Već u upotrebi", v: "na javnim ugovorima" },
      { k: "Vreme do tržišta", v: "kraće od sopstvenog razvoja" },
      { k: "Podaci", v: "ostaju kod klijenta, mogu se izvesti u celosti" },
    ],
  },

  cta: {
    eyebrow: "Kontakt",
    title: "Demonstracija na stvarnom uzorku.",
    lead: "Demonstracija na stvarnom uzorku govori više od specifikacije. Recite nam kakav je fond i pokazaćemo vam šta iz njega izlazi.",
    primary: { label: "Zatražite demonstraciju", href: "/sr/kompanija#contact" },
    secondary: { label: "Materijali za investitore", href: "/sr/investitori" },
  },
} as const;
