import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Logo } from "@/components/brand/Logo";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { DataTable } from "@/components/ui/DataTable";
import { Metric, Confidence } from "@/components/ui/Metric";
import { TextField, TextArea, SelectField } from "@/components/ui/Field";
import { Rule, SectionHead } from "@/components/ui/Rule";
import { SegmentedDemo } from "./SegmentedDemo";

export const metadata: Metadata = {
  title: "Paloryn — Design system (Fase 2)",
  robots: { index: false, follow: false },
};

/* ==========================================================================
   PAGINA DI STILE — FASE 2
   Pagina isolata, non indicizzata, non collegata al sito. Serve solo a
   vedere i token e i componenti tutti insieme prima di costruire le pagine
   vere. Le spiegazioni sono in italiano perche' e' un documento interno.
   ========================================================================== */

const GREYS = [
  { token: "bg", hex: "#0A0A0A", job: "fondo della pagina, sempre e ovunque", ratio: "—" },
  { token: "surface-1", hex: "#141414", job: "fondo di sezione alternata", ratio: "—" },
  { token: "surface-2", hex: "#1F1F1F", job: "card, riga di tabella alternata", ratio: "—" },
  { token: "line", hex: "#3A3A3A", job: "hairline e bordi, sempre 1px", ratio: "1,9:1" },
  { token: "mute", hex: "#707070", job: "etichette mono, stati disattivi", ratio: "3,99:1" },
  { token: "copy", hex: "#A0A0A0", job: "testo corrente", ratio: "7,6:1" },
  { token: "strong", hex: "#E5E5E5", job: "titoli non display, dati in tabella", ratio: "15,7:1" },
  { token: "max", hex: "#FFFFFF", job: "display, cifre delle metriche, stato attivo", ratio: "18,9:1" },
];

const TYPE = [
  { token: "D1", font: "Sora 700", size: "56 → 96", track: "−0,03em", use: "titolo dell'hero, uno per pagina" },
  { token: "D2", font: "Sora 700", size: "40 → 64", track: "−0,025em", use: "apertura di sezione" },
  { token: "D3", font: "Sora 600", size: "28 → 40", track: "−0,02em", use: "titolo di blocco" },
  { token: "H4", font: "Sora 600", size: "22 → 26", track: "−0,01em", use: "titolo di card" },
  { token: "H5", font: "Sora 600", size: "18 → 20", track: "−0,005em", use: "sottotitolo" },
  { token: "Body L", font: "Archivo 400", size: "18 → 20", track: "0", use: "primo paragrafo" },
  { token: "Body", font: "Archivo 400", size: "16 → 17", track: "0", use: "testo corrente" },
  { token: "Small", font: "Archivo 400", size: "14", track: "0", use: "didascalie, note" },
  { token: "Label", font: "Plex Mono 400", size: "11 → 12", track: "+0,12em", use: "etichette di sezione" },
  { token: "Data", font: "Plex Mono 400", size: "13 → 14", track: "0", use: "valori, tag, bottoni" },
  { token: "Metric", font: "Plex Mono 400", size: "40 → 72", track: "−0,01em", use: "cifre delle metriche" },
];

function Block({
  n,
  title,
  note,
  children,
}: {
  n: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24 py-16 md:py-24" id={`b${n}`}>
      <SectionHead eyebrow={`${n} · ${title}`} aside="Fase 2" intro={note} />
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div lang="it">
      <Header />

      <main className="shell">
        {/* Intestazione della pagina di stile */}
        <div className="border-b border-line py-20 md:py-28">
          <span className="eyebrow">Paloryn · design system · fase 2</span>
          <h1 className="mt-8 text-d2 font-display font-bold text-max">
            Token, tipografia, griglia e componenti di base.
          </h1>
          <p className="measure-wide mt-8 text-body-l text-copy">
            Pagina isolata: non e&apos;{" "}
            <strong className="font-medium text-strong">nessuna pagina reale</strong> del
            sito, serve solo a vedere il sistema tutto insieme prima di costruire la home.
            La regola che tiene insieme tutto: <em>ogni token ha un solo compito</em>, e un
            token usato per due compiti diversi e&apos; un errore da correggere, non una
            variante.
          </p>
        </div>

        {/* ---------------------------------------------------------------- */}
        <Block
          n="01"
          title="Colore"
          note="Tre colori ufficiali e cinque grigi derivati. Accanto a ciascuno c'e' il suo unico mestiere e il contrasto misurato sul fondo nero."
        >
          <div className="grid gap-px bg-line md:grid-cols-2">
            {GREYS.map((g) => (
              <div key={g.token} className="flex items-center gap-6 bg-bg p-6">
                <div
                  className="h-16 w-16 shrink-0 border border-line"
                  style={{ background: g.hex }}
                />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="font-mono text-data text-max">{g.token}</span>
                    <span className="font-mono text-data text-mute tabular">{g.hex}</span>
                  </div>
                  <p className="mt-1 text-small text-copy">{g.job}</p>
                  <span className="mt-1 block font-mono text-data text-mute tabular">
                    contrasto {g.ratio}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-line p-6 md:p-8">
            <span className="eyebrow">Regola che ne discende</span>
            <p className="measure-wide mt-4 text-body text-copy">
              <span className="font-mono text-data text-max">mute #707070</span> sta a{" "}
              <strong className="font-medium text-strong">3,99:1</strong> sul nero, sotto
              la soglia AA di 4,5:1. Non e&apos; utilizzabile per i paragrafi: va bene per
              etichette, bordi e stati disattivi. Il testo corrente parte da{" "}
              <span className="font-mono text-data text-max">copy #A0A0A0</span>. Questo
              chiude in partenza meta&apos; dei problemi di accessibilita&apos; che
              emergerebbero in Fase 7.
            </p>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          n="02"
          title="Accento"
          note="Un solo accento, nessuna variante: per attenuarlo si usa l'opacita', mai un secondo cyan."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="border border-line">
              {/* Il campione resta piccolo di proposito: anche la pagina che
                  documenta l'accento sta sotto il tetto del 5%. */}
              <div className="p-6">
                <div className="h-16 w-16 border border-line" style={{ background: "#00C2D1" }} />
              </div>
              <div className="border-t border-line p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-data text-max">accent</span>
                  <span className="font-mono text-data text-mute">#00C2D1</span>
                </div>
                <ul className="mt-4 space-y-2 text-small text-copy">
                  <li>
                    <span className="font-mono text-strong">9,1:1</span> su fondo nero —
                    utilizzabile anche per testo piccolo
                  </li>
                  <li>
                    <span className="font-mono text-strong">2,2:1</span> su fondo bianco —
                    mai come testo, solo riempimento o hairline
                  </li>
                </ul>
              </div>
            </div>

            <div className="border border-line p-6">
              <span className="eyebrow">Dove e&apos; ammesso</span>
              <ul className="mt-4 space-y-3 text-small text-copy">
                <li className="flex gap-3">
                  <span className="text-accent">&bull;</span> focus da tastiera (obbligatorio)
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">&bull;</span> stato attivo di un controllo
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">&bull;</span> linee di flusso in movimento
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">&bull;</span> indice di affidabilita&apos; del dato
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">&bull;</span> contatori mentre salgono
                </li>
                <li className="flex gap-3">
                  <span className="text-accent">&bull;</span> nodo primario della mappa operativa
                </li>
              </ul>
              <span className="eyebrow mt-8 block">Dove non lo e&apos;</span>
              <p className="mt-4 text-small text-mute">
                titoli · fondi ampi · logo · testo corrente · testo su bianco. Tetto
                complessivo: 5% della superficie di ogni schermata, verificato in Fase 7.
              </p>
            </div>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          n="03"
          title="Tipografia"
          note="Tre caratteri, tre mestieri. Sora per i titoli, Archivo per il testo, IBM Plex Mono per tutto cio' che e' misura o etichetta."
        >
          <div className="space-y-10">
            <Specimen token="D1" cls="text-d1 font-display font-bold text-max">
              From paper to data
            </Specimen>
            <Specimen token="D2" cls="text-d2 font-display font-bold text-max">
              Two capabilities, two markets
            </Specimen>
            <Specimen token="D3" cls="text-d3 font-display font-semibold text-max">
              Archival ordering and mass digitization
            </Specimen>
            <Specimen token="H4" cls="text-h4 font-display font-semibold text-max">
              Biblioteca Arcivescovile Innocenziana
            </Specimen>
            <Specimen token="Body L" cls="text-body-l text-copy measure-wide">
              Paloryn turns paper archives into structured data: archival ordering, mass
              digitization, AI extraction, and interoperability with public digital
              infrastructure.
            </Specimen>
            <Specimen token="Body" cls="text-body text-copy measure-wide">
              Il testo corrente sta in Archivo Regular, con una misura di lettura che non
              supera i 68 caratteri. Voce attiva, frasi brevi, zero marketing gonfiato: il
              registro e&apos; quello che il sito attuale ha gia&apos; azzeccato e che
              teniamo.
            </Specimen>
            <Specimen token="Label" cls="eyebrow">
              Public sector · building archives · Lecce, IT
            </Specimen>
            <Specimen token="Data" cls="font-mono text-data text-strong tabular">
              1.240 m &rarr; 10.400.000 pages &rarr; 4 s
            </Specimen>
            <Specimen token="Metric" cls="font-mono text-metric text-max tabular">
              10M+
            </Specimen>
          </div>

          <div className="mt-16">
            <DataTable
              caption="La scala dichiarata — mobile → desktop"
              columns={[
                { key: "token", head: "Token" },
                { key: "font", head: "Carattere" },
                { key: "size", head: "px", numeric: true },
                { key: "track", head: "Tracking", numeric: true },
                { key: "use", head: "Uso" },
              ]}
              rows={TYPE}
            />
          </div>

          <div className="mt-12 border border-line p-6 md:p-8">
            <span className="eyebrow">La decisione tipografica non ovvia</span>
            <p className="measure-wide mt-4 text-body text-copy">
              Le cifre grandi delle metriche stanno in{" "}
              <strong className="font-medium text-strong">IBM Plex Mono</strong>, non nel
              carattere display. Ovunque nel B2B il numero grosso e&apos; in grassetto
              perche&apos; e&apos; un trofeo. Qui resta nel carattere delle macchine, con
              cifre a larghezza fissa: non un vanto, ma la lettura di uno strumento.
            </p>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          n="04"
          title="Griglia e ritmo"
          note="12 colonne su desktop, 8 su tablet, 4 su mobile. Tutte le distanze sono multipli di 8px."
        >
          <div className="relative border border-line p-4">
            <div className="grid grid-cols-4 gap-4 md:grid-cols-8 md:gap-5 xl:grid-cols-12 xl:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-24 bg-surface-2 ${i >= 4 ? "hidden md:block" : ""} ${
                    i >= 8 ? "md:hidden xl:block" : ""
                  }`}
                >
                  <span className="eyebrow block p-2 tabular">{String(i + 1).padStart(2, "0")}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { k: "Mobile 390", v: "4 col · gutter 16 · margine 20" },
              { k: "Tablet 768", v: "8 col · gutter 20 · margine 32" },
              { k: "Desktop 1440", v: "12 col · gutter 24 · margine 60 · max 1320" },
            ].map((x) => (
              <div key={x.k} className="border-t border-line pt-4">
                <span className="eyebrow">{x.k}</span>
                <p className="mt-2 font-mono text-data text-copy tabular">{x.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-line pt-4">
            <span className="eyebrow">Ritmo verticale fra sezioni</span>
            <p className="mt-2 font-mono text-data text-copy tabular">
              96 (mobile) · 128 (tablet) · 160 (desktop)
            </p>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          n="05"
          title="Marchio"
          note="E' il segno gia' in uso accanto alla scritta Dematerializzare, ripreso alla geometria originale. Cambia solo il colore, che ora eredita dal testo."
        >
          <div className="grid gap-px bg-line lg:grid-cols-[1.6fr_1fr]">
            <div className="flex flex-col justify-between gap-10 bg-bg p-8">
              <div className="flex flex-wrap items-end gap-12 text-max">
                <Logo height={72} />
                <Logo height={40} />
                <Logo height={22} />
                <Logo height={14} />
              </div>

              {/* Confronto a parita' di misura: sotto i 20px il tratto pieno
                  salda i tre raggi, quello sottile no. */}
              <div className="flex flex-wrap items-end gap-12 text-max">
                {[18, 16, 14].map((h) => (
                  <div key={h} className="flex items-end gap-5">
                    <div className="flex flex-col items-center gap-3">
                      <Logo height={h} thin={false} />
                      <span className="eyebrow">{h} pieno</span>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <Logo height={h} thin />
                      <span className="eyebrow">{h} sottile</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-end gap-8 text-max">
                {[48, 32, 20, 16].map((s) => (
                  <div key={s} className="flex flex-col items-center gap-3">
                    <Logo tile size={s} />
                    <span className="eyebrow">tile {s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-bg p-8">
              <span className="eyebrow">Fedelta&apos; all&apos;originale</span>
              <p className="mt-4 text-body text-copy">
                Arco a tratto pieno e tre raggi a terminali arrotondati che convergono in
                un punto sotto l&apos;arco. Le coordinate sono quelle del file esistente,
                verificate sovrapponendo il risultato all&apos;originale: coincidono. Cambia
                solo il colore, che non e&apos; piu&apos; fissato nel file ma ereditato dal
                testo.
              </p>
              <span className="eyebrow mt-8 block">Un limite da sapere</span>
              <p className="mt-4 text-small text-mute">
                Sotto i 20px i tratti si saldano fra loro e il segno diventa una macchia:
                non e&apos; un difetto della riproduzione, e&apos; la geometria del segno.
                I tre raggi distano undici unita&apos; e il tratto pieno ne occupa sette,
                quindi lo spazio vuoto vale meno di due pixel e mezzo. Per questo sotto i
                20px il tratto si assottiglia da solo, da sette a cinque: il confronto qui
                sopra e&apos; a parita&apos; di misura. Dove lo spazio e&apos; davvero
                minimo resta comunque preferibile la tessera piena.
              </p>
            </div>
          </div>
          <p className="mt-8 text-small text-mute">
            La favicon (<span className="font-mono text-data">icon.svg</span>) e&apos; gia&apos;
            generata dallo stesso segno. Apple-touch-icon e og-image si fanno in Fase 6,
            insieme al resto dei metadati nelle due lingue.
          </p>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          n="06"
          title="Bottoni"
          note="Etichetta in mono maiuscolo: un bottone e' un comando, non uno slogan. Altezza minima 48px, sopra i 44 richiesti."
        >
          <div className="flex flex-wrap items-center gap-6">
            <Button variant="primary" size="lg">
              Request a survey
            </Button>
            <Button variant="secondary" size="lg" arrow>
              See Anamnesis
            </Button>
            <Button variant="ghost" arrow>
              All customers
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <ButtonLink href="/styleguide" variant="primary">
              Primary md
            </ButtonLink>
            <ButtonLink href="/styleguide" variant="secondary" arrow>
              Secondary md
            </ButtonLink>
          </div>
          <p className="mt-8 text-small text-mute">
            Un solo bottone primario per schermata. Il focus da tastiera disegna un
            contorno cyan a 2px con 2px di stacco: e&apos; l&apos;unico uso obbligatorio
            dell&apos;accento. Provalo col tasto Tab.
          </p>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          n="07"
          title="Card"
          note="Ogni card e' la voce di un elenco ordinato, con indice numerico in mono. Spigolo vivo, hairline, nessuna ombra."
        >
          <div className="grid gap-6 md:grid-cols-3">
            <Card
              index="01"
              tag="Public"
              title="Comune di Galatina"
              href="/styleguide"
              footer="PR Puglia FESR-FSE+ 2021-2027"
            >
              Digitalizzazione dell&apos;archivio di edilizia privata.
            </Card>
            <Card
              index="02"
              tag="Private"
              title="Biblioteca Innocenziana"
              href="/styleguide"
              footer="~2.750 pagine · 210 tavole"
            >
              Sette volumi antichi e manoscritti, master TIFF e PDF/A.
            </Card>
            <Card index="03" tag="Static" title="Card non cliccabile">
              Stessa superficie, nessuno stato di passaggio: si usa quando non c&apos;e&apos;
              una pagina di dettaglio.
            </Card>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          n="08"
          title="Tabelle"
          note="Intestazioni in mono maiuscolo, cifre a larghezza fissa, righe alternate. Su schermo stretto scorre la tabella, mai la pagina."
        >
          <DataTable
            columns={[
              { key: "phase", head: "Fase" },
              { key: "output", head: "Consegnabile" },
              { key: "vol", head: "Volume", numeric: true },
            ]}
            rows={[
              { phase: "01 · Ordinamento", output: "Inventario", vol: "1.240 m" },
              { phase: "02 · Digitalizzazione", output: "Master TIFF", vol: "10.4M pp." },
              { phase: "03 · Estrazione", output: "Campi strutturati", vol: "96%" },
              { phase: "04 · Conservazione", output: "PDF/A + marca", vol: "100%" },
              { phase: "05 · Pubblicazione", output: "Anamnesis", vol: "4 s" },
            ]}
          />
          <p className="mt-6 text-small text-mute">
            I volumi qui sono segnaposto di impaginazione: nessuna cifra e&apos; ancora
            confermata (vedi D8 della Fase 1).
          </p>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          n="09"
          title="Metriche e indice di affidabilita'"
          note="Le cifre in mono, appese a una hairline. L'indice di affidabilita' e' ripreso dal sito attuale e promosso a componente di sistema."
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Metric value="10" unit="M+" label="pages digitized" note="da confermare" />
            <Metric value="20" unit="+" label="specialists on staff" note="da confermare" />
            <Metric value="4" label="ISO certifications" note="9001 · 27001 · 27017 · 27018" />
            <Metric value="2" label="operating countries" note="da confermare — vedi D4" />
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div>
              <span className="eyebrow">Indice di affidabilita&apos; per campo</span>
              <div className="mt-6 space-y-6">
                <Confidence field="datazione" value="ca. 1380–1390" score={96} />
                <Confidence field="supporto" value="pergamena" score={99} />
                <Confidence field="lingua" value="francese antico" score={87} />
                <Confidence field="segnatura" value="MS · 467421" score={100} />
              </div>
            </div>
            <div className="border border-line p-6 md:p-8">
              <span className="eyebrow">Perche&apos; e&apos; un componente e non un dettaglio</span>
              <p className="mt-4 text-body text-copy">
                Dichiarare quanto si e&apos; sicuri di un dato e&apos; una postura da data
                company, non da fornitore. E&apos; anche uno dei pochi punti in cui
                l&apos;accento e&apos; ammesso: la barra cyan misura la certezza, non
                decora.
              </p>
            </div>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          n="10"
          title="Form e filtro"
          note="Nessun riquadro attorno ai campi: solo una hairline che passa all'accento quando il campo e' attivo. Etichetta sempre visibile."
        >
          <div className="grid gap-12 md:grid-cols-2">
            <form className="flex flex-col gap-8">
              <SelectField
                id="profile"
                label="Profilo del richiedente"
                defaultValue="public"
                options={[
                  { value: "public", label: "Ente pubblico" },
                  { value: "culture", label: "Istituzione culturale" },
                  { value: "company", label: "Impresa" },
                ]}
              />
              <TextField id="org" label="Ente o ragione sociale" placeholder="Comune di…" />
              <TextField
                id="extent"
                label="Consistenza stimata"
                placeholder="metri lineari"
                hint="Anche approssimativa: serve solo per l'ordine di grandezza."
              />
              <TextArea id="notes" label="Descrizione dell'archivio" />
              <div>
                <Button variant="primary" type="submit">
                  Send
                </Button>
              </div>
            </form>

            <div>
              <span className="eyebrow">Filtro a due stati</span>
              <p className="mt-4 mb-8 text-body text-copy">
                Lo stesso controllo segmenta PA e Privati in home, sulle due pagine di
                servizio e sulla griglia dei casi studio. E&apos; il modo in cui la doppia
                matrice diventa navigabile.
              </p>
              <SegmentedDemo />
            </div>
          </div>
        </Block>

        {/* ---------------------------------------------------------------- */}
        <Block
          n="11"
          title="Prova in scala di grigi"
          note="La verifica che eseguo a ogni fase: se togliendo l'accento la gerarchia non regge, la gerarchia e' sbagliata e si corregge la struttura, non si aggiunge colore."
        >
          <div className="grid gap-8 md:grid-cols-2">
            <div className="border border-line p-6">
              <span className="eyebrow">Con accento</span>
              <div className="mt-6 space-y-6">
                <Confidence field="datazione" value="ca. 1380–1390" score={96} />
                <Metric value="10" unit="M+" label="pages digitized" />
                <Button variant="secondary" arrow>
                  See Anamnesis
                </Button>
              </div>
            </div>
            <div className="border border-line p-6 grayscale">
              <span className="eyebrow">In scala di grigi</span>
              <div className="mt-6 space-y-6">
                <Confidence field="datazione" value="ca. 1380–1390" score={96} />
                <Metric value="10" unit="M+" label="pages digitized" />
                <Button variant="secondary" arrow>
                  See Anamnesis
                </Button>
              </div>
            </div>
          </div>
        </Block>

        <Rule />
        <div className="py-16">
          <span className="eyebrow">Fine della pagina di stile</span>
          <p className="measure-wide mt-4 text-body text-copy">
            Sotto c&apos;e&apos; il footer, che fa parte dei componenti di questa fase.
            Nessuna pagina reale del sito e&apos; ancora stata costruita: la home arriva in
            Fase 3, dopo il tuo OK.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Specimen({
  token,
  cls,
  children,
}: {
  token: string;
  cls: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-3 border-t border-line pt-5 md:grid-cols-[7rem_1fr] md:gap-8">
      <span className="eyebrow pt-2">{token}</span>
      <div className={cls}>{children}</div>
    </div>
  );
}
