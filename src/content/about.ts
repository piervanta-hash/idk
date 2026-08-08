/* ==========================================================================
   PAGINA ABOUT / AZIENDA — EN e IT

   Non e' una fase del brief, ma senza non si va online: e' la pagina dove
   finiscono contatti, certificazioni e credenziali, e dove il menu manda
   chiunque cerchi «chi siete».

   Le credenziali sono quelle gia' pubblicate sul sito attuale, verificabili
   una per una.

   Qui non ci sono persone: nomi e volti stanno tutti nel blocco ARCHILIVES
   della home, dove le fotografie hanno un contesto — un evento vero, con
   una data. Ripeterli qui in una griglia di ritratti sarebbe la pagina
   «il team» di qualunque sito, e non aggiungerebbe niente.

   Il modulo a tre profili viene dal sito attuale, dove funziona bene: chi
   scrive dichiara subito che cosa e', e la risposta cambia di conseguenza.
   ========================================================================== */

export const about = {
  en: {
    meta: {
      title: "About — Paloryn",
      description:
        "A data company in Lecce: archival ordering, mass digitization and a proprietary platform for extraction and public-sector interoperability.",
    },
    hero: {
      eyebrow: "About",
      title: "Archivists, engineers, developers.",
      lead: "Paloryn works on paper archives and on the data that comes out of them. One company answers for both: the ordering, the capture, the preservation and the platform that makes the holding queryable.",
    },

    credentials: {
      eyebrow: "Credentials",
      title: "Current programmes and mandates.",
      items: [
        {
          n: "01",
          body: "Municipal archives being digitized under the regional FESR-FSE+ 2021-2027 programme, on schedules bound to reporting deadlines.",
        },
        {
          n: "02",
          body: "Early volumes from a library declared of exceptional cultural interest by ministerial decree, captured on site, without the works being moved.",
        },
        {
          n: "03",
          body: "Document portal for the theatres of the Mediterranean area, Interreg Greece-Italy programme. Design and development in house.",
        },
        {
          n: "04",
          body: "Ongoing dialogue with the Soprintendenza Archivistica e Bibliografica — standard practice for holdings under protection and for disposal proposals.",
        },
      ],
    },

    certifications: {
      eyebrow: "Certifications",
      title: "Certified management systems.",
      lead: "Certified by an accredited body. Certificate references are attached to tender documentation.",
      items: [
        { code: "ISO 9001", scope: "quality management" },
        { code: "ISO/IEC 27001", scope: "information security" },
        { code: "ISO/IEC 27017", scope: "cloud service security" },
        { code: "ISO/IEC 27018", scope: "personal data in the cloud" },
      ],
    },

    contact: {
      eyebrow: "Contact",
      title: "Survey request.",
      lead: "Five answers are enough to establish whether the work is feasible and at what order of magnitude. If it is not, we say so immediately.",
      profileLabel: "Who is writing",
      profiles: [
        { value: "public", label: "Public authority" },
        { value: "culture", label: "Cultural institution" },
        { value: "company", label: "Company" },
      ],
      form: {
        org: "Authority or company name",
        name: "Name",
        mail: "Email",
        extent: "Estimated extent",
        extentHint: "Even roughly, in linear metres: it is only for the order of magnitude.",
        notes: "Description of the archive",
        send: "Send",
        privacy:
          "Data sent through this form is used only to answer the request. It is not used for marketing and is not passed to third parties.",
        alt: "Or write to",
      },
      office: {
        label: "Office",
        lines: ["Via D. Cantatore 1/3", "73100 Lecce (LE), Italy"],
        vat: "VAT 04522160755",
        mail: "info@paloryn.com",
        phone: "+39 352 069 0071",
        phoneHref: "+393520690071",
      },
    },
  },

  it: {
    meta: {
      title: "Azienda — Paloryn",
      description:
        "Una società di dati a Lecce: ordinamento archivistico, digitalizzazione massiva e una piattaforma proprietaria per l'estrazione e l'interoperabilità con la PA.",
    },
    hero: {
      eyebrow: "Azienda",
      title: "Archivisti, ingegneri, sviluppatori.",
      lead: "Paloryn lavora sugli archivi di carta e sul dato che ne esce. Di entrambi risponde la stessa impresa: l'ordinamento, la ripresa, la conservazione e la piattaforma che rende il fondo interrogabile.",
    },

    credentials: {
      eyebrow: "Credenziali",
      title: "Programmi e incarichi in corso.",
      items: [
        {
          n: "01",
          body: "Archivi comunali in digitalizzazione nell'ambito del programma regionale FESR-FSE+ 2021-2027, con cronoprogrammi vincolati ai termini di rendicontazione.",
        },
        {
          n: "02",
          body: "Volumi antichi di una biblioteca dichiarata di eccezionale interesse culturale con decreto ministeriale, ripresi in sede, senza movimentazione delle opere.",
        },
        {
          n: "03",
          body: "Portale documentale dei teatri dell'area mediterranea, programma Interreg Grecia-Italia. Progettazione e sviluppo interni.",
        },
        {
          n: "04",
          body: "Interlocuzione continuativa con la Soprintendenza Archivistica e Bibliografica: prassi ordinaria per i fondi sottoposti a tutela e per le proposte di scarto.",
        },
      ],
    },

    certifications: {
      eyebrow: "Certificazioni",
      title: "Sistemi di gestione certificati.",
      lead: "Certificati da organismo accreditato. Gli estremi dei certificati sono allegati alla documentazione di gara.",
      items: [
        { code: "ISO 9001", scope: "gestione della qualità" },
        { code: "ISO/IEC 27001", scope: "sicurezza delle informazioni" },
        { code: "ISO/IEC 27017", scope: "sicurezza dei servizi cloud" },
        { code: "ISO/IEC 27018", scope: "dati personali nel cloud" },
      ],
    },

    contact: {
      eyebrow: "Contatti",
      title: "Richiesta di sopralluogo.",
      lead: "Cinque risposte bastano a stabilire se l'intervento è praticabile e con quale ordine di grandezza. In caso negativo, lo diciamo subito.",
      profileLabel: "Chi scrive",
      profiles: [
        { value: "public", label: "Ente pubblico" },
        { value: "culture", label: "Istituzione culturale" },
        { value: "company", label: "Impresa" },
      ],
      form: {
        org: "Ente o ragione sociale",
        name: "Nome",
        mail: "Email",
        extent: "Consistenza stimata",
        extentHint:
          "Anche approssimativa, in metri lineari: serve solo per l'ordine di grandezza.",
        notes: "Descrizione dell'archivio",
        send: "Invia",
        privacy:
          "I dati inviati con questo modulo servono solo a rispondere alla richiesta. Non vengono usati per marketing né ceduti a terzi.",
        alt: "Oppure scrivere a",
      },
      office: {
        label: "Sede",
        lines: ["Via D. Cantatore 1/3", "73100 Lecce (LE), Italia"],
        vat: "P. IVA 04522160755",
        mail: "info@paloryn.com",
        phone: "+39 352 069 0071",
        phoneHref: "+393520690071",
      },
    },
  },
} as const;
