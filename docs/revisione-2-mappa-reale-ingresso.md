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
