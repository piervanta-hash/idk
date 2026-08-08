"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField, TextArea } from "@/components/ui/Field";

/* ==========================================================================
   MODULO DI CONTATTO A TRE PROFILI

   Ripreso dal sito attuale, dove funziona: chi scrive dichiara prima di
   tutto che cosa e' — ente, istituzione culturale o impresa — perche' da
   quello dipende tutto il resto della conversazione. Vincoli, tempi e
   interlocutori non sono gli stessi.

   Il profilo scelto viaggia con il modulo come campo nascosto, cosi' chi
   legge sa gia' da dove partire.

   L'invio non e' ancora collegato: arriva in Fase 7, insieme alla verifica
   anti-abuso.
   ========================================================================== */

export function ContactForm({
  profileLabel,
  profiles,
  form,
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
  };
}) {
  const [profile, setProfile] = useState(profiles[0].value);

  return (
    <form className="flex flex-col gap-8">
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
        <input type="hidden" name="profile" value={profile} />
      </fieldset>

      <TextField id="c-org" name="organisation" label={form.org} />
      <TextField id="c-name" name="name" label={form.name} />
      <TextField id="c-mail" name="email" type="email" label={form.mail} />
      <TextField id="c-extent" name="extent" label={form.extent} hint={form.extentHint} />
      <TextArea id="c-notes" name="notes" label={form.notes} />

      <div>
        <Button variant="primary" size="lg" type="submit">
          {form.send}
        </Button>
      </div>

      <p className="text-small text-mute">{form.privacy}</p>
    </form>
  );
}
