/* INVESTITORI — SRPSKI. Stessa forma di `en` in src/content/investors.ts. */

export const sr = {
  meta: {
    title: "Investitori — Paloryn",
    description:
      "Institucionalni profil, upravljanje i sertifikati. Materijali za investitore dostavljaju se na zahtev, uz poverljivost.",
  },
  hero: {
    eyebrow: "Investitori",
    title: "Materijali na zahtev.",
    lead: "Ova stranica ne sadrži finansijske podatke. Brojke, rast i portfelj projekata dele se direktno, uz poverljivost, sa partnerima koji ih zatraže.",
  },

  profile: {
    eyebrow: "Profil",
    title: "Profil kompanije.",
    items: [
      {
        k: "Delatnost",
        v: "Dve polovine na istom nivou: usluga — arhivsko sređivanje, masovna digitalizacija, zakonsko čuvanje — i sopstvena softverska platforma, Anamnesis, za ekstrakciju podataka i interoperabilnost.",
      },
      {
        k: "Tržišta",
        v: "Javni sektor — opštine, građevinske i katastarske arhive — i privatni klijenti: advokatske i notarske kancelarije, preduzeća, pozorišta, biblioteke, biskupije i muzeji. Obe polovine služe oba tržišta.",
      },
      {
        k: "Infrastruktura",
        v: "AI modeli rade lokalno na sopstvenoj infrastrukturi. Rezidentnost podataka u Evropi. Klijenti zadržavaju vlasništvo nad podacima i mogu ih u svakom trenutku izvesti u celosti, u otvorenim formatima.",
      },
      {
        k: "Sedište",
        v: "Sedište, laboratorija i operativni centar u Leću, Italija. Kancelarije koje se uskoro otvaraju u Draču, Skoplju i Beogradu.",
      },
    ],
  },

  governance: {
    eyebrow: "Upravljanje i sertifikati",
    title: "Sertifikovani sistemi menadžmenta.",
    lead: "Sertifikovano od strane akreditovanog tela. Reference sertifikata prilažu se tenderskoj dokumentaciji i dostavljaju na zahtev.",
    certs: [
      { code: "ISO 9001", scope: "menadžment kvalitetom" },
      { code: "ISO/IEC 27001", scope: "bezbednost informacija" },
      { code: "ISO/IEC 27017", scope: "bezbednost cloud usluga" },
      { code: "ISO/IEC 27018", scope: "lični podaci u cloudu" },
      { code: "ACN · AgID", scope: "Anamnesis, kvalifikacija za javni sektor" },
    ],
    note: "Stalni dijalog sa Soprintendenza Archivistica e Bibliografica uobičajena je praksa za fondove pod zaštitom i za predloge izlučivanja.",
  },

  materials: {
    eyebrow: "Materijali",
    title: "Dostupni materijali.",
    items: [
      "Profil kompanije i organizaciona struktura",
      "Poslovni model i struktura prihoda",
      "Dobijeni ugovori, realizovani obim, portfelj",
      "Infrastruktura, upravljanje podacima i bezbednost",
      "Sertifikati i reference revizija",
    ],
    note: "Dostavljaju se uz obavezu poverljivosti, identifikovanim partnerima.",
  },

  contact: {
    eyebrow: "Poverljiv kontakt",
    title: "Direktan kontakt.",
    lead: "Jedna adresa, koju čitaju osnivači. Recite nam ko ste i šta treba da vidite; odgovaramo materijalima koji se na to odnose.",
    email: "info@paloryn.com",
    form: {
      org: "Organizacija",
      name: "Ime",
      mail: "Email",
      interest: "Šta biste želeli da vidite",
      interestHint: "Poslovni model, rast, infrastruktura, upravljanje — ili sve.",
      send: "Pošalji zahtev",
      sending: "Slanje…",
      sent: "Zahtev je primljen.",
      sentNote: "Adresu čitaju osnivači. Odgovaramo odgovarajućim materijalima, uz poverljivost.",
      failed: "Poruka nije poslata. Pišite na adresu ispod i odgovorićemo vam isto tako.",
      subject: "Materijali za investitore",
      alt: "Ili pišite na",
      privacy:
        "Podaci poslati putem ovog obrasca koriste se samo za odgovor na zahtev. Ne koriste se u marketinške svrhe i ne ustupaju se trećim licima.",
    },
  },
} as const;
