"use client";

import { TextField, TextArea } from "@/components/ui/Field";
import { FormShell, type FormCopy } from "@/components/pages/FormShell";

/* Richiesta di materiali per investitori. Stesso comportamento del modulo
   di contatto — invio dal server, stati veri, protezione anti-abuso — ma
   con campi diversi: qui non serve sapere quanto e' grande l'archivio,
   serve sapere chi scrive e che cosa vuole vedere.

   La pagina non espone nessuna cifra, come da brief: questo modulo e'
   l'unico modo per chiederle, e le risposte partono da noi. */
export function InvestorForm({
  form,
  to,
}: {
  form: FormCopy & {
    org: string;
    name: string;
    mail: string;
    interest: string;
    interestHint: string;
    subject: string;
  };
  to: string;
}) {
  return (
    <FormShell
      copy={form}
      to={to}
      subject={form.subject}
      collect={(d) => [
        [form.org, String(d.get("organisation") ?? "")],
        [form.name, String(d.get("name") ?? "")],
        [form.mail, String(d.get("email") ?? "")],
        [form.interest, String(d.get("interest") ?? "")],
      ]}
    >
      <TextField id="inv-org" label={form.org} name="organisation" required />
      <TextField id="inv-name" label={form.name} name="name" required />
      <TextField id="inv-mail" label={form.mail} name="email" type="email" required />
      <TextArea
        id="inv-interest"
        label={form.interest}
        hint={form.interestHint}
        name="interest"
      />
    </FormShell>
  );
}
