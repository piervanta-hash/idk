/* HOME — SRPSKI (latinica, ekavski). Stessa forma di `en` in
   src/content/home.ts. Le frasi della campagna sono quelle dei film. */

export const sr = {
  hero: {
    mark: "Paloryn",
    place: "Lecce, IT · Evropska unija",
    title: "Memorija koja odgovara.",
    lead: "Memorija jedne institucije ne može da ode u penziju. Paloryn sređuje, digitalizuje i strukturira velike papirne arhive, a zatim omogućava da te arhive odgovaraju.",
    primary: { label: "Zatražite obilazak", href: "/sr/kompanija#contact" },
    secondary: { label: "Upoznajte Anamnesis", href: "/sr/anamnesis" },
    film: {
      title:
        "Paloryn film. Posle trideset pet godina u penziju odlazi osoba koja zna gde je sve: od sutra, ko odgovara?",
      play: "Pusti film",
      pause: "Pauziraj film",
      soundOn: "Uključi zvuk",
      soundOff: "Isključi zvuk",
    },
    photo: {
      alt: "Laboratorija kompanije Paloryn u Leću: kolege skeniraju spise na produkcionim skenerima, gomile fascikli na stolovima.",
      caption: "Laboratorija Paloryn, Leće.",
    },
  },

  data: {
    title: "Paloryn odgovara. I navodi izvor.",
    extraction: {
      eyebrow: "Ekstrakcija",
      labels: {
        document: "Dokument",
        table: "Strukturirani zapis",
        replay: "Ponovi",
        locate: "Dodirnite polje da vidite odakle potiče",
        located: "Prikazano na dokumentu",
      },
      docHead: "OPŠTINA LEĆE · GRAĐEVINSKE DOZVOLE",
      note: "Primer zapisa, nije stvarni predmet.",
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
    },
  },

  lab: {
    eyebrow: "Laboratorija",
    title: "Gde papir postaje podatak.",
    lead: "Naša laboratorija u Leću. Spisi stižu, sređuju se, skeniraju i proveravaju ih ljudi koji za njih odgovaraju.",
    items: [
      { base: "lavorazione", caption: "Obrada i provera.", alt: "Stolovi u laboratoriji sa otvorenim spisima, laptopovima i produkcionim skenerom; kolege na poslu u pozadini." },
      { base: "galatina", caption: "Građevinska arhiva opštine Galatina, u laboratoriji.", alt: "Police u laboratoriji sa registratorima opštine Galatina, sa natpisom na polici." },
      { base: "squadra", caption: "Radni sastanak.", alt: "Deo tima okupljen oko stola u laboratoriji, između polica punih registratora." },
    ],
  },

  films: {
    eyebrow: "Kampanja",
    title: "Od sutra, ko odgovara?",
    note: "Filmovi kampanje Paloryn. Rekonstruisane scene: prikazane osobe, brojke i dokumenti su ilustrativni.",
    labels: { watch: "Pogledajte film", close: "Zatvori" },
    items: [
      {
        id: "atti",
        sector: "Opštine",
        title: "Zahtev za uvid u spise, od podnošenja do overene kopije.",
      },
      {
        id: "fiume",
        sector: "Banke i osiguranja",
        title: "Posle poplave: svaki hipotekarni kredit i svaka polisa u oblasti, svaki sa originalnim ugovorom.",
      },
      {
        id: "reti",
        sector: "Operateri mreža",
        title: "Planovi, službenosti, evidencije održavanja: mreža koju možete da pretražujete.",
      },
      {
        id: "viadotto",
        sector: "Infrastruktura",
        title: "Nosivost vijadukta, direktno iz originalnih crteža.",
      },
    ],
  },

  matrix: {
    eyebrow: "Dve delatnosti × dva tržišta",
    title: "Obe polovine služe oba tržišta.",
    columns: ["Javni sektor", "Privatni sektor"],
    rows: [
      {
        name: "Digitalizacija",
        role: "usluga",
        href: "/sr/digitalizacija",
        cells: [
          "Opštine i udruženja opština. Građevinske i katastarske arhive, matične evidencije, upravni spisi.",
          "Advokatske i notarske kancelarije, preduzeća, pozorišta, biblioteke, biskupije, muzeji.",
        ],
      },
      {
        name: "Anamnesis",
        role: "softver",
        href: "/sr/anamnesis",
        cells: [
          "Prijava preko SPID i CIE, pagoPA za takse za pretragu i uvid, integracija sa portalima koje institucije već koriste.",
          "Licenca i white-label: mašina za ekstrakciju, indeks pouzdanosti, dokumentovani API-ji.",
        ],
      },
    ],
  },

  measurements: {
    eyebrow: "Mere",
    items: [
      { value: "1", unit: "km+", label: "dužnih metara arhive pod upravljanjem" },
      { value: "10", unit: "M+", label: "stranica digitalizovano do danas" },
      { value: "20", unit: "+", label: "stručnjaka u timu" },
      { value: "EU", label: "rezidentnost podataka", note: "AI modeli rade lokalno" },
    ],
  },

  map: {
    eyebrow: "Poslovanje",
    title: "Od Leća do Balkana.",
    lead: "Sedište, laboratorija i operativni centar u Leću. Tri kancelarije se uskoro otvaraju: Drač, Skoplje i Beograd. Podaci ostaju u Evropskoj uniji, a originali nikada ne napuštaju zgradu u kojoj se čuvaju.",
    nodes: {
      lecce: { name: "Leće, Italija", role: "Sedište i operativni centar" },
      durres: { name: "Drač", role: "Uskoro otvaranje" },
      skopje: { name: "Skoplje", role: "Uskoro otvaranje" },
      belgrade: { name: "Beograd", role: "Uskoro otvaranje" },
      rome: { name: "Rim", role: "U planu" },
      zagreb: { name: "Zagreb", role: "U planu" },
    },
    legend: { hq: "Sedište", soon: "Uskoro otvaranje", planned: "U planu" },
  },

  work: {
    eyebrow: "Klijenti",
    title: "Klijenti i obim.",
    items: [
      {
        index: "01",
        sector: "Privatni",
        client: "Koreja",
        scope: "Arhiva pozorišta i kulturne produkcije.",
        note: "Prvi realizovani projekat",
      },
      {
        index: "02",
        sector: "Javni",
        client: "Comune di Galatina",
        scope: "Arhiva privatne gradnje, digitalizovana u celosti.",
        note: "PR Puglia FESR-FSE+ 2021-2027",
      },
      {
        index: "03",
        sector: "Javni",
        client: "Squinzano, Avetrana, Torricella",
        scope: "Arhive privatne gradnje digitalizovane zajednički, sa opštinom Squinzano kao nosiocem.",
        note: "PR Puglia 1.8.3",
      },
      {
        index: "04",
        sector: "Javni",
        client: "Comune di Matino",
        scope: "Arhive matične službe i civilnog stanja.",
        note: "Matične evidencije",
      },
      {
        index: "05",
        sector: "Privatni",
        client: "Arhive i biblioteke od istorijskog značaja",
        scope:
          "Stari tomovi i rukopisi, među njima Biblioteca Innocenziana za Nadbiskupiju Leće. TIFF masteri i PDF/A za dugoročno čuvanje.",
        note: "Pod zaštitom ministarstva",
      },
    ],
    alsoLabel: "Takođe u referencama",
    also: "Maglie · Otranto · Galatone · Alezio · Veglie · Porto Cesareo · Ex Manifattura Tabacchi Guarino · Ordine degli Ingegneri di Lecce",
    cta: { label: "Svi klijenti", href: "/sr/klijenti" },
  },

  team: {
    eyebrow: "Ljudi",
    base: "gruppo",
    alt: "Tim kompanije Paloryn, u crnim Paloryn duksevima, zajedno u laboratoriji u Leću među arhivskim policama.",
    caption: "Tim kompanije Paloryn u laboratoriji u Leću.",
  },

  photos: {
    eyebrow: "ARCHILIVES",
    caption:
      "Info dan ARCHILIVES, Cantieri Teatrali Koreja, Leće — Interreg VI-A Grčka-Italija 2021-2027",
    source: "Jun 2026",
    featured: [
      {
        base: "vantaggiato",
        alt: "Pierluigi Vantaggiato drži prezentaciju pored ARCHILIVES roll-up banera na info danu u pozorištu Koreja.",
        credit: "Pierluigi Vantaggiato · Suosnivač",
      },
      {
        base: "castellana",
        alt: "Martino Castellana predstavlja portal pozorišne arhive na info danu ARCHILIVES.",
        credit: "Martino Castellana · CTO",
      },
      {
        base: "perrone",
        alt: "Linda Perrone, viša arhivistkinja, obraća se publici na info danu ARCHILIVES.",
        credit: "Linda Perrone · Viša arhivistkinja",
      },
    ],
    reel: [
      { base: "room-01", alt: "Izlaganje pored ARCHILIVES roll-up banera." },
      { base: "reading", alt: "Čitanje tokom info dana ARCHILIVES." },
      { base: "performance", alt: "Muzički nastup kojim se završava dan." },
    ],
  },

  cta: {
    eyebrow: "Kontakt",
    title: "Zahtev za obilazak.",
    lead: "Pet odgovora je dovoljno da se utvrdi da li je posao izvodljiv i kog je reda veličine. Ako nije, kažemo vam odmah.",
    primary: { label: "Zatražite obilazak", href: "/sr/kompanija#contact" },
    secondary: { label: "Materijali za investitore", href: "/sr/investitori" },
  },
} as const;
