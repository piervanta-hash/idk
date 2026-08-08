"use client";

import { Button } from "@/components/ui/Button";
import { TextField, TextArea } from "@/components/ui/Field";
import { composeMailto, field } from "@/lib/mailto";

/* Richiesta di materiali per investitori. Stesso meccanismo del modulo di
   contatto — compone il messaggio e apre il programma di posta — ma con
   campi diversi: qui non serve sapere quanto e' grande l'archivio, serve
   sapere chi scrive e che cosa vuole vedere.

   La pagina non espone nessuna cifra, come da brief: questo modulo e'
   l'unico modo per chiederle, e le risposte partono da noi. */
export function InvestorForm({
  form,
  to,
}: {
  form: {
    org: string;
    name: string;
    mail: string;
    interest: string;
    interestHint: string;
    send: string;
    privacy: string;
    subject: string;
    alt: string;
  };
  to: string;
}) {
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const org = field(f, "organisation");

    window.location.href = composeMailto(to, org ? `${form.subject} — ${org}` : form.subject, [
      [form.org, org],
      [form.name, field(f, "name")],
      [form.mail, field(f, "email")],
      [form.interest, field(f, "interest")],
    ]);
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={submit}>
      <TextField id="inv-org" label={form.org} name="organisation" required />
      <TextField id="inv-name" label={form.name} name="name" required />
      <TextField id="inv-mail" label={form.mail} name="email" type="email" required />
      <TextArea
        id="inv-interest"
        label={form.interest}
        hint={form.interestHint}
        name="interest"
      />

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button variant="primary" size="lg" type="submit">
          {form.send}
        </Button>
        <span className="text-small text-copy">
          {form.alt}{" "}
          <a
            href={`mailto:${to}`}
            className="text-strong underline underline-offset-4 transition-colors hover:text-accent"
          >
            {to}
          </a>
        </span>
      </div>

      <p className="text-small text-mute">{form.privacy}</p>
    </form>
  );
}
