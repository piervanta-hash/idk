"use client";

/* ==========================================================================
   INVIO DEI MODULI

   Un solo posto in cui i moduli del sito parlano con il server, cosi' i due
   moduli - contatti e investitori - non possono divergere.

   Gli stati sono quattro e sono tutti veri: fermo, in corso, spedito,
   fallito. Non esiste uno stato «spedito» che non corrisponde a un
   messaggio partito davvero: se il server non conferma, la pagina lo dice e
   mostra l'indirizzo da copiare a mano.
   ========================================================================== */

/* DOVE VA A FINIRE IL MODULO.

   Sul sito servito da Node e' la rotta interna: src/app/api/contact/.
   Ma il sito puo' anche essere pubblicato come cartella di file statici su
   un server Apache — ed e' quello che c'e' oggi su paloryn.com. Li' una
   rotta di Next non esiste, e infatti /api/contact rispondeva 404: i
   moduli non potevano spedire.

   L'indirizzo diventa quindi una variabile decisa al momento della
   costruzione. Vuota: la rotta interna, come prima. Valorizzata: quello
   che si vuole — per Apache, il piccolo ricevitore in PHP che sta in
   apache/contact.php. Il modulo non sa e non deve sapere quale dei due
   ha davanti: manda gli stessi dati e legge la stessa risposta. */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/contact";

export type SendState = "idle" | "sending" | "sent" | "error";

export type SendResult = { ok: true } | { ok: false; reason: string };

export async function submitForm(input: {
  subject: string;
  fields: [string, string][];
  website: string;
  elapsed: number;
}): Promise<SendResult> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    if (res.ok) return { ok: true };
    const data = await res.json().catch(() => ({}));
    return { ok: false, reason: String(data.error ?? res.status) };
  } catch {
    /* Rete assente o richiesta interrotta: e' un errore come un altro, e
       chi ha compilato deve saperlo. */
    return { ok: false, reason: "network" };
  }
}

/* Il campo esca. Invisibile a chi guarda ma non nascosto con `display:
   none`, che i programmi automatici riconoscono: e' fuori dallo schermo,
   fuori dall'ordine di tabulazione e dichiarato non pertinente per i
   lettori di schermo. */
export const HONEYPOT_PROPS = {
  type: "text" as const,
  name: "website",
  tabIndex: -1,
  autoComplete: "off",
  "aria-hidden": true,
  className:
    "absolute left-[-9999px] h-px w-px overflow-hidden opacity-0 pointer-events-none",
};
