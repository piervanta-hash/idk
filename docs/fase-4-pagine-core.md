# Paloryn — Fase 4: Digitization e Anamnesis

**Stato:** consegnate, in attesa di OK per la Fase 5.
**Dove guardare:** `/en/digitization` e `/en/anamnesis`.

---

## Decisioni applicate

| Domanda | Risposta | Come si vede in pagina |
|---|---|---|
| Iter | sei fasi, con la ricognizione | Titolo di sezione: «Six phases. None of them optional.» seguito da «The first is the one operators in this field skip most often.» |
| App IO | esiste come le altre, con PDND, QGIS e la geolocalizzazione delle particelle | Schema di interoperabilità a sei collegamenti, più una sezione dedicata all'esploso di mappa |
| Immagini | genera quella di laboratorio | Vedi il paragrafo qui sotto: non ho potuto |
| Nomi dei committenti | tutti quelli del brief | Già in home, restano |

---

## Le tre animazioni chieste dal brief

**1. Estrazione del dato** (`/en/anamnesis`, sezione 01). Una pagina di
documento sotto scansione: la linea cyan la percorre, quattro campi si
accendono dentro un riquadro sottile, e da ciascuno parte un collegamento che
porta il valore in una tabella strutturata con il suo indice di affidabilità.
Su mobile è verticale: documento sopra, record che si compone sotto.

**3. Iter di digitalizzazione** (`/en/digitization`, sezione 01). Le sei fasi
come sequenza connessa: una guida verticale corre lungo l'elenco e si riempie
di cyan man mano che si scende, così si vede sempre a che punto del processo si
è. Su mobile diventa un accordion, una fase aperta per volta.

**4. Schema di interoperabilità** (`/en/anamnesis`, sezione 02). Cittadino →
ente → Anamnesis, e da lì un fascio di connessioni verso PDND, pagoPA,
SPID/CIE, App IO, i portali dell'ente e GIS/QGIS, percorse da impulsi
sfalsati. Selezionando un collegamento la sua linea si accende e sotto compare
la riga che lo spiega.

**In più:** l'esploso di mappa per la geolocalizzazione delle particelle, con
tre livelli in prospettiva isometrica — foglio, particelle, record estratto — e
il riferimento catastale agganciato a una particella con un filo tratteggiato.
Non era fra le quattro animazioni del brief, ma è la cosa più distintiva che mi
hai raccontato e meritava il suo spazio.

Tutte hanno uno stato statico completo. L'estrazione, ferma, mostra lo schema
intero con tutti i riquadri, tutti i collegamenti e tutti i valori:
l'animazione toglie, non aggiunge. Chi ha disattivato il movimento o naviga
senza JavaScript non perde una sola informazione.

---

## L'immagine di laboratorio: non ho potuto generarla

Avevi scelto di farmela generare. **In questo ambiente non ho strumenti di
generazione di immagini** — posso scrivere codice e disegnare vettoriali, non
produrre fotografie. Te lo dico subito invece di consegnarti un segnaposto
silenzioso.

Cosa ho fatto al suo posto: uno **schema disegnato** del laboratorio nello
stesso linguaggio di linee del sito — scaffalature cariche di faldoni che
rientrano in profondità, scanner planetario con braccio della camera, culla a
supporto regolabile, cono di luce fredda sul documento aperto. È onesto: si
vede che è un disegno, quindi non finge di essere una foto.

Il riquadro è in 16:9, le proporzioni esatte del prompt. In
`docs/prompt-immagine-laboratorio.md` trovi il prompt pronto e le due righe da
cambiare per sostituirlo. Dieci minuti di lavoro quando hai il file.

---

## Verifiche fatte

| Verifica | Digitization | Anamnesis |
|---|---|---|
| Scroll orizzontale a 390 | nessuno | nessuno |
| Scroll orizzontale a 1440 | nessuno | nessuno |
| Accento, schermata peggiore desktop | 0,31% | 0,38% |
| Accento, schermata peggiore mobile | 0,69% | 1,22% |
| Costruzione | statica, senza errori | statica, senza errori |

Il tetto è il 5%: siamo a un quarto della soglia anche nel punto peggiore.
La misura è un conteggio dei pixel cyan schermata per schermata, non una stima.

---

## L'italiano c'è già

Tutto il testo delle due pagine è scritto in inglese **e** in italiano, in
`src/content/digitization.ts` e `src/content/anamnesis.ts`. La Fase 4 pubblica
solo l'inglese, come le precedenti; la Fase 6 collega le rotte italiane senza
riscrivere una riga.

Da notare una divergenza voluta fra le due lingue, come stabilito nel brief:
in inglese il servizio si chiama **Digitization**, in italiano resta
**Dematerializzazione**, che è il termine con cui la PA cerca e appalta.

---

## Cosa devi rileggere

- **F4.1 — La formulazione di PDND, QGIS e geolocalizzazione.** Questi tre
  elementi me li hai dati a voce e li ho formulati io. Ho scritto: PDND come
  «e-service pubblicati e fruiti attraverso lo strato nazionale di
  interoperabilità»; QGIS come «riferimenti catastali restituiti come livelli
  georeferenziati, apribili in QGIS»; l'esploso di mappa come strumento per
  risolvere un'istanza «indicando il terreno invece di leggere un registro».
  Rileggile: se l'integrazione funziona diversamente, cambio il testo.
- **F4.2 — I dati di esempio dell'estrazione.** Ho usato protocollo 1962/4471,
  via Manzoni 14, concessione edilizia 1962, foglio 12 particella 417 —
  ripresi dalla dimostrazione già presente sul sito attuale. La didascalia
  dichiara che sono dati di esempio, come fa il sito oggi. Confermi?
- **F4.3 — «300 DPI, master TIFF»** compare sulla pagina di servizio. Nel
  brief hai chiesto di tenere i dettagli tecnici fuori dalle metriche di home,
  ma di metterli nell'iter: l'ho fatto così. Se non li vuoi neanche lì, si
  tolgono.

---

## Cosa manca ancora

- Le pagine **Customers** e **Investors** (Fase 5).
- I contenuti per gli investitori: tesi, modello, trazione, pipeline,
  governance. Non esiste una riga e non la invento.
- Il **portale Interreg Italia-Grecia** dei teatri: sta sul sito attuale, non è
  nel tuo elenco di casi studio, ed è probabilmente la prova migliore che avete
  della parte software. Lo teniamo in Fase 5?
- Le **cifre della home** restano da confermare tutte.

---

## Prossimo passo

Fase 5 — Customers e Investors, con il filtro a due stati PA/Privati sulla
griglia dei casi e l'area investitori in registro istituzionale. Copy in
inglese e in italiano.
