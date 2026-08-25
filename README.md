# Paloryn — restyling del sito

Sito bilingue (inglese e italiano alla pari) costruito con Next.js.
Il lavoro procede sul ramo `claude/procedi-allegato-iaok0e`.
**Il sito in produzione non viene toccato.**

---

## Mettere il sito online

Le istruzioni per chi si occupa dell'infrastruttura stanno in
**[`docs/MESSA-IN-LINEA.md`](docs/MESSA-IN-LINEA.md)**: che cosa serve al
server, le due strade possibili, le variabili d'ambiente, il dominio e la
lista di verifica da spuntare prima di dire che è online.

In breve: **non c'è niente da scaricare e niente da caricare via FTP.**
Si prende il repository con `git clone`, ramo `main`, e si costruisce sul
server. Non va usata la cartella `out/`: è l'anteprima statica, e lì i
moduli non spediscono.

---

## Come si guarda il sito

**Dal telefono o da qualunque computer, senza installare niente:**

### https://piervanta-hash.github.io/idk/

È il sito vero, costruito dal ramo di lavorazione e ripubblicato a ogni
modifica. Funziona tutto: le animazioni guidate dallo scorrimento, le
modali, il menu del telefono, il cambio di lingua.

Una sola cosa non può funzionare lì, e lo dichiara: **l'invio dei
moduli**, che ha bisogno di un server. Su quella pagina il modulo risponde
che il messaggio non è partito e mostra l'indirizzo da copiare.

---

## Come si lavora sul sito in locale

Serve **Node.js 20 o successivo**, da <https://nodejs.org> (versione
«LTS»). Per sapere se c'è già: aprire il Terminale e scrivere `node -v`.

```bash
# 1. scaricare il progetto (una volta sola)
git clone -b claude/procedi-allegato-iaok0e https://github.com/piervanta-hash/idk.git
cd idk

# 2. installare le dipendenze (una volta sola, ci mette un minuto)
npm install

# 3. avviare
npm run dev
```

L'ultimo comando stampa un indirizzo, di solito
**<http://localhost:3000>**. Per fermarlo, `Ctrl+C`.

Per vederlo dal telefono sulla stessa Wi-Fi: `npm run dev -- -H 0.0.0.0`,
poi dal telefono `http://indirizzo-del-computer:3000`.

### Le pagine

| | inglese | italiano |
|---|---|---|
| Home | `/en` | `/it` |
| Servizio | `/en/digitization` | `/it/dematerializzazione` |
| Software | `/en/anamnesis` | `/it/anamnesis` |
| Clienti | `/en/customers` | `/it/clienti` |
| Investitori | `/en/investors` | `/it/investitori` |
| Azienda | `/en/about` | `/it/azienda` |

Aprendo la radice `/` si viene mandati alla lingua del browser.
C'è anche `/styleguide`, che non è una pagina del sito: è il campionario
di colori, caratteri e componenti, ed è esclusa dai motori di ricerca.

---

## Come si mandano le fotografie

Basta **allegarle qui in chat**. Arrivano come file e vengono messe al
posto giusto; se una va ritagliata, il ritaglio si scrive dentro
`scripts/build-photos.mjs` e si può rifare quante volte serve.

Chi preferisce farlo da sé: mettere il file in `photos-sorgente/` e
lanciare

```bash
node scripts/build-photos.mjs photos-sorgente
```

Lo script ridimensiona, ritaglia dove previsto e genera AVIF, WebP e
JPEG in `public/img/archilives/`. I dettagli stanno in
[`photos-sorgente/LEGGIMI.md`](photos-sorgente/LEGGIMI.md).

Una fotografia compare in pagina **solo se il file c'è davvero**: manca
il file, manca la foto, senza riquadri vuoti da spegnere a mano.

---

## Come si fa arrivare la posta dei moduli

I moduli del sito (contatti e investitori) **non aprono il programma di
posta di chi scrive**: il messaggio parte dal server e arriva nella
casella dell'azienda con dentro solo i campi compilati.

Perché funzioni servono cinque valori, quelli del fornitore di posta su
cui gira già `info@paloryn.com`. Si copia `.env.example` in `.env.local`
e si riempiono:

| valore | che cos'è |
|---|---|
| `SMTP_HOST` | il server di posta in uscita |
| `SMTP_PORT` | `465` con TLS diretto, oppure `587` con STARTTLS |
| `SMTP_USER` | la casella da cui il sito spedisce |
| `SMTP_PASS` | la sua password — meglio una password per applicazioni |
| `CONTACT_TO` | dove consegnare (se manca, si usa `SMTP_USER`) |

`.env.local` non finisce in git, ed è giusto così: sono credenziali.

### Provarli prima di scoprire dal sito che non vanno

```bash
node scripts/prova-posta.mjs           # collegamento e accesso
node scripts/prova-posta.mjs --invia   # manda anche un messaggio di prova
```

Un modulo che non spedisce può non spedire per cinque ragioni diverse, e
dal sito si vede solo «il messaggio non è partito». Lo script dice quale
delle cinque: nome del server sbagliato, porta che non risponde, password
rifiutata, certificato che non torna, mittente non consentito.

Non stampa mai la password: solo quanti caratteri ha. Si può lanciare in
una chiamata con qualcuno che guarda lo schermo.

**Il mittente è il sito, non chi scrive.** Un server non può firmare la
posta a nome di un dominio altrui: provarci significa finire nello spam.
Chi ha compilato il modulo compare come «rispondi a», quindi premere
Rispondi nella casella scrive direttamente a lui.

**Senza questi valori il sito resta in piedi**: i moduli dicono che il
messaggio non è partito e mostrano l'indirizzo da copiare a mano. Non
fingono mai di aver spedito.

Contro i moduli compilati in automatico ci sono tre difese, nessuna
visibile a chi scrive davvero: un campo esca fuori dallo schermo, un
controllo sul tempo di compilazione (sotto i tre secondi non è una
persona) e un freno di dieci invii all'ora per indirizzo di rete.

---

## Come è fatto dentro

| cartella | cosa contiene |
|---|---|
| `src/app/(en)/`, `src/app/(it)/` | le rotte, un gruppo per lingua |
| `src/views/` | le sei pagine, scritte una volta e usate da entrambe le lingue |
| `src/content/` | **tutti i testi**, inglese e italiano affiancati |
| `src/components/` | pezzi riusabili e animazioni |
| `src/lib/routes.ts` | l'unica tabella che sa dove sta ogni pagina |
| `src/app/globals.css` | colori, caratteri, misure: il sistema di design |
| `scripts/` | preparazione di fotografie e mappa |
| `docs/` | il diario delle fasi, in italiano |

**Per cambiare un testo** non serve toccare il codice: i testi stanno
tutti in `src/content/`, in coppie inglese/italiano una sotto l'altra.

---

## Comandi

```bash
npm run dev     # sviluppo, si aggiorna da solo a ogni salvataggio
npm run build   # costruisce la versione di produzione
npm start       # serve la versione costruita (prima serve build)
npx tsc --noEmit  # controlla che non ci siano errori di tipo
```
