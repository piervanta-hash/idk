/* ANAMNESIS — SHQIP. Stessa forma di `en` in src/content/anamnesis.ts.
   PDND, pagoPA, SPID/CIE e App IO sono infrastrutture italiane: restano
   con il loro nome, e il testo dice che cosa fanno. */

export const sq = {
  meta: {
    title: "Anamnesis — Paloryn",
    description:
      "Nxjerrje fushash me AI dhe shkallë besueshmërie, gjeolokalizim kadastral dhe ndërveprim me PDND, pagoPA, SPID/CIE dhe App IO.",
  },
  hero: {
    eyebrow: "Softueri",
    title: "Anamnesis",
    lead: "Anamnesis e kthen një fond të digjitalizuar në një bazë të dhënash të kërkueshme dhe e lidh me infrastrukturën digjitale publike që institucioni përdor tashmë.",
    primary: { label: "Kërkoni një demonstrim", href: "/sq/kompania#contact" },
    secondary: { label: "Shihni shërbimin", href: "/sq/dixhitalizim" },
    claims: [
      { k: "Nxjerrja", v: "AI, besueshmëri për çdo fushë" },
      { k: "Proveniensa", v: "pozicioni në faqe" },
      { k: "Ndërveprimi", v: "PDND · pagoPA · SPID/CIE · App IO" },
      { k: "Kualifikimi", v: "ACN · AgID", logos: true },
    ],
  },

  extraction: {
    eyebrow: "Nxjerrja",
    title: "Faqja bëhet regjistrim.",
    lead: "OCR kalon mbi të gjithë fondin. Fushat që kanë rëndësi nxirren një nga një, secila me një shkallë besueshmërie të lexueshme dhe me pozicionin në faqe nga u mor — kështu çdo vlerë mund të krahasohet me origjinalin.",
    labels: {
      document: "Faqja burim",
      table: "Regjistrimi i nxjerrë",
      replay: "Shiko përsëri",
      locate: "Prekni një fushë për të parë nga vjen",
      located: "Treguar në dokument",
    },
    docHead: "BASHKIA E LEÇES · LEJET E NDËRTIMIT",
    fields: [
      { label: "Nr. i dosjes", docLabel: "DOSJA E NDËRTIMIT NR.", value: "1962 / 4471", score: 99 },
      { label: "Aplikuesi", docLabel: "APLIKUESI", value: "Paloryn", score: 96 },
      {
        label: "Adresa",
        docLabel: "VENDNDODHJA E PRONËS",
        value: "Via D. Cantatore 1/3 — Lecce",
        score: 94,
      },
      {
        label: "Ref. kadastrale",
        docLabel: "TË DHËNAT KADASTRALE",
        value: "Fleta 12 · parcelat 417, 418",
        score: 87,
      },
      {
        label: "Objekti",
        docLabel: "OBJEKTI I KËRKESËS",
        value: "Zgjerim dhe ndryshim i destinacionit",
        score: 91,
      },
    ],
    note: "Të dhëna shembull. Këtu nuk pyetet asnjë arkiv i vërtetë.",
  },

  interop: {
    eyebrow: "Ndërveprimi",
    title: "I lidhur me sistemet e vetë institucionit.",
    lead: "Anamnesis nuk është një silos me një buton eksporti. Qëndron mes qytetarit dhe sistemeve të institucionit dhe flet gjuhën e shtresës kombëtare të ndërveprimit.",
    chain: ["Qytetari", "Institucioni", "Anamnesis"],
    endpoints: [
      {
        id: "pdnd",
        name: "PDND",
        body: "Piattaforma Digitale Nazionale Dati: e-shërbime të publikuara dhe të konsumuara përmes shtresës kombëtare italiane të ndërveprimit.",
      },
      {
        id: "pagopa",
        name: "pagoPA",
        body: "Tarifat e kërkimit dhe të aksesit paguhen brenda së njëjtës kërkesë, jo në një radhë të veçantë.",
      },
      {
        id: "spid",
        name: "SPID / CIE",
        body: "Identifikimi i qytetarit me identitetin digjital kombëtar, në momentin e kërkesës.",
      },
      {
        id: "appio",
        name: "App IO",
        body: "Njoftimet i dërgohen qytetarit në aplikacionin e shërbimeve publike që ka tashmë.",
      },
      {
        id: "portals",
        name: "Portalet e institucionit",
        body: "Ndërfaqe me sistemet që institucioni ka tashmë në prodhim. Nuk kërkohet asnjë zëvendësim.",
      },
      {
        id: "gis",
        name: "GIS · QGIS",
        body: "Referencat kadastrale të nxjerra dorëzohen si shtresa të gjeoreferencuara, që hapen në QGIS.",
      },
    ],
    hint: "Zgjidhni një lidhje",
  },

  geo: {
    eyebrow: "Gjeolokalizimi",
    title: "Parcelat në hartë.",
    lead: "Referencat kadastrale të nxjerra nga dokumentet vendosen në hartë. Pamja e shpërbërë e ndan fletën në parcelat e saj, kështu një kërkesë zgjidhet duke treguar terrenin në vend që të lexohet një regjistër.",
    layers: ["Fleta", "Parcelat", "Regjistrimi i nxjerrë"],
    note: "Skematike. Gjeometria e parcelave është ilustruese.",
    modal: {
      open: "Vendoseni në hartë",
      title: "Regjistrimi i nxjerrë, i lokalizuar",
      territory: "Territori",
      detail: "Fleta dhe parcela",
      note: "Regjistrim shembull në një pozicion demonstrues. Fondet e vërteta vendosen në koordinatat e tyre.",
      close: "Mbyll",
    },
  },

  retrieval: {
    eyebrow: "Gjetja",
    title: "Një leje ndërtimi e vitit 1962.",
    lead: "Ajo që ka rëndësi nuk është që përdoret AI. Ajo që ka rëndësi është koha mes kërkesës së qytetarit dhe përgjigjes së institucionit.",
    manual: {
      name: "Në arkiv",
      steps: [
        "Kërkesa regjistrohet në sportel",
        "Referenca kërkohet në regjistrin në letër",
        "Zbritje në depo, gjetja e raftit",
        "Nxirret kutia, shfletohen dosjet",
        "Kopjim, rirenditje, rikthim në raft",
      ],
      value: "3",
      unit: "ditë pune",
    },
    platform: {
      name: "Në Anamnesis",
      step: "Kërko, filtro, hap. E njëjta kërkesë, një hap i vetëm.",
      value: "4",
      unit: "sekonda",
    },
  },

  licence: {
    eyebrow: "Licenca",
    title: "Licencë dhe white-label.",
    lead: "Motori i nxjerrjes, shkalla e besueshmërisë, gjeolokalizimi dhe API-të ofrohen me licencë ose white-label, për operatorët që nuk kanë ekip zhvillimi.",
    items: [
      { k: "Tashmë në prodhim", v: "në kontrata publike" },
      { k: "Koha deri në treg", v: "më e shkurtër se zhvillimi i brendshëm" },
      { k: "Të dhënat", v: "mbeten te klienti, të eksportueshme plotësisht" },
    ],
  },

  cta: {
    eyebrow: "Kontakt",
    title: "Demonstrim mbi një mostër të vërtetë.",
    lead: "Një demonstrim mbi një mostër të vërtetë thotë më shumë se një specifikim. Na tregoni çfarë fondi është dhe do t'ju tregojmë çfarë del prej tij.",
    primary: { label: "Kërkoni një demonstrim", href: "/sq/kompania#contact" },
    secondary: { label: "Materiale për investitorët", href: "/sq/investitore" },
  },
} as const;
