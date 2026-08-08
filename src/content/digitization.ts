/* ==========================================================================
   PAGINA DIGITIZATION / DEMATERIALIZZAZIONE — EN e IT

   Il testo viene dal sito attuale, ridotto e riscritto in inglese tecnico.
   L'iter resta a sei fasi, con la ricognizione preliminare al primo posto:
   e' la fase che il sito attuale indica come quella piu' spesso omessa dagli
   operatori del settore, ed e' un argomento commerciale vero.
   ========================================================================== */

export const digitization = {
  en: {
    meta: {
      title: "Digitization — Paloryn",
      description:
        "Archival ordering, high-volume capture, legal preservation and publication of current, intermediate and historical archives.",
    },
    hero: {
      eyebrow: "The service",
      title: "Ordered before it is scanned.",
      lead: "Paloryn takes on current, intermediate and historical archives. Archival ordering, high-volume capture, legal preservation and publication — without the originals leaving the place where they are held.",
      primary: { label: "Request a survey", href: "/en/about#contact" },
      secondary: { label: "See Anamnesis", href: "/en/anamnesis" },
    },

    process: {
      eyebrow: "The process",
      title: "Six phases. None of them optional.",
      lead: "The first is the one operators in this field skip most often.",
      steps: [
        {
          n: "01",
          name: "Survey",
          title: "Preliminary survey",
          body: "On-site inspection of the storage rooms. Extent measured in linear metres, condition recorded, restricted holdings identified. What follows is a work plan, not a lump-sum quote.",
          tags: "linear metres · condition · restrictions",
        },
        {
          n: "02",
          name: "Ordering",
          title: "Archival ordering",
          body: "Series reconstructed and units catalogued in accordance with the archival constraint. Disposal proposals drawn up for authorisation. Archival work, not clerical work.",
          tags: "series · units · authorised disposal",
        },
        {
          n: "03",
          name: "Capture",
          title: "Capture",
          body: "Planetary scanners for bound and fragile material, production scanners for current records. 300 DPI, TIFF masters. Resolution and colour management set by the medium, not by the schedule.",
          tags: "300 DPI · TIFF master · colour target",
        },
        {
          n: "04",
          name: "Extraction",
          title: "Field extraction",
          body: "OCR across the whole holding, then extraction of the relevant fields — protocol number, holder, date, cadastral reference. Every field carries a readable confidence score.",
          tags: "OCR · structured fields · confidence",
        },
        {
          n: "05",
          name: "Preservation",
          title: "Legal preservation",
          body: "Submission packages built to the technical rules in force, with the prescribed metadata and signatures. Title to the data stays with the client, who can export it in full, in open formats, at any time.",
          tags: "PDF/A · qualified seal · timestamp",
        },
        {
          n: "06",
          name: "Publication",
          title: "Publication and search",
          body: "The holding is loaded into Anamnesis: semantic search, filters on the extracted fields, map placement where relevant, authenticated access. A file that took three working days to find becomes a matter of seconds.",
          tags: "semantic search · map · SPID and CIE",
        },
      ],
    },

    markets: {
      eyebrow: "Who it is for",
      title: "Both markets, the same chain of custody.",
      columns: [
        {
          name: "Public sector",
          body: "Municipalities and unions of municipalities. Building and cadastral archives, administrative records, health and personnel files. Schedules bound to funding reporting deadlines.",
          tags: "AgID compliance · funded programmes · joint procurement",
        },
        {
          name: "Private",
          body: "Law and notary firms, companies, theatres, libraries, dioceses and museums. Restricted holdings, protection obligations, material that cannot be moved.",
          tags: "on-site laboratory · restricted holdings · finding aids",
        },
      ],
    },

    standards: {
      eyebrow: "Formats and standards",
      items: [
        { k: "Capture", v: "300 DPI · TIFF master" },
        { k: "Preservation", v: "PDF/A · qualified electronic seal · timestamp" },
        { k: "Custody", v: "recorded at every handover" },
        { k: "Exit", v: "full export, open formats, no lock-in" },
      ],
    },

    plate: {
      eyebrow: "Laboratory",
      caption:
        "Digitization laboratory: planetary scanner with overhead camera arm, adjustable cradle, cold lighting free of UV and IR.",
      note: "Drawn schematic. The photographic plate is reserved and swaps in unchanged.",
    },

    cta: {
      eyebrow: "Contact",
      title: "Describe your archive.",
      lead: "Five answers are enough to establish whether the work is feasible and at what order of magnitude. If it is not, we say so immediately.",
      primary: { label: "Request a survey", href: "/en/about#contact" },
      secondary: { label: "All customers", href: "/en/customers" },
    },
  },

  it: {
    meta: {
      title: "Dematerializzazione — Paloryn",
      description:
        "Ordinamento archivistico, digitalizzazione massiva, conservazione a norma e pubblicazione di archivi correnti, di deposito e storici.",
    },
    hero: {
      eyebrow: "Il servizio",
      title: "Prima si ordina, poi si scansiona.",
      lead: "Paloryn prende in carico archivi correnti, di deposito e storici. Ordinamento archivistico, digitalizzazione ad alta produttività, conservazione a norma e pubblicazione — senza che l'originale lasci il luogo in cui è custodito.",
      primary: { label: "Richiedi un sopralluogo", href: "/it/azienda#contatti" },
      secondary: { label: "Scopri Anamnesis", href: "/it/anamnesis" },
    },

    process: {
      eyebrow: "Il metodo",
      title: "Sei fasi, nessuna omissibile.",
      lead: "La prima è quella che gli operatori del settore omettono con maggiore frequenza.",
      steps: [
        {
          n: "01",
          name: "Ricognizione",
          title: "Ricognizione preliminare",
          body: "Sopralluogo sui locali di deposito. Consistenza misurata in metri lineari, stato di conservazione rilevato, fondi sottoposti a vincolo individuati. Ne consegue un progetto di lavorazione, non una quotazione a corpo.",
          tags: "metri lineari · stato di conservazione · vincoli",
        },
        {
          n: "02",
          name: "Riordino",
          title: "Ordinamento del fondo",
          body: "Ricostituzione delle serie e schedatura delle unità nel rispetto del vincolo archivistico. Formulazione della proposta di scarto da sottoporre ad autorizzazione. Prestazione di competenza archivistica, non operativa.",
          tags: "serie · fascicoli · scarto autorizzato",
        },
        {
          n: "03",
          name: "Ripresa",
          title: "Ripresa del documento",
          body: "Scanner planetari per il materiale rilegato o fragile, scanner di produzione per la documentazione corrente. 300 DPI, master TIFF. Risoluzione e gestione del colore calibrate sul supporto, non sul cronoprogramma.",
          tags: "300 DPI · master TIFF · target colorimetrico",
        },
        {
          n: "04",
          name: "Estrazione",
          title: "Estrazione dei campi",
          body: "Riconoscimento ottico sull'intera massa documentaria, poi estrazione dei campi rilevanti — numero di protocollo, intestatario, data, riferimenti catastali. A ciascun campo è associato un indice di affidabilità consultabile.",
          tags: "OCR · campi strutturati · indice di affidabilità",
        },
        {
          n: "05",
          name: "Conservazione",
          title: "Versamento in conservazione",
          body: "Formazione dei pacchetti di versamento secondo le regole tecniche vigenti, con i metadati prescritti e le firme richieste. La titolarità dei dati resta al committente, che può ottenerne in ogni momento l'esportazione integrale in formati aperti.",
          tags: "PDF/A · sigillo qualificato · marca temporale",
        },
        {
          n: "06",
          name: "Pubblicazione",
          title: "Pubblicazione e interrogazione",
          body: "Versamento del fondo in Anamnesis: ricerca semantica, filtri sui campi estratti, collocazione cartografica ove pertinente, accesso autenticato. Il fascicolo che richiedeva tre giornate di ricerca diventa questione di secondi.",
          tags: "ricerca semantica · mappa · SPID e CIE",
        },
      ],
    },

    markets: {
      eyebrow: "A chi si rivolge",
      title: "Due mercati, la stessa catena di custodia.",
      columns: [
        {
          name: "Pubblica amministrazione",
          body: "Comuni e unioni di comuni. Archivi edilizi e catastali, atti amministrativi, fascicoli sanitari e del personale. Cronoprogrammi vincolati ai termini di rendicontazione.",
          tags: "conformità AgID · programmi finanziati · forma associata",
        },
        {
          name: "Privati",
          body: "Studi legali e notarili, imprese, teatri, biblioteche, diocesi e musei. Fondi vincolati, obblighi di tutela, materiale che non può essere movimentato.",
          tags: "laboratorio in sede · fondi vincolati · strumenti di corredo",
        },
      ],
    },

    standards: {
      eyebrow: "Formati e standard",
      items: [
        { k: "Ripresa", v: "300 DPI · master TIFF" },
        { k: "Conservazione", v: "PDF/A · sigillo elettronico qualificato · marca temporale" },
        { k: "Custodia", v: "registrata a ogni passaggio di consegne" },
        { k: "Uscita", v: "esportazione integrale, formati aperti, nessun lock-in" },
      ],
    },

    plate: {
      eyebrow: "Laboratorio",
      caption:
        "Laboratorio di digitalizzazione: scanner planetario con braccio della camera, culla a supporto regolabile, luce fredda priva di UV e IR.",
      note: "Schema disegnato. Lo spazio per la fotografia è già dimensionato e si sostituisce senza altre modifiche.",
    },

    cta: {
      eyebrow: "Contatti",
      title: "Descrivi il tuo archivio.",
      lead: "Cinque risposte bastano a stabilire se l'intervento è praticabile e con quale ordine di grandezza. In caso negativo, lo diciamo subito.",
      primary: { label: "Richiedi un sopralluogo", href: "/it/azienda#contatti" },
      secondary: { label: "Tutti i clienti", href: "/it/clienti" },
    },
  },
} as const;
