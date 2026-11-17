/* ==========================================================================
   CONTENUTI DELLA HOME

   Inglese e italiano stanno qui; albanese, serbo e macedone in un file per
   lingua (`sq/home.ts`, `sr/home.ts`, `mk/home.ts`) con la stessa identica
   forma. Nessuna lingua e' la traduzione subordinata di un'altra: se si
   aggiunge un campo qui, va aggiunto in tutte e cinque, e il controllo dei
   tipi lo segnala se manca.

   IL TITOLO E LE FRASI DELLA CAMPAGNA. «Memory that answers» e le altre
   frasi che vengono dai film sono riportate come sono nei film, lingua per
   lingua: non sono state ritradotte.

   Nessun contenuto e' inventato: viene dal sito, dal brief o dalla
   campagna. Le cifre sono state confermate.
   ========================================================================== */

import { sq } from "./sq/home";
import { sr } from "./sr/home";
import { mk } from "./mk/home";

export const home = {
  en: {
    /* La testata: la frase della campagna, una riga che dice che cosa fa
       l'azienda, e il film. Il titolo e' concettuale; il peso descrittivo
       lo portano il titolo del documento e la riga sotto. */
    hero: {
      mark: "Paloryn",
      place: "Lecce, IT · European Union",
      title: "Memory that answers.",
      lead: "An organisation's memory cannot retire. Paloryn orders, digitizes and structures large paper archives, then makes them answer.",
      primary: { label: "Request a survey", href: "/en/about#contact" },
      secondary: { label: "See Anamnesis", href: "/en/anamnesis" },
      film: {
        title:
          "Paloryn film. After thirty-five years the person who knows where everything is retires: from tomorrow, who answers?",
        play: "Play film",
        pause: "Pause film",
        soundOn: "Sound on",
        soundOff: "Sound off",
      },
    },

    /* «PALORYN RISPONDE. E INDICA LA FONTE.» E' la frase dei film, e
       l'estrazione la fa vedere succedere: si tocca un campo e il
       documento mostra da dove viene. Ha preso il posto di «Dalla materia
       al dato» e della scaffalatura disegnata, tolte su indicazione. */
    data: {
      title: "Paloryn answers. And shows the source.",
      /* L'estrazione e' la stessa animazione della pagina Anamnesis, ed e'
         giusto che sia la stessa: e' la cosa che l'azienda fa. In home
         apre la pagina, li' viene spiegata. Gli stessi quattro campi, con
         il loro indice di affidabilita': e' un esempio, ed e' dichiarato
         tale. Non e' la pratica di nessuno. */
      extraction: {
        eyebrow: "Extraction",
        labels: {
          document: "Document",
          table: "Structured record",
          replay: "Replay",
          /* Invito e stato del comando «mostrami da dove viene». */
          locate: "Tap a field to see where it comes from",
          located: "Shown on the document",
        },
        /* Intestazione stampata in cima al foglio disegnato. */
        docHead: "MUNICIPALITY OF LECCE · BUILDING CONTROL",
        note: "Sample record, not a real file.",
        fields: [
          {
            label: "File no.",
            docLabel: "BUILDING FILE No.",
            value: "1962 / 4471",
            score: 99,
          },
          {
            label: "Applicant",
            docLabel: "APPLICANT",
            value: "Paloryn",
            score: 96,
          },
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
      },
    },

    /* I QUATTRO FILM DI SCENARIO. Qui stanno solo le parole: quale file
       corrisponde a quale lingua lo sa `src/lib/films.ts`. */

    films: {
      eyebrow: "Campaign",
      title: "From tomorrow, who answers?",
      note: "Paloryn campaign films. Dramatised scenes: the people, figures and documents shown are illustrative.",
      labels: { watch: "Watch the film", close: "Close" },
      items: [
        {
          id: "atti",
          sector: "Municipalities",
          title: "A records request, from the application to the certified copy.",
        },
        {
          id: "fiume",
          sector: "Banks and insurers",
          title: "After a flood: every mortgage and policy in the area, each with its original contract.",
        },
        {
          id: "reti",
          sector: "Network operators",
          title: "Plans, rights of way, maintenance records: a network you can query.",
        },
        {
          id: "viadotto",
          sector: "Infrastructure",
          title: "The load capacity of a viaduct, straight from the original drawings.",
        },
      ],
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
        { value: "150", unit: "M+", label: "pages digitized to date" },
        { value: "20", unit: "+", label: "specialists on staff" },
        { value: "EU", label: "data residency", note: "AI models run locally" },
      ],
    },

    map: {
      eyebrow: "Operations",
      title: "From Lecce to the Balkans.",
      lead: "Headquarters, laboratory and operations centre in Lecce; an operational office in Durrës. Skopje and Belgrade are about to open. Data stays inside the European Union and the originals never leave the building that holds them.",
      /* Le sedi stanno solo qui, sulla mappa: nessun'altra parte del sito
         le nomina, ed e' voluto. */
      nodes: {
        lecce: { name: "Lecce, Italy", role: "Headquarters and operations centre" },
        durres: { name: "Durrës", role: "Operational office" },
        skopje: { name: "Skopje", role: "Opening soon" },
        belgrade: { name: "Belgrade", role: "Opening soon" },
        rome: { name: "Rome", role: "Planned" },
        zagreb: { name: "Zagreb", role: "Planned" },
      },
      legend: { hq: "Headquarters", office: "Operational office", soon: "Opening soon", planned: "Planned" },
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
      also: "Maglie · Otranto · Galatone · Alezio · Veglie · Porto Cesareo · Ex Manifattura Tabacchi Guarino · Ordine degli Ingegneri di Lecce",
      cta: { label: "All customers", href: "/en/customers" },
    },

    /* LA FOTO DI GRUPPO, in public/img/archilives/gruppo.* (preparata da
       scripts/build-photos.mjs). Se il file manca, la sezione non viene
       disegnata e non lascia buchi. L'alt non conta le persone: un numero
       sbagliato sarebbe peggio di nessun numero. */
    team: {
      eyebrow: "People",
      base: "gruppo",
      alt: "The Paloryn team: people in black Paloryn sweatshirts, standing and crouching among the desks and the archive shelving.",
      caption: "The Paloryn team.",
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
      title: "La memoria che risponde.",
      lead: "La memoria di un ente non può andare in pensione. Paloryn riordina, digitalizza e struttura grandi archivi cartacei, poi li fa rispondere.",
      primary: { label: "Richiedi un sopralluogo", href: "/it/azienda#contact" },
      secondary: { label: "Scopri Anamnesis", href: "/it/anamnesis" },
      film: {
        title:
          "Film Paloryn. Dopo trentacinque anni va in pensione la persona che sa dove si trova tutto: da domani, chi risponde?",
        play: "Riproduci il film",
        pause: "Metti in pausa",
        soundOn: "Attiva l'audio",
        soundOff: "Disattiva l'audio",
      },
    },

    data: {
      title: "Paloryn risponde. E indica la fonte.",
      extraction: {
        eyebrow: "Estrazione",
        labels: {
          document: "Documento",
          table: "Record strutturato",
          replay: "Rivedi",
          locate: "Tocca un campo per vedere da dove viene",
          located: "Evidenziato sul documento",
        },
        docHead: "COMUNE DI LECCE · EDILIZIA PRIVATA",
        note: "Record di esempio, non è una pratica reale.",
        fields: [
          {
            label: "Pratica",
            docLabel: "PRATICA EDILIZIA N.",
            value: "1962 / 4471",
            score: 99,
          },
          {
            label: "Intestatario",
            docLabel: "INTESTATARIO",
            value: "Paloryn",
            score: 96,
          },
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
      },
    },

    films: {
      eyebrow: "Campagna",
      title: "Da domani, chi risponde?",
      note: "Film della campagna Paloryn. Scene ricostruite: le persone, le cifre e i documenti mostrati sono esemplificativi.",
      labels: { watch: "Guarda il film", close: "Chiudi" },
      items: [
        {
          id: "atti",
          sector: "Comuni",
          title: "Un accesso agli atti, dalla richiesta alla copia conforme.",
        },
        {
          id: "fiume",
          sector: "Banche e assicurazioni",
          title: "Dopo un'alluvione: ogni mutuo e ogni polizza dell'area, ciascuno con il contratto originale.",
        },
        {
          id: "reti",
          sector: "Gestori di reti",
          title: "Planimetrie, servitù, registri di manutenzione: una rete che si può interrogare.",
        },
        {
          id: "viadotto",
          sector: "Infrastrutture",
          title: "La portata di un viadotto, direttamente dai disegni originali.",
        },
      ],
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
        { value: "150", unit: "M+", label: "pagine digitalizzate a oggi" },
        { value: "20", unit: "+", label: "specialisti in organico" },
        { value: "EU", label: "residenza dei dati", note: "modelli AI eseguiti in locale" },
      ],
    },

    map: {
      eyebrow: "Operatività",
      title: "Da Lecce ai Balcani.",
      lead: "Sede, laboratorio e centro operativo a Lecce; sede operativa a Durazzo. Skopje e Belgrado sono di prossima apertura. I dati restano nell'Unione Europea e gli originali non lasciano mai l'edificio che li custodisce.",
      nodes: {
        lecce: { name: "Lecce, Italia", role: "Sede legale e centro operativo" },
        durres: { name: "Durazzo", role: "Sede operativa" },
        skopje: { name: "Skopje", role: "Prossima apertura" },
        belgrade: { name: "Belgrado", role: "Prossima apertura" },
        rome: { name: "Roma", role: "In programma" },
        zagreb: { name: "Zagabria", role: "In programma" },
      },
      legend: { hq: "Sede", office: "Sede operativa", soon: "Prossima apertura", planned: "In programma" },
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
      also: "Maglie · Otranto · Galatone · Alezio · Veglie · Porto Cesareo · Ex Manifattura Tabacchi Guarino · Ordine degli Ingegneri di Lecce",
      cta: { label: "Tutti i clienti", href: "/it/clienti" },
    },

    team: {
      eyebrow: "Persone",
      base: "gruppo",

      alt: "La squadra di Paloryn: persone con la felpa nera Paloryn, in piedi e accovacciate tra i tavoli e gli scaffali d'archivio.",

      caption: "Il team di Paloryn.",
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
      primary: { label: "Richiedi un sopralluogo", href: "/it/azienda#contact" },
      secondary: { label: "Materiali per investitori", href: "/it/investitori" },
    },
  },

  sq,
  sr,
  mk,
} as const;
