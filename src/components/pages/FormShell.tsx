"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { HONEYPOT_PROPS, submitForm, type SendState } from "@/lib/submit";

/* ==========================================================================
   IMPALCATURA COMUNE DEI MODULI

   Contatti e investitori chiedono cose diverse ma si comportano allo stesso
   modo: raccolgono, spediscono dal server, e dicono la verita' su com'e'
   andata. Quel comportamento sta scritto qui una volta sola.

   Chi usa questo componente passa i propri campi come figli e una funzione
   che, al momento dell'invio, dice quali righe mettere nel messaggio.

   GLI STATI SONO QUATTRO E SONO TUTTI VERI. In corso: il pulsante si
   disabilita, cosi' non si spedisce due volte. Spedito: al posto del
   modulo compare la conferma, perche' lasciare i campi pieni fa dubitare
   che sia partito. Fallito: si dice che non e' partito e si mostra
   l'indirizzo da copiare — mai un «inviato» che non corrisponde a niente.
   ========================================================================== */

export type FormCopy = {
  send: string;
  sending: string;
  sent: string;
  sentNote: string;
  failed: string;
  privacy: string;
  alt: string;
};

export function FormShell({
  copy,
  to,
  subject,
  collect,
  children,
}: {
  copy: FormCopy;
  to: string;
  subject: string;
  /** Le righe del messaggio, lette dal modulo al momento dell'invio. */
  collect: (data: FormData) => [string, string][];
  children: React.ReactNode;
}) {
  const [state, setState] = useState<SendState>("idle");
  /* Quando la pagina ha disegnato il modulo. La differenza con il momento
     dell'invio e' il tempo di compilazione: sotto i tre secondi non e' una
     persona. */
  const opened = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");

    const data = new FormData(e.currentTarget);
    const res = await submitForm({
      subject,
      fields: collect(data),
      website: String(data.get("website") ?? ""),
      elapsed: Date.now() - opened.current,
    });
    setState(res.ok ? "sent" : "error");
  }

  if (state === "sent") {
    return (
      <div className="border-t border-line pt-8" role="status">
        <p className="font-display text-h4 font-semibold text-max">{copy.sent}</p>
        <p className="measure mt-4 text-body text-copy">{copy.sentNote}</p>
      </div>
    );
  }

  return (
    <form className="relative flex flex-col gap-8" onSubmit={onSubmit} noValidate={false}>
      {children}

      {/* Campo esca: chi lo compila non e' una persona. */}
      <input {...HONEYPOT_PROPS} />

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button variant="primary" size="lg" type="submit" disabled={state === "sending"}>
          {state === "sending" ? copy.sending : copy.send}
        </Button>
        <span className="text-small text-copy">
          {copy.alt}{" "}
          <a
            href={`mailto:${to}`}
            className="text-strong underline underline-offset-4 transition-colors hover:text-accent"
          >
            {to}
          </a>
        </span>
      </div>

      {state === "error" && (
        <p className="border-l-2 border-accent pl-4 text-small text-strong" role="alert">
          {copy.failed}
        </p>
      )}

      <p className="text-small text-label">{copy.privacy}</p>
    </form>
  );
}
