/* KOMPANIA — SHQIP. Stessa forma di `en` in src/content/about.ts. */

export const sq = {
  meta: {
    title: "Kompania — Paloryn",
    description:
      "Kompani të dhënash në Lecce: rendim arkivor, digjitalizim në shkallë të gjerë dhe platformë e vetë për nxjerrjen e të dhënave dhe ndërveprimin me sektorin publik.",
  },
  hero: {
    eyebrow: "Kompania",
    title: "Një palë e vetme për të gjithë zinxhirin.",
    lead: "Paloryn punon me arkivat në letër dhe me të dhënat që dalin prej tyre. Një kompani e vetme përgjigjet për të dyja: rendimin, skanimin, ruajtjen dhe platformën që e bën fondin të kërkueshëm.",
  },

  credentials: {
    eyebrow: "Referenca",
    title: "Programe dhe mandate në vazhdim.",
    items: [
      {
        n: "01",
        body: "Arkiva bashkiake në digjitalizim brenda programit rajonal FESR-FSE+ 2021-2027, me afate të lidhura me raportimin.",
      },
      {
        n: "02",
        body: "Arkiva dhe biblioteka me interes historik e kulturor nën mbrojtje, mes tyre një bibliotekë e shpallur me dekret ministror me interes kulturor të jashtëzakonshëm, e skanuar në vend pa i lëvizur veprat.",
      },
      {
        n: "03",
        body: "Portal dokumentesh për teatrot e zonës mesdhetare, programi Interreg Greqi-Itali. Projektimi dhe zhvillimi brenda kompanisë.",
      },
      {
        n: "04",
        body: "Dialog i vazhdueshëm me Soprintendenza Archivistica e Bibliografica — praktikë e zakonshme për fondet nën mbrojtje dhe për propozimet e asgjësimit.",
      },
    ],
  },

  certifications: {
    eyebrow: "Certifikime",
    title: "Sisteme menaxhimi të certifikuara.",
    lead: "Të certifikuara nga një organ i akredituar. Referencat e certifikatave i bashkëlidhen dokumentacionit të tenderëve.",
    items: [
      { code: "ISO 9001", scope: "menaxhimi i cilësisë" },
      { code: "ISO/IEC 27001", scope: "siguria e informacionit" },
      { code: "ISO/IEC 27017", scope: "siguria e shërbimeve cloud" },
      { code: "ISO/IEC 27018", scope: "të dhënat personale në cloud" },
      { code: "ACN · AgID", scope: "Anamnesis, kualifikim për sektorin publik" },
    ],
  },

  contact: {
    eyebrow: "Kontakt",
    title: "Kërkesë për inspektim.",
    lead: "Pesë përgjigje mjaftojnë për të përcaktuar nëse puna është e realizueshme dhe në çfarë rendi madhësie. Nëse nuk është, jua themi menjëherë.",
    profileLabel: "Kush shkruan",
    profiles: [
      { value: "public", label: "Institucion publik" },
      { value: "culture", label: "Institucion kulturor" },
      { value: "company", label: "Kompani" },
    ],
    form: {
      org: "Emri i institucionit ose i kompanisë",
      name: "Emri",
      mail: "Email",
      extent: "Shtrirja e vlerësuar",
      extentHint: "Edhe përafërsisht, në metra lineare: shërben vetëm për rendin e madhësisë.",
      notes: "Përshkrimi i arkivit",
      send: "Dërgo",
      sending: "Po dërgohet…",
      sent: "Kërkesa u mor.",
      sentNote: "I lexojmë të gjitha kërkesat dhe përgjigjemi brenda dy ditëve të punës. Nëse puna nuk është e realizueshme, jua themi.",
      failed: "Mesazhi nuk u dërgua. Shkruani në adresën më poshtë dhe do t'ju përgjigjemi njësoj.",
      subject: "Kërkesë për inspektim",
      privacy:
        "Të dhënat e dërguara përmes këtij formulari përdoren vetëm për t'iu përgjigjur kërkesës. Nuk përdoren për marketing dhe nuk u jepen palëve të treta.",
      alt: "Ose shkruani në",
    },
    office: {
      label: "Selia",
      lines: ["Via D. Cantatore 1/3", "73100 Lecce (LE), Itali"],
      vat: "NIPT IT 04522160755",
      mail: "info@paloryn.com",
      phone: "+39 352 069 0071",
      phoneHref: "+393520690071",
    },
  },
} as const;
