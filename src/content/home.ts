/* ==========================================================================
   CONTENUTI DELLA HOME — EN e IT

   Il brief chiede che ogni testo scritto dalla Fase 3 in poi nasca subito in
   entrambe le lingue: l'italiano non e' una traduzione fatta alla fine. La
   Fase 3 pubblica solo l'inglese, ma il testo italiano e' gia' qui e in
   Fase 6 va solo collegato.

   Nessun contenuto e' inventato: viene dal sito attuale o dal brief. Le
   cifre sono state confermate.
   ========================================================================== */

export type Locale = "en" | "it";

export const home = {
  en: {
    hero: {
      eyebrow: "Data company · Lecce, IT",
      title: "Data, extracted from paper.",
      lead: "Paloryn orders, digitizes and structures large paper archives, then makes the data queryable and interoperable with public digital infrastructure.",
      primary: { label: "Request a survey", href: "/en/about#contact" },
      secondary: { label: "See Anamnesis", href: "/en/anamnesis" },
      /* Lettura del signature element: la conversione da misura fisica a
         misura di dato. Le due cifre hanno una provenienza (vedi note). */
      readout: [
        { key: "Measured in", value: "shelf metres" },
        { key: "Digitized", value: "10M+ pages" },
        { key: "Retrieved in", value: "4 s" }, // sito attuale, dimostrazione Anamnesis
      ],
      scanLabels: { paper: "Paper", data: "Structured data", replay: "Replay" },
    },

    matrix: {
      eyebrow: "Two capabilities × two markets",
      title: "One company, two halves — and both serve both markets.",
      columns: ["Public sector", "Private"],
      rows: [
        {
          name: "Digitization",
          role: "the service",
          href: "/en/digitization",
          cells: [
            "Municipalities and unions of municipalities. Building and cadastral archives, administrative records, personnel files.",
            "Law and notary firms, companies, theatres, libraries, dioceses, museums.",
          ],
        },
        {
          name: "Anamnesis",
          role: "the software",
          href: "/en/anamnesis",
          cells: [
            "SPID and CIE sign-in, pagoPA for access and search fees, integration with the portals agencies already run.",
            "Licence and white-label: extraction engine, confidence scoring, documented APIs.",
          ],
        },
      ],
    },

    measurements: {
      eyebrow: "Measurements",
      items: [
        { value: "10", unit: "M+", label: "pages digitized to date" },
        { value: "20", unit: "+", label: "archivists, engineers, developers" },
        { value: "EU", label: "data residency", note: "AI models run locally" },
        {
          value: "4",
          label: "ISO certifications",
          note: "9001 · 27001 · 27017 · 27018",
        },
      ],
    },

    map: {
      eyebrow: "Operations",
      title: "Run from Lecce.",
      lead: "Headquarters, laboratory and operations centre in one place, within reach of the archives we work on. The originals never leave the building that holds them.",
      /* Le sedi previste stanno solo qui, sulla mappa: nessun'altra parte
         del sito le nomina, ed e' voluto. */
      nodes: {
        lecce: { name: "Lecce, Italy", role: "Headquarters and operations centre" },
        albania: { name: "Albania", role: "Operational office" },
        rome: { name: "Rome", role: "Planned" },
        nice: { name: "Nice", role: "Planned" },
        zagreb: { name: "Zagreb", role: "Planned" },
      },
      legend: { hq: "Headquarters", office: "Operational office", planned: "Planned" },
    },

    work: {
      eyebrow: "Selected work",
      title: "Named clients, real volumes.",
      items: [
        {
          index: "01",
          sector: "Private",
          client: "Koreja",
          scope: "Theatre and cultural production archive.",
          note: "First project delivered",
        },
        {
          index: "02",
          sector: "Public",
          client: "Comune di Galatina",
          scope: "Private building archive, digitized in full.",
          note: "PR Puglia FESR-FSE+ 2021-2027",
        },
        {
          index: "03",
          sector: "Public",
          client: "Squinzano, Avetrana, Torricella",
          scope: "Private building archives digitized jointly, Squinzano leading.",
          note: "PR Puglia 1.8.3",
        },
        {
          index: "04",
          sector: "Private",
          client: "Biblioteca Innocenziana",
          scope:
            "Seven early volumes and manuscripts for the Archdiocese of Lecce. TIFF masters and PDF/A for long-term preservation.",
          note: "~2,750 pages · 210 plates",
        },
      ],
      alsoLabel: "Also on record",
      also: "Maglie · Otranto",
      cta: { label: "All customers", href: "/en/customers" },
    },

    /* Fotografie dell'info day ARCHILIVES. Le due con il nome sono grandi,
       a sinistra; le altre quattro nel carosello a destra. I file sono in
       public/img/archilives/, generati da scripts/build-photos.mjs. */
    photos: {
      eyebrow: "In the field",
      caption:
        "ARCHILIVES info day, Cantieri Teatrali Koreja, Lecce — Interreg VI-A Greece-Italy 2021-2027",
      source: "June 2026",
      reelLabel: "More from the day",
      nav: { prev: "Previous", next: "Next" },
      featured: [
        {
          base: "vantaggiato",
          alt: "Pierluigi Vantaggiato presenting beside the ARCHILIVES roll-up at the Koreja info day.",
          credit: "Pierluigi Vantaggiato · Co-Founder",
        },
        {
          base: "castellana",
          alt: "Martino Castellana presenting the theatre archive portal at the ARCHILIVES info day.",
          credit: "Martino Castellana · CTO",
        },
        {
          base: "perrone",
          alt: "Linda Perrone, senior archivist, speaking to the room at the ARCHILIVES info day.",
          credit: "Linda Perrone · Senior archivist",
        },
      ],
      reel: [
        { base: "room-01", alt: "A speaker presenting beside the ARCHILIVES roll-up." },
        { base: "reading", alt: "A reading during the ARCHILIVES info day." },
        { base: "performance", alt: "The musical performance closing the info day." },
        { base: "duo", alt: "Two performers at the ARCHILIVES info day." },
      ],
    },

    cta: {
      eyebrow: "Contact",
      title: "Describe your archive.",
      lead: "Five answers are enough to establish whether the work is feasible and at what order of magnitude. If it is not, we say so immediately.",
      primary: { label: "Request a survey", href: "/en/about#contact" },
      secondary: { label: "Investor materials", href: "/en/investors" },
    },
  },

  it: {
    hero: {
      eyebrow: "Società di dati · Lecce, IT",
      title: "Dati, estratti dalla carta.",
      lead: "Paloryn riordina, digitalizza e struttura grandi archivi cartacei, poi rende il dato interrogabile e interoperabile con l'infrastruttura digitale pubblica.",
      primary: { label: "Richiedi un sopralluogo", href: "/it/azienda#contatti" },
      secondary: { label: "Scopri Anamnesis", href: "/it/anamnesis" },
      readout: [
        { key: "Si misura in", value: "metri lineari" },
        { key: "Digitalizzate", value: "10M+ pagine" },
        { key: "Reperimento in", value: "4 s" },
      ],
      scanLabels: { paper: "Carta", data: "Dato strutturato", replay: "Rivedi" },
    },

    matrix: {
      eyebrow: "Due offerte × due mercati",
      title: "Un'azienda, due metà — e servono entrambe i due mercati.",
      columns: ["Pubblica amministrazione", "Privati"],
      rows: [
        {
          name: "Dematerializzazione",
          role: "il servizio",
          href: "/it/dematerializzazione",
          cells: [
            "Comuni e unioni di comuni. Archivi edilizi e catastali, atti amministrativi, fascicoli del personale.",
            "Studi legali e notarili, imprese, teatri, biblioteche, diocesi, musei.",
          ],
        },
        {
          name: "Anamnesis",
          role: "il software",
          href: "/it/anamnesis",
          cells: [
            "Accesso con SPID e CIE, pagoPA per i diritti di segreteria e di accesso, integrazione con i portali già in uso presso l'ente.",
            "Licenza e white-label: motore di estrazione, indice di affidabilità, API documentate.",
          ],
        },
      ],
    },

    measurements: {
      eyebrow: "Misure",
      items: [
        { value: "10", unit: "M+", label: "pagine digitalizzate a oggi" },
        { value: "20", unit: "+", label: "archivisti, ingegneri, sviluppatori" },
        { value: "EU", label: "residenza dei dati", note: "modelli AI eseguiti in locale" },
        {
          value: "4",
          label: "certificazioni ISO",
          note: "9001 · 27001 · 27017 · 27018",
        },
      ],
    },

    map: {
      eyebrow: "Operatività",
      title: "Si governa da Lecce.",
      lead: "Sede, laboratorio e centro operativo in un solo luogo, a portata degli archivi su cui lavoriamo. Gli originali non lasciano mai l'edificio che li custodisce.",
      nodes: {
        lecce: { name: "Lecce, Italia", role: "Sede legale e centro operativo" },
        albania: { name: "Albania", role: "Sede operativa" },
        rome: { name: "Roma", role: "Prossima apertura" },
        nice: { name: "Nizza", role: "Prossima apertura" },
        zagreb: { name: "Zagabria", role: "Prossima apertura" },
      },
      legend: {
        hq: "Sede",
        office: "Sede operativa",
        planned: "Prossima apertura",
      },
    },

    work: {
      eyebrow: "Progetti",
      title: "Committenti con nome, volumi reali.",
      items: [
        {
          index: "01",
          sector: "Privati",
          client: "Koreja",
          scope: "Archivio di teatro e produzione culturale.",
          note: "Primo progetto realizzato",
        },
        {
          index: "02",
          sector: "PA",
          client: "Comune di Galatina",
          scope: "Archivio di edilizia privata, digitalizzato integralmente.",
          note: "PR Puglia FESR-FSE+ 2021-2027",
        },
        {
          index: "03",
          sector: "PA",
          client: "Squinzano, Avetrana, Torricella",
          scope:
            "Archivi di edilizia privata digitalizzati in forma associata, con Squinzano capofila.",
          note: "PR Puglia 1.8.3",
        },
        {
          index: "04",
          sector: "Privati",
          client: "Biblioteca Innocenziana",
          scope:
            "Sette volumi antichi e manoscritti per l'Arcidiocesi di Lecce. Master TIFF e PDF/A per la conservazione a norma.",
          note: "~2.750 pagine · 210 tavole",
        },
      ],
      alsoLabel: "Inoltre a referenza",
      also: "Maglie · Otranto",
      cta: { label: "Tutti i clienti", href: "/it/clienti" },
    },

    photos: {
      eyebrow: "Sul campo",
      caption:
        "Info day ARCHILIVES, Cantieri Teatrali Koreja, Lecce — Interreg VI-A Grecia-Italia 2021-2027",
      source: "Giugno 2026",
      reelLabel: "Altre immagini della giornata",
      nav: { prev: "Precedente", next: "Successiva" },
      featured: [
        {
          base: "vantaggiato",
          alt: "Pierluigi Vantaggiato presenta accanto al roll-up ARCHILIVES all'info day di Koreja.",
          credit: "Pierluigi Vantaggiato · Co-Founder",
        },
        {
          base: "castellana",
          alt: "Martino Castellana presenta il portale d'archivio dei teatri all'info day ARCHILIVES.",
          credit: "Martino Castellana · CTO",
        },
        {
          base: "perrone",
          alt: "Linda Perrone, archivista senior, parla alla sala durante l'info day ARCHILIVES.",
          credit: "Linda Perrone · Archivista senior",
        },
      ],
      reel: [
        { base: "room-01", alt: "Un intervento accanto al roll-up ARCHILIVES." },
        { base: "reading", alt: "Una lettura durante l'info day ARCHILIVES." },
        { base: "performance", alt: "La performance musicale che chiude la giornata." },
        { base: "duo", alt: "Due interpreti all'info day ARCHILIVES." },
      ],
    },

    cta: {
      eyebrow: "Contatti",
      title: "Descrivi il tuo archivio.",
      lead: "Cinque risposte bastano a stabilire se l'intervento è praticabile e con quale ordine di grandezza. In caso negativo, lo diciamo subito.",
      primary: { label: "Richiedi un sopralluogo", href: "/it/azienda#contatti" },
      secondary: { label: "Materiali per investitori", href: "/it/investitori" },
    },
  },
} as const;
