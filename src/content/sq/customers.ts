/* KLIENTË — SHQIP. Stessa forma di `en` in src/content/customers.ts.
   I nomi dei committenti restano come sono (sono nomi propri). */

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

export const sq = {
  meta: {
    title: "Klientë — Paloryn",
    description:
      "Projekte të emërtuara për bashki, institucione kulturore dhe teatro: rendim arkivor, digjitalizim në shkallë të gjerë, ruajtje ligjore dhe platformë.",
  },
  hero: {
    eyebrow: "Klientë",
    title: "Klientë dhe volume.",
    lead: "Të dyja anët e kompanisë u shërbejnë të dy tregjeve. Filtri më poshtë është i njëjti që përdoret në faqen kryesore dhe në dy faqet e shërbimeve: kështu ndahet puna në të vërtetë.",
  },

  filter: {
    label: "Sektori",
    all: "Të gjithë",
    public: "Sektori publik",
    private: "Privat",
  },

  detail: {
    open: "Hapni rastin",
    close: "Mbyll",
    client: "Klienti",
    scope: "Objekti",
    volumes: "Volumet",
    tech: "Teknologjitë",
    outcome: "Rezultati",
    programme: "Programi",
    pending: "nuk publikohet",
  },

  cases: [
    {
      id: "koreja",
      sector: "private",
      index: "01",
      name: "Koreja",
      client: "Cantieri Teatrali Koreja, Lecce",
      summary: "Arkivi i teatrit dhe i prodhimit kulturor.",
      scope:
        "Rendimi arkivor dhe digjitalizimi i arkivit të një trupe teatrore: dokumente prodhimi, material fotografik, afishe dhe dokumentacion skenik.",
      volumes: "",
      tech: "Rendim arkivor · digjitalizim · Anamnesis",
      outcome: "Projekti i parë i realizuar.",
      programme: "",
      tag: "Projekti i parë i realizuar",
    },
    {
      id: "archilives",
      sector: "private",
      index: "02",
      name: "ARCHILIVES",
      client: "Arkivat e teatrove mesdhetare, me Cantieri Teatrali Koreja",
      summary:
        "Portal dokumentesh për teatrot e zonës mesdhetare. Projektimi dhe zhvillimi brenda kompanisë.",
      scope:
        "Fonde në letër dhe multimediale nga disa teatro, të bashkuara në një portal të vetëm të kërkueshëm. Projektimi dhe zhvillimi u kryen brenda kompanisë — demonstrimi më i qartë i anës softuerike të kompanisë.",
      volumes: "",
      tech: "Anamnesis · projektim dhe zhvillim i portalit brenda kompanisë",
      outcome: "Fonde nga institucione të ndryshme, të konsultueshme në një vend, me një kërkim të vetëm.",
      programme: "Interreg VI-A Greqi-Itali 2021-2027",
      tag: "Softuer, i ndërtuar brenda",
    },
    {
      id: "galatina",
      sector: "public",
      index: "03",
      name: "Comune di Galatina",
      client: "Comune di Galatina",
      summary: "Arkivi i ndërtimeve private, i digjitalizuar plotësisht.",
      scope:
        "Dosjet e lejeve të ndërtimit për ndërtimet private: rendim, skanim në volum të lartë, nxjerrje fushash dhe publikim për sportelin dhe për qytetarët.",
      volumes: "",
      tech: "Rendim · skanim 300 DPI · OCR · ruajtje ligjore · Anamnesis",
      outcome: "Arkivi i ndërtimeve i kërkueshëm sipas adresës, lejes dhe referencës kadastrale.",
      programme: "PR Puglia FESR-FSE+ 2021-2027",
      tag: "PR Puglia FESR-FSE+",
    },
    {
      id: "squinzano",
      sector: "public",
      index: "04",
      name: "Squinzano, Avetrana, Torricella",
      client: "Comune di Squinzano (prijës), Comune di Avetrana, Comune di Torricella",
      summary: "Arkiva të ndërtimeve private, të digjitalizuara bashkërisht, me Squinzano si prijës.",
      scope:
        "Tri bashki që prokurojnë së bashku: një zinxhir ruajtjeje, një metodë, një platformë, tri fonde të mbajtura të ndara.",
      volumes: "",
      tech: "Rendim · skanim · OCR · ruajtje ligjore · Anamnesis",
      outcome: "Prokurim i përbashkët i realizuar si një operacion i vetëm, me fondet të ndara.",
      programme: "PR Puglia 1.8.3",
      tag: "Prokurim i përbashkët",
    },
    {
      id: "matino",
      sector: "public",
      index: "05",
      name: "Comune di Matino",
      client: "Comune di Matino",
      summary: "Arkivat e gjendjes civile dhe të regjistrit të popullsisë.",
      scope:
        "Rendimi dhe digjitalizimi i arkivave demografike të bashkisë — regjistri i popullsisë dhe gjendja civile.",
      volumes: "20 metra lineare, arkivi i regjistrit të popullsisë",
      tech: "Rendim · skanim",
      outcome: "",
      programme: "",
      tag: "Regjistra demografikë",
    },
    {
      id: "innocenziana",
      sector: "private",
      index: "06",
      name: "Biblioteca Innocenziana",
      client: "Biblioteca Arcivescovile «Innocenziana», Kryedioqeza e Lecces",
      summary:
        "Vëllime të hershme dhe dorëshkrime nga një bibliotekë e shpallur me interes kulturor të jashtëzakonshëm — një nga fondet e mbrojtura për të cilat laboratori është i pajisur.",
      scope:
        "Skanim pa kontakt, me laboratorin të ngritur në sallën që ruan veprat: mbajtëse të rregullueshme, ndriçim i ftohtë pa UV dhe IR, shirita ngjyrash në çdo seancë. Vëllimet nuk u larguan kurrë nga rafti i tyre.",
      volumes: "~2.750 faqe · 210 tabela · 7 vëllime",
      tech: "Skaner planetar · master TIFF · PDF/A · ruajtje ligjore",
      outcome: "Master për ruajtje dhe kopje për konsultim, pa lëvizur kurrë origjinalet.",
      programme: "Dekret ministror për interes kulturor të jashtëzakonshëm",
      tag: "~2.750 faqe · 210 tabela",
    },
  ],

  also: {
    label: "Gjithashtu në referenca",
    items: ALSO,
    note: "Angazhime të tjera mbulohen nga konfidencialiteti dhe emërtohen me kërkesë.",
  },

  logos: {
    eyebrow: "Logot",
    note: "Logot e klientëve shfaqen në të bardhë ose gri mbi të zezë, kurrë në ngjyrën e tyre: paleta nuk prishet për një logo. Stemat bashkiake shfaqen njëngjyrëshe dhe të vogla, me emrin e plotë të institucionit pranë.",
    pending: "Skedarët e logove do të dërgohen.",
  },

  cta: {
    eyebrow: "Kontakt",
    title: "Kërkesë për inspektim.",
    lead: "Pesë përgjigje mjaftojnë për të përcaktuar nëse puna është e realizueshme dhe në çfarë rendi madhësie. Nëse nuk është, jua themi menjëherë.",
    primary: { label: "Kërkoni një inspektim", href: "/sq/kompania#contact" },
    secondary: { label: "Zbuloni Anamnesis", href: "/sq/anamnesis" },
  },
} as const;
