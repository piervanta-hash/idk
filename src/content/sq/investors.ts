/* INVESTITORË — SHQIP. Stessa forma di `en` in src/content/investors.ts. */

export const sq = {
  meta: {
    title: "Investitorë — Paloryn",
    description:
      "Profili institucional, qeverisja dhe certifikimet. Materialet për investitorët jepen me kërkesë, nën konfidencialitet.",
  },
  hero: {
    eyebrow: "Investitorë",
    title: "Materiale me kërkesë.",
    lead: "Kjo faqe nuk përmban informacion financiar. Shifrat, rritja dhe portofoli i projekteve ndahen drejtpërdrejt, nën konfidencialitet, me palët që i kërkojnë.",
  },

  profile: {
    eyebrow: "Profili",
    title: "Profili i kompanisë.",
    items: [
      {
        k: "Veprimtaria",
        v: "Dy gjysma në të njëjtin nivel: një shërbim — rendim arkivor, digjitalizim në shkallë të gjerë, ruajtje ligjore — dhe një platformë softuerike e vetë, Anamnesis, për nxjerrjen e të dhënave dhe ndërveprimin.",
      },
      {
        k: "Tregjet",
        v: "Sektori publik — bashki, arkiva urbanistike dhe kadastrale — dhe klientë privatë: studio ligjore dhe noteriale, kompani, teatro, biblioteka, dioqeza dhe muze. Të dyja gjysmat u shërbejnë të dy tregjeve.",
      },
      {
        k: "Infrastruktura",
        v: "Modelet AI ekzekutohen lokalisht në infrastrukturë të vetë. Rezidenca e të dhënave në Evropë. Klientët mbajnë pronësinë e të dhënave dhe mund t'i eksportojnë plotësisht, në formate të hapura, në çdo kohë.",
      },
      {
        k: "Selia",
        v: "Selia, laboratori dhe qendra operative në Lecce, Itali. Zyra që hapen së shpejti në Durrës, Shkup dhe Beograd.",
      },
    ],
  },

  governance: {
    eyebrow: "Qeverisja dhe certifikimet",
    title: "Sisteme menaxhimi të certifikuara.",
    lead: "Të certifikuara nga një organ i akredituar. Referencat e certifikatave i bashkëlidhen dokumentacionit të tenderëve dhe jepen me kërkesë.",
    certs: [
      { code: "ISO 9001", scope: "menaxhimi i cilësisë" },
      { code: "ISO/IEC 27001", scope: "siguria e informacionit" },
      { code: "ISO/IEC 27017", scope: "siguria e shërbimeve cloud" },
      { code: "ISO/IEC 27018", scope: "të dhënat personale në cloud" },
      { code: "ACN · AgID", scope: "Anamnesis, kualifikim për sektorin publik" },
    ],
    note: "Dialogu i vazhdueshëm me Soprintendenza Archivistica e Bibliografica është praktikë e zakonshme për fondet nën mbrojtje dhe për propozimet e asgjësimit.",
  },

  materials: {
    eyebrow: "Materialet",
    title: "Materialet në dispozicion.",
    items: [
      "Profili i kompanisë dhe struktura organizative",
      "Modeli i biznesit dhe përbërja e të ardhurave",
      "Kontratat e fituara, volumet e realizuara, portofoli",
      "Infrastruktura, qeverisja e të dhënave dhe siguria",
      "Certifikatat dhe referencat e auditimit",
    ],
    note: "Jepen me angazhim konfidencialiteti, palëve të identifikuara.",
  },

  contact: {
    eyebrow: "Kontakt i rezervuar",
    title: "Kontakt i drejtpërdrejtë.",
    lead: "Një adresë e vetme, që e lexojnë themeluesit. Na tregoni kush jeni dhe çfarë ju duhet të shihni; përgjigjemi me materialet përkatëse.",
    email: "info@paloryn.com",
    form: {
      org: "Organizata",
      name: "Emri",
      mail: "Email",
      interest: "Çfarë dëshironi të shihni",
      interestHint: "Modeli i biznesit, rritja, infrastruktura, qeverisja — ose të gjitha.",
      send: "Dërgo kërkesën",
      sending: "Po dërgohet…",
      sent: "Kërkesa u mor.",
      sentNote: "Adresën e lexojnë themeluesit. Përgjigjemi me materialet përkatëse, nën konfidencialitet.",
      failed: "Mesazhi nuk u dërgua. Shkruani në adresën më poshtë dhe do t'ju përgjigjemi njësoj.",
      subject: "Materiale për investitorët",
      alt: "Ose shkruani në",
      privacy:
        "Të dhënat e dërguara përmes këtij formulari përdoren vetëm për t'iu përgjigjur kërkesës. Nuk përdoren për marketing dhe nuk u jepen palëve të treta.",
    },
  },
} as const;
