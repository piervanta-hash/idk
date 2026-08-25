# Mettere il sito online

Documento per chi si occupa dell'infrastruttura. Tutto quello che serve
sta qui dentro; non c'è niente da chiedere a voce.

---

## Prima cosa: non c'è niente da scaricare

Il sito **non è una cartella di file da caricare via FTP**. È
un'applicazione Next.js: si prende dal repository e si costruisce sul
server (o su una piattaforma che lo fa da sé).

Repository, pubblico:

```
https://github.com/piervanta-hash/idk
```

Il ramo da mettere in produzione è **`main`**.

```bash
git clone https://github.com/piervanta-hash/idk.git
cd idk
```

Se un domani il repository torna privato, basta aggiungere la persona come
collaboratore da *Settings → Collaborators* su GitHub: il comando resta lo
stesso.

> **Il tasto «Download ZIP» funziona ma è la strada peggiore.** Uno zip è
> una fotografia di oggi: niente storico, e ogni aggiornamento successivo
> va riscaricato e ricopiato a mano. Con `git clone`, aggiornare è
> `git pull`.

---

## Una cosa da non fare

Nel repository c'è uno script che produce una cartella `out/` di file
statici. **Quella non è la versione di produzione**: serve solo
all'anteprima su GitHub Pages, e per starci dentro rinuncia a due cose.

1. **I moduli non spediscono.** L'invio passa da una rotta server
   (`src/app/api/contact/`) che in una cartella di file statici non esiste.
2. **Il rimando di lingua sulla radice** avviene nel browser invece che
   sul server, quindi più lento e visibile.

In più ha un prefisso `/idk` in tutti gli indirizzi, che sul dominio vero
sarebbe sbagliato.

Per `paloryn.com` serve la costruzione normale, quella descritta qui
sotto.

---

## Che cosa serve al server

- **Node.js 20 o successivo** (Next 16 non gira sotto).
- Un processo che resta acceso — non basta uno spazio web statico.
- **HTTPS** con certificato valido.
- Circa 512 MB di RAM per il processo; il sito è leggero e non ha
  database.

Nessun database, nessun Redis, nessun servizio esterno: le uniche uscite
verso il mondo sono le mail dei moduli.

---

## Strada A — Vercel (la più breve)

Vercel è di chi fa Next.js e riconosce il progetto da solo. Quindici
minuti, rinnovo del certificato compreso.

1. Accedere a <https://vercel.com> con l'account GitHub.
2. *Add New → Project*, scegliere il repository `piervanta-hash/idk`.
3. Non cambiare niente nelle impostazioni di build: le trova da sé
   (`next build`).
4. In *Settings → Environment Variables* aggiungere i cinque valori della
   posta (tabella più sotto), su *Production*.
5. *Deploy*.
6. In *Settings → Domains* aggiungere `paloryn.com` e `www.paloryn.com`, e
   seguire le istruzioni DNS che compaiono lì.

Da quel momento ogni push su `main` ripubblica da solo.

---

## Strada B — server proprio

```bash
# una volta sola
git clone https://github.com/piervanta-hash/idk.git
cd idk
npm ci                       # `ci` e non `install`: rispetta il lockfile

# a ogni aggiornamento
git pull
npm ci
npm run build
npm start                    # ascolta sulla porta 3000
```

`npm start` va tenuto acceso da un gestore di processi — systemd, pm2 o
quello che già usate — e messo dietro un reverse proxy (nginx, Caddy,
Apache) che si occupa di HTTPS e inoltra alla porta 3000.

Traccia minima per nginx:

```nginx
server {
    server_name paloryn.com www.paloryn.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host              $host;
        proxy_set_header X-Real-IP         $remote_addr;
        proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

`X-Forwarded-For` non è decorativo: è da lì che la rotta dei moduli legge
l'indirizzo di rete per il freno anti-abuso. Senza, tutte le richieste
sembrano arrivare dallo stesso indirizzo e il freno scatta a sproposito.

---

## Le variabili d'ambiente

Cinque, tutte per la posta dei moduli. Su Vercel si mettono nel pannello;
su un server proprio in un file `.env.local` nella cartella del progetto
(non finisce in git, ed è giusto così).

| valore | che cos'è |
|---|---|
| `SMTP_HOST` | il server di posta in uscita |
| `SMTP_PORT` | `465` con TLS diretto, oppure `587` con STARTTLS |
| `SMTP_USER` | la casella da cui il sito spedisce |
| `SMTP_PASS` | la sua password — meglio una password per applicazioni |
| `CONTACT_TO` | dove consegnare (se manca, si usa `SMTP_USER`) |

Il modello è in [`.env.example`](../.env.example).

**Il fornitore è Register.it**, ricavato dai DNS: `paloryn.com` ha
`MX = mail.register.it` e `SPF = include:spf.webapps.net`. Quindi
`SMTP_HOST` è `authsmtp.register.it` (oppure `smtp.register.it`, dipende
dal piano della casella — lo script di prova lo dice in cinque secondi) e
`SMTP_USER` è `info@paloryn.com`. L'unico valore che non si ricava da fuori
è la password, che sta nel pannello di Register.

**Sull'SPF non c'è niente da fare**: il sito spedisce *attraverso* il
server di Register, quindi l'indirizzo mittente risulta autorizzato dal
record già presente, ovunque sia ospitato il sito.

**Il DMARC invece manca** — `_dmarc.paloryn.com` non esiste. Non impedisce
di spedire, ma senza è più facile che i messaggi finiscano fra gli
indesiderati e chiunque può fingersi il dominio. È un record TXT da
aggiungere nei DNS, indipendente dal sito.

Per provarli prima di andare online, dalla cartella del progetto:

```bash
node scripts/prova-posta.mjs           # collegamento e accesso
node scripts/prova-posta.mjs --invia   # manda anche un messaggio di prova
```

Dice quale delle cinque cose non va — nome del server, porta, password,
certificato, mittente non consentito — invece del generico «non è
partito» che si vede dal sito. Non stampa mai la password.

**Senza questi valori il sito sta in piedi lo stesso**: i moduli
dichiarano che il messaggio non è partito e mostrano l'indirizzo da
copiare. Non fingono mai di aver spedito. Si può quindi andare online
prima di avere le credenziali, e aggiungerle dopo.

---

## Il dominio

Il sito si dichiara su `https://paloryn.com` — è scritto in
`src/lib/routes.ts` (`SITE`) e da lì escono indirizzi canonici, `hreflang`,
sitemap e Open Graph. **Se il dominio fosse un altro, quella riga va
cambiata prima di pubblicare**, altrimenti i motori vedono indirizzi che
non esistono.

Scegliere una sola forma fra `paloryn.com` e `www.paloryn.com` e far
rimandare l'altra a quella scelta, con un 301. Due forme entrambe
raggiungibili sono due siti uguali per un motore di ricerca.

---

## Verifica dopo la pubblicazione

Da fare una volta, prima di dire che è online.

- [ ] `https://paloryn.com/` manda a `/it` o `/en` secondo la lingua del browser
- [ ] `/it` e `/en` si aprono, e lo scambio di lingua in testata porta alla **stessa** pagina nell'altra lingua
- [ ] tutte e sei le voci di menu rispondono, nelle due lingue
- [ ] scorrendo la home, i campi del documento escono **uno alla volta**
- [ ] `https://paloryn.com/sitemap.xml` e `/robots.txt` rispondono e citano il dominio giusto
- [ ] `https://paloryn.com/img/marchi/koreja.avif` risponde (se sì, tutte le immagini sono a posto)
- [ ] **il modulo di Azienda spedisce davvero** e il messaggio arriva a `info@paloryn.com`
- [ ] rispondendo a quel messaggio, la risposta va a chi ha compilato il modulo e non a sé stessi
- [ ] il certificato HTTPS è valido e `http://` rimanda a `https://`

L'ultima riga vale doppio: fino a quando il modulo non arriva davvero in
casella, il sito è una brochure.

---

## Aggiornamenti successivi

Con Vercel: nulla da fare, ogni push su `main` ripubblica.

Con server proprio:

```bash
cd idk && git pull && npm ci && npm run build
# poi riavviare il servizio (systemctl restart …, pm2 restart …)
```

I testi stanno tutti in `src/content/`, in coppie inglese/italiano una
sotto l'altra: per cambiare una frase non serve toccare il codice.
