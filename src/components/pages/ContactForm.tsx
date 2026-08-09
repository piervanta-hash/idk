"use client";

import { useState } from "react";
import { TextField, TextArea } from "@/components/ui/Field";
import { FormShell, type FormCopy } from "@/components/pages/FormShell";

/* ==========================================================================
   MODULO DI CONTATTO A TRE PROFILI

   Ripreso dal sito attuale, dove funziona: chi scrive dichiara prima di
   tutto che cosa e' — ente, istituzione culturale o impresa — perche' da
   quello dipende tutto il resto della conversazione. Vincoli, tempi e
   interlocutori non sono gli stessi.

   L'invio, gli stati e la protezione anti-abuso stanno in FormShell: qui
   ci sono solo i campi e l'ordine in cui finiscono nel messaggio.
   ========================================================================== */

export function ContactForm({
  profileLabel,
  profiles,
  form,
  to,
}: {
  profileLabel: string;
  profiles: readonly { value: string; label: string }[];
  form: FormCopy & {
    org: string;
    name: string;
    mail: string;
    extent: string;
    extentHint: string;
    notes: string;
    subject: string;
  };
  to: string;
}) {
  const [profile, setProfile] = useState(profiles[0].value);
  const chosen = profiles.find((p) => p.value === profile)?.label ?? profile;

  return (
    <FormShell
      copy={form}
      to={to}
      subject={form.subject}
      collect={(d) => [
        [profileLabel, chosen],
        [form.org, String(d.get("organisation") ?? "")],
        [form.name, String(d.get("name") ?? "")],
        [form.mail, String(d.get("email") ?? "")],
        [form.extent, String(d.get("extent") ?? "")],
        [form.notes, String(d.get("notes") ?? "")],
      ]}
    >
      <fieldset className="m-0 border-0 p-0">
        <legend className="eyebrow mb-4">{profileLabel}</legend>
        <div className="flex flex-wrap gap-px" role="radiogroup" aria-label={profileLabel}>
          {profiles.map((p) => {
            const on = p.value === profile;
            return (
              <button
                key={p.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setProfile(p.value)}
                className={
                  "min-h-12 border border-line px-5 font-mono text-data uppercase " +
                  "tracking-[0.08em] transition-colors duration-200 " +
                  (on ? "bg-surface-2 text-max" : "text-label hover:text-strong")
                }
              >
                {on && <span className="mr-2 text-accent">&bull;</span>}
                {p.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <TextField id="c-org" name="organisation" label={form.org} required />
      <TextField id="c-name" name="name" label={form.name} required />
      <TextField id="c-mail" name="email" type="email" label={form.mail} required />
      <TextField id="c-extent" name="extent" label={form.extent} hint={form.extentHint} />
      <TextArea id="c-notes" name="notes" label={form.notes} />
    </FormShell>
  );
}
