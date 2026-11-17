/* DIXHITALIZIM — SHQIP. Stessa forma di `en` in src/content/digitization.ts. */

export const sq = {
  meta: {
    title: "Dixhitalizim — Paloryn",
    description:
      "Rendim arkivor, skanim në volum të lartë, ruajtje ligjore dhe publikim i arkivave korente, të ndërmjetme dhe historike.",
  },
  hero: {
    eyebrow: "Shërbimi",
    title: "Renditet para se të skanohet.",
    lead: "Paloryn merr përsipër arkiva korente, të ndërmjetme dhe historike. Rendim arkivor, skanim në volum të lartë, ruajtje ligjore dhe publikim — pa i larguar origjinalet nga vendi ku ruhen.",
    primary: { label: "Kërkoni një inspektim", href: "/sq/kompania#contact" },
    secondary: { label: "Zbuloni Anamnesis", href: "/sq/anamnesis" },
  },

  process: {
    eyebrow: "Procesi",
    title: "Shtatë faza. Asnjëra opsionale.",
    lead: "E para i përcakton të gjitha të tjerat.",
    caption: "Çdo fazë lë pas dokumentacion. Asgjë nuk kalon te faza tjetër me besim.",
    steps: [
      {
        n: "01",
        name: "Inspektimi",
        title: "Inspektimi paraprak",
        body: "Inspektim në vend i depove. Shtrirja matet në metra lineare, gjendja regjistrohet, fondet e kufizuara identifikohen. Ajo që del është një plan pune, jo një ofertë me çmim të prerë.",
        tags: "metra lineare · gjendja · kufizime",
      },
      {
        n: "02",
        name: "Rendimi",
        title: "Rendimi arkivor",
        body: "Seritë rindërtohen dhe njësitë inventarizohen sipas lidhjes arkivore. Propozimet për asgjësim hartohen për autorizim. Punë arkivore, jo punë sekretarie.",
        tags: "seri · njësi · asgjësim i autorizuar",
      },
      {
        n: "03",
        name: "Konservimi",
        title: "Trajtimi konservues",
        body: "Kur e kërkon mbajtësi, trajtimi kryhet në punishten tonë: pastrim i thatë, riparim i grisjeve me letër japoneze, sheshim, heqje e kapëseve metalike. Një fletë që nuk mund të preket nuk mund të skanohet — dhe trajtimi vjen para skanimit, kurrë pas.",
        tags: "Punishte e brendshme · letër japoneze · pastrim i thatë",
      },
      {
        n: "04",
        name: "Skanimi",
        title: "Skanimi",
        body: "Skanerë planetarë për materialin e lidhur dhe të brishtë, skanerë prodhimi për dokumentet korente. 300 DPI, master TIFF. Rezolucioni dhe menaxhimi i ngjyrës përcaktohen nga mbajtësi, jo nga afati.",
        tags: "300 DPI · master TIFF · shirit ngjyrash",
      },
      {
        n: "05",
        name: "Nxjerrja",
        title: "Nxjerrja e fushave",
        body: "OCR mbi të gjithë fondin, pastaj nxjerrja e fushave që kanë rëndësi — numri i protokollit, titullari, data, referenca kadastrale. Çdo fushë ka një shkallë besueshmërie të lexueshme.",
        tags: "OCR · fusha të strukturuara · besueshmëri",
      },
      {
        n: "06",
        name: "Ruajtja",
        title: "Ruajtja ligjore",
        body: "Paketa dorëzimi të ndërtuara sipas rregullave teknike në fuqi, me metadatat dhe nënshkrimet e parashikuara. Ajo që digjitalizohet ruhet në cloud-in tonë, me rezidencë të të dhënave brenda Bashkimit Evropian. Pronësia e të dhënave mbetet te klienti, i cili mund t'i eksportojë plotësisht, në formate të hapura, në çdo kohë.",
        tags: "PDF/A · vulë e kualifikuar · vulë kohore · rezidencë në BE",
      },
      {
        n: "07",
        name: "Publikimi",
        title: "Publikimi dhe kërkimi",
        body: "Fondi ngarkohet në Anamnesis: kërkim semantik, filtra mbi fushat e nxjerra, vendosje në hartë kur ka kuptim, akses i autentikuar. Një dosje që kërkonte tri ditë pune për t'u gjetur bëhet çështje sekondash.",
        tags: "kërkim semantik · hartë · SPID dhe CIE",
      },
    ],
  },

  markets: {
    eyebrow: "Për kë është",
    title: "Të dy tregjet, i njëjti zinxhir ruajtjeje.",
    columns: [
      {
        name: "Sektori publik",
        body: "Bashki dhe shoqata bashkish. Arkiva urbanistike dhe kadastrale, akte administrative, dosje shëndetësore dhe të personelit. Afate të lidhura me raportimin e financimeve.",
        tags: "përputhshmëri AgID · programe të financuara · prokurim i përbashkët",
      },
      {
        name: "Privat",
        body: "Studio ligjore dhe noteriale, kompani, teatro, biblioteka, dioqeza dhe muze. Fonde të kufizuara, detyrime mbrojtjeje, material që nuk mund të lëvizet.",
        tags: "laborator në vend · fonde të kufizuara · mjete kërkimi",
      },
    ],
  },

  standards: {
    eyebrow: "Formate dhe standarde",
    items: [
      { k: "Skanimi", v: "300 DPI · master TIFF" },
      { k: "Ruajtja", v: "PDF/A · vulë elektronike e kualifikuar · vulë kohore" },
      { k: "Kujdestaria", v: "e regjistruar në çdo dorëzim" },
      { k: "Dalja", v: "eksport i plotë, formate të hapura, pa lock-in" },
    ],
  },

  plate: {
    eyebrow: "Laboratori",
    caption:
      "Laboratori i digjitalizimit: skaner planetar me krah kamere sipër, mbajtëse e rregullueshme, ndriçim i ftohtë pa UV dhe IR.",
    note: "Skemë e vizatuar, jo fotografi.",
  },

  cta: {
    eyebrow: "Kontakt",
    title: "Kërkesë për inspektim.",
    lead: "Pesë përgjigje mjaftojnë për të përcaktuar nëse puna është e realizueshme dhe në çfarë rendi madhësie. Nëse nuk është, jua themi menjëherë.",
    primary: { label: "Kërkoni një inspektim", href: "/sq/kompania#contact" },
    secondary: { label: "Të gjithë klientët", href: "/sq/kliente" },
  },
} as const;
