/* ==========================================================================
   COMPOSIZIONE DEL MESSAGGIO

   I moduli del sito non passano da un server: compongono un messaggio gia'
   scritto e aprono il programma di posta di chi sta scrivendo.

   E' una scelta, non una scorciatoia. Non c'e' nessuna casella da
   sorvegliare, nessuna chiave segreta da custodire in un file di
   configurazione, nessun modulo che dice «inviato» mentre il messaggio si
   perde per strada. Chi scrive vede il testo prima di premere invio e ne
   conserva copia nella propria posta inviata: se non riceviamo risposta,
   ha una prova di aver scritto.

   Il limite e' che serve un programma di posta configurato. Per questo
   sotto ogni pulsante l'indirizzo compare in chiaro e si puo' copiare.
   ========================================================================== */

/** Una riga del messaggio: etichetta e valore, come li vede chi scrive. */
export type MailField = [label: string, value: string];

export function composeMailto(to: string, subject: string, fields: MailField[]): string {
  /* I campi vuoti non compaiono: chi riceve legge una scheda, non un
     modulo con dei buchi. */
  const body = fields
    .filter(([, value]) => value.trim())
    .map(([label, value]) => `${label}: ${value.trim()}`)
    .join("\n");

  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Legge un campo del modulo senza spazi in testa e in coda. */
export function field(data: FormData, name: string): string {
  return String(data.get(name) ?? "").trim();
}
