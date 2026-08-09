# Paloryn — Fase 2: Design system

**Stato:** consegnato, in attesa di OK per la Fase 3.
**Regola rispettata:** nessuna pagina reale del sito. Solo token, tipografia,
griglia e componenti, in una pagina di stile isolata.

---

## Decisioni prese in Fase 1 e applicate qui

| | |
|---|---|
| Marchio | Paloryn, nome unico. Nell'header solo il segno, senza il nome scritto |
| Footer | titolarita' «© Cosma Alessandro», come indicato |
| Codice | ricostruito da zero: Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript |
| Signature element | proposta A — «Il metro lineare». Si costruisce in Fase 3 |
| Marchio | il segno gia' in uso accanto alla scritta Dematerializzare, ripreso alla geometria originale |
| Albania | sede operativa. Il nodo sulla mappa si etichetta come tale, non come espansione futura |

---

## Cosa contiene questa fase

**Dove guardare:** `/styleguide`. Non e' indicizzata (`robots: noindex`) e non e'
collegata da nessuna parte. La home (`/`) e' un segnaposto che rimanda li'.

```
src/app/globals.css              i token, con il compito di ognuno a fianco
src/app/layout.tsx               i tre caratteri, serviti dal nostro dominio
src/app/styleguide/page.tsx      la pagina di stile (11 blocchi)
src/components/brand/Logo.tsx    il marchio, nelle due letture possibili
src/components/ui/               bottoni, card, tabelle, form, metriche
src/components/layout/           header e footer
```

### Token

Otto valori di grigio piu' l'accento, ognuno con un solo mestiere dichiarato nel
CSS. Chi lavorera' sul codice dopo di noi legge il compito accanto al valore, non
deve indovinarlo.

Il contrasto di ciascuno e' misurato sul fondo nero e scritto nella pagina di stile.
La conseguenza pratica: `#707070` sta a 3,99:1, sotto la soglia AA, quindi non
regge i paragrafi — il testo corrente parte da `#A0A0A0`.

### Tipografia

Sora, Archivo e IBM Plex Mono scaricati in fase di build e serviti dal nostro
dominio: zero richieste a Google, zero salto di layout al caricamento. Undici
gradi di scala, tutti fluidi fra 390px e 1440px di viewport.

La decisione non ovvia, applicata: **le cifre grandi delle metriche stanno in
IBM Plex Mono**, non nel carattere display.

### Componenti

Bottoni (3 varianti, 2 misure, minimo 48px di altezza), card, tabella dati, campi
di form, filtro a due stati PA/Privati, metriche, indice di affidabilita', header
con menu mobile a tutto schermo, footer.

**Il marchio** e' il segno esistente, non una ricostruzione: le coordinate sono
quelle di `icon.svg` del sito attuale, verificate sovrapponendo il risultato
all'originale. Cambia solo il colore, che non e' piu' fissato nel file ma
ereditato dal testo, cosi' lo stesso componente serve il bianco su nero e la
tessera. La favicon e' generata dallo stesso segno.

Una scelta da confermare: **le etichette dei bottoni in mono maiuscolo**. Un
bottone e' un comando, non uno slogan. E' una scelta di registro: si torna ad
Archivo in dieci minuti se non convince.

---

## Difetti trovati e corretti durante la fase

Sono elencati perche' sono il tipo di cosa che, non vista adesso, riemerge in
Fase 7 come problema di accessibilita' o di layout.

| Difetto | Effetto | Correzione |
|---|---|---|
| L'etichetta mono forzava `display: block` | Le intestazioni di tabella si impilavano una sotto l'altra | Nessun `display` dichiarato nell'utility |
| La sfocatura stava sull'`header` | `backdrop-filter` diventa il blocco contenitore dei figli `fixed`: l'overlay del menu mobile collassava dentro la barra e risultava trasparente | La sfocatura e' passata a un `div` interno |
| Barra dell'indice di affidabilita' a 1px | Si confondeva con le hairline di separazione | Portata a 2px |
| Tessera del marchio, lettura B | Il colore inline rompeva la maschera: usciva un quadrato pieno senza segno | Il colore e' imposto dal gruppo che contiene il glifo |
| «Chiudi» del menu mobile | Due linee sovrapposte formavano un trattino, non una croce | Le linee ruotano di ±45° |
| Filtro a due stati | Dentro un contenitore flex in colonna veniva stirato a tutta larghezza | `w-fit` sul componente |

---

## Verifiche gia' passate

- **Nessuno scroll orizzontale** a 390px e a 1440px, misurato via browser
  (`scrollWidth === clientWidth`).
- **Contrasto**: testo corrente 7,6:1, testo forte 15,7:1, accento su nero 9,1:1.
- **Focus da tastiera** visibile su ogni controllo, in cyan a 2px con 2px di stacco.
- **`prefers-reduced-motion`** rispettato a livello di foglio di stile globale.
- **Build** senza errori, tutte le pagine pre-renderizzate staticamente.

Non e' ancora stato fatto l'audit Lighthouse: si fa in Fase 7, su pagine vere.

---

## Cosa manca / cosa devi decidere

**Da questa fase**

- **F2.1 — Etichette dei bottoni in mono maiuscolo:** confermi il registro?
- **F2.2 — Il marchio sotto i 20px** si salda in una macchia. Se serve leggibilita'
  a 16px va assottigliato il tratto in una variante dedicata alle dimensioni
  piccole. Da decidere, non urgente.

**Ancora aperte dalla Fase 1** (nessuna blocca la Fase 3)

D5 fotografie · D6 nomi dei clienti · D7 iter a 5 o 6 fasi · D8 conferma delle
cinque cifre · D9 App IO · D10 portale Interreg · D12 contenuti investitori.

Su D8 resta una cosa da sciogliere prima di pubblicare: il sito attuale ripete su
ogni pagina che «i dati restano in Italia», il brief chiede di dichiarare «dati
conservati in Europa». In Fase 3 uso la formula del brief, che le comprende
entrambe, ma la cifra va confermata come tutte le altre.

---

## Prossimo passo

Fase 3 — la home in inglese, desktop e mobile: hero con il metro lineare, la doppia
matrice offerte × mercati, la mappa operativa Lecce-Albania con il nodo albanese
etichettato come sede operativa, le metriche, la prova sociale, la CTA.
