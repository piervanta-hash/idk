# Paloryn — Fase 1: Analisi e Design Plan

**Stato:** consegnato, in attesa di OK per la Fase 2.
**Regola rispettata:** nessun codice in questa fase. Nessun contenuto inventato.

---

## 0. Due cose da leggere prima di tutto il resto

**0.1 — La cartella di progetto è vuota.**
Il repository su cui sto lavorando (`piervanta-hash/idk`) contiene solo un `README.md` di
una riga. Il sito attuale non è qui. L'ho quindi analizzato dall'esterno, scaricandolo da
`paloryn.com`: per la Fase 1 è sufficiente, per la Fase 2 in poi no. Ho bisogno che tu mi
dia accesso al repository vero, oppure che mi confermi di ricostruire il sito da zero.
Vedi la domanda **D2** in fondo.

**0.2 — Su `paloryn.com` oggi non c'è Paloryn.**
Il dominio serve un sito interamente marchiato **Dematerializzare**. Non è un dettaglio
cosmetico: il marchio è nel titolo, nel logo, nel footer, nelle email e nei metadati di
condivisione, che puntano tutti a `dematerializzare.it`. In pratica `paloryn.com` è oggi
un alias di un altro brand. Prima di disegnare qualsiasi cosa devo sapere che rapporto c'è
fra i due nomi. Vedi **D1**.

---

## 1. Analisi del sito attuale

### 1.1 Com'è fatto, tecnicamente

| | |
|---|---|
| Tecnologia | Next.js (App Router, cartella `[locale]`) + Tailwind CSS v4 |
| Lingue | IT ed EN già entrambe presenti, con struttura `/it/` e `/en/` |
| Pagine | Home, Metodo, Casi studio, Chi siamo, Contatti, 5 pagine di servizio, 3 note legali |
| Sede dichiarata | Via D. Cantatore 1/3 — 73100 Lecce |
| Titolarità nel footer | «© 2026 Cosma Alessandro» |

La buona notizia: l'impianto bilingue esiste già ed è fatto bene. Non partiamo da zero
sull'internazionalizzazione, e la Fase 6 sarà più corta del previsto.

### 1.2 Com'è fatto, esteticamente — e perché va rifatto

Ho estratto i colori e i caratteri realmente usati nel foglio di stile del sito online.
Il risultato è netto:

| Cosa usa oggi | Valore | Corrisponde all'anti-riferimento del brief |
|---|---|---|
| Fondi crema / avorio / sabbia | `#f5f1e8` `#efe9dc` `#e3daca` | «fondi crema/avorio» — sì |
| Oro in tre gradazioni | `#a67c2e` `#c9a05a` `#e3be7c` | «oro» — sì |
| Carattere dei titoli | Fraunces (serif editoriale, anche in corsivo) | «serif editoriali» — sì |
| Immagine di apertura | manoscritto miniato del XIV secolo | «stock photo di libri antichi» — sì |
| Accenti secondari | blu notte `#23406a`, ruggine `#9a3121` | fuori palette |

**Quattro anti-riferimenti su sei, colpiti in pieno.** Il sito attuale non è "un po' da
rivedere": è esattamente il tipo di sito che il brief dice di non fare. Questo semplifica
le cose — non c'è niente da salvare sul piano visivo, e possiamo essere radicali senza
rimpianti.

Da notare: **IBM Plex Mono è già in uso** ed è già l'unico elemento del sito attuale con
un registro tecnico. È il ponte fra vecchio e nuovo, e non a caso è uno dei tre caratteri
ufficiali del brief.

### 1.3 Il problema di struttura

Il menu attuale ha **nove voci di primo livello** (cinque servizi + Metodo + Casi studio +
Chi siamo + Contatti). Il brief ne ammette al massimo sei. Ma il problema non è il numero:
è che le cinque "linee" sono cinque mestieri messi sullo stesso piano, e nessuno capisce
qual è il prodotto. Anamnesis — che secondo il brief è metà dell'azienda — è la linea 03
di cinque, schiacciata fra "Archivi e catalogazione" e "Tecnologia in licenza".

### 1.4 Cosa c'è di buono e va assolutamente tenuto

Il sito attuale è brutto ma **non è scritto male**. Anzi: ha un tono asciutto, non
promozionale, quasi contrattuale, che è già molto vicino a quello che vogliamo in inglese.
Tre cose in particolare valgono oro:

1. **La dimostrazione Anamnesis.** Il confronto «in archivio: 3 giorni lavorativi» contro
   «su Anamnesis: 4 secondi», con la ricerca provabile dal vivo ("via Manzoni 14",
   "concessione 1962", "particella 417"). È la cosa migliore del sito. Non si tocca, si
   sposta al centro.
2. **L'indice di affidabilità per campo.** Il sito già mostra `datazione 96%`,
   `supporto 99%`, `lingua 87%`. È un gesto da data company: dichiarare quanto si è
   sicuri. Diventa un componente di sistema (vedi §4).
3. **Il metro lineare come unità di misura.** Il sito misura gli archivi in metri lineari,
   non in "documenti". È il vocabolario vero del mestiere ed è la base della mia proposta
   di signature element (vedi §5, Proposta B).

---

## 2. Mappa dei contenuti: cosa tengo, cosa riscrivo, cosa elimino

### 2.1 Le cinque linee attuali → le due anime

| Oggi | Destinazione | Azione |
|---|---|---|
| 01 Digitalizzazione massiva | `/en/digitization` | **Riscrivo** — diventa il corpo del servizio |
| 02 Archivi e catalogazione | `/en/digitization`, passo 1 dell'iter | **Assorbo** — non è una linea, è una fase |
| 03 Anamnesis | `/en/anamnesis` | **Promuovo** — da linea 03 a metà dell'azienda |
| 04 Tecnologia in licenza | `/en/anamnesis` (licenza / white-label) + `/en/investors` (modello) | **Assorbo e sdoppio** |
| 05 Patrimonio storico | `/en/digitization` (segmento privati/cultura) + un caso su `/en/customers` | **Declasso** — è un mercato, non una linea |

Motivo, in chiaro: cinque linee raccontano un fornitore che sa fare cinque cose. Due
anime × due mercati raccontano un'azienda con un'offerta. Il brief lo dice esplicitamente
ed è la scelta giusta.

### 2.2 Le altre pagine

| Oggi | Destinazione | Azione |
|---|---|---|
| Metodo (6 fasi) | `/en/digitization` | **Tengo il testo, riduco.** Vedi **D7** sul numero di fasi |
| Casi studio (3, anonimi) | `/en/customers` | **Riscrivo con i nomi veri.** Vedi **D6** |
| Chi siamo | `/en/about` | **Tengo la struttura in 4 unità**, aggiungo le metriche |
| Contatti (form a profili) | dentro `/en/about` + CTA diffusa | **Tengo il meccanismo**, il form a tre profili è buono |
| Note legali (privacy/cookie/accessibilità) | invariate | **Tengo**, riadatto solo lo stile |
| — | `/en/investors` | **Nuova, tutta da scrivere.** Vedi **D12** |

### 2.3 Cosa elimino senza esitazione

- Tutta la palette crema/oro e il carattere Fraunces.
- Il manoscritto miniato in apertura (vedi §2.4 — c'è un problema serio).
- La gerarchia "cinque linee".
- Il registro da istituzione culturale: «Ne consegue un progetto di lavorazione, non una
  quotazione a corpo» è una frase bella ma è la frase di uno studio archivistico, non di
  una società di dati.

### 2.4 Un problema con le immagini (importante)

Il brief, alla sezione 8, dice: *«Le immagini di manoscritti già presenti sul sito attuale
sono buone: recuperale e riusale, sono materiale proprietario e autentico».*

**Non lo sono.** Le due immagini di manoscritti sul sito sono del Metropolitan Museum of
Art, rilasciate in Open Access CC0. Lo dichiara il sito stesso, nella didascalia sotto
l'immagine di apertura:

> «Valerio Massimo, *Facta et dicta memorabilia* [...] The Metropolitan Museum of Art,
> Open Access (CC0). **Immagine dimostrativa, in attesa delle nostre.**»

Sono quindi dei segnaposto, non materiale di Paloryn. Riusarle come "materiale proprietario
e autentico" sarebbe falso, ed è esattamente il tipo di cosa che un investitore verifica.
Legalmente si possono usare (CC0), ma allora sono stock photo di libri antichi — cioè
l'anti-riferimento numero uno del brief.

Serve una decisione e servono fotografie vere. Vedi **D5**.

---

## 3. Design plan — colore

### 3.1 I tre colori ufficiali

```
#0A0A0A   nero      il fondo, sempre e ovunque
#FFFFFF   bianco    solo display, numeri, stato attivo
#707070   grigio    il grigio di riferimento
```

### 3.2 La scala di grigi — un grigio, un mestiere

Il brief consente di derivare grigi intermedi. Il rischio è produrre l'ennesima lista di
tinte che poi vengono usate a caso. Quindi impongo una regola: **ogni grigio ha un solo
compito. Un grigio usato per due compiti diversi è un errore da correggere, non una
variante.**

| Token | Valore | Unico compito | Contrasto su `#0A0A0A` |
|---|---|---|---|
| `--bg` | `#0A0A0A` | fondo della pagina | — |
| `--surface-1` | `#141414` | fondo di sezione alternata | — |
| `--surface-2` | `#1F1F1F` | card, riga di tabella alternata | — |
| `--line` | `#3A3A3A` | hairline e bordi, sempre 1px | 1,9:1 (decorativo) |
| `--text-mute` | `#707070` | etichette mono, stati disattivi | **3,99:1** |
| `--text-body` | `#A0A0A0` | testo corrente | 7,6:1 ✓ AAA |
| `--text-strong` | `#E5E5E5` | titoli non display, dati in tabella | 15,7:1 ✓ AAA |
| `--text-max` | `#FFFFFF` | display, numeri delle metriche | 18,9:1 ✓ |

**Regola vincolante che ne discende:** `#707070` sta a 3,99:1 sul nero, cioè **sotto la
soglia AA di 4,5:1 per il testo normale**. Non è utilizzabile per i paragrafi. Va bene per
etichette in maiuscolo di grande corpo, bordi, icone e stati disattivi — non per leggere.
Il testo corrente parte da `#A0A0A0`. Questo risolve in partenza metà dei problemi di
accessibilità che altrimenti emergerebbero in Fase 7.

### 3.3 L'accento

```
#00C2D1   cyan
```

Contrasto misurato: **9,1:1 su `#0A0A0A`** (ottimo, utilizzabile anche per testo piccolo)
e **2,2:1 su `#FFFFFF`** (inutilizzabile per testo, conferma la regola del brief).

Regole operative, in ordine di importanza:

1. **Massimo 5% della superficie visibile.** In Fase 7 lo verifico misurando, non a occhio.
2. **Solo su ciò che è vivo:** focus da tastiera, stato attivo, linee di flusso in
   movimento, indice di affidabilità, contatori mentre salgono, nodo primario della mappa.
3. **Mai** su titoli, mai su fondi ampi, mai sul logo, mai sul testo corrente, mai come
   testo su bianco.
4. Se togliendo il cyan la pagina perde gerarchia, **la gerarchia è sbagliata**: si
   corregge la struttura, non si aggiunge colore. Verifica pratica che eseguirò a ogni
   fase: screenshot della pagina in scala di grigi. Se non si capisce, non si pubblica.

Il cyan **non ha varianti**. Niente cyan chiaro, niente cyan scuro, niente cyan al 40%.
Se serve un cyan più tenue, si usa l'opacità sullo stesso valore, mai un secondo colore.

---

## 4. Design plan — tipografia

### 4.1 I tre caratteri e i loro ruoli

| Carattere | Pesi | Ruolo | Non usare per |
|---|---|---|---|
| **Sora** | 700, 600 | display, titoli, logotipo | testo corrente, dati |
| **Archivo** | 400, 500 | testo corrente, paragrafi, UI | numeri, etichette |
| **IBM Plex Mono** | 400 | etichette, numeri, dati, tag, breadcrumb | paragrafi |

### 4.2 La scala dichiarata

Due valori per riga: **mobile → desktop**. In mezzo la dimensione è fluida.

**Display — Sora 700**

| Token | mobile → desktop | Tracking | Interlinea | Uso |
|---|---|---|---|---|
| `D1` | 56 → 96 px | −0,03em | 0,98 | titolo dell'hero, uno per pagina |
| `D2` | 40 → 64 px | −0,025em | 1,02 | apertura di sezione |
| `D3` | 28 → 40 px | −0,02em | 1,08 | titolo di blocco |

**Titoli — Sora 600**

| `H4` | 22 → 26 px | −0,01em | 1,15 | titolo di card, di caso studio |
| `H5` | 18 → 20 px | −0,005em | 1,20 | sottotitolo, intestazione di tabella |

**Testo — Archivo**

| `Body-L` | 18 → 20 px | 0 | 1,55 | primo paragrafo, misura max 68 caratteri |
| `Body` | 16 → 17 px | 0 | 1,60 | testo corrente, misura max 72 caratteri |
| `Small` | 14 px | 0 | 1,50 | didascalie, note |

**Dati — IBM Plex Mono 400**

| `Label` | 11 → 12 px | +0,12em | 1,20 | MAIUSCOLO, etichette di sezione |
| `Data` | 13 → 14 px | 0 | 1,45 | valori in tabella, cifre tabulari |
| `Metric` | 40 → 72 px | −0,01em | 1,00 | **le grandi cifre delle metriche** |

### 4.3 La decisione tipografica non ovvia

**Le grandi cifre delle metriche stanno in IBM Plex Mono, non in Sora.**

Ovunque nel mondo B2B il numero grosso è nel carattere display, in grassetto, perché è un
trofeo. Qui no: le cifre restano nel carattere delle macchine, con cifre a larghezza fissa.
Il numero non è un vanto, è **la lettura di uno strumento**. È una differenza piccola nel
codice e grandissima nel tono: dice che quei dieci milioni di pagine sono un contatore, non
uno slogan. È anche coerente con la regola del brief («etichetta breve in IBM Plex Mono»)
portata alle estreme conseguenze.

### 4.4 Griglia e ritmo

- **Desktop 1440:** contenitore max 1320px, 12 colonne, gutter 24px, margine 60px.
- **Tablet 768:** 8 colonne, gutter 20px, margine 32px.
- **Mobile 390:** 4 colonne, gutter 16px, margine 20px.
- **Spaziatura:** tutto multiplo di 8. Ritmo fra sezioni: 96 (mobile) / 128 / 160 (desktop).
- **Hairline:** 1px `#3A3A3A`, sempre a tutta larghezza del contenitore. Le hairline sono
  il principale strumento di separazione: niente ombre, niente bordi arrotondati grandi,
  niente riquadri "a scheda".

---

## 5. Signature element — tre proposte

Il brief chiede di sceglierne **uno** e concentrarci sopra tutta l'audacia. Ne propongo
tre, in ordine di preferenza mia, con il rischio di ciascuna dichiarato.

### Proposta A — «Il metro lineare» ← la mia raccomandazione

**L'idea.** Gli archivisti misurano gli archivi in **metri lineari**: la lunghezza fisica
di scaffale occupata dalla carta. È l'unità di misura vera del mestiere, la usa già il sito
attuale, e nessun concorrente la userebbe mai come elemento grafico.

L'elemento è un **righello**. Una lunga riga orizzontale di trattini verticali sottili,
grigi, a passo regolare: sono i dorsi dei faldoni, ma sono anche una scala graduata. È
letteralmente un metro. Mentre si scorre, una linea cyan lo percorre da sinistra a destra,
e dietro di essa i trattini **cambiano natura**: da linee irregolari di carta diventano
righe allineate di una tabella monospaziata. La carta ha una lunghezza; il dato ha un
indice.

Sotto, in mono, la conversione avviene in diretta:

```
1.240 m lineari  →  10.4M pagine  →  interrogabili in 4 s
```

**Perché funziona.** Traduce «dalla carta al dato» in un'unica misura che si trasforma in
un'altra misura — che è esattamente il mestiere di Paloryn. È monocromo per natura (linee
sottili su nero, il cyan solo sulla testa di scansione: siamo ben sotto il 5%). Su mobile
ruota di 90° e diventa verticale senza perdere niente, anzi guadagnando: si scorre col
pollice lungo il righello. Spento, resta un righello disegnato, che è comunque un'immagine.
E ricompare in tutto il sito in miniatura: come separatore fra le sezioni, come barra di
avanzamento della lettura, come asse dei casi studio.

**Rischio.** Richiede che «metro lineare» sia leggibile a un investitore non archivista.
Si risolve con l'etichetta accanto, ed è comunque un'unità standard internazionale
(*shelf metres*).

### Proposta B — «La cucitura»

**L'idea.** L'animazione di estrazione del dato promossa da sezione a hero: pagina di
documento a sinistra, linea cyan che la percorre, i campi che si accendono e migrano in una
tabella strutturata a destra.

**Perché funziona.** È il linguaggio già usato su Instagram, quindi c'è continuità di
marca. È l'animazione numero 1 del brief. È immediatamente comprensibile a chiunque, senza
etichette.

**Rischio — ed è il motivo per cui non è la mia prima scelta.** È la cosa che *tutti*
farebbero. Ogni azienda di document AI al mondo ha la linea che scansiona e i campi che
volano nella tabella. Come signature element è corretto ma non memorabile. **La mia
proposta: resta, ma come animazione principale della pagina Digitization (dov'è già
prevista), non come firma della home.**

### Proposta C — «La mappa operativa»

**L'idea.** La mappa Lecce ↔ Albania descritta al punto 2-bis del brief, promossa a
elemento firma.

**Perché funziona.** È bella, è proprietaria (SVG disegnato, non un servizio di mappe), ed
è già ben specificata nel brief.

**Due rischi, entrambi seri.**
1. **Dice dove sei, non cosa fai.** Come firma di una data company è un'informazione
   secondaria: la geografia è un fatto aziendale, non la proposta di valore.
2. **Il nodo albanese è oggi un'incognita.** Il brief stesso pone un vincolo di verità
   («mai *Office* se la sede non esiste»). Costruire l'elemento più memorabile del sito
   sopra un nodo la cui etichetta è *Expansion — 2027* significa che metà della firma
   dell'azienda è una promessa. **La mappa la costruisco comunque** — è una sezione della
   home prevista dal brief — ma non la userei come firma.

**In sintesi:** A come signature element nell'hero, B come animazione della pagina
Digitization, C come sezione della home. Aspetto la tua scelta.

---

## 6. Concept di layout — wireframe

### 6.1 Home, desktop (1440)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ ●●● PALORYN      Digitization  Anamnesis  Customers  Investors  About  EN▾ │
└────────────────────────────────────────────────────────────────────────────┘
··············································· hairline ····················
   DATA COMPANY · LECCE, IT                                     ← Label mono

   We turn paper archives              ┌──────────────────────────────────┐
   into queryable data.                │  ▏▎▍▌▏▎▍▌▏▎▍▌▏▎▍▌▏▎▍▌▏▎▍▌▏▎▍▌   │
                                       │  ────────────►│                  │
   ← D1 · Sora 700 · 96px              │  ▏▎▍▌▏▎▍▌▏▎▍▌ │ ▤▤▤▤▤▤▤▤▤▤▤▤▤    │
     tracking −0,03em                  │  carta        │ dato             │
                                       └──────────────────────────────────┘
   Archival ordering, mass                1.240 m  →  10.4M pages  → 4 s
   digitization, AI extraction,           ↑ Metric · mono · cyan sulle frecce
   public-sector interoperability.
                                          ↑ SIGNATURE ELEMENT (Proposta A)
   [ Request a survey ]  [ Anamnesis → ]
··············································································
   TWO CAPABILITIES × TWO MARKETS                                ← Label mono

                    │  PUBLIC SECTOR          │  PRIVATE
   ─────────────────┼─────────────────────────┼──────────────────────────────
    DIGITIZATION    │  municipalities,        │  law and notary firms,
    the service     │  building and cadastral │  companies, theatres,
                    │  archives               │  libraries, dioceses
   ─────────────────┼─────────────────────────┼──────────────────────────────
    ANAMNESIS       │  SPID / CIE, pagoPA,    │  licence and white-label,
    the software    │  App IO, existing       │  documented APIs
                    │  agency portals         │
   ─────────────────┴─────────────────────────┴──────────────────────────────
   ↑ la doppia matrice del brief, resa letteralmente come matrice 2×2.
     Ogni cella è un link. In tre secondi si capisce che Paloryn non è
     solo un fornitore della PA.
··············································································
   MEASUREMENTS                                                  ← Label mono

   10M+            20+             EU              4              2
   pages           people          data            ISO certs      countries
   digitised       archivists,     residency,      9001 · 27001   Italy ·
   to date         engineers,      local AI        27017 · 27018  Albania
                   developers
   ↑ 5 metriche, cifre in IBM Plex Mono, contatore che sale una volta sola.
     Tutte in attesa della tua conferma numerica (vedi D3, D4).
··············································································
   OPERATIONS                                                    ← Label mono

              ┌───────────────────────────────────────────┐
              │        ╭──╮                               │
              │   Puglia ●━━━━━━━┅┅┅┅┅→ ◌ Albania         │
              │      Lecce                                │
              │      HQ · operations      Expansion 2027  │
              └───────────────────────────────────────────┘
   ↑ nodo pieno cyan + pulsazione lenta / nodo vuoto tratteggiato.
     ETICHETTA DA CONFERMARE — vedi D4.
··············································································
   SELECTED WORK                                                 ← Label mono
   ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
   │ Koreja      │ │ Galatina    │ │ Squinzano+2 │ │ Innocenziana│
   │ private     │ │ public      │ │ public      │ │ private     │
   └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
                               [ All customers → ]
··············································································
   [ CTA ]   Describe your archive. Five questions are enough.
┌────────────────────────────────────────────────────────────────────────────┐
│ footer: sede · P.IVA · certificazioni · note legali · switch lingua        │
└────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Home, mobile (390) — progettata per prima

```
┌──────────────────────┐
│ ●●● PALORYN     ☰ EN │  ← menu a tutto schermo, tap target 48px
└──────────────────────┘
························
 DATA COMPANY · LECCE

 We turn paper
 archives into
 queryable data.
 ← D1 · 56px

 ┌────────────────────┐
 │  ▏▎▍▌  carta       │   ← IL RIGHELLO RUOTA:
 │  ▏▎▍▌              │      verticale, si scorre
 │  ══════► cyan      │      col pollice
 │  ▤▤▤▤▤             │
 │  ▤▤▤▤▤   dato      │
 └────────────────────┘
  1.240 m
     ↓
  10.4M pages
     ↓
  4 s

 [ Request a survey ]   ← full width, 52px
························
 TWO CAPABILITIES
 × TWO MARKETS

 ┌────────────────────┐
 │ DIGITIZATION       │   ← la matrice 2×2 diventa
 │ ├ Public sector  → │      2 blocchi impilati,
 │ └ Private        → │      ogni riga un link
 └────────────────────┘
 ┌────────────────────┐
 │ ANAMNESIS          │
 │ ├ Public sector  → │
 │ └ Private        → │
 └────────────────────┘
························
 MEASUREMENTS
 ┌──────────┬─────────┐   ← 2 colonne, la quinta
 │ 10M+     │ 20+     │      metrica occupa
 │ pages    │ people  │      tutta la riga
 ├──────────┼─────────┤
 │ EU       │ 4 ISO   │
 ├──────────┴─────────┤
 │ 2 countries        │
 └────────────────────┘
························
 OPERATIONS
 ┌────────────────────┐
 │      ● Lecce       │   ← mappa verticale,
 │      ┃             │      nodi ingranditi,
 │      ┋             │      tap apre l'etichetta
 │      ◌ Albania     │
 └────────────────────┘
························
 SELECTED WORK
 ┌──────────┐┌────────╌   ← swipe orizzontale
 │ Koreja   ││ Galatin    (nessuno scroll di
 └──────────┘└────────╌    pagina, mai)
························
 ┌────────────────────┐
 │ [ Request a survey]│   ← CTA sticky, discreta,
 └────────────────────┘      compare dopo il 40%
```

### 6.3 Principio di layout, in una frase

**Ogni sezione si apre con un'etichetta mono in maiuscolo su una hairline, poi dà subito
la cosa concreta.** Niente titolo-sottotitolo-paragrafo-introduttivo. L'etichetta dice di
cosa si tratta in due parole, la hairline separa, e sotto c'è il dato, la matrice, la
mappa o la tabella. È il ritmo di un cruscotto, non di una brochure — ed è il motivo per
cui la densità informativa resta alta anche senza riempire di testo.

---

## 7. Autoverifica — cosa ho rifatto perché sembrava generico

Il brief chiede espressamente di controllare se qualche parte assomiglia al risultato
standard che produrrei per un sito B2B qualsiasi, e di rifarla. Ho trovato quattro punti e
li ho rifatti. Ecco cosa c'era prima e cosa c'è adesso.

| # | Prima draft (generico) | Adesso | Perché |
|---|---|---|---|
| 1 | Sezione «Cosa facciamo» con tre card affiancate, icona + titolo + due righe | **Matrice 2×2** offerte × mercati, ogni cella cliccabile | Le tre card sono il pattern più stanco del B2B. La matrice è la struttura portante dichiarata dal brief: renderla letteralmente una matrice la trasforma da concetto a interfaccia |
| 2 | Fila di quattro contatori enormi in Sora Bold, stile "i nostri numeri" | Cifre in **IBM Plex Mono** a larghezza fissa, su hairline, con etichetta sotto | Il numero in grassetto display è un trofeo da homepage di agenzia. In mono diventa la lettura di uno strumento. Cambia il tono, non il layout |
| 3 | Signature element = la linea che scansiona il documento | **Il metro lineare**, con la scansione retrocessa a animazione di pagina | La scansione è la cosa che farebbe chiunque faccia document AI. Il metro lineare viene dal vocabolario di Paloryn e non è di nessun altro |
| 4 | Scala di grigi come lista di sette tinte «da usare per profondità» | Sette grigi, **un mestiere ciascuno**, con la regola che il doppio uso è un bug | Una lista di grigi senza regole finisce sempre in un sito grigio-melma. La regola rende il design system verificabile in Fase 7 |

Una quinta cosa che **non** ho rifatto ma segnalo: l'hero «titolo grande a sinistra,
elemento visivo a destra» è un impianto convenzionale. L'ho tenuto di proposito. Con un
signature element così forte, disporlo in modo bizzarro sarebbe rumore: la disciplina del
resto della pagina è quello che fa risaltare l'unico momento audace, ed è esattamente
quello che chiede il brief.

---

## 8. Cosa manca — contenuti che non esistono e che non invento

Il brief dice: se un contenuto che ti serve non c'è, dimmelo, non inventare. Ecco l'elenco
completo di quello che il brief mi chiede di pubblicare e che **non esiste da nessuna parte
sul sito attuale**:

- Le **cinque metriche** (10M pagine, 20 professionisti, dati in Europa, 2 paesi). Nessuna
  è oggi pubblicata. Le certificazioni ISO invece ci sono e coincidono.
- **App IO.** Il sito attuale cita SPID, CIE, pagoPA e le interfacce verso i gestionali,
  ma non App IO. Non so se l'integrazione esiste.
- **I volumi dei casi studio** (Galatina, Squinzano/Avetrana/Torricella, Koreja). Il brief
  dà i volumi solo per la Innocenziana (~2.750 pagine + 210 tavole).
- **Tutta l'area Investors**: tesi di mercato, modello di business, trazione, pipeline,
  governance. Non esiste una riga.
- **Le fotografie di laboratorio e degli archivi.** Zero materiale proprietario disponibile.
- **Il logo Paloryn** (tre punti equidistanti a terminali arrotondati). Il sito attuale ha
  il logo Dematerializzare. Mi serve il file vettoriale originale.

---

## 9. Decisioni che servono a me da te

In ordine di quanto mi bloccano.

**Bloccanti per la Fase 2**

- **D1 — Marchio.** Che rapporto c'è fra Paloryn e Dematerializzare? Paloryn è il nuovo
  marchio ombrello che sostituisce Dematerializzare, oppure convivono? Che fine fa
  `dematerializzare.it`? E qual è la ragione sociale corretta per il footer (oggi c'è
  «© 2026 Cosma Alessandro»)?
- **D2 — Repository.** La cartella di progetto è vuota. Mi dai accesso al repo del sito
  attuale, oppure ricostruisco da zero in Next.js? Se ricostruisco, mi serve confermato
  dove va in anteprima (il brief vieta di toccare la produzione, e sono d'accordo).
- **D3 — Signature element.** A (metro lineare, la mia raccomandazione), B (cucitura) o
  C (mappa)?

**Bloccanti per le Fasi 3–5**

- **D4 — Albania.** Qui c'è una contraddizione di sostanza, non di stile. Il sito attuale
  ripete su ogni pagina che «i dati non lasciano il perimetro nazionale» e «l'infrastruttura
  resta in Italia» — è uno degli argomenti di vendita verso la PA e regge le ISO 27017/27018.
  Il brief chiede invece di dichiarare «dati conservati in Europa» e «due paesi operativi:
  Italia e Albania». **L'Albania non è nell'Unione Europea.** Ho bisogno di sapere: (a) i
  dati restano in Italia o no; (b) cosa fa esattamente la struttura albanese; (c) l'etichetta
  del nodo sulla mappa — *Expansion — 2027*, *Planned operations*, o altro. Non pubblico
  nessuna delle due formule finché non me lo confermi.
- **D5 — Immagini.** I manoscritti sul sito sono del Metropolitan Museum in CC0, non
  vostri, e il sito lo dichiara (§2.4). Abbiamo fotografie vere di laboratorio, scanner,
  archivi e riprese? Se no: genero l'immagine di laboratorio dal prompt che mi hai dato, o
  metto un segnaposto?
- **D6 — Nomi dei clienti.** Il sito attuale anonimizza tutto e dichiara obblighi di
  riservatezza contrattuale. Il brief mi dà i nomi (Koreja, Galatina, Squinzano/Avetrana/
  Torricella, Innocenziana, Maglie/Otranto). Confermi che tutti sono pubblicabili con nome?
- **D7 — Iter: 5 o 6 fasi?** Il brief ne elenca 5 e salta la Ricognizione. Il sito attuale
  ne ha 6 e dedica alla Ricognizione la frase più forte che abbia: *«è quella che gli
  operatori del settore omettono con maggiore frequenza»*. È un differenziatore commerciale
  vero. Proposta mia: **teniamo 6**, oppure la Ricognizione diventa la fase 1 e
  «Ordinamento e catalogazione» la fase 2, arrivando comunque a 6. Dimmi tu.

**Da confermare prima della pubblicazione**

- **D8 — Le cinque cifre.** Il brief chiede espressamente la mia conferma su ogni numero
  prima di pubblicarlo. Confermi: oltre 10 milioni di pagine; oltre 20 professionisti;
  4 certificazioni ISO; 2 paesi?
- **D9 — App IO.** L'integrazione esiste in produzione, è in corso, o è prevista?
- **D10 — Portale Interreg Italia-Grecia** (i quattro teatri dell'area mediterranea). È sul
  sito attuale ed è probabilmente la prova migliore che avete della parte software, ma il
  brief non lo elenca fra i casi studio. Lo teniamo?
- **D11 — Grafia inglese.** La versione EN attuale scrive *«Digitisation»* (grafia
  britannica con la s). Il brief impone *«digitization»* con la z. Confermo il cambio: mi
  serve solo che tu sappia che tocca anche l'indirizzo `/en/digitization`.
- **D12 — Investors.** Nessun contenuto esiste. Me lo fornisci tu, oppure in Fase 5 ti
  consegno una struttura con i campi vuoti da riempire?

---

## 10. Riepilogo

**Cosa ho fatto.** Analizzato il sito online (home, metodo, casi studio, chi siamo,
Anamnesis, versione EN) e il suo foglio di stile reale. Mappato tutti i contenuti con la
destinazione nella nuova architettura. Definito la scala di colore con i contrasti
calcolati, la scala tipografica completa e la griglia. Disegnato i wireframe di home
desktop e mobile. Preparato tre proposte di signature element con i rischi dichiarati.
Fatta l'autoverifica richiesta e rifatti quattro punti che risultavano generici.

**Cosa manca.** Sei blocchi di contenuto che non esistono (§8) e dodici decisioni tue (§9).

**Cosa non ho fatto, di proposito.** Nessuna riga di codice: il brief lo vieta in Fase 1.

**Prossimo passo.** Alla tua conferma su **D1, D2 e D3** parto con la Fase 2: token,
tipografia, griglia e componenti di base in una pagina di stile isolata. Nessuna pagina
reale.
