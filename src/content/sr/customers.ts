/* KLIJENTI — SRPSKI. Stessa forma di `en` in src/content/customers.ts. */

const ALSO = [
  "Maglie",
  "Otranto",
  "Galatone",
  "Alezio",
  "Veglie",
  "Porto Cesareo",
  "Ex Manifattura Tabacchi Guarino",
  "Ordine degli Ingegneri di Lecce",
] as const;

export const sr = {
  meta: {
    title: "Klijenti — Paloryn",
    description:
      "Imenovani projekti za opštine, kulturne institucije i pozorišta: arhivsko sređivanje, masovna digitalizacija, zakonsko čuvanje i platforma.",
  },
  hero: {
    eyebrow: "Klijenti",
    title: "Klijenti i obim.",
    lead: "Obe polovine kompanije služe oba tržišta. Filter ispod je isti kao na početnoj stranici i na dve stranice usluga: tako je posao zaista podeljen.",
  },

  filter: {
    label: "Sektor",
    all: "Svi",
    public: "Javni sektor",
    private: "Privatni",
  },

  detail: {
    open: "Otvorite slučaj",
    close: "Zatvori",
    client: "Klijent",
    scope: "Obuhvat",
    volumes: "Obim",
    tech: "Tehnologije",
    outcome: "Rezultat",
    programme: "Program",
    pending: "nije objavljeno",
  },

  cases: [
    {
      id: "koreja",
      sector: "private",
      index: "01",
      name: "Koreja",
      client: "Cantieri Teatrali Koreja, Lecce",
      summary: "Arhiva pozorišta i kulturne produkcije.",
      scope:
        "Arhivsko sređivanje i digitalizacija arhive pozorišne trupe: dokumentacija predstava, fotografski materijal, plakati i scenska dokumentacija.",
      volumes: "",
      tech: "Arhivsko sređivanje · digitalizacija · Anamnesis",
      outcome: "Prvi realizovani projekat.",
      programme: "",
      tag: "Prvi realizovani projekat",
    },
    {
      id: "archilives",
      sector: "private",
      index: "02",
      name: "ARCHILIVES",
      client: "Arhive mediteranskih pozorišta, sa Cantieri Teatrali Koreja",
      summary:
        "Portal dokumenata za pozorišta mediteranskog područja. Projektovanje i razvoj u sopstvenoj režiji.",
      scope:
        "Papirni i multimedijalni fondovi više pozorišta, objedinjeni u jedan pretraživ portal. Projektovanje i razvoj urađeni interno — najjasniji dokaz softverske polovine kompanije.",
      volumes: "",
      tech: "Anamnesis · projektovanje i razvoj portala u sopstvenoj režiji",
      outcome: "Fondovi različitih institucija dostupni na jednom mestu, jednom pretragom.",
      programme: "Interreg VI-A Grčka-Italija 2021-2027",
      tag: "Softver, razvijen interno",
    },
    {
      id: "galatina",
      sector: "public",
      index: "03",
      name: "Comune di Galatina",
      client: "Comune di Galatina",
      summary: "Arhiva privatne gradnje, digitalizovana u celosti.",
      scope:
        "Predmeti građevinskih dozvola za privatnu gradnju: sređivanje, skeniranje velikog obima, ekstrakcija polja i objavljivanje za šalter i građane.",
      volumes: "",
      tech: "Sređivanje · skeniranje 300 DPI · OCR · zakonsko čuvanje · Anamnesis",
      outcome: "Građevinska arhiva pretraživa po adresi, dozvoli i katastarskoj oznaci.",
      programme: "PR Puglia FESR-FSE+ 2021-2027",
      tag: "PR Puglia FESR-FSE+",
    },
    {
      id: "squinzano",
      sector: "public",
      index: "04",
      name: "Squinzano, Avetrana, Torricella",
      client: "Comune di Squinzano (nosilac), Comune di Avetrana, Comune di Torricella",
      summary: "Arhive privatne gradnje digitalizovane zajednički, sa opštinom Squinzano kao nosiocem.",
      scope:
        "Tri opštine u zajedničkoj nabavci: jedan lanac čuvanja, jedan metod, jedna platforma, tri fonda koja ostaju odvojena.",
      volumes: "",
      tech: "Sređivanje · skeniranje · OCR · zakonsko čuvanje · Anamnesis",
      outcome: "Zajednička nabavka sprovedena kao jedna operacija, fondovi ostali odvojeni.",
      programme: "PR Puglia 1.8.3",
      tag: "Zajednička nabavka",
    },
    {
      id: "matino",
      sector: "public",
      index: "05",
      name: "Comune di Matino",
      client: "Comune di Matino",
      summary: "Arhive matične službe i civilnog stanja.",
      scope:
        "Sređivanje i digitalizacija demografskih arhiva opštine — matična služba i civilno stanje.",
      volumes: "20 dužnih metara, arhiva matične službe",
      tech: "Sređivanje · skeniranje",
      outcome: "",
      programme: "",
      tag: "Matične evidencije",
    },
    {
      id: "innocenziana",
      sector: "private",
      index: "06",
      name: "Biblioteca Innocenziana",
      client: "Biblioteca Arcivescovile «Innocenziana», Nadbiskupija Leće",
      summary:
        "Stari tomovi i rukopisi iz biblioteke proglašene za dobro od izuzetnog kulturnog značaja — jedan od zaštićenih fondova za koje je laboratorija opremljena.",
      scope:
        "Beskontaktno skeniranje, sa laboratorijom postavljenom u prostoriji u kojoj se dela čuvaju: podesivi nosači, hladno osvetljenje bez UV i IR zračenja, kolor-skale na svakoj sesiji. Tomovi nikada nisu napustili svoju policu.",
      volumes: "~2.750 stranica · 210 tabli · 7 tomova",
      tech: "Planetarni skener · TIFF masteri · PDF/A · zakonsko čuvanje",
      outcome: "Masteri za čuvanje i kopije za korišćenje, bez ikakvog pomeranja originala.",
      programme: "Ministarski dekret o izuzetnom kulturnom značaju",
      tag: "~2.750 stranica · 210 tabli",
    },
  ],

  also: {
    label: "Takođe u referencama",
    items: ALSO,
    note: "Ostali angažmani podležu poverljivosti i imenuju se na zahtev.",
  },

  logos: {
    eyebrow: "Znakovi",
    note: "Znakovi klijenata prikazuju se belo ili sivo na crnom, nikada u sopstvenoj boji: paleta se ne narušava zbog logotipa. Opštinski grbovi prikazuju se jednobojno i maleni, uz pun naziv institucije.",
    pending: "Datoteke logotipa biće dostavljene.",
  },

  cta: {
    eyebrow: "Kontakt",
    title: "Zahtev za obilazak.",
    lead: "Pet odgovora je dovoljno da se utvrdi da li je posao izvodljiv i kog je reda veličine. Ako nije, kažemo vam odmah.",
    primary: { label: "Zatražite obilazak", href: "/sr/kompanija#contact" },
    secondary: { label: "Upoznajte Anamnesis", href: "/sr/anamnesis" },
  },
} as const;
