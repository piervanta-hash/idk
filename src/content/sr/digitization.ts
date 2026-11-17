/* DIGITALIZACIJA — SRPSKI. Stessa forma di `en` in src/content/digitization.ts. */

export const sr = {
  meta: {
    title: "Digitalizacija — Paloryn",
    description:
      "Arhivsko sređivanje, skeniranje velikog obima, zakonsko čuvanje i objavljivanje tekućih, međuarhivskih i istorijskih arhiva.",
  },
  hero: {
    eyebrow: "Usluga",
    title: "Sređeno pre skeniranja.",
    lead: "Paloryn preuzima tekuće, međuarhivske i istorijske arhive. Arhivsko sređivanje, skeniranje velikog obima, zakonsko čuvanje i objavljivanje — bez napuštanja mesta na kom se originali čuvaju.",
    primary: { label: "Zatražite obilazak", href: "/sr/kompanija#contact" },
    secondary: { label: "Upoznajte Anamnesis", href: "/sr/anamnesis" },
  },

  process: {
    eyebrow: "Postupak",
    title: "Sedam faza. Nijedna nije opciona.",
    lead: "Prva određuje sve ostale.",
    caption: "Svaka faza ostavlja dokumentaciju. Ništa ne prelazi u sledeću fazu na reč.",
    steps: [
      {
        n: "01",
        name: "Obilazak",
        title: "Preliminarni obilazak",
        body: "Obilazak depoa na licu mesta. Obim se meri u dužnim metrima, stanje se beleži, fondovi sa ograničenjima se identifikuju. Ishod je plan rada, a ne paušalna ponuda.",
        tags: "dužni metri · stanje · ograničenja",
      },
      {
        n: "02",
        name: "Sređivanje",
        title: "Arhivsko sređivanje",
        body: "Serije se rekonstruišu, a jedinice popisuju u skladu sa arhivskom vezom. Predlozi za izlučivanje sastavljaju se radi odobrenja. Arhivski posao, ne kancelarijski.",
        tags: "serije · jedinice · odobreno izlučivanje",
      },
      {
        n: "03",
        name: "Konzervacija",
        title: "Konzervatorski tretman",
        body: "Kada nosač to zahteva, tretman se obavlja u našoj radionici: suvo čišćenje, popravka cepova japanskim papirom, ravnanje, uklanjanje metalnih spajalica. List kojim se ne može rukovati ne može se ni skenirati — a tretman dolazi pre skeniranja, nikada posle.",
        tags: "Sopstvena radionica · japanski papir · suvo čišćenje",
      },
      {
        n: "04",
        name: "Skeniranje",
        title: "Skeniranje",
        body: "Planetarni skeneri za ukoričen i krhak materijal, produkcioni skeneri za tekuću dokumentaciju. 300 DPI, TIFF masteri. Rezoluciju i upravljanje bojom određuje nosač, a ne rok.",
        tags: "300 DPI · TIFF master · kolor-skala",
      },
      {
        n: "05",
        name: "Ekstrakcija",
        title: "Ekstrakcija polja",
        body: "OCR kroz ceo fond, zatim ekstrakcija relevantnih polja — delovodni broj, nosilac, datum, katastarska oznaka. Svako polje nosi čitljiv indeks pouzdanosti.",
        tags: "OCR · strukturirana polja · pouzdanost",
      },
      {
        n: "06",
        name: "Čuvanje",
        title: "Zakonsko čuvanje",
        body: "Paketi za predaju izrađeni prema važećim tehničkim pravilima, sa propisanim metapodacima i potpisima. Digitalizovano se čuva u našem cloudu, sa rezidentnošću podataka u Evropskoj uniji. Vlasništvo nad podacima ostaje klijentu, koji ih u svakom trenutku može izvesti u celosti, u otvorenim formatima.",
        tags: "PDF/A · kvalifikovani pečat · vremenski žig · podaci u EU",
      },
      {
        n: "07",
        name: "Objavljivanje",
        title: "Objavljivanje i pretraga",
        body: "Fond se učitava u Anamnesis: semantička pretraga, filteri po izdvojenim poljima, prikaz na mapi gde je potrebno, autentifikovan pristup. Predmet za koji su trebala tri radna dana postaje pitanje sekundi.",
        tags: "semantička pretraga · mapa · SPID i CIE",
      },
    ],
  },

  markets: {
    eyebrow: "Za koga je",
    title: "Oba tržišta, isti lanac čuvanja.",
    columns: [
      {
        name: "Javni sektor",
        body: "Opštine i udruženja opština. Građevinske i katastarske arhive, upravni spisi, zdravstveni i kadrovski dosijei. Rokovi vezani za izveštavanje o finansiranju.",
        tags: "usklađenost sa AgID · finansirani programi · zajednička nabavka",
      },
      {
        name: "Privatni sektor",
        body: "Advokatske i notarske kancelarije, preduzeća, pozorišta, biblioteke, biskupije i muzeji. Fondovi sa ograničenjima, obaveze zaštite, materijal koji se ne može pomerati.",
        tags: "laboratorija na licu mesta · fondovi sa ograničenjima · informativna sredstva",
      },
    ],
  },

  standards: {
    eyebrow: "Formati i standardi",
    items: [
      { k: "Skeniranje", v: "300 DPI · TIFF master" },
      { k: "Čuvanje", v: "PDF/A · kvalifikovani elektronski pečat · vremenski žig" },
      { k: "Čuvanje u posedu", v: "evidentirano pri svakoj predaji" },
      { k: "Izlaz", v: "pun izvoz, otvoreni formati, bez zaključavanja" },
    ],
  },

  plate: {
    eyebrow: "Laboratorija",
    caption:
      "Laboratorija za digitalizaciju: planetarni skener sa krakom kamere iznad, podesivi nosač, hladno osvetljenje bez UV i IR zračenja.",
    note: "Nacrtana šema, nije fotografija.",
  },

  cta: {
    eyebrow: "Kontakt",
    title: "Zahtev za obilazak.",
    lead: "Pet odgovora je dovoljno da se utvrdi da li je posao izvodljiv i kog je reda veličine. Ako nije, kažemo vam odmah.",
    primary: { label: "Zatražite obilazak", href: "/sr/kompanija#contact" },
    secondary: { label: "Svi klijenti", href: "/sr/klijenti" },
  },
} as const;
