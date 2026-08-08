# Paloryn — Fase 5: Customers e Investors

**Stato:** consegnate, in attesa di OK per la Fase 6.
**Dove guardare:** `/en/customers` e `/en/investors`.

---

## Decisioni applicate

| Domanda | Risposta | Effetto |
|---|---|---|
| Area investitori | solo contatto riservato, niente contenuti finanziari | Nessuna tesi, nessuna trazione, nessuna pipeline in pagina |
| Portale Interreg dei teatri | sì, come caso software | È il caso 02, con il tag «Software, sviluppato internamente» |
| Le tre cifre della home | confermate tutte e tre | Tolte le note «da confermare» dal contenuto |
| Animazione d'ingresso | tieni «il segno scandisce» | Resta com'è |

---

## Customers

Cinque casi in griglia, con il filtro a due stati più «Tutti» in cima e il
contatore `02 / 05` che dice quanti se ne stanno vedendo.

| | Caso | Settore | Cosa prova |
|---|---|---|---|
| 01 | Koreja | Privati | Primo progetto realizzato |
| 02 | **ARCHILIVES** | Privati | **La parte software: progettazione e sviluppo interni** |
| 03 | Comune di Galatina | PA | Archivio edilizio su fondi FESR-FSE+ |
| 04 | Squinzano, Avetrana, Torricella | PA | Forma associata |
| 05 | Biblioteca Innocenziana | Privati | Patrimonio vincolato, ripresa senza movimentazione |

In fondo, Maglie e Otranto a referenza, con la nota che altri incarichi sono
coperti da riservatezza.

**Il dettaglio si apre in una scheda sovrapposta** con committente, ambito,
volumi, tecnologie, esito e programma di finanziamento — i campi chiesti dal
brief.

**Dove il volume non c'è, il campo dice «non pubblicati»** invece di sparire.
Il brief dà i volumi solo per la Innocenziana (~2.750 pagine, 210 tavole, 7
volumi): per gli altri quattro non ho cifre e non le invento. Una casella
onesta vale più di un numero tondo.

**Nessun importo contrattuale**, da nessuna parte. Il budget del programma
ARCHILIVES è pubblico e sta scritto sul roll-up nelle vostre fotografie, ma la
regola del brief è chiara e vale anche quando la cifra è già pubblica.

---

## Investors

Registro istituzionale, quattro sezioni, **nessuna informazione finanziaria**.

1. **Profilo** — che cos'è l'azienda: attività, mercati, infrastruttura, sede.
   Solo fatti già pubblicati altrove sul sito.
2. **Governance e certificazioni** — le quattro ISO con il loro perimetro, più
   l'interlocuzione continuativa con la Soprintendenza.
3. **Materiali disponibili su richiesta** — cinque voci elencate, fornite sotto
   impegno di riservatezza a controparti identificate.
4. **Contatto riservato** — `investors@paloryn.com`, letto dai fondatori, più
   un modulo con organizzazione, nome, email e che cosa si vuole vedere.

La prima riga della pagina lo dice senza giri: *«Questa pagina non contiene
informazioni finanziarie. Cifre, trazione e pipeline vengono condivise
direttamente, sotto riservatezza.»* È la versione più corta possibile ed è
anche la più difficile da attaccare.

Il modulo non è ancora collegato a niente: l'invio si costruisce in Fase 7,
insieme alla verifica anti-abuso.

---

## Difetti trovati e corretti

| Difetto | Perché era un problema | Correzione |
|---|---|---|
| Sesta cella vuota della griglia | Con cinque casi su tre colonne restava un rettangolo grigio in mezzo alla pagina | Bordo su ogni cella con margini negativi, invece del fondo a griglia |
| Sezione «Marks» | Diceva «file dei loghi da fornire» su una pagina pubblica: è una nota di lavorazione, non contenuto | Tolta dalla pagina, la regola resta qui sotto |

### La regola sui marchi dei committenti, per quando arriveranno i file

I marchi vanno resi **in bianco o grigio su nero**, mai nel loro colore: la
palette non si spezza per un logo. Gli stemmi comunali si usano **monocromi e
contenuti**, con il nome dell'ente per esteso accanto. L'uso dei marchi Koreja
e della Curia Arcivescovile di Lecce è autorizzato; per gli altri va verificato.

La striscia dei loghi entra nella pagina quando arrivano i file vettoriali.

---

## Verifiche

| Pagina | Scroll orizzontale 390 | Scroll orizzontale 1440 |
|---|---|---|
| `/en/customers` | nessuno | nessuno |
| `/en/investors` | nessuno | nessuno |

Costruzione statica senza errori. Con queste due pagine **le cinque voci di
menu portano tutte a una pagina vera**: restano da collegare solo le rotte
italiane, che è la Fase 6.

---

## Cosa manca

- **`/en/about`**: l'ultima pagina, non prevista da una fase a sé. Va fatta
  prima del collaudo — azienda, certificazioni, contatti — recuperando il
  form a tre profili del sito attuale, che funziona bene.
- **I file dei loghi** dei committenti.
- **Le rotte italiane**: tutto il testo è già scritto in italiano, va collegato.

---

## Prossimo passo

Fase 6 — internazionalizzazione: switch persistente, hreflang, sitemap, meta e
redirect di lingua. I testi italiani esistono da tre fasi, qui si costruisce
solo l'impianto.
