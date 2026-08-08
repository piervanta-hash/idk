# Paloryn — restyling del sito

Sito bilingue (inglese e italiano alla pari) costruito con Next.js.
Il lavoro procede sul ramo `claude/procedi-allegato-iaok0e`.
**Il sito in produzione non viene toccato.**

---

## Come si guarda il sito

Serve **Node.js 20 o successivo**. Si scarica da <https://nodejs.org>
(prendere la versione «LTS»). Per controllare se c'è già, aprire il
Terminale e scrivere `node -v`: se risponde con un numero, c'è.

Poi, tre comandi. La prima volta serve anche il primo; dalla seconda in
poi basta l'ultimo.

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
**<http://localhost:3000>**. Aprirlo nel browser: quello è il sito.
Per fermarlo, `Ctrl+C` nella stessa finestra del Terminale.

`localhost` vuol dire «questo computer»: il sito gira sulla macchina di
chi lancia il comando, non è pubblicato da nessuna parte e nessuno da
fuori può vederlo.

### Vederlo dal telefono

Con il telefono sulla **stessa rete Wi-Fi** del computer:

```bash
npm run dev -- -H 0.0.0.0
```

Poi sul telefono aprire `http://INDIRIZZO-DEL-COMPUTER:3000`.
L'indirizzo del computer si legge con `ipconfig getifaddr en0` su Mac o
`ipconfig` su Windows: è un numero tipo `192.168.1.34`.

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
di colori, caratteri e componenti, e resta fuori dai motori di ricerca.

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
