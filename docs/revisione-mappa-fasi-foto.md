# Revisione — mappa, sei fasi, fotografie

Modifiche chieste dopo la Fase 4, applicate su home e pagina Digitization.

---

## 1. Fotografie dell'evento

**Titolo usato in didascalia**, una riga:

> ARCHILIVES info day, Cantieri Teatrali Koreja, Lecce — Interreg VI-A Greece-Italy 2021-2027

In italiano: «Info day ARCHILIVES, Cantieri Teatrali Koreja, Lecce — Interreg
VI-A Grecia-Italia 2021-2027».

**Attribuzioni in piccolo**, sotto le due foto giuste:

- foto 1 — Pierluigi Vantaggiato · Co-Founder
- foto 3 — Linda Perrone · Senior archivist

Alessandro Cosma non compare: l'articolo lo cita ma non era presente.

**Trattamento**, come da brief: dentro un riquadro, mai a pieno formato,
desaturate all'85% con un filo di contrasto in più perché convivano con la
palette. Il colore torna al passaggio del mouse — non decora, dice che la
fotografia è vera.

### Quello che non ho potuto fare

**I quattro file non sono nel repository.** Da questa sessione non posso
scrivere immagini su disco: le vedo, ma non ho modo di salvarle. Il componente
è pronto e completo, mostra un riquadro dimensionato al posto di ogni foto.

Per attivarle:

1. Metti i quattro file in `public/img/archilives/` come `01.jpg` … `04.jpg`
   (l'ordine è quello in cui me li hai mandati). Vedi `LEGGIMI.txt` nella
   cartella.
2. In `src/content/home.ts`, porta `photos.available` a `true` — in entrambe
   le lingue.

Nient'altro. Didascalia, attribuzioni, testo alternativo e trattamento sono già
al loro posto.

---

## 2. Albania e sedi previste

**Tolta dalle metriche.** La voce «2 paesi operativi — Italia · Albania» non
c'è più: le misure in home sono quattro, non cinque. Restano pagine, persone,
residenza dei dati e certificazioni ISO.

**Sulla mappa, e solo lì.** Aggiunte Roma, Nizza e Zagabria come sedi previste:
cerchietti vuoti di 3,5 pixel, grigi, con etichetta *Planned*. Le rotte verso
di loro sono tratteggiate — una linea che non esiste ancora. Nessun'altra parte
del sito le nomina.

**Tre livelli, dichiarati.** Sotto la mappa ora c'è una legenda: sede piena e
pulsante, sede operativa a bordo tratteggiato, sede prevista a cerchio vuoto.
Senza legenda la distinzione sarebbe solo grafica, e il vincolo di verità del
brief chiede che si legga.

**Copy cambiato di conseguenza.** «Due sponde, una sola operazione» non regge
più su una mappa che arriva a Nizza: adesso è «Si governa da Lecce», e il testo
parla solo della sede.

**La mappa è stata ridisegnata.** Inquadratura da 6,2° a 21,0° di longitudine e
da 38,8° a 46,6° di latitudine. La costa è una sola linea continua che parte
dalla Costa Azzurra, scende il Tirreno, gira intorno alla Calabria, risale lo
Ionio e il Salento, percorre l'Adriatico fino a Trieste e ridiscende la sponda
dalmata fino all'Albania — perché è davvero una linea sola. Costruita da
trentacinque coordinate di città reali raccordate da una curva che ci passa
dentro (`src/lib/path.ts`), senza riempimenti: solo linea, come una carta
nautica.

Il primo tentativo, a poligoni chiusi con l'arco alpino, produceva una macchia
informe. È stato buttato.

---

## 3. Le sei fasi

Ripreso il comportamento del sito attuale: **un pannello disegnato che resta
fermo a sinistra e cambia figura** man mano che si scende da una fase alla
successiva. Sotto il pannello, il nome della fase, il contatore `04 / 06` e una
guida che si riempie.

Sei disegni nuovi, uno per fase, nella palette nuova — linee grigie e **un solo
elemento in cyan per disegno**, quello che nella fase è vivo:

| Fase | Disegno | L'elemento vivo |
|---|---|---|
| 01 Ricognizione | scaffalature in alzato con il metro sotto | la misura |
| 02 Riordino | griglia di unità con la linguetta | la scheda in lavorazione |
| 03 Ripresa | scanner planetario, culla, target | il cono di luce fredda |
| 04 Estrazione | pagina con i campi riquadrati | le barre di affidabilità |
| 05 Conservazione | pacchetto di versamento | il sigillo qualificato |
| 06 Pubblicazione | ricerca e risultati | il risultato sulla mappa |

Su mobile il pannello non può restare fermo: ogni fase porta il proprio disegno
in piccolo accanto al titolo, sempre visibile anche a pannello chiuso, e il
testo si apre al tocco.

---

## Verifiche rifatte dopo le modifiche

| | Home | Digitization | Anamnesis |
|---|---|---|---|
| Scroll orizzontale 390 | nessuno | nessuno | nessuno |
| Scroll orizzontale 1440 | nessuno | nessuno | nessuno |
| Accento, peggiore desktop | 0,12% | 0,27% | 0,38% |
| Accento, peggiore mobile | 0,38% | 0,69% | 1,22% |

Tetto: 5%.

Un difetto trovato e corretto: nella griglia delle fotografie un elemento
occupava due colonne su quattro e mandava a capo le altre celle. Tutte e
quattro le foto hanno ora lo stesso formato.

---

## Resta da decidere

- **Le cifre della home**: 10M+ pagine, 20+ persone, residenza dei dati in EU.
  Nessuna è confermata.
- **Il titolo dell'hero**: «Data, extracted from paper.»
- **La formulazione di PDND, QGIS e geolocalizzazione** sulla pagina Anamnesis.
- **Il portale Interreg Italia-Grecia dei teatri**: lo mettiamo fra i casi
  studio in Fase 5? Adesso che le fotografie dell'info day sono in home, il
  progetto è già presente nel sito senza essere raccontato.
