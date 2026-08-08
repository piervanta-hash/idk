"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField, TextArea } from "@/components/ui/Field";
import { composeMailto, field } from "@/lib/mailto";

/* ==========================================================================
   MODULO DI CONTATTO A TRE PROFILI

   Ripreso dal sito attuale, dove funziona: chi scrive dichiara prima di
   tutto che cosa e' — ente, istituzione culturale o impresa — perche' da
   quello dipende tutto il resto della conversazione. Vincoli, tempi e
   interlocutori non sono gli stessi.

   DOVE FINISCE. Il modulo compone un messaggio gia' scritto e apre il
   programma di posta dell'utente, con destinatario info@paloryn.com. Non
   passa da nessun server: nessuna casella da sorvegliare, nessuna chiave
   segreta da custodire, nessun modulo che finge di aver spedito mentre il
   messaggio si perde. Chi scrive vede il testo prima di premere invio e
   ne conserva copia nella propria posta inviata.

   Il limite: serve un programma di posta configurato. Per questo
   l'indirizzo e' scritto in chiaro sotto il pulsante e si puo' copiare a
   mano. Se un giorno servira' l'invio dal server — perche' il modulo
   diventa un canale di acquisizione da misurare — bastera' sostituire
   `submit` con una chiamata a un endpoint, senza toccare il resto.
   ========================================================================== */

export function ContactForm({
  profileLabel,
  profiles,
  form,
  to,
}: {
  profileLabel: string;
  profiles: readonly { value: string; label: string }[];
  form: {
    org: string;
    name: string;
    mail: string;
    extent: string;
    extentHint: string;
    notes: string;
    send: string;
    privacy: string;
    subject: string;
    alt: string;
  };
  /** Destinatario. Unico posto in cui compare, cosi' si cambia una volta. */
  to: string;
}) {
  const [profile, setProfile] = useState(profiles[0].value);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const org = field(f, "organisation");
    const label = profiles.find((p) => p.value === profile)?.label ?? profile;

    window.location.href = composeMailto(to, org ? `${form.subject} — ${org}` : form.subject, [
      [profileLabel, label],
      [form.org, org],
      [form.name, field(f, "name")],
      [form.mail, field(f, "email")],
      [form.extent, field(f, "extent")],
      [form.notes, field(f, "notes")],
    ]);
  }

  return (
    <form className="flex flex-col gap-8" onSubmit={submit}>
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
                  (on ? "bg-surface-2 text-max" : "text-mute hover:text-strong")
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

      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        <Button variant="primary" size="lg" type="submit">
          {form.send}
        </Button>
        {/* L'indirizzo in chiaro: se il programma di posta non si apre,
            resta comunque una strada. */}
        <span className="text-small text-copy">
          {form.alt}{" "}
          <a href={`mailto:${to}`} className="text-strong underline underline-offset-4 transition-colors hover:text-accent">
            {to}
          </a>
        </span>
      </div>

      <p className="text-small text-mute">{form.privacy}</p>
    </form>
  );
}
