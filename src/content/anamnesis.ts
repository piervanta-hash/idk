/* ==========================================================================
   PAGINA ANAMNESIS — EN e IT

   Anamnesis e' il nome del software e va scritto sempre per esteso, mai
   "la piattaforma": e' un prodotto con identita' propria dentro il brand.

   L'interoperabilita' e' il vero differenziatore e qui e' il centro della
   pagina. PDND, QGIS e la geolocalizzazione delle particelle estratte sono
   informazioni fornite direttamente, non ricavate dal sito attuale: la
   formulazione va riletta prima di andare online.
   ========================================================================== */

export const anamnesis = {
  en: {
    meta: {
      title: "Anamnesis — Paloryn",
      description:
        "AI field extraction with confidence scoring, cadastral geolocation, and interoperability with PDND, pagoPA, SPID/CIE and App IO.",
    },
    hero: {
      eyebrow: "The software",
      title: "Anamnesis",
      lead: "Anamnesis turns a digitized holding into a queryable dataset, and connects it to the public digital infrastructure the agency already runs.",
      primary: { label: "Request a demonstration", href: "/en/about#contact" },
      secondary: { label: "See the service", href: "/en/digitization" },
      claims: [
        { k: "Extraction", v: "AI, per-field confidence" },
        { k: "Provenance", v: "position on the page" },
        { k: "Interoperability", v: "PDND · pagoPA · SPID/CIE · App IO" },
      ],
    },

    extraction: {
      eyebrow: "Extraction",
      title: "The page becomes a record.",
      lead: "OCR runs across the whole holding. The relevant fields are lifted out one by one, each with a readable confidence score and the position on the page it was taken from — so any value can be checked against the original.",
      labels: {
        document: "Source page",
        table: "Extracted record",
        replay: "Replay",
        locate: "Tap a field to see where it comes from",
        located: "Shown on the document",
      },
      docHead: "MUNICIPALITY OF LECCE · BUILDING CONTROL",
      /* Lo stesso fascicolo della home, e non due esempi diversi: chi
         arriva qui dalla home deve riconoscere il documento, non
         ricominciare a capire. */
      fields: [
        { label: "File no.", docLabel: "BUILDING FILE No.", value: "1962 / 4471", score: 99 },
        { label: "Applicant", docLabel: "APPLICANT", value: "Paloryn", score: 96 },
        {
          label: "Address",
          docLabel: "LOCATION OF THE PROPERTY",
          value: "Via D. Cantatore 1/3 — Lecce",
          score: 94,
        },
        {
          label: "Cadastral ref.",
          docLabel: "CADASTRAL DATA",
          value: "Sheet 12 · parcels 417, 418",
          score: 87,
        },
        {
          label: "Subject",
          docLabel: "SUBJECT OF THE APPLICATION",
          value: "Extension and change of use",
          score: 91,
        },
      ],
      note: "Sample data. No real archive is queried here.",
    },

    interop: {
      eyebrow: "Interoperability",
      title: "Connected to the agency's own systems.",
      lead: "Anamnesis is not a silo with an export button. It sits between the citizen and the agency's own systems, and speaks the national interoperability layer.",
      chain: ["Citizen", "Agency", "Anamnesis"],
      endpoints: [
        {
          id: "pdnd",
          name: "PDND",
          body: "Piattaforma Digitale Nazionale Dati: e-services published and consumed through the national interoperability layer.",
        },
        {
          id: "pagopa",
          name: "pagoPA",
          body: "Search and access fees paid inside the same request, not in a separate queue.",
        },
        {
          id: "spid",
          name: "SPID / CIE",
          body: "Citizen identification with national digital identity, at the point of request.",
        },
        {
          id: "appio",
          name: "App IO",
          body: "Notices delivered to the citizen in the public services app they already have.",
        },
        {
          id: "portals",
          name: "Agency portals",
          body: "Interfaces to the systems the agency already has in production. No replacement required.",
        },
        {
          id: "gis",
          name: "GIS · QGIS",
          body: "Extracted cadastral references handed over as georeferenced layers, openable in QGIS.",
        },
      ],
      hint: "Select a connection",
    },

    geo: {
      eyebrow: "Geolocation",
      title: "Parcels on the map.",
      lead: "Cadastral references extracted from the documents are placed on the map. The exploded view separates a sheet into its parcels, so a request can be resolved by pointing at the ground instead of by reading a register.",
      layers: ["Sheet", "Parcels", "Extracted record"],
      note: "Schematic. Parcel geometry shown is illustrative.",
      modal: {
        open: "Place it on the map",
        title: "Extracted record, located",
        territory: "Territory",
        detail: "Sheet and parcel",
        note: "Sample record on a demonstration position. Real holdings are placed on their own coordinates.",
        close: "Close",
      },
    },

    retrieval: {
      eyebrow: "Retrieval",
      title: "A building permit from 1962.",
      lead: "What matters is not that AI is involved. What matters is the time between the citizen's request and the agency's answer.",
      manual: {
        name: "In the archive",
        steps: [
          "Request recorded at the desk",
          "Reference looked up in the paper register",
          "Descent to the depot, shelving located",
          "Box pulled, files leafed through",
          "Copy, reassemble, reshelve",
        ],
        value: "3",
        unit: "working days",
      },
      platform: {
        name: "In Anamnesis",
        step: "Search, filter, open. Same request, one step.",
        value: "4",
        unit: "seconds",
      },
    },

    licence: {
      eyebrow: "Licence",
      title: "Licence and white-label.",
      lead: "Extraction engine, confidence scoring, geolocation and APIs are available under licence or white-label, for operators who do not run a development team.",
      items: [
        { k: "Already in production", v: "on public contracts" },
        { k: "Time to market", v: "below in-house development" },
        { k: "Data", v: "stays with the client, exportable in full" },
      ],
    },

    cta: {
      eyebrow: "Contact",
      title: "Demonstration on a real sample.",
      lead: "A demonstration on a real sample says more than a specification. Tell us what the holding is and we will show you what comes out of it.",
      primary: { label: "Request a demonstration", href: "/en/about#contact" },
      secondary: { label: "Investor materials", href: "/en/investors" },
    },
  },

  it: {
    meta: {
      title: "Anamnesis — Paloryn",
      description:
        "Estrazione AI dei campi con indice di affidabilità, geolocalizzazione catastale e interoperabilità con PDND, pagoPA, SPID/CIE e App IO.",
    },
    hero: {
      eyebrow: "Il software",
      title: "Anamnesis",
      lead: "Anamnesis trasforma un fondo digitalizzato in un insieme di dati interrogabili, e lo collega all'infrastruttura digitale pubblica che l'ente già utilizza.",
      primary: { label: "Richiedi una dimostrazione", href: "/it/azienda#contatti" },
      secondary: { label: "Vedi il servizio", href: "/it/dematerializzazione" },
      claims: [
        { k: "Estrazione", v: "AI, affidabilità per campo" },
        { k: "Provenienza", v: "posizione sulla pagina" },
        { k: "Interoperabilità", v: "PDND · pagoPA · SPID/CIE · App IO" },
      ],
    },

    extraction: {
      eyebrow: "Estrazione",
      title: "La pagina diventa un record.",
      lead: "Il riconoscimento ottico percorre l'intera massa documentaria. I campi rilevanti vengono estratti uno a uno, ciascuno con un indice di affidabilità consultabile e la posizione sulla pagina da cui è stato preso — così ogni valore è verificabile sull'originale.",
      labels: {
        document: "Pagina di origine",
        table: "Record estratto",
        replay: "Rivedi",
        locate: "Tocca un campo per vedere da dove viene",
        located: "Evidenziato sul documento",
      },
      docHead: "COMUNE DI LECCE · EDILIZIA PRIVATA",
      fields: [
        { label: "Pratica", docLabel: "PRATICA EDILIZIA N.", value: "1962 / 4471", score: 99 },
        { label: "Intestatario", docLabel: "INTESTATARIO", value: "Paloryn", score: 96 },
        {
          label: "Indirizzo",
          docLabel: "UBICAZIONE DELL'IMMOBILE",
          value: "Via D. Cantatore 1/3 — Lecce",
          score: 94,
        },
        {
          label: "Catastale",
          docLabel: "DATI CATASTALI",
          value: "Foglio 12 · particelle 417, 418",
          score: 87,
        },
        {
          label: "Oggetto",
          docLabel: "OGGETTO DELLA RICHIESTA",
          value: "Ampliamento e cambio di destinazione d'uso",
          score: 91,
        },
      ],
      note: "Dati di esempio. Nessun archivio reale viene interrogato qui.",
    },

    interop: {
      eyebrow: "Interoperabilità",
      title: "Collegato ai sistemi che l'ente ha già in esercizio.",
      lead: "Anamnesis non è un silo con un bottone di esportazione. Sta fra il cittadino e i sistemi dell'ente, e parla l'infrastruttura nazionale di interoperabilità.",
      chain: ["Cittadino", "Ente", "Anamnesis"],
      endpoints: [
        {
          id: "pdnd",
          name: "PDND",
          body: "Piattaforma Digitale Nazionale Dati: e-service pubblicati e fruiti attraverso lo strato nazionale di interoperabilità.",
        },
        {
          id: "pagopa",
          name: "pagoPA",
          body: "Diritti di segreteria e di accesso pagati dentro la stessa istanza, non in una coda separata.",
        },
        {
          id: "spid",
          name: "SPID / CIE",
          body: "Identificazione del cittadino con identità digitale nazionale, al momento della richiesta.",
        },
        {
          id: "appio",
          name: "App IO",
          body: "Notifiche recapitate al cittadino nell'app dei servizi pubblici che ha già.",
        },
        {
          id: "portals",
          name: "Portali dell'ente",
          body: "Interfacce verso i gestionali già in produzione presso l'ente. Nessuna sostituzione richiesta.",
        },
        {
          id: "gis",
          name: "GIS · QGIS",
          body: "Riferimenti catastali estratti restituiti come livelli georeferenziati, apribili in QGIS.",
        },
      ],
      hint: "Seleziona un collegamento",
    },

    geo: {
      eyebrow: "Geolocalizzazione",
      title: "Le particelle sulla mappa.",
      lead: "I riferimenti catastali estratti dai documenti vengono collocati sulla mappa. L'esploso separa il foglio nelle sue particelle, così un'istanza si risolve indicando il terreno invece di leggere un registro.",
      layers: ["Foglio", "Particelle", "Record estratto"],
      note: "Schema. La geometria delle particelle è illustrativa.",
      modal: {
        open: "Collocalo sulla mappa",
        title: "Record estratto, collocato",
        territory: "Territorio",
        detail: "Foglio e particella",
        note: "Record di esempio su una posizione dimostrativa. I fondi reali vengono collocati sulle loro coordinate.",
        close: "Chiudi",
      },
    },

    retrieval: {
      eyebrow: "Reperimento",
      title: "Una concessione edilizia del 1962.",
      lead: "L'elemento rilevante non è l'impiego dell'intelligenza artificiale, bensì il tempo che intercorre fra l'istanza del cittadino e la risposta dell'ufficio.",
      manual: {
        name: "In archivio",
        steps: [
          "Richiesta protocollata allo sportello",
          "Ricerca del riferimento sul registro cartaceo",
          "Discesa in deposito, individuazione della scaffalatura",
          "Estrazione del faldone, scorrimento dei fascicoli",
          "Fotocopia, ricomposizione, ricollocazione",
        ],
        value: "3",
        unit: "giorni lavorativi",
      },
      platform: {
        name: "Su Anamnesis",
        step: "Cerca, filtra, apri. Stessa istanza, un solo passaggio.",
        value: "4",
        unit: "secondi",
      },
    },

    licence: {
      eyebrow: "Licenza",
      title: "Licenza e white label.",
      lead: "Motore di estrazione, indice di affidabilità, geolocalizzazione e API sono disponibili in licenza o in white label, per operatori che non hanno un reparto di sviluppo.",
      items: [
        { k: "Già in produzione", v: "su commesse pubbliche" },
        { k: "Time to market", v: "inferiore allo sviluppo interno" },
        { k: "Dati", v: "restano al committente, esportabili integralmente" },
      ],
    },

    cta: {
      eyebrow: "Contatti",
      title: "Dimostrazione su un campione reale.",
      lead: "Una dimostrazione su un campione reale dice più di un capitolato. Diteci di che fondo si tratta e vi mostriamo che cosa ne esce.",
      primary: { label: "Richiedi una dimostrazione", href: "/it/azienda#contatti" },
      secondary: { label: "Materiali per investitori", href: "/it/investitori" },
    },
  },
} as const;
