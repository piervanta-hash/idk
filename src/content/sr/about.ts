/* KOMPANIJA — SRPSKI. Stessa forma di `en` in src/content/about.ts. */

export const sr = {
  meta: {
    title: "Kompanija — Paloryn",
    description:
      "Kompanija za podatke iz Leća: arhivsko sređivanje, masovna digitalizacija i sopstvena platforma za ekstrakciju podataka i interoperabilnost sa javnim sektorom.",
  },
  hero: {
    eyebrow: "Kompanija",
    title: "Jedan partner za ceo lanac.",
    lead: "Paloryn radi sa papirnim arhivama i sa podacima koji iz njih nastaju. Jedna kompanija odgovara za oboje: sređivanje, skeniranje, čuvanje i platformu koja fond čini pretraživim.",
  },

  credentials: {
    eyebrow: "Reference",
    title: "Aktuelni programi i ugovori.",
    items: [
      {
        n: "01",
        body: "Opštinske arhive u digitalizaciji u okviru regionalnog programa FESR-FSE+ 2021-2027, sa rokovima vezanim za izveštavanje.",
      },
      {
        n: "02",
        body: "Arhive i biblioteke od istorijskog i kulturnog značaja pod zaštitom, među njima biblioteka koja je ministarskim dekretom proglašena za dobro od izuzetnog kulturnog značaja, skenirana na licu mesta bez pomeranja dela.",
      },
      {
        n: "03",
        body: "Portal dokumenata za pozorišta mediteranskog područja, program Interreg Grčka-Italija. Projektovanje i razvoj u sopstvenoj režiji.",
      },
      {
        n: "04",
        body: "Stalni dijalog sa Soprintendenza Archivistica e Bibliografica — uobičajena praksa za fondove pod zaštitom i za predloge izlučivanja.",
      },
    ],
  },

  certifications: {
    eyebrow: "Sertifikati",
    title: "Sertifikovani sistemi menadžmenta.",
    lead: "Sertifikovano od strane akreditovanog tela. Reference sertifikata prilažu se tenderskoj dokumentaciji.",
    items: [
      { code: "ISO 9001", scope: "menadžment kvalitetom" },
      { code: "ISO/IEC 27001", scope: "bezbednost informacija" },
      { code: "ISO/IEC 27017", scope: "bezbednost cloud usluga" },
      { code: "ISO/IEC 27018", scope: "lični podaci u cloudu" },
      { code: "ACN · AgID", scope: "Anamnesis, kvalifikacija za javni sektor" },
    ],
  },

  contact: {
    eyebrow: "Kontakt",
    title: "Zahtev za obilazak.",
    lead: "Pet odgovora je dovoljno da se utvrdi da li je posao izvodljiv i kog je reda veličine. Ako nije, kažemo vam odmah.",
    profileLabel: "Ko piše",
    profiles: [
      { value: "public", label: "Javna institucija" },
      { value: "culture", label: "Kulturna institucija" },
      { value: "company", label: "Preduzeće" },
    ],
    form: {
      org: "Naziv institucije ili preduzeća",
      name: "Ime",
      mail: "Email",
      extent: "Procenjeni obim",
      extentHint: "I okvirno, u dužnim metrima: služi samo za red veličine.",
      notes: "Opis arhive",
      send: "Pošalji",
      sending: "Slanje…",
      sent: "Zahtev je primljen.",
      sentNote: "Čitamo svaki zahtev i odgovaramo u roku od dva radna dana. Ako posao nije izvodljiv, reći ćemo vam.",
      failed: "Poruka nije poslata. Pišite na adresu ispod i odgovorićemo vam isto tako.",
      subject: "Zahtev za obilazak",
      privacy:
        "Podaci poslati putem ovog obrasca koriste se samo za odgovor na zahtev. Ne koriste se u marketinške svrhe i ne ustupaju se trećim licima.",
      alt: "Ili pišite na",
    },
    office: {
      label: "Sedište",
      lines: ["Via D. Cantatore 1/3", "73100 Lecce (LE), Italija"],
      vat: "PIB IT 04522160755",
      mail: "info@paloryn.com",
      phone: "+39 352 069 0071",
      phoneHref: "+393520690071",
    },
  },
} as const;
