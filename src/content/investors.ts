/* ==========================================================================
   AREA INVESTITORI — EN e IT

   Scelta presa: registro istituzionale e contatto riservato, nessun
   contenuto finanziario in pagina. Niente tesi di mercato, niente trazione,
   niente pipeline — non perche' manchino, ma perche' non vanno in chiaro.
   I materiali si chiedono.

   Di conseguenza qui non compare una sola cifra che non sia gia' pubblica
   altrove sul sito. E' la versione piu' corta e la piu' difendibile.
   ========================================================================== */

export const investors = {
  en: {
    meta: {
      title: "Investors — Paloryn",
      description:
        "Institutional profile, governance and certifications. Investor materials are provided on request under confidentiality.",
    },
    hero: {
      eyebrow: "Investors",
      title: "Materials on request.",
      lead: "This page carries no financial information. Figures, traction and pipeline are shared directly, under confidentiality, with counterparties who ask for them.",
    },

    profile: {
      eyebrow: "Profile",
      title: "Company profile.",
      items: [
        {
          k: "Business",
          v: "Two halves at the same level: a service — archival ordering, mass digitization, legal preservation — and a proprietary software platform, Anamnesis, for extraction and interoperability.",
        },
        {
          k: "Markets",
          v: "Public sector — municipalities, building and cadastral archives — and private clients: law and notary firms, companies, theatres, libraries, dioceses and museums. Both halves serve both markets.",
        },
        {
          k: "Infrastructure",
          v: "AI models run locally on proprietary infrastructure. Data residency in Europe. Clients keep title to their data and can export it in full, in open formats, at any time.",
        },
        {
          k: "Base",
          v: "Headquarters, laboratory and operations centre in Lecce, Italy, with an operational office across the Adriatic.",
        },
      ],
    },

    governance: {
      eyebrow: "Governance and certifications",
      title: "Certified management systems.",
      lead: "Certified by an accredited body. Certificate references are attached to tender documentation and provided on request.",
      certs: [
        { code: "ISO 9001", scope: "quality management" },
        { code: "ISO/IEC 27001", scope: "information security" },
        { code: "ISO/IEC 27017", scope: "cloud service security" },
        { code: "ISO/IEC 27018", scope: "personal data in the cloud" },
      ],
      note: "Ongoing dialogue with the Soprintendenza Archivistica e Bibliografica is standard practice for holdings under protection and for disposal proposals.",
    },

    materials: {
      eyebrow: "Materials",
      title: "Available materials.",
      items: [
        "Company profile and organisational structure",
        "Business model and revenue composition",
        "Contracts awarded, volumes delivered, pipeline",
        "Infrastructure, data governance and security posture",
        "Certificates and audit references",
      ],
      note: "Provided under a confidentiality undertaking, to identified counterparties.",
    },

    contact: {
      eyebrow: "Reserved contact",
      title: "Direct contact.",
      lead: "One address, read by the founders. Tell us who you are and what you need to see; we answer with the materials that apply.",
      email: "info@paloryn.com",
      form: {
        org: "Organisation",
        name: "Name",
        mail: "Email",
        interest: "What you would like to see",
        interestHint: "Business model, traction, infrastructure, governance — or all of it.",
        send: "Send request",
        sending: "Sending…",
        sent: "Request received.",
        sentNote: "The address is read by the founders. We answer with the materials that apply, under confidentiality.",
        failed: "The message did not go through. Write to the address below and we will answer just the same.",
        subject: "Investor materials",
        alt: "Or write to",
        privacy:
          "Data sent through this form is used only to answer the request. It is not used for marketing and is not passed to third parties.",
      },
    },
  },

  it: {
    meta: {
      title: "Investitori — Paloryn",
      description:
        "Profilo istituzionale, governance e certificazioni. I materiali per investitori sono forniti su richiesta, sotto riservatezza.",
    },
    hero: {
      eyebrow: "Investitori",
      title: "Materiali su richiesta.",
      lead: "Questa pagina non contiene informazioni finanziarie. Cifre, trazione e pipeline vengono condivise direttamente, sotto riservatezza, con le controparti che le richiedono.",
    },

    profile: {
      eyebrow: "Profilo",
      title: "Profilo dell'azienda.",
      items: [
        {
          k: "Attività",
          v: "Due anime allo stesso livello: un servizio — ordinamento archivistico, digitalizzazione massiva, conservazione a norma — e una piattaforma software proprietaria, Anamnesis, per l'estrazione e l'interoperabilità.",
        },
        {
          k: "Mercati",
          v: "Pubblica amministrazione — comuni, archivi edilizi e catastali — e privati: studi legali e notarili, imprese, teatri, biblioteche, diocesi e musei. Entrambe le anime servono entrambi i mercati.",
        },
        {
          k: "Infrastruttura",
          v: "Modelli di intelligenza artificiale eseguiti in locale su infrastruttura proprietaria. Dati conservati in Europa. La titolarità resta al committente, che può esportarli integralmente in formati aperti in ogni momento.",
        },
        {
          k: "Sede",
          v: "Sede legale, laboratorio e centro operativo a Lecce, con una sede operativa sull'altra sponda dell'Adriatico.",
        },
      ],
    },

    governance: {
      eyebrow: "Governance e certificazioni",
      title: "Sistemi di gestione certificati.",
      lead: "Certificati da organismo accreditato. Gli estremi dei certificati sono allegati alla documentazione di gara e forniti su richiesta.",
      certs: [
        { code: "ISO 9001", scope: "gestione della qualità" },
        { code: "ISO/IEC 27001", scope: "sicurezza delle informazioni" },
        { code: "ISO/IEC 27017", scope: "sicurezza dei servizi cloud" },
        { code: "ISO/IEC 27018", scope: "dati personali nel cloud" },
      ],
      note: "L'interlocuzione continuativa con la Soprintendenza Archivistica e Bibliografica è prassi ordinaria per i fondi sottoposti a tutela e per le proposte di scarto.",
    },

    materials: {
      eyebrow: "Materiali",
      title: "Materiali disponibili.",
      items: [
        "Profilo societario e struttura organizzativa",
        "Modello di business e composizione dei ricavi",
        "Contratti aggiudicati, volumi realizzati, pipeline",
        "Infrastruttura, governo del dato e postura di sicurezza",
        "Certificati e riferimenti di audit",
      ],
      note: "Forniti previo impegno di riservatezza, a controparti identificate.",
    },

    contact: {
      eyebrow: "Contatto riservato",
      title: "Contatto diretto.",
      lead: "Un solo indirizzo, letto dai fondatori. Dite chi siete e che cosa vi serve vedere: rispondiamo con i materiali che servono.",
      email: "info@paloryn.com",
      form: {
        org: "Organizzazione",
        name: "Nome",
        mail: "Email",
        interest: "Che cosa vorreste vedere",
        interestHint: "Modello di business, trazione, infrastruttura, governance — o tutto.",
        send: "Invia richiesta",
        sending: "Invio in corso…",
        sent: "Richiesta ricevuta.",
        sentNote: "L'indirizzo è letto dai fondatori. Rispondiamo con i materiali che servono, sotto riservatezza.",
        failed: "Il messaggio non è partito. Scrivi all'indirizzo qui sotto: rispondiamo lo stesso.",
        subject: "Materiali per investitori",
        alt: "Oppure scrivere a",
        privacy:
          "I dati inviati con questo modulo servono solo a rispondere alla richiesta. Non vengono usati per marketing né ceduti a terzi.",
      },
    },
  },
} as const;
