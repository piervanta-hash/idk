/* ==========================================================================
   PROVA DELLA POSTA

   Verifica le credenziali SMTP prima di scoprire dal sito che non
   funzionano. Legge gli stessi cinque valori che usa il modulo, si collega
   davvero al server di posta e — se glielo si chiede — manda un messaggio
   di prova.

   Serve perche' un modulo che non spedisce puo' non spedire per cinque
   ragioni diverse, e dal sito si vede solo «il messaggio non e' partito».
   Qui invece si vede quale delle cinque.

       node scripts/prova-posta.mjs           solo collegamento e accesso
       node scripts/prova-posta.mjs --invia   manda anche un messaggio vero

   Nessun valore viene stampato per intero: la password compare come
   numero di caratteri, mai come testo. Il comando si puo' lanciare in una
   chiamata con qualcuno che guarda lo schermo.
   ========================================================================== */

import fs from "node:fs";
import path from "node:path";
import nodemailer from "nodemailer";

/* Gli stessi file che legge Next, nello stesso ordine di precedenza. */
for (const f of [".env.local", ".env"]) {
  const p = path.join(process.cwd(), f);
  if (!fs.existsSync(p)) continue;
  for (const riga of fs.readFileSync(p, "utf8").split("\n")) {
    const m = riga.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)$/);
    if (!m) continue;
    const valore = m[2].replace(/\s+#.*$/, "").trim().replace(/^["']|["']$/g, "");
    if (!(m[1] in process.env)) process.env[m[1]] = valore;
  }
}

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;

const ok = (s) => `  ✓ ${s}`;
const no = (s) => `  ✗ ${s}`;

console.log("\nVALORI TROVATI\n");
const mancanti = [];
for (const [nome, valore, obbligatorio] of [
  ["SMTP_HOST", SMTP_HOST, true],
  ["SMTP_PORT", SMTP_PORT ?? "465 (predefinito)", false],
  ["SMTP_USER", SMTP_USER, true],
  ["SMTP_PASS", SMTP_PASS ? `${SMTP_PASS.length} caratteri` : "", true],
  ["CONTACT_TO", CONTACT_TO ?? `${SMTP_USER ?? "?"} (predefinito)`, false],
]) {
  if (!valore && obbligatorio) {
    mancanti.push(nome);
    console.log(no(`${nome.padEnd(11)} manca`));
  } else {
    console.log(ok(`${nome.padEnd(11)} ${valore}`));
  }
}

if (mancanti.length) {
  console.log(
    `\nMancano ${mancanti.join(", ")}. Copiare .env.example in .env.local e riempirli.\n` +
      `Sono i valori del fornitore su cui gira gia' la casella aziendale.\n`,
  );
  process.exit(1);
}

const port = Number(SMTP_PORT ?? 465);
const transport = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: port === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

console.log(`\nCOLLEGAMENTO a ${SMTP_HOST}:${port} (${port === 465 ? "TLS diretto" : "STARTTLS"})\n`);

try {
  await transport.verify();
  console.log(ok("il server risponde e le credenziali sono accettate"));
} catch (e) {
  console.log(no(`non riuscito: ${e.message}`));
  /* I quattro errori che capitano davvero, e cosa vogliono dire. */
  const m = String(e.message).toLowerCase();
  console.log("\nCOSA CONTROLLARE\n");
  if (m.includes("auth") || m.includes("535") || m.includes("credential")) {
    console.log(
      "  Utente o password rifiutati.\n" +
        "  Se la casella ha la verifica in due passaggi, la password normale\n" +
        "  non funziona: serve una «password per applicazioni» generata dal\n" +
        "  pannello del fornitore.",
    );
  } else if (m.includes("timeout") || m.includes("etimedout") || m.includes("econnrefused")) {
    console.log(
      "  Nessuna risposta sulla porta.\n" +
        "  Provare l'altra combinazione: 465 con TLS diretto, oppure 587 con\n" +
        "  STARTTLS. Molti fornitori accettano solo una delle due.",
    );
  } else if (m.includes("enotfound") || m.includes("dns")) {
    console.log("  Il nome del server non esiste. Controllare SMTP_HOST.");
  } else if (m.includes("certificate") || m.includes("self signed")) {
    console.log(
      "  Certificato non valido. Di solito e' SMTP_HOST scritto con un nome\n" +
        "  diverso da quello sul certificato del fornitore.",
    );
  } else {
    console.log("  Errore non fra quelli tipici: riportare il messaggio qui sopra.");
  }
  console.log("");
  process.exit(1);
}

if (!process.argv.includes("--invia")) {
  console.log(
    "\nPer mandare anche un messaggio di prova:\n  node scripts/prova-posta.mjs --invia\n",
  );
  process.exit(0);
}

const destinatario = CONTACT_TO || SMTP_USER;
console.log(`\nINVIO di un messaggio di prova a ${destinatario}\n`);

try {
  const info = await transport.sendMail({
    from: SMTP_USER,
    to: destinatario,
    replyTo: SMTP_USER,
    subject: "Prova dal sito Paloryn",
    text:
      "Questo messaggio e' stato mandato da scripts/prova-posta.mjs.\n" +
      "Se e' arrivato, il modulo del sito funziona: usa la stessa strada.\n\n" +
      `Server     ${SMTP_HOST}:${port}\n` +
      `Mittente   ${SMTP_USER}\n` +
      `Momento    ${new Date().toISOString()}\n`,
  });
  console.log(ok(`accettato dal server (${info.messageId})`));
  console.log(
    `\nControllare la casella ${destinatario}, anche nella posta indesiderata.\n` +
      "Se arriva li' invece che in arrivo, mancano SPF e DKIM sul dominio: e'\n" +
      "una configurazione DNS, non un problema del sito.\n",
  );
} catch (e) {
  console.log(no(`rifiutato: ${e.message}`));
  console.log(
    "\nIl collegamento funziona ma la spedizione no. Di solito il fornitore\n" +
      "non permette di spedire con un mittente diverso dalla casella con cui\n" +
      "si e' fatto l'accesso: SMTP_USER e il mittente devono coincidere.\n",
  );
  process.exit(1);
}
