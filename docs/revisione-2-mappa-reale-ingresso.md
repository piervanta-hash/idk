# Revisione 2 — mappa reale, riquadro unico, geolocalizzazione, ingresso

---

## 1. La mappa delle sedi è reale

Non è più una costa ridisegnata a mano: la geometria è **Natural Earth 1:50m**,
pubblico dominio, gli stessi contorni che usano gli atlanti. Confini di stato
inclusi.

Ma non è un servizio di mappe. Uno script (`scripts/build-map.mjs`) proietta i
paesi che entrano nell'inquadratura, ritaglia, semplifica e scrive i tracciati
in un file TypeScript. In pagina arriva **un SVG nostro e basta**: nessuna
libreria di mappe, nessuna tessera scaricata, nessuna richiesta a Google o
Mapbox. Su un sito che parla di sovranità del dato non è un dettaglio — e
tiene anche Lighthouse.

Peso: 25 KB compressi per l'intera mappa, servita dal nostro dominio. Una
singola tessera di mappa pesa di più.

Per rigenerarla con un'altra inquadratura: cambia le quattro costanti in cima
allo script e lancia `node scripts/build-map.mjs`.

---

## 2. Le sei fasi in un solo riquadro

Non si srotolano più una sotto l'altra. Scorrendo, **il disegno e il testo
cambiano insieme dentro lo stesso riquadro**: la sezione è alta sei schermate,
ma quello che si vede è sempre una scheda sola.

Sotto, i **sei trattini**: dicono a che punto si è — cyan quello corrente,
bianchi quelli già passati, grigi quelli ancora da vedere — e si clicca per
saltare a una fase qualsiasi, avanti o indietro. Accanto, il contatore
`03 / 06`.

Su mobile lo stesso riquadro, con il disegno sopra e il testo sotto.

Senza JavaScript il riquadro non potrebbe cambiare: per questo sotto c'è un
elenco completo delle sei fasi in chiaro, che compare solo quando gli script
non girano.

---

## 3. La geolocalizzazione sul territorio

L'esploso resta com'era. In fondo, un comando — *Place it on the map* — apre
una **modale** in due parti:

- a sinistra il **territorio vero**, sulla stessa mappa Natural Earth delle
  sedi, con un mirino sulla posizione e il punto in cyan;
- a destra il **dettaglio ravvicinato**: la maglia del foglio, la particella
  agganciata e il riferimento catastale appeso al suo filo.

È il salto di scala che chiude il racconto: dal paese ai pochi metri, senza
cambiare pagina. Si chiude con Esc, con il clic fuori o col comando.

La posizione è dimostrativa e la modale lo dichiara: «Record di esempio su una
posizione dimostrativa. I fondi reali vengono collocati sulle loro coordinate».

---

## 4. L'animazione d'ingresso

**Posso farla io, non serve altro.** È CSS e SVG, sta in un componente.

### Il concept che ho scelto: «Il segno scandisce»

Il marchio Paloryn **è già uno scanner planetario**: arco, braccio della
camera, tre raggi che convergono sul documento. L'ingresso non aggiunge una
metafora nuova, fa fare al segno quello che il segno raffigura.

Il marchio compare grande e spento. Una lama di luce cyan lo percorre
dall'alto in basso, e dietro la lama il segno passa da grigio a bianco — entra
a fuoco. La lama si posa come linea di base, il segno rimpicciolisce verso
l'angolo in cui vive nell'header, il velo si alza. Un secondo e mezzo.

Dalla luce che scandisce nasce il dato: è la stessa frase dell'hero, detta
prima e in un gesto solo.

### Perché non la divisione in quattro

La tua idea — il logo che si sdoppia e diventa sole, occhio, planetario e
altro — è bella da guardare, e potrei costruirla. Non l'ho scelta per due
motivi, e se non ti convincono la faccio.

**Primo:** dice che il segno significa quattro cose. Un marchio vale per
quanto una cosa sola gli si attacca addosso. Sole e occhio non sono di
Paloryn: sono di chiunque.

**Secondo:** durerebbe tre o quattro secondi. Un ingresso di quattro secondi
lo vedi due volte e la terza cerchi il tasto per saltarlo.

### La disciplina che gli ho imposto

Il brief ammette un solo momento orchestrato forte, l'hero. Questo ingresso non
ne apre un secondo: usa lo stesso vocabolario e poi si toglie di mezzo.

- **una volta per sessione**, non a ogni pagina;
- **si salta** con un tocco, un clic, un tasto o la rotella;
- **non parte affatto** se il movimento è disattivato nel sistema;
- il velo comincia a dissolversi a 0,8s per non trattenere il contenuto.

**Impatto misurato sull'LCP**: 172 ms con l'ingresso contro 148 ms senza, su
mobile in locale. Ventiquattro millisecondi: la metrica non se ne accorge.

---

## Verifiche rifatte su tutte e tre le pagine

| Pagina | Scroll orizzontale | Accento peggiore |
|---|---|---|
| `/en` desktop | nessuno | 0,16% |
| `/en` mobile | nessuno | 0,61% |
| `/en/digitization` desktop | nessuno | 0,30% |
| `/en/digitization` mobile | nessuno | 0,67% |
| `/en/anamnesis` desktop | nessuno | 0,32% |
| `/en/anamnesis` mobile | nessuno | 0,83% |

Tetto sull'accento: 5%.

---

## Resta aperto

- Le **cifre della home**: 10M+ pagine, 20+ persone, residenza dei dati in EU.
- I **quattro file delle fotografie**, da mettere in `public/img/archilives/`.
- La **formulazione di PDND, QGIS e geolocalizzazione**.
- Il **portale Interreg dei teatri** fra i casi studio in Fase 5.
- I **contenuti per gli investitori**: non esiste una riga.

---

# Aggiunta — le fotografie

## I nomi stanno dentro il riquadro

La striscia sotto ogni foto rimaneva vuota su quelle senza nome, e vuota era
brutta. Adesso il nome sta **dentro** il fotogramma, in basso a sinistra, su
una sfumatura appena percettibile che lo fa leggere anche sopra una parete
chiara. Chi non ha nome non ha niente: nessun buco.

## Impaginazione: due grandi, quattro nel carosello

A sinistra le due con il nome, grandi. A destra un carosello di quattro piu'
piccole, che si scorre col pollice o con le frecce. Il salto di scala fra le
due colonne e' il confronto che chiedevi.

Le due colonne **non hanno la stessa altezza**, e non le ho forzate: due foto
grandi impilate valgono il doppio di una fila di piccole, e pareggiarle
vorrebbe dire ritagliare via mezzo fotogramma. Restano allineate in alto, e lo
spazio che avanza a destra lo occupa la didascalia dell'evento.

## Le foto ci sono davvero

Nella pagina dell'evento che mi hai mandato c'erano **nove fotografie**, e fra
queste ci sono esattamente le due con il nome: quella tua accanto al roll-up e
quella di Linda Perrone che parla alla sala. Quindi non sono piu' segnaposto —
le ho scaricate, ridimensionate e messe nel repository.

Le altre quattro del carosello vengono dalla stessa pagina: un intervento
accanto al roll-up, una lettura, la performance musicale e due interpreti.

**La sezione e' completa e funzionante adesso.** Se preferisci mettere nel
carosello le tue due (la sala con i due relatori e il pubblico seduto),
mandami i file: si sostituiscono cambiando due righe.

### Formati e peso

`scripts/build-photos.mjs` genera AVIF, WebP e JPEG di riserva alla misura in
cui la foto compare davvero — 1400px per le due grandi, 900px per il carosello.

| | AVIF | WebP | JPEG |
|---|---|---|---|
| vantaggiato | 56 KB | 67 KB | 115 KB |
| perrone | 113 KB | 136 KB | 181 KB |
| carosello (4) | 177 KB | 207 KB | 289 KB |

Totale servito in AVIF: **346 KB**, tutto caricato pigramente perche' sta
sotto la prima schermata.

## Una cosa da confermare

Le quattro del carosello le ho prese dalla pagina del programma Interreg. Le
due con il nome sono vostre — me le hai mandate tu, e sono le stesse. Sulle
altre quattro conviene verificare a chi appartiene il credito fotografico
prima di andare online: se il fotografo va citato, si aggiunge una riga alla
didascalia.

---

# Aggiunta — Martino Castellana

## Quello che non ho potuto fare, e quello che ho fatto

La fotografia di Martino **non è fra le nove pubblicate sulla pagina
dell'evento**: le ho controllate tutte. È una foto a parte, e quella l'ho
soltanto vista — da qui non ho modo di aprirla come file, quindi non posso
ritagliarla io.

Ho fatto la cosa che serve davvero: **il taglio è deciso e scritto nello
script**. Quando metti l'originale in `photos-sorgente/martino.jpg` e lanci

    node scripts/build-photos.mjs photos-sorgente

il ritaglio si applica da solo, insieme al ridimensionamento e ai tre formati.
Non devi aprire nessun editor.

## Il taglio che ho scelto

L'originale è verticale e mal inquadrato: Martino sta nel terzo sinistro,
sotto c'è mezzo metro di pavimento vuoto e sopra una fascia di parete morta.

Il taglio prende **la fascia dall'11% al 68% dell'altezza, a tutta larghezza**,
e porta il fotogramma in orizzontale a un rapporto di 1,32 — praticamente 4:3,
coerente con le altre due. Tiene la testa a circa un sesto dall'alto, chiude
all'altezza della coscia.

Soprattutto **tiene lo schermo con il portale d'archivio**. È la cosa più
preziosa di quello scatto e nell'originale rischia di passare inosservata:
mostra il vostro prodotto in funzione, alle spalle di chi l'ha costruito. Vale
più della simmetria.

Verificato su un'immagine di prova delle stesse proporzioni: 1200×1600
verticale entra, 1200×912 orizzontale esce. Se il taglio non convince, i
quattro numeri stanno su una riga sola dello script.

## Le foto adesso appaiono da sole

Ho tolto di mezzo il meccanismo dei segnaposto. La pagina controlla in fase di
costruzione quali file esistono e **mostra solo quelli**: niente riquadri
vuoti, niente interruttori da spostare a mano. Metti il file, ricostruisci, la
foto entra. Lo togli, sparisce, e la griglia si richiude senza buchi.

In questo momento Martino è nel contenuto ma non nel markup, perché il file
non c'è. Appena arriva, si mette accanto a Pierluigi e Linda: tre ritratti con
il nome a sinistra, il carosello a destra.
