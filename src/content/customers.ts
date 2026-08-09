/* ==========================================================================
   PAGINA CUSTOMERS / CLIENTI — EN e IT

   I committenti sono nominati con il tuo via libera. I contenuti vengono dal
   brief e dal sito attuale: dove il brief non da' un volume, il campo resta
   vuoto e dichiarato tale — meglio una casella onesta di un numero inventato.

   Regola rispettata: volumi e risultati, mai importi contrattuali. Gli
   importi non compaiono da nessuna parte, nemmeno nell'area investitori.
   ========================================================================== */

export const customers = {
  en: {
    meta: {
      title: "Customers — Paloryn",
      description:
        "Named projects for municipalities, cultural institutions and theatres: archival ordering, mass digitization, legal preservation and platform delivery.",
    },
    hero: {
      eyebrow: "Customers",
      title: "Clients and volumes.",
      lead: "Both halves of the company serve both markets. The filter below is the same one used on the home page and on the two service pages: it is how the work is actually divided.",
    },

    filter: {
      label: "Sector",
      all: "All",
      public: "Public sector",
      private: "Private",
    },

    detail: {
      open: "Open the case",
      close: "Close",
      client: "Client",
      scope: "Scope",
      volumes: "Volumes",
      tech: "Technologies",
      outcome: "Outcome",
      programme: "Programme",
      pending: "not published",
    },

    cases: [
      {
        id: "koreja",
        sector: "private",
        index: "01",
        name: "Koreja",
        client: "Cantieri Teatrali Koreja, Lecce",
        summary: "Theatre and cultural production archive.",
        scope:
          "Archival ordering and digitization of the archive of a theatre company: production records, photographic material, posters and stage documentation.",
        volumes: "",
        tech: "Archival ordering · digitization · Anamnesis",
        outcome: "First project delivered.",
        programme: "",
        tag: "First project delivered",
      },
      {
        id: "archilives",
        sector: "private",
        index: "02",
        name: "ARCHILIVES",
        client: "Mediterranean theatre archives, with Cantieri Teatrali Koreja",
        summary:
          "Document portal for the theatres of the Mediterranean area. Design and development in house.",
        scope:
          "Paper and multimedia holdings from several theatres, brought into a single searchable portal. Design and development carried out internally — the clearest demonstration of the software half of the company.",
        volumes: "",
        tech: "Anamnesis · portal design and development in house",
        outcome:
          "Holdings from separate institutions consultable in one place, under one search.",
        programme: "Interreg VI-A Greece-Italy 2021-2027",
        tag: "Software, built in house",
      },
      {
        id: "galatina",
        sector: "public",
        index: "03",
        name: "Comune di Galatina",
        client: "Comune di Galatina",
        summary: "Private building archive, digitized in full.",
        scope:
          "Building permit files for private construction: ordering, high-volume capture, field extraction and publication for counter and citizen use.",
        volumes: "",
        tech: "Ordering · 300 DPI capture · OCR · legal preservation · Anamnesis",
        outcome: "Building archive queryable by address, permit and cadastral reference.",
        programme: "PR Puglia FESR-FSE+ 2021-2027",
        tag: "PR Puglia FESR-FSE+",
      },
      {
        id: "squinzano",
        sector: "public",
        index: "04",
        name: "Squinzano, Avetrana, Torricella",
        client: "Comune di Squinzano (lead), Comune di Avetrana, Comune di Torricella",
        summary: "Private building archives digitized jointly, Squinzano leading.",
        scope:
          "Three municipalities procuring together: one chain of custody, one method, one platform, three separate holdings kept distinct.",
        volumes: "",
        tech: "Ordering · capture · OCR · legal preservation · Anamnesis",
        outcome: "Joint procurement delivered as one operation, holdings kept separate.",
        programme: "PR Puglia 1.8.3",
        tag: "Joint procurement",
      },
      /* Matino: il volume dell'archivio dell'anagrafe e' confermato dal
         committente. Gli altri campi restano vuoti ed escono come «not
         published» in grigio corsivo — meglio un dato mancante dichiarato
         che un dato inventato. */
      {
        id: "matino",
        sector: "public",
        index: "05",
        name: "Comune di Matino",
        client: "Comune di Matino",
        summary: "Registry office and civil status archives.",
        scope:
          "Ordering and digitization of the municipality's demographic archives — registry office and civil status.",
        volumes: "20 linear metres, registry office archive",
        tech: "Ordering · capture",
        outcome: "",
        programme: "",
        tag: "Demographic records",
      },
      {
        id: "innocenziana",
        sector: "private",
        index: "06",
        name: "Biblioteca Innocenziana",
        client: "Biblioteca Arcivescovile «Innocenziana», Archdiocese of Lecce",
        summary:
          "Early volumes and manuscripts from a library declared of exceptional cultural interest — one of the protected holdings the laboratory is equipped for.",
        scope:
          "Contactless capture with the laboratory set up in the room that holds the works: adjustable cradles, cold lighting free of UV and IR, colour targets at every session. The volumes never left their shelf.",
        volumes: "~2,750 pages · 210 plates · 7 volumes",
        tech: "Planetary scanner · TIFF masters · PDF/A · legal preservation",
        outcome: "Preservation masters and access copies, with the originals never moved.",
        programme: "Ministerial decree of exceptional cultural interest",
        tag: "~2,750 pages · 210 plates",
      },
    ],

    also: {
      label: "Also on record",
      items: ["Maglie", "Otranto"],
      note: "Further engagements are covered by confidentiality and are named on request.",
    },

    logos: {
      eyebrow: "Marks",
      note: "Client marks are shown in white or grey on black, never in their own colour: the palette is not broken for a logo. Municipal coats of arms appear monochrome and small, with the full name of the authority beside them.",
      pending: "Logo files to be supplied.",
    },

    cta: {
      eyebrow: "Contact",
      title: "Survey request.",
      lead: "Five answers are enough to establish whether the work is feasible and at what order of magnitude. If it is not, we say so immediately.",
      primary: { label: "Request a survey", href: "/en/about#contact" },
      secondary: { label: "See Anamnesis", href: "/en/anamnesis" },
    },
  },

  it: {
    meta: {
      title: "Clienti — Paloryn",
      description:
        "Progetti con nome per comuni, istituzioni culturali e teatri: ordinamento archivistico, digitalizzazione massiva, conservazione a norma e piattaforma.",
    },
    hero: {
      eyebrow: "Clienti",
      title: "Committenti e volumi.",
      lead: "Entrambe le anime dell'azienda servono entrambi i mercati. Il filtro qui sotto è lo stesso della home e delle due pagine di servizio: è il modo in cui il lavoro è davvero diviso.",
    },

    filter: {
      label: "Settore",
      all: "Tutti",
      public: "Pubblica amministrazione",
      private: "Privati",
    },

    detail: {
      open: "Apri il caso",
      close: "Chiudi",
      client: "Committente",
      scope: "Ambito",
      volumes: "Volumi",
      tech: "Tecnologie",
      outcome: "Esito",
      programme: "Programma",
      pending: "non pubblicati",
    },

    cases: [
      {
        id: "koreja",
        sector: "private",
        index: "01",
        name: "Koreja",
        client: "Cantieri Teatrali Koreja, Lecce",
        summary: "Archivio di teatro e produzione culturale.",
        scope:
          "Ordinamento e digitalizzazione dell'archivio di una compagnia teatrale: materiali di produzione, fondo fotografico, manifesti e documentazione di scena.",
        volumes: "",
        tech: "Ordinamento archivistico · digitalizzazione · Anamnesis",
        outcome: "Primo progetto realizzato.",
        programme: "",
        tag: "Primo progetto realizzato",
      },
      {
        id: "archilives",
        sector: "private",
        index: "02",
        name: "ARCHILIVES",
        client: "Archivi teatrali dell'area mediterranea, con i Cantieri Teatrali Koreja",
        summary:
          "Portale documentale dei teatri dell'area mediterranea. Progettazione e sviluppo interni.",
        scope:
          "Patrimoni cartacei e multimediali di più teatri portati in consultazione unica. Progettazione e sviluppo condotti internamente: è la dimostrazione più chiara dell'anima software dell'azienda.",
        volumes: "",
        tech: "Anamnesis · progettazione e sviluppo del portale interni",
        outcome:
          "Fondi di istituzioni diverse consultabili in un solo luogo, sotto un'unica ricerca.",
        programme: "Interreg VI-A Grecia-Italia 2021-2027",
        tag: "Software, sviluppato internamente",
      },
      {
        id: "galatina",
        sector: "public",
        index: "03",
        name: "Comune di Galatina",
        client: "Comune di Galatina",
        summary: "Archivio di edilizia privata, digitalizzato integralmente.",
        scope:
          "Pratiche di edilizia privata: ordinamento, ripresa ad alta produttività, estrazione dei campi e pubblicazione per lo sportello e per il cittadino.",
        volumes: "",
        tech: "Ordinamento · ripresa 300 DPI · OCR · conservazione a norma · Anamnesis",
        outcome:
          "Archivio edilizio interrogabile per indirizzo, titolo e riferimento catastale.",
        programme: "PR Puglia FESR-FSE+ 2021-2027",
        tag: "PR Puglia FESR-FSE+",
      },
      {
        id: "squinzano",
        sector: "public",
        index: "04",
        name: "Squinzano, Avetrana, Torricella",
        client: "Comune di Squinzano (capofila), Comune di Avetrana, Comune di Torricella",
        summary: "Archivi di edilizia privata digitalizzati in forma associata.",
        scope:
          "Tre comuni che appaltano insieme: una sola catena di custodia, un solo metodo, una sola piattaforma, tre fondi che restano distinti.",
        volumes: "",
        tech: "Ordinamento · ripresa · OCR · conservazione a norma · Anamnesis",
        outcome: "Forma associata gestita come una sola operazione, fondi tenuti separati.",
        programme: "PR Puglia 1.8.3",
        tag: "Forma associata",
      },
      {
        id: "matino",
        sector: "public",
        index: "05",
        name: "Comune di Matino",
        client: "Comune di Matino",
        summary: "Archivi dell'anagrafe e dello stato civile.",
        scope:
          "Ordinamento e digitalizzazione degli archivi demografici del Comune: anagrafe e stato civile.",
        volumes: "20 metri lineari, archivio dell'anagrafe",
        tech: "Ordinamento · ripresa",
        outcome: "",
        programme: "",
        tag: "Archivi demografici",
      },
      {
        id: "innocenziana",
        sector: "private",
        index: "06",
        name: "Biblioteca Innocenziana",
        client: "Biblioteca Arcivescovile «Innocenziana», Arcidiocesi di Lecce",
        summary:
          "Fondi antichi e manoscritti di una biblioteca dichiarata di eccezionale interesse culturale: uno dei fondi sottoposti a tutela per cui il laboratorio è attrezzato.",
        scope:
          "Ripresa senza contatto con il laboratorio allestito nella stanza che custodisce le opere: culle a supporto regolabile, luce fredda priva di UV e IR, target colorimetrici a ogni sessione. I volumi non hanno mai lasciato il loro scaffale.",
        volumes: "~2.750 pagine · 210 tavole · 7 volumi",
        tech: "Scanner planetario · master TIFF · PDF/A · conservazione a norma",
        outcome:
          "Master di conservazione e copie di consultazione, senza movimentare gli originali.",
        programme: "Decreto ministeriale di eccezionale interesse culturale",
        tag: "~2.750 pagine · 210 tavole",
      },
    ],

    also: {
      label: "Inoltre a referenza",
      items: ["Maglie", "Otranto"],
      note: "Altri incarichi sono coperti da riservatezza e vengono nominati su richiesta.",
    },

    logos: {
      eyebrow: "Marchi",
      note: "I marchi dei committenti compaiono in bianco o grigio su nero, mai nel loro colore: la palette non si spezza per un logo. Gli stemmi comunali sono monocromi e contenuti, con il nome dell'ente per esteso accanto.",
      pending: "File dei loghi da fornire.",
    },

    cta: {
      eyebrow: "Contatti",
      title: "Richiesta di sopralluogo.",
      lead: "Cinque risposte bastano a stabilire se l'intervento è praticabile e con quale ordine di grandezza. In caso negativo, lo diciamo subito.",
      primary: { label: "Richiedi un sopralluogo", href: "/it/azienda#contatti" },
      secondary: { label: "Scopri Anamnesis", href: "/it/anamnesis" },
    },
  },
} as const;
