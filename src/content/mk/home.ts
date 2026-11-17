/* HOME — МАКЕДОНСКИ (кирилица). Stessa forma di `en` in
   src/content/home.ts. Le frasi della campagna sono quelle dei film.
   «Paloryn», «Anamnesis» e i nomi propri italiani restano in latino,
   come nei film. */

export const mk = {
  hero: {
    mark: "Paloryn",
    place: "Лече, IT · Европска Унија",
    title: "Меморија што одговара.",
    lead: "Меморијата на една институција не може да оди во пензија. Paloryn подредува, дигитализира и структурира големи хартиени архиви, а потоа ги прави да одговараат — и го покажува изворот.",
    primary: { label: "Побарајте теренски увид", href: "/mk/kompanija#contact" },
    secondary: { label: "Дознајте за Anamnesis", href: "/mk/anamnesis" },
    film: {
      title:
        "Филм на Paloryn. По триесет и пет години во пензија оди личноста што знае каде се наоѓа сè: од утре, кој ќе одговори?",
      play: "Пушти го филмот",
      pause: "Паузирај го филмот",
      soundOn: "Вклучи звук",
      soundOff: "Исклучи звук",
    },
  },

  data: {
    title: "Од материја до податок",
    lead: "Секој лист станува структуриран запис. Секое поле го чува својот индекс на доверливост и местото на страницата од каде што е прочитано.",
    stacks:
      "Нацртан изглед на архивски полици: кутии со досиеја, пликови и укоричени томови на шест полици, попишани еден по еден.",
    extraction: {
      eyebrow: "Екстракција",
      labels: {
        document: "Документ",
        table: "Структуриран запис",
        replay: "Повторно",
        locate: "Допрете поле за да видите од каде потекнува",
        located: "Прикажано на документот",
      },
      docHead: "ОПШТИНА ЛЕЧЕ · ГРАДЕЖНИ ДОЗВОЛИ",
      note: "Примерок запис, не е вистински предмет.",
      fields: [
        { label: "Бр. на предмет", docLabel: "ГРАДЕЖЕН ПРЕДМЕТ БР.", value: "1962 / 4471", score: 99 },
        { label: "Подносител", docLabel: "ПОДНОСИТЕЛ НА БАРАЊЕТО", value: "Paloryn", score: 96 },
        {
          label: "Адреса",
          docLabel: "ЛОКАЦИЈА НА НЕДВИЖНОСТА",
          value: "Via D. Cantatore 1/3 — Lecce",
          score: 94,
        },
        {
          label: "Катастар",
          docLabel: "КАТАСТАРСКИ ПОДАТОЦИ",
          value: "Лист 12 · парцели 417, 418",
          score: 87,
        },
        {
          label: "Предмет",
          docLabel: "ПРЕДМЕТ НА БАРАЊЕТО",
          value: "Доградба и промена на намена",
          score: 91,
        },
      ],
    },
  },

  films: {
    eyebrow: "Сценарија",
    title: "Одговорот постои. Никој не може да го прочита.",
    note: "Реконструирани сценарија: прикажаните лица, бројки и документи се илустративни.",
    labels: { watch: "Погледнете го филмот", close: "Затвори" },
    items: [
      {
        id: "atti",
        sector: "Општини",
        title: "Барање за увид во документи, од поднесувањето до заверената копија.",
      },
      {
        id: "fiume",
        sector: "Банки и осигурување",
        title: "По поплава: секој хипотекарен кредит и секоја полиса во областа, секој со оригиналниот договор.",
      },
      {
        id: "reti",
        sector: "Оператори на мрежи",
        title: "Планови, службености, евиденции за одржување: мрежа што може да се пребарува.",
      },
      {
        id: "viadotto",
        sector: "Инфраструктура",
        title: "Носивоста на еден вијадукт, директно од оригиналните цртежи.",
      },
    ],
  },

  matrix: {
    eyebrow: "Две дејности × два пазара",
    title: "Двете половини им служат на двата пазара.",
    columns: ["Јавен сектор", "Приватен сектор"],
    rows: [
      {
        name: "Дигитализација",
        role: "услугата",
        href: "/mk/digitalizacija",
        cells: [
          "Општини и здруженија на општини. Градежни и катастарски архиви, матични евиденции, управни списи.",
          "Адвокатски и нотарски канцеларии, компании, театри, библиотеки, бискупии, музеи.",
        ],
      },
      {
        name: "Anamnesis",
        role: "софтверот",
        href: "/mk/anamnesis",
        cells: [
          "Најава со SPID и CIE, pagoPA за таксите за пребарување и увид, интеграција со порталите што институциите веќе ги користат.",
          "Лиценца и white-label: механизам за екстракција, индекс на доверливост, документирани API.",
        ],
      },
    ],
  },

  measurements: {
    eyebrow: "Мерки",
    items: [
      { value: "1", unit: "km+", label: "должни метри архива под управување" },
      { value: "10", unit: "M+", label: "страници дигитализирани досега" },
      { value: "20", unit: "+", label: "стручњаци во тимот" },
      { value: "EU", label: "резидентност на податоците", note: "AI моделите работат локално" },
    ],
  },

  map: {
    eyebrow: "Работење",
    title: "Од Лече до Балканот.",
    lead: "Седиште, лабораторија и оперативен центар во Лече. Три канцеларии наскоро се отвораат: Драч, Скопје и Белград. Податоците остануваат во Европската Унија, а оригиналите никогаш не ја напуштаат зградата во која се чуваат.",
    nodes: {
      lecce: { name: "Лече, Италија", role: "Седиште и оперативен центар" },
      durres: { name: "Драч", role: "Наскоро отворање" },
      skopje: { name: "Скопје", role: "Наскоро отворање" },
      belgrade: { name: "Белград", role: "Наскоро отворање" },
      rome: { name: "Рим", role: "Во план" },
      zagreb: { name: "Загреб", role: "Во план" },
    },
    legend: { hq: "Седиште", soon: "Наскоро отворање", planned: "Во план" },
  },

  work: {
    eyebrow: "Клиенти",
    title: "Клиенти и обем.",
    items: [
      {
        index: "01",
        sector: "Приватен",
        client: "Koreja",
        scope: "Архива на театарска и културна продукција.",
        note: "Прв реализиран проект",
      },
      {
        index: "02",
        sector: "Јавен",
        client: "Comune di Galatina",
        scope: "Архива на приватна градба, целосно дигитализирана.",
        note: "PR Puglia FESR-FSE+ 2021-2027",
      },
      {
        index: "03",
        sector: "Јавен",
        client: "Squinzano, Avetrana, Torricella",
        scope: "Архиви на приватна градба дигитализирани заеднички, со општината Squinzano како носител.",
        note: "PR Puglia 1.8.3",
      },
      {
        index: "04",
        sector: "Јавен",
        client: "Comune di Matino",
        scope: "Архиви на матичната служба и на граѓанската состојба.",
        note: "Матични евиденции",
      },
      {
        index: "05",
        sector: "Приватен",
        client: "Архиви и библиотеки од историско значење",
        scope:
          "Стари томови и ракописи, меѓу нив Biblioteca Innocenziana за Надбискупијата Лече. TIFF мастери и PDF/A за долгорочно чување.",
        note: "Под министерска заштита",
      },
    ],
    alsoLabel: "Исто така во референците",
    also: "Maglie · Otranto · Galatone · Alezio · Veglie · Porto Cesareo · Ex Manifattura Tabacchi Guarino · Ordine degli Ingegneri di Lecce",
    cta: { label: "Сите клиенти", href: "/mk/klienti" },
  },

  team: {
    eyebrow: "Луѓе",
    base: "gruppo",
    alt: "Тимот на Paloryn, во црни дуксери Paloryn, заедно во лабораторијата во Лече меѓу архивските полици.",
    caption: "Тимот на Paloryn во лабораторијата во Лече.",
  },

  photos: {
    eyebrow: "ARCHILIVES",
    caption:
      "Инфо-ден ARCHILIVES, Cantieri Teatrali Koreja, Лече — Interreg VI-A Грција-Италија 2021-2027",
    source: "Јуни 2026",
    featured: [
      {
        base: "vantaggiato",
        alt: "Pierluigi Vantaggiato презентира покрај банерот на ARCHILIVES на инфо-денот во театарот Koreja.",
        credit: "Pierluigi Vantaggiato · Ко-основач",
      },
      {
        base: "castellana",
        alt: "Martino Castellana го претставува порталот за театарски архиви на инфо-денот ARCHILIVES.",
        credit: "Martino Castellana · CTO",
      },
      {
        base: "perrone",
        alt: "Linda Perrone, виш архивист, ѝ се обраќа на публиката на инфо-денот ARCHILIVES.",
        credit: "Linda Perrone · Виш архивист",
      },
    ],
    reel: [
      { base: "room-01", alt: "Излагање покрај банерот на ARCHILIVES." },
      { base: "reading", alt: "Читање за време на инфо-денот ARCHILIVES." },
      { base: "performance", alt: "Музичкиот настап што го затвора денот." },
    ],
  },

  cta: {
    eyebrow: "Контакт",
    title: "Барање за теренски увид.",
    lead: "Пет одговори се доволни за да се утврди дали работата е изводлива и од кој ред на големина. Ако не е, ви кажуваме веднаш.",
    primary: { label: "Побарајте теренски увид", href: "/mk/kompanija#contact" },
    secondary: { label: "Материјали за инвеститори", href: "/mk/investitori" },
  },
} as const;
