/* HOME — SHQIP. Stessa forma di `en` in src/content/home.ts.
   Le frasi della campagna sono quelle dei film in albanese. */

export const sq = {
  hero: {
    mark: "Paloryn",
    place: "Lecce, IT · Bashkimi Evropian",
    title: "Kujtesa që përgjigjet.",
    lead: "Kujtesa e një institucioni nuk mund të dalë në pension. Paloryn rendit, digjitalizon dhe strukturon arkiva të mëdha në letër, pastaj i bën të përgjigjen.",
    primary: { label: "Kërkoni një inspektim", href: "/sq/kompania#contact" },
    secondary: { label: "Zbuloni Anamnesis", href: "/sq/anamnesis" },
    film: {
      title:
        "Film i Paloryn. Pas tridhjetë e pesë vitesh del në pension personi që di ku ndodhet gjithçka: nga nesër, kush përgjigjet?",
      play: "Luaj filmin",
      pause: "Ndalo filmin",
      soundOn: "Aktivizo zërin",
      soundOff: "Çaktivizo zërin",
    },
    photo: {
      alt: "Laboratori Paloryn në Lecce: kolegë që skanojnë dosje në skanerët e prodhimit, pirgje dosjesh mbi tavolina.",
      caption: "Laboratori Paloryn, Lecce.",
    },
  },

  data: {
    title: "Paloryn përgjigjet. Dhe tregon burimin.",
    extraction: {
      eyebrow: "Nxjerrja",
      labels: {
        document: "Dokumenti",
        table: "Regjistrim i strukturuar",
        replay: "Shiko përsëri",
        locate: "Prekni një fushë për të parë nga vjen",
        located: "Treguar në dokument",
      },
      docHead: "BASHKIA E LEÇES · LEJET E NDËRTIMIT",
      note: "Regjistrim shembull, jo një dosje e vërtetë.",
      fields: [
        { label: "Nr. i dosjes", docLabel: "DOSJA E NDËRTIMIT NR.", value: "1962 / 4471", score: 99 },
        { label: "Aplikuesi", docLabel: "APLIKUESI", value: "Paloryn", score: 96 },
        {
          label: "Adresa",
          docLabel: "VENDNDODHJA E PRONËS",
          value: "Via D. Cantatore 1/3 — Lecce",
          score: 94,
        },
        {
          label: "Ref. kadastrale",
          docLabel: "TË DHËNAT KADASTRALE",
          value: "Fleta 12 · parcelat 417, 418",
          score: 87,
        },
        {
          label: "Objekti",
          docLabel: "OBJEKTI I KËRKESËS",
          value: "Zgjerim dhe ndryshim i destinacionit",
          score: 91,
        },
      ],
    },
  },

  lab: {
    eyebrow: "Laboratori",
    title: "Ku letra bëhet e dhënë.",
    lead: "Laboratori ynë në Lecce. Dosjet mbërrijnë, renditen, skanohen dhe kontrollohen nga njerëz që përgjigjen për to.",
    items: [
      { base: "lavorazione", caption: "Përpunim dhe kontroll.", alt: "Tavolina të laboratorit me dosje të hapura, laptopë dhe një skaner prodhimi; kolegë në punë në sfond." },
      { base: "galatina", caption: "Arkivi i ndërtimeve i Galatinës, në laborator.", alt: "Rafte të laboratorit me dosjet e Comune di Galatina, me tabelën mbi raft." },
      { base: "squadra", caption: "Takim pune.", alt: "Një pjesë e ekipit e mbledhur rreth një tavoline në laborator, mes rafteve plot me dosje." },
    ],
  },

  films: {
    eyebrow: "Fushata",
    title: "Nga nesër, kush përgjigjet?",
    note: "Filma të fushatës Paloryn. Skena të rindërtuara: personat, shifrat dhe dokumentet që shfaqen janë ilustruese.",
    labels: { watch: "Shikoni filmin", close: "Mbyll" },
    items: [
      {
        id: "atti",
        sector: "Bashkitë",
        title: "Një kërkesë për dokumente, nga aplikimi te kopja e njësuar.",
      },
      {
        id: "fiume",
        sector: "Banka dhe sigurime",
        title: "Pas një përmbytjeje: çdo hipotekë dhe çdo policë në zonë, secila me kontratën origjinale.",
      },
      {
        id: "reti",
        sector: "Operatorët e rrjeteve",
        title: "Planimetri, servitute, regjistra mirëmbajtjeje: një rrjet që mund të pyetet.",
      },
      {
        id: "viadotto",
        sector: "Infrastruktura",
        title: "Kapaciteti mbajtës i një viadukti, drejtpërdrejt nga vizatimet origjinale.",
      },
    ],
  },

  matrix: {
    eyebrow: "Dy shërbime × dy tregje",
    title: "Të dyja i shërbejnë të dy tregjeve.",
    columns: ["Sektori publik", "Sektori privat"],
    rows: [
      {
        name: "Dixhitalizimi",
        role: "shërbimi",
        href: "/sq/dixhitalizim",
        cells: [
          "Bashki dhe shoqata bashkish. Arkiva urbanistike dhe kadastrale, regjistra demografikë, akte administrative.",
          "Studio ligjore dhe noteriale, kompani, teatro, biblioteka, dioqeza, muze.",
        ],
      },
      {
        name: "Anamnesis",
        role: "softueri",
        href: "/sq/anamnesis",
        cells: [
          "Hyrje me SPID dhe CIE, pagoPA për tarifat e kërkimit dhe të aksesit, integrim me portalet që institucionet përdorin tashmë.",
          "Licencë dhe white-label: motor nxjerrjeje, shkallë besueshmërie, API të dokumentuara.",
        ],
      },
    ],
  },

  measurements: {
    eyebrow: "Matje",
    items: [
      { value: "1", unit: "km+", label: "metra lineare arkivi në menaxhim" },
      { value: "10", unit: "M+", label: "faqe të digjitalizuara deri sot" },
      { value: "20", unit: "+", label: "specialistë në staf" },
      { value: "EU", label: "rezidenca e të dhënave", note: "modelet AI ekzekutohen lokalisht" },
    ],
  },

  map: {
    eyebrow: "Operacionet",
    title: "Nga Lecce te Ballkani.",
    lead: "Selia, laboratori dhe qendra operative në Lecce. Tri zyra hapen së shpejti: Durrës, Shkup dhe Beograd. Të dhënat mbeten brenda Bashkimit Evropian dhe origjinalet nuk largohen kurrë nga ndërtesa që i ruan.",
    nodes: {
      lecce: { name: "Lecce, Itali", role: "Selia dhe qendra operative" },
      durres: { name: "Durrës", role: "Hapet së shpejti" },
      skopje: { name: "Shkup", role: "Hapet së shpejti" },
      belgrade: { name: "Beograd", role: "Hapet së shpejti" },
      rome: { name: "Romë", role: "Në plan" },
      zagreb: { name: "Zagreb", role: "Në plan" },
    },
    legend: { hq: "Selia", soon: "Hapet së shpejti", planned: "Në plan" },
  },

  work: {
    eyebrow: "Klientët",
    title: "Klientë dhe volume.",
    items: [
      {
        index: "01",
        sector: "Privat",
        client: "Koreja",
        scope: "Arkivi i teatrit dhe i prodhimit kulturor.",
        note: "Projekti i parë i realizuar",
      },
      {
        index: "02",
        sector: "Publik",
        client: "Comune di Galatina",
        scope: "Arkivi i ndërtimeve private, i digjitalizuar plotësisht.",
        note: "PR Puglia FESR-FSE+ 2021-2027",
      },
      {
        index: "03",
        sector: "Publik",
        client: "Squinzano, Avetrana, Torricella",
        scope: "Arkiva të ndërtimeve private, të digjitalizuara bashkërisht, me Squinzano si prijës.",
        note: "PR Puglia 1.8.3",
      },
      {
        index: "04",
        sector: "Publik",
        client: "Comune di Matino",
        scope: "Arkivat e gjendjes civile dhe të regjistrit të popullsisë.",
        note: "Regjistra demografikë",
      },
      {
        index: "05",
        sector: "Privat",
        client: "Arkiva dhe biblioteka me interes historik",
        scope:
          "Vëllime të hershme dhe dorëshkrime, mes tyre Biblioteca Innocenziana për Kryedioqezën e Lecces. Master TIFF dhe PDF/A për ruajtje afatgjatë.",
        note: "Nën mbrojtje ministrore",
      },
    ],
    alsoLabel: "Gjithashtu në referenca",
    also: "Maglie · Otranto · Galatone · Alezio · Veglie · Porto Cesareo · Ex Manifattura Tabacchi Guarino · Ordine degli Ingegneri di Lecce",
    cta: { label: "Të gjithë klientët", href: "/sq/kliente" },
  },

  team: {
    eyebrow: "Njerëzit",
    base: "gruppo",
    alt: "Ekipi i Paloryn, me bluza të zeza Paloryn, së bashku në laboratorin e Lecces mes rafteve të arkivit.",
    caption: "Ekipi i Paloryn në laboratorin e Lecces.",
  },

  photos: {
    eyebrow: "ARCHILIVES",
    caption:
      "Dita informuese ARCHILIVES, Cantieri Teatrali Koreja, Lecce — Interreg VI-A Greqi-Itali 2021-2027",
    source: "Qershor 2026",
    featured: [
      {
        base: "vantaggiato",
        alt: "Pierluigi Vantaggiato prezanton pranë roll-up-it ARCHILIVES në ditën informuese te Koreja.",
        credit: "Pierluigi Vantaggiato · Bashkëthemelues",
      },
      {
        base: "castellana",
        alt: "Martino Castellana prezanton portalin e arkivit të teatrove në ditën informuese ARCHILIVES.",
        credit: "Martino Castellana · CTO",
      },
      {
        base: "perrone",
        alt: "Linda Perrone, arkiviste e lartë, i flet sallës në ditën informuese ARCHILIVES.",
        credit: "Linda Perrone · Arkiviste e lartë",
      },
    ],
    reel: [
      { base: "room-01", alt: "Një prezantim pranë roll-up-it ARCHILIVES." },
      { base: "reading", alt: "Një lexim gjatë ditës informuese ARCHILIVES." },
      { base: "performance", alt: "Performanca muzikore që mbyll ditën." },
    ],
  },

  cta: {
    eyebrow: "Kontakt",
    title: "Kërkesë për inspektim.",
    lead: "Pesë përgjigje mjaftojnë për të përcaktuar nëse puna është e realizueshme dhe në çfarë rendi madhësie. Nëse nuk është, jua themi menjëherë.",
    primary: { label: "Kërkoni një inspektim", href: "/sq/kompania#contact" },
    secondary: { label: "Materiale për investitorët", href: "/sq/investitore" },
  },
} as const;
