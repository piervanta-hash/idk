/* ==========================================================================
   INFORMATIVA SUL TRATTAMENTO DEI DATI

   Questo testo descrive quello che il sito fa davvero, verificato sul
   codice, non un modello copiato. Ogni affermazione qui dentro corrisponde
   a una riga che esiste:

     - i campi elencati sono quelli dei due moduli
       (src/content/about.ts e src/content/investors.ts);
     - il recapito e il modo di consegna stanno in
       src/app/api/contact/route.ts;
     - il cookie della lingua e la sua durata stanno in
       src/components/layout/Header.tsx;
     - l'assenza di statistiche, di script di terze parti e di caratteri
       chiamati da fuori si verifica cercando: non c'e' niente.

   IL TITOLARE E' UNA PERSONA, NON IL MARCHIO. La ragione sociale e' Cosma
   Alessandro; Paloryn e' il nome con cui l'attivita' si presenta. Sul
   resto del sito compare solo il marchio, e nel footer la titolarita',
   come da indicazione.

   Qui pero' serve il nome vero, e non e' una scelta di stile: e' il
   documento in cui chi consegna i propri dati deve poter leggere a chi li
   sta consegnando, ed e' il primo dato che l'articolo 13 del GDPR
   richiede. Un'informativa che indica come titolare un marchio invece di
   un soggetto e' un'informativa monca. Il marchio resta accanto — «Cosma
   Alessandro, che opera con il nome Paloryn» — cosi' chi legge ritrova
   entrambi e non si chiede chi sia questo signore.

   RESTA UNA COSA DA CONFERMARE, segnalata invece che inventata: per
   quanto tempo si tengono le richieste ricevute. Il valore qui sotto e'
   una scelta prudente e dichiarata, da confermare o cambiare: due anni.

   Non c'e' un responsabile della protezione dei dati indicato perche' non
   ci e' stato detto che esista. Se esiste, va aggiunto.
   ========================================================================== */

export const privacy = {
  en: {
    meta: {
      title: "Privacy notice — Paloryn",
      description:
        "What this site collects, why, for how long, and the rights you can exercise. Two forms, one language cookie, no tracking.",
    },
    hero: {
      eyebrow: "Privacy notice",
      title: "What this site collects, and what it does not.",
      lead: "Short, because there is little to say. This site has two forms and one cookie that remembers your language. There is no analytics, no tracking, no advertising, and nothing is passed to third parties.",
    },
    updated: "Last updated",
    updatedOn: "August 2026",
    sections: [
      {
        n: "01",
        title: "Who is responsible",
        body: "The data controller is Cosma Alessandro, trading as Paloryn — Via D. Cantatore 1/3, 73100 Lecce (LE), Italy, VAT 04522160755. For anything concerning your data, write to info@paloryn.com or call +39 352 069 0071.",
      },
      {
        n: "02",
        title: "What the forms collect",
        body: "The survey request form collects the authority or company name, your name, your email address, the estimated extent of the archive and your description of it. The investor form collects the organisation, your name, your email address and what you would like to see. Nothing else is collected, and no field is filled in on your behalf.",
      },
      {
        n: "03",
        title: "What happens to it",
        body: "The message is sent from our own server to info@paloryn.com and read by us. Your address is set as the reply address, so that answering you is one click. It is used to answer your request and for nothing else: no newsletter, no marketing, no profiling, and it is never sold, rented or passed to third parties. The only party technically involved is the email provider that runs our mailbox, acting as a processor on our instructions.",
      },
      {
        n: "04",
        title: "On what legal basis",
        body: "Answering a request you sent us is the performance of pre-contractual measures taken at your request, and our legitimate interest in replying to whoever writes to us — Article 6(1)(b) and 6(1)(f) GDPR. You are not asked to consent to anything, because nothing is done that would require consent.",
      },
      {
        n: "05",
        title: "For how long",
        body: "Requests are kept for two years from the last exchange, then deleted. If a contract follows, the documents belonging to that contract are kept for as long as tax and administrative law requires.",
      },
      {
        n: "06",
        title: "Cookies",
        body: "One, called paloryn-lang. It remembers whether you chose English or Italian, so that the site does not ask again, and it lasts one year. It contains two letters and nothing else. It is a technical cookie: it needs no banner and no consent, because it does not track you. There are no analytics or advertising cookies of any kind.",
      },
      {
        n: "07",
        title: "Anti-abuse",
        body: "To stop automated submissions, the server counts how many requests arrive from one network address within an hour. The address is held in working memory only, for that hour, and is not written to any file or database. Two other checks look at the form itself rather than at you: a field invisible to people, and how long the form took to fill in.",
      },
      {
        n: "08",
        title: "What is not here",
        body: "No statistics or audience measurement. No social buttons, embedded players or external maps. The typefaces are served from this site, so opening a page makes no request to Google or to any other third party. No automated decision-making, and no transfer of data outside the European Union.",
      },
      {
        n: "09",
        title: "Your rights",
        body: "You may ask what we hold about you, have it corrected or deleted, restrict or object to its use, and receive it in a portable form — Articles 15 to 22 GDPR. Write to info@paloryn.com: we answer within a month, usually much sooner. If you believe your data has been mishandled you may complain to the Italian supervisory authority, the Garante per la protezione dei dati personali.",
      },
    ],
  },

  it: {
    meta: {
      title: "Informativa privacy — Paloryn",
      description:
        "Cosa raccoglie questo sito, perché, per quanto tempo e quali diritti puoi esercitare. Due moduli, un cookie di lingua, nessun tracciamento.",
    },
    hero: {
      eyebrow: "Informativa privacy",
      title: "Cosa raccoglie questo sito, e cosa no.",
      lead: "Breve, perché c'è poco da dire. Questo sito ha due moduli e un cookie che ricorda la lingua. Non ci sono statistiche, non c'è tracciamento, non c'è pubblicità, e niente viene ceduto a terzi.",
    },
    updated: "Ultimo aggiornamento",
    updatedOn: "Agosto 2026",
    sections: [
      {
        n: "01",
        title: "Chi risponde",
        body: "Il titolare del trattamento è Cosma Alessandro, che opera con il nome Paloryn — Via D. Cantatore 1/3, 73100 Lecce (LE), P. IVA 04522160755. Per qualunque cosa riguardi i tuoi dati scrivi a info@paloryn.com o chiama il +39 352 069 0071.",
      },
      {
        n: "02",
        title: "Cosa raccolgono i moduli",
        body: "Il modulo di richiesta sopralluogo raccoglie l'ente o la ragione sociale, il tuo nome, il tuo indirizzo email, la consistenza stimata dell'archivio e la sua descrizione. Il modulo investitori raccoglie l'organizzazione, il tuo nome, il tuo indirizzo email e cosa vorresti vedere. Nient'altro viene raccolto, e nessun campo viene compilato al posto tuo.",
      },
      {
        n: "03",
        title: "Che fine fanno",
        body: "Il messaggio parte dal nostro server e arriva a info@paloryn.com, dove lo leggiamo noi. Il tuo indirizzo viene messo come indirizzo di risposta, così risponderti è un clic. Serve a rispondere alla tua richiesta e a nient'altro: nessuna newsletter, nessun invio commerciale, nessuna profilazione, e non viene mai venduto, ceduto o passato a terzi. L'unico soggetto tecnicamente coinvolto è il fornitore di posta elettronica che gestisce la nostra casella, che agisce come responsabile su nostra istruzione.",
      },
      {
        n: "04",
        title: "Con quale base giuridica",
        body: "Rispondere a una richiesta che ci hai mandato tu è l'esecuzione di misure precontrattuali adottate su tua richiesta, oltre al nostro legittimo interesse a rispondere a chi ci scrive — art. 6, par. 1, lett. b) e f) del GDPR. Non ti viene chiesto di acconsentire a nulla, perché non si fa nulla che richieda un consenso.",
      },
      {
        n: "05",
        title: "Per quanto tempo",
        body: "Le richieste si conservano due anni dall'ultimo scambio, poi si cancellano. Se ne nasce un contratto, i documenti che appartengono a quel contratto si conservano per il tempo che impongono le norme fiscali e amministrative.",
      },
      {
        n: "06",
        title: "Cookie",
        body: "Uno, si chiama paloryn-lang. Ricorda se hai scelto italiano o inglese, così il sito non te lo richiede, e dura un anno. Contiene due lettere e nient'altro. È un cookie tecnico: non richiede banner né consenso, perché non ti segue. Non ci sono cookie di statistica o di profilazione di nessun tipo.",
      },
      {
        n: "07",
        title: "Difesa dagli abusi",
        body: "Per fermare gli invii automatici, il server conta quante richieste arrivano da uno stesso indirizzo di rete nell'arco di un'ora. L'indirizzo resta soltanto nella memoria di lavoro, per quell'ora, e non viene scritto in nessun file né in nessuna banca dati. Altri due controlli guardano il modulo e non te: un campo invisibile alle persone, e quanto tempo è servito a compilarlo.",
      },
      {
        n: "08",
        title: "Cosa non c'è",
        body: "Nessuna statistica e nessuna misurazione del pubblico. Nessun pulsante social, nessun video incorporato, nessuna mappa esterna. I caratteri tipografici sono serviti da questo sito, quindi aprire una pagina non fa nessuna richiesta a Google né a nessun altro. Nessuna decisione automatizzata, e nessun trasferimento di dati fuori dall'Unione Europea.",
      },
      {
        n: "09",
        title: "I tuoi diritti",
        body: "Puoi chiedere quali dati abbiamo su di te, farli correggere o cancellare, limitarne o opporti al loro uso, e riceverli in forma portabile — articoli da 15 a 22 del GDPR. Scrivi a info@paloryn.com: rispondiamo entro un mese, di norma molto prima. Se ritieni che i tuoi dati siano stati trattati male puoi rivolgerti al Garante per la protezione dei dati personali.",
      },
    ],
  },
} as const;
