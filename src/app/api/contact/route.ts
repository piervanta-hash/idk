import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/* ==========================================================================
   RICEZIONE DEI MODULI

   Chi compila un modulo sul sito non apre il proprio programma di posta:
   preme invia e basta. Il messaggio parte da qui, dal server, e arriva
   nella casella dell'azienda con dentro solo i campi che sono stati
   compilati.

   DA CHI ARRIVA. Il mittente e' l'indirizzo di servizio del sito, non
   quello di chi scrive: un server non puo' firmare la posta a nome di un
   dominio altrui, e provarci significa finire nello spam. Chi scrive
   compare come «rispondi a», quindi premere Rispondi nella casella scrive
   direttamente a lui. E' il modo corretto, ed e' anche quello che non
   rompe le firme SPF e DKIM del dominio.

   COSA SERVE PER FUNZIONARE. Cinque valori nelle variabili d'ambiente,
   presi dal fornitore di posta su cui gia' gira info@paloryn.com:

     SMTP_HOST   il server di posta in uscita
     SMTP_PORT   465 con TLS diretto, oppure 587 con STARTTLS
     SMTP_USER   la casella da cui il sito spedisce
     SMTP_PASS   la sua password, meglio se una password per applicazioni
     CONTACT_TO  dove consegnare (se manca, si usa SMTP_USER)

   Senza questi valori il modulo risponde con un errore dichiarato e la
   pagina mostra l'indirizzo da copiare a mano. Non finge mai di aver
   spedito: un modulo che dice «inviato» e perde il messaggio e' peggio di
   un modulo che non c'e'.

   ANTI-ABUSO, in tre strati e senza far vedere niente a chi scrive
   davvero. Nessun captcha: sono barriere per le persone e un ostacolo
   modesto per le macchine.
   ========================================================================== */

export const runtime = "nodejs";

/* 1. Freno per indirizzo di rete. Sta in memoria e si azzera a ogni
      riavvio: non e' una difesa da attacco mirato, e' quello che serve a
      fermare un modulo compilato in automatico a raffica. */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
/* Dieci all'ora per indirizzo di rete. Un comune o uno studio escono tutti
   dallo stesso indirizzo pubblico, quindi la soglia non puo' essere
   strettissima; ma dieci richieste vere in un'ora dallo stesso ufficio non
   succedono, e un modulo compilato in automatico ne fa molte di piu'. */
const MAX_PER_WINDOW = 10;

function tooMany(ip: string): boolean {
  const now = Date.now();
  const recent = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  HITS.set(ip, recent);

  /* Pulizia opportunista: senza, la mappa cresce per sempre. */
  if (HITS.size > 5000) {
    for (const [k, v] of HITS) {
      if (v.every((t) => now - t > WINDOW_MS)) HITS.delete(k);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

const MAX_LEN = 4000;

type Payload = {
  subject?: string;
  fields?: [string, string][];
  /* 2. Campo esca: invisibile in pagina, quindi una persona non lo vede e
        non lo compila. Un programma che riempie tutti i campi si tradisce
        da solo. */
  website?: string;
  /* 3. Tempo di compilazione: un modulo serio non si compila in due
        secondi. */
  elapsed?: number;
};

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "sconosciuto";

  if (tooMany(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  /* Le due trappole rispondono «va bene» senza spedire niente: dire a un
     programma automatico che e' stato riconosciuto significa solo aiutarlo
     a riprovare meglio. */
  if (body.website) return NextResponse.json({ ok: true });
  if (typeof body.elapsed === "number" && body.elapsed < 3000) {
    return NextResponse.json({ ok: true });
  }

  const fields = (body.fields ?? [])
    .filter(
      (f): f is [string, string] =>
        Array.isArray(f) && typeof f[0] === "string" && typeof f[1] === "string",
    )
    .map(([k, v]) => [k.slice(0, 120), v.trim().slice(0, MAX_LEN)] as [string, string])
    .filter(([, v]) => v);

  if (!fields.length) {
    return NextResponse.json({ error: "empty" }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    /* Configurazione mancante: si dichiara, non si finge. */
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  /* L'indirizzo di chi scrive, se c'e', diventa il «rispondi a». Si
     riconosce dal contenuto, non dall'etichetta, che cambia con la
     lingua. */
  const replyTo = fields.map(([, v]) => v).find((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v));

  const port = Number(SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  /* Una riga per campo, nell'ordine del modulo. Chi legge vede una scheda,
     non un blocco di testo. */
  const width = Math.max(...fields.map(([k]) => k.length));
  const text = fields.map(([k, v]) => `${k.padEnd(width)}  ${v}`).join("\n");

  try {
    await transport.sendMail({
      from: `"Paloryn — sito" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo,
      subject: (body.subject ?? "Richiesta dal sito").slice(0, 200),
      text: `${text}\n\n—\nInviato dal modulo su paloryn.com\n`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    /* Il dettaglio dell'errore resta nei registri del server: in risposta
       non si espone mai nome del server, utenza o motivo del rifiuto. */
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }
}
