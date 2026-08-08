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
    /* La testata non e' un annuncio, e' una scheda: intestazione, una frase
       che dice che cosa e' l'azienda, e in fondo la cosa vera che facciamo,
       che avviene sotto gli occhi di chi legge. Niente slogan. */
    hero: {
      mark: "Paloryn",
      place: "Lecce, IT · European Union",
      stacks:
        "Drawn elevation of archival shelving: file boxes, envelopes and bound volumes on six shelves, indexed one by one.",
      title: "From matter to data",
      lead: "Paloryn orders, digitizes and structures large paper archives, then makes the data queryable and interoperable with public digital infrastructure.",
      primary: { label: "Request a survey", href: "/en/about#contact" },
      secondary: { label: "See Anamnesis", href: "/en/anamnesis" },
      convert: {
        from: "Document",
        to: "Structured record",
        replay: "Replay",
        /* Gli stessi quattro campi della pagina Anamnesis: e' un esempio,
           ed e' dichiarato tale. Non e' la pratica di nessuno. */
        note: "Example of an extracted record",
        fields: [
          { label: "Protocol no.", value: "1962 / 4471" },
          { label: "Address", value: "via Manzoni 14" },
          { label: "Permit", value: "Building permit, 1962" },
          { label: "Cadastral ref.", value: "Sheet 12 · parcel 417" },
        ],
      },
    },

    matrix: {
      eyebrow: "Two capabilities × two markets",
      title: "Both halves serve both markets.",
      columns: ["Public sector", "Private"],
      rows: [
        {
          name: "Digitization",
          role: "the service",
          href: "/en/digitization",
          cells: [
            "Municipalities and unions of municipalities. Building and cadastral archives, demographic records, administrative files.",
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
        { value: "1", unit: "km+", label: "shelf metres under management" },
        { value: "10", unit: "M+", label: "pages digitized to date" },
        { value: "20", unit: "+", label: "archivists, engineers, developers" },
        { value: "EU", label: "data residency", note: "AI models run locally" },
      ],
    },

    map: {
      eyebrow: "Operations",
      title: "Operations in the European Union.",
      lead: "Headquarters, laboratory and operations centre in Lecce; an operational office in Albania. Data stays inside the European Union and the originals never leave the building that holds them.",
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
      eyebrow: "Clients",
      title: "Clients and volumes.",
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
          sector: "Public",
          client: "Comune di Matino",
          scope: "Registry office and civil status archives.",
          note: "Demographic records",
        },
        {
          index: "05",
          sector: "Private",
          client: "Archives and libraries of historical interest",
          scope:
            "Early volumes and manuscripts, among them the Biblioteca Innocenziana for the Archdiocese of Lecce. TIFF masters and PDF/A for long-term preservation.",
          note: "Under ministerial protection",
        },
      ],
      alsoLabel: "Also on record",
      also: "Maglie · Otranto",
      cta: { label: "All customers", href: "/en/customers" },
    },

    /* Fotografie dell'info day ARCHILIVES: l'unico posto del sito dove
       compaiono facce. Sopra le tre persone, con il nome dentro il
       riquadro; sotto le quattro immagini della giornata, piu' piccole.
       I file stanno in public/img/archilives/, generati da
       scripts/build-photos.mjs. */
    photos: {
      eyebrow: "ARCHILIVES",
      caption:
        "ARCHILIVES info day, Cantieri Teatrali Koreja, Lecce — Interreg VI-A Greece-Italy 2021-2027",
      source: "June 2026",
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
      ],
    },

    cta: {
      eyebrow: "Contact",
      title: "Survey request.",
      lead: "Five answers are enough to establish whether the work is feasible and at what order of magnitude. If it is not, we say so immediately.",
      primary: { label: "Request a survey", href: "/en/about#contact" },
      secondary: { label: "Investor materials", href: "/en/investors" },
    },
  },

  it: {
    hero: {
      mark: "Paloryn",
      place: "Lecce, IT · Unione Europea",
      stacks:
        "Alzato disegnato di una scaffalatura d'archivio: faldoni, buste e volumi rilegati su sei ripiani, censiti uno a uno.",
      title: "Dalla materia al dato",
      lead: "Paloryn riordina, digitalizza e struttura grandi archivi cartacei, poi rende il dato interrogabile e interoperabile con l'infrastruttura digitale pubblica.",
      primary: { label: "Richiedi un sopralluogo", href: "/it/azienda#contatti" },
      secondary: { label: "Scopri Anamnesis", href: "/it/anamnesis" },
      convert: {
        from: "Documento",
        to: "Record strutturato",
        replay: "Rivedi",
        note: "Esempio di record estratto",
        fields: [
          { label: "Protocollo", value: "1962 / 4471" },
          { label: "Indirizzo", value: "via Manzoni 14" },
          { label: "Titolo", value: "Concessione edilizia, 1962" },
          { label: "Catastale", value: "Foglio 12 · particella 417" },
        ],
      },
    },

    matrix: {
      eyebrow: "Due offerte × due mercati",
      title: "Entrambe le anime servono entrambi i mercati.",
      columns: ["Pubblica amministrazione", "Privati"],
      rows: [
        {
          name: "Dematerializzazione",
          role: "il servizio",
          href: "/it/dematerializzazione",
          cells: [
            "Comuni e unioni di comuni. Archivi edilizi e catastali, archivi demografici, atti amministrativi.",
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
        { value: "1", unit: "km+", label: "metri lineari in gestione" },
        { value: "10", unit: "M+", label: "pagine digitalizzate a oggi" },
        { value: "20", unit: "+", label: "archivisti, ingegneri, sviluppatori" },
        { value: "EU", label: "residenza dei dati", note: "modelli AI eseguiti in locale" },
      ],
    },

    map: {
      eyebrow: "Operatività",
      title: "Operatività in Unione Europea.",
      lead: "Sede, laboratorio e centro operativo a Lecce; sede operativa in Albania. I dati restano nell'Unione Europea e gli originali non lasciano mai l'edificio che li custodisce.",
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
      eyebrow: "Clienti",
      title: "Committenti e volumi.",
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
          sector: "PA",
          client: "Comune di Matino",
          scope: "Archivi dell'anagrafe e dello stato civile.",
          note: "Archivi demografici",
        },
        {
          index: "05",
          sector: "Privati",
          client: "Archivi e biblioteche di interesse storico-culturale",
          scope:
            "Fondi antichi e manoscritti, tra cui la Biblioteca Innocenziana per l'Arcidiocesi di Lecce. Master TIFF e PDF/A per la conservazione a norma.",
          note: "Fondi sottoposti a tutela",
        },
      ],
      alsoLabel: "Inoltre a referenza",
      also: "Maglie · Otranto",
      cta: { label: "Tutti i clienti", href: "/it/clienti" },
    },

    photos: {
      eyebrow: "ARCHILIVES",
      caption:
        "Info day ARCHILIVES, Cantieri Teatrali Koreja, Lecce — Interreg VI-A Grecia-Italia 2021-2027",
      source: "Giugno 2026",
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
      ],
    },

    cta: {
      eyebrow: "Contatti",
      title: "Richiesta di sopralluogo.",
      lead: "Cinque risposte bastano a stabilire se l'intervento è praticabile e con quale ordine di grandezza. In caso negativo, lo diciamo subito.",
      primary: { label: "Richiedi un sopralluogo", href: "/it/azienda#contatti" },
      secondary: { label: "Materiali per investitori", href: "/it/investitori" },
    },
  },
} as const;
