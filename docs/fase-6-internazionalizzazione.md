# Fase 6 — Bilinguismo alla pari, e la pagina Azienda

## Cosa ho fatto

### 1. Una sola tabella sa dove sta ogni pagina

Il problema del bilinguismo non è tradurre: è tenere allineate due strutture
che devono restare identiche mentre gli indirizzi divergono. Se il menu, lo
switch di lingua, la sitemap e i tag `hreflang` ognuno si ricorda gli
indirizzi per conto suo, alla prima modifica qualcosa resta indietro — e di
solito è la lingua che nessuno rilegge.

Ho messo tutti gli indirizzi in un file solo, `src/lib/routes.ts`. Da lì
leggono il menu, il piè di pagina, lo switch, la sitemap e i metadati.
Cambiare un indirizzo si fa in un punto e si propaga ovunque.

| Pagina | Inglese | Italiano |
| --- | --- | --- |
| Home | `/en` | `/it` |
| Servizio | `/en/digitization` | `/it/dematerializzazione` |
| Software | `/en/anamnesis` | `/it/anamnesis` |
| Clienti | `/en/customers` | `/it/clienti` |
| Investitori | `/en/investors` | `/it/investitori` |
| Azienda | `/en/about` | `/it/azienda` |

Gli indirizzi divergono di proposito, come deciso nel brief: in inglese
"digitization", mai "dematerialization"; in italiano resta
"dematerializzazione", che è il termine con cui la Pubblica Amministrazione
scrive i bandi e con cui la gente cerca. Le due lingue che divergono qui
sono la scelta giusta, non una svista.

### 2. Il tag della lingua è corretto davvero

`<html lang="it">` sulle pagine italiane e `lang="en"` su quelle inglesi non
è un dettaglio da spuntare: è quello che dice al lettore di schermo con che
pronuncia leggere la pagina. Un lettore di schermo che legge l'italiano con
la fonetica inglese è incomprensibile.

In Next il tag `<html>` sta nel layout radice, che di suo non sa in che
lingua siamo. Ho quindi diviso il sito in due gruppi di rotte, `(en)` e
`(it)`, ognuno con il proprio layout radice; i caratteri, l'animazione di
ingresso e l'impalcatura comune stanno in un unico componente condiviso
(`RootShell`), quindi non c'è nessuna duplicazione e i font non vengono
scaricati due volte.

### 3. Lo switch porta alla stessa pagina, non alla home

Errore classico dei siti bilingui: sei su "Clienti", premi EN e ti ritrovi
sulla home inglese, con il tuo posto perso. Qui lo switch conosce la pagina
su cui sei e va alla sua controparte: da `/it/clienti` porta a
`/en/customers`, da `/en/digitization` a `/it/dematerializzazione`.

Lo switch scrive anche un cookie (`paloryn-lang`) che ricorda la scelta.

### 4. Chi arriva sulla radice viene indirizzato, non indovinato

Chi apre `paloryn.com` viene mandato a `/en` o `/it` secondo questa scala,
in ordine di autorità:

1. il cookie, se ha già scelto una lingua sul sito;
2. la lingua del browser (`Accept-Language`, ordinata per preferenza);
3. l'inglese, che è la lingua predefinita.

Verificato: browser italiano → `/it`; browser francese → `/en` (non
abbiamo il francese, quindi vale il predefinito); cookie italiano su
browser americano → `/it`, perché la scelta esplicita dell'utente batte
l'impostazione del sistema.

### 5. Metadati e hreflang completi in entrambe le lingue

Ogni pagina dichiara il proprio indirizzo canonico e le due alternative di
lingua, più `x-default` che punta all'inglese. È il modo con cui si dice ai
motori di ricerca "queste due pagine sono la stessa cosa in due lingue,
non contenuto duplicato, e all'italiano servi la versione italiana".

Verificato su `/it/dematerializzazione`:

```
canonical  https://paloryn.com/it/dematerializzazione
en         https://paloryn.com/en/digitization
it         https://paloryn.com/it/dematerializzazione
x-default  https://paloryn.com/en/digitization
```

Sitemap e `robots.txt` sono generati dalla stessa tabella; la pagina di
servizio `/styleguide` è esclusa dall'indicizzazione.

### 6. La pagina Azienda

Quattro sezioni, nessuna delle quali inventa niente.

**Credenziali.** Quattro voci verificabili, prese da quello che l'azienda
fa già: archivi comunali nel programma regionale FESR-FSE+ 2021-2027,
volumi antichi di biblioteca sotto decreto ministeriale con riprese in
sede, il portale documentale dei teatri Interreg Grecia-Italia, e
l'interlocuzione ordinaria con la Soprintendenza Archivistica. Nessun
numero di enti serviti, nessun conteggio di clienti: il brief lo vieta.

**Persone.** Tre nomi: Pierluigi Vantaggiato (Co-Founder), Martino
Castellana (CTO), Linda Perrone (archivista senior), con la riga "oltre
venti fra archivisti, ingegneri e sviluppatori" che dà la dimensione senza
esporre un organico preciso.

**Certificazioni.** ISO 9001, ISO/IEC 27001, 27017, 27018, con l'ambito di
ciascuna. Sono quelle già dichiarate nel piè di pagina del sito attuale.

**Contatti.** Il modulo chiede cinque cose e lo dice: "cinque risposte
bastano a stabilire se l'intervento è praticabile e con quale ordine di
grandezza. In caso negativo, lo diciamo subito". Il primo campo è il
selettore del profilo — Ente pubblico / Istituzione culturale / Impresa —
perché la doppia matrice del brief deve restare leggibile fino all'ultimo
schermo del sito, non solo in home.

### 7. Un dettaglio di allineamento

Nella griglia delle persone, Martino non ha ancora una fotografia sul
server. Con le celle allineate in alto, le due foto stavano in cima e il
suo nome galleggiava da solo a mezz'aria: sembrava un errore di
caricamento. Ho spinto nome e ruolo in fondo alla cella, così i tre nomi
sono allineati fra loro e lo spazio vuoto sopra Martino si legge come una
scelta grafica invece che come un buco. Quando arriva la sua foto entra da
sola, senza toccare il codice.

## Cosa manca

- **Le pagine legali** (privacy, cookie, accessibilità) sono collegate nel
  piè di pagina in entrambe le lingue ma non sono ancora scritte. I testi
  legali non li invento: mi servono i vostri.
- **La foto di Martino**: basta metterla in `photos-sorgente/` e rilanciare
  lo script, il taglio è già configurato.
- **I moduli non inviano ancora niente.** Sia il contatto sia la richiesta
  investitori raccolgono i dati ma non hanno una destinazione. Fa parte
  della Fase 7, insieme alla protezione anti-abuso.
- **I loghi dei clienti** per la pagina Clienti.

## Cosa devi decidere tu

1. **Dove devono arrivare i moduli.** Una casella email va benissimo
   (`info@paloryn.com`?), oppure un servizio dedicato se ne usate uno.
   Serve prima della Fase 7.
2. **I testi legali.** Me li passate voi o volete che prepari una bozza da
   far rivedere a un legale? Non pubblico testi legali scritti da me senza
   che qualcuno li validi.
3. **La foto di Linda Perrone.** Quella che ho è lo scatto largo della
   sala: si vede il pubblico e lei è piccola in fondo. Come ritratto
   funziona poco. Ritagliarla non aiuta, la risoluzione non regge. Se
   avete uno scatto più ravvicinato lo sostituisco; altrimenti la lascio
   così, che è comunque una foto vera dell'evento vero.
4. **Restano aperte dalle fasi precedenti**: le etichette dei pulsanti in
   maiuscoletto monospaziato, la variante del logo a tratto sottile sotto
   i 20px, e il titolo della home "Data, extracted from paper."

## Verifiche fatte

- Tutte e 12 le rotte rispondono 200, più sitemap e robots.
- `/en` dichiara `lang="en"`, `/it` dichiara `lang="it"`.
- hreflang corretto e completo, controllato pagina per pagina.
- Lo switch di lingua porta alla controparte, non alla home.
- Reindirizzamento della radice: cookie > browser > inglese.
- Nessuno scorrimento orizzontale su 9 combinazioni pagina/schermo
  (1440px e 390px).
- Accento ciano fra lo 0,16% e lo 0,98% della superficie, contro un tetto
  del 5%. Misurato contando i pixel, non a occhio.
- Controllo dei tipi TypeScript pulito, compilazione di produzione
  completata.
