# Paloryn — Fase 3: Home

**Stato:** consegnata, in attesa di OK per la Fase 4.
**Dove guardare:** `/en`. La radice `/` rimanda li'.

---

## Decisioni applicate

| | |
|---|---|
| Signature element | proposta A, «Il metro lineare» |
| Marchio | il segno esistente, solo nell'header, senza il nome scritto |
| Albania | sede operativa. Il nodo e' etichettato *Operational office* |
| Lingua | pagina in inglese, come previsto dalla fase |

---

## Com'e' fatta la home

Sei blocchi, nell'ordine chiesto dal brief.

**1. Hero.** Etichetta, titolo in Sora a 96px, un paragrafo, due bottoni, poi il
metro lineare a tutta larghezza. E' l'unico momento orchestrato forte della
pagina: tutto il resto e' silenzioso.

**2. La doppia matrice.** Due offerte per due mercati, resa letteralmente come
matrice invece che come tre card affiancate. Su mobile si apre in due blocchi
impilati con i mercati come sottovoci. Ogni riga porta alla sua pagina.

**3. Le misure.** Cinque cifre in IBM Plex Mono, appese a una hairline, con
contatore che sale una volta sola.

**4. La mappa operativa.** SVG proprietario: nessun servizio di mappe, nessuna
tessera scaricata. Coste e confini disegnati dalle coordinate reali di Bari,
Monopoli, Brindisi, Otranto, Leuca, Gallipoli, Taranto sul lato italiano e di
Durazzo, Valona, Saranda su quello albanese. Reticolo appena percepibile per
farla leggere come strumento e non come atlante. Lecce e' nodo pieno con
pulsazione lenta, l'Albania e' cerchio vuoto a bordo tratteggiato: la
distinzione resta ma ora dice «principale / operativa», non «reale / prevista».

**5. Prova sociale.** Quattro casi in griglia su desktop, in fila da scorrere
col pollice su mobile, con aggancio a ogni card. Volumi e programmi di
finanziamento, mai importi contrattuali.

**6. Chiamata all'azione.** Ripresa dal sito attuale, che su questo aveva gia'
il tono giusto.

---

## Il metro lineare, e una cosa che ho cambiato

Il righello e' l'elemento firma. A destra i dorsi dei faldoni, tratti verticali
irregolari; una testa di scansione cyan lo percorre e dietro di se' la carta
diventa dato, cioe' righe allineate di lunghezza variabile come i record di una
tabella. Sotto, la conversione in chiaro: *measured in shelf metres →
digitized 10M+ pages → retrieved in 4 s*.

La scansione si ferma a due terzi. Non e' un caso: cosi' lo stato di riposo
mostra ancora entrambe le nature, e quello stesso fotogramma e' anche
l'immagine statica servita a chi ha disattivato le animazioni o naviga senza
JavaScript. Nessuno vede mai una pagina a meta'.

**Cosa ho cambiato rispetto al piano di Fase 1.** Avevo scritto che su mobile
il righello ruota di 90 gradi e si scorre col pollice. Provato: ruotato diventa
alto **oltre 1.600 pixel**, cioe' due schermate intere solo di righello. Al suo
posto c'e' una seconda variante piu' corta e piu' profonda, sempre orizzontale,
con lo stesso gesto e lo stesso movimento. Se ci tieni alla rotazione si puo'
fare, ma va accorciata molto e perde il senso di «lunghezza di scaffale».

---

## Verifiche fatte, non stimate

| Verifica | Metodo | Esito |
|---|---|---|
| Nessuno scroll orizzontale | `scrollWidth` contro `clientWidth` a 390 e 1440 | 390/390 e 1440/1440 |
| Tetto del 5% sull'accento | conteggio dei pixel cyan su ogni schermata piena | **0,38%** nel punto peggiore |
| Movimento ridotto | `prefers-reduced-motion` | scansione ferma, contatori al valore, nessun impulso |
| Senza JavaScript | classe `js` applicata da script | nulla viene nascosto: la pagina resta intera |
| Costruzione | `next build` | tutte le pagine statiche, nessun errore |

Un difetto trovato e corretto in corsa: l'etichetta del nodo albanese sforava
di 31px a destra su schermo da 390. Ora si ancora dal bordo destro e sale sopra
il nodo, quindi non puo' uscire dal riquadro.

Le sei richieste in 404 nella console sono i prefetch di `/en/digitization`,
`/en/anamnesis`, `/en/customers`, `/en/investors`, `/en/about` e `/it`: pagine
che nascono nelle Fasi 4, 5 e 6. Spariscono da sole.

---

## L'italiano c'e' gia'

Il brief chiede che ogni testo dalla Fase 3 in poi nasca subito in entrambe le
lingue. Tutti i testi della home sono in `src/content/home.ts` in inglese **e**
in italiano. La Fase 3 pubblica solo l'inglese, come prescritto; in Fase 6 si
collega la versione italiana senza riscrivere una riga.

---

## Cifre in pagina e loro provenienza

Nessuna e' inventata, nessuna e' ancora confermata da te.

| Cifra | Da dove viene | Stato |
|---|---|---|
| 10M+ pagine | brief, §1 | **da confermare** |
| 20+ professionisti | brief, §1 | **da confermare** |
| Residenza dei dati in EU | brief, §1 | **da confermare** |
| 4 certificazioni ISO | sito attuale, coincide col brief | verificata |
| 2 paesi operativi | brief, piu' la tua conferma sull'Albania | verificata |
| 4 secondi di reperimento | sito attuale, dimostrazione Anamnesis | pubblicata gia' oggi |
| 72 km, Canale d'Otranto | dato geografico | verificabile |
| Volumi Innocenziana | brief, §5 | **da confermare** |

I nomi dei committenti sono quelli che mi hai dato nel brief. Restano da
sciogliere: il sito attuale dichiara obblighi di riservatezza contrattuale e
anonimizza tutto, quindi prima di andare online serve il tuo via libera nome
per nome.

---

## Cosa manca

- **Fotografie: zero.** Non c'e' nessuna immagine sulla home, per scelta: le
  uniche disponibili sono i manoscritti del Metropolitan in CC0, che non sono
  vostri. La pagina regge lo stesso perche' righello, mappa e griglia dei casi
  fanno il lavoro visivo. Ma il laboratorio e gli archivi veri, quando ci
  saranno, hanno gia' il loro posto.
- **Le cinque pagine interne** non esistono ancora: i link ci sono e portano a
  404 fino alla Fase 4.

---

## Cosa devi decidere

- **F3.1 — Il titolo.** «Data, extracted from paper.» Mette il dato prima della
  carta, che e' il ribaltamento chiesto dal brief. Confermi, o preferisci
  restare piu' vicino a «Dalla materia al dato» del sito attuale?
- **F3.2 — La rotazione del righello su mobile:** lasciamo la variante corta
  orizzontale, o la vuoi ruotata comunque?
- **D8 — Le cifre.** Servono le conferme della tabella qui sopra prima di
  qualsiasi pubblicazione.
- **D6 — I nomi dei committenti:** via libera nome per nome?
- **D5 — Fotografie:** ci sono immagini vostre di laboratorio, scanner e
  archivi? Se no, genero quella di laboratorio dal prompt del brief.

Restano aperte dalla Fase 1, e servono per la Fase 4: **D7** (iter a 5 o 6
fasi) e **D9** (App IO esiste in produzione?).

---

## Prossimo passo

Fase 4 — le due pagine centrali, Digitization e Anamnesis, con l'animazione di
estrazione del dato, l'iter animato e lo schema interattivo
dell'interoperabilita'. Copy in inglese e in italiano.
