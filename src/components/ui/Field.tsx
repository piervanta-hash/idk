"use client";

import type { ComponentProps, ReactNode } from "react";

/* ==========================================================================
   CAMPI DI FORM
   Nessun riquadro: solo una hairline sotto il campo, che passa all'accento
   quando il campo e' attivo. Altezza 48px, etichetta sempre visibile
   (mai il segnaposto al posto dell'etichetta: sparisce quando serve).
   ========================================================================== */

const control =
  "w-full min-h-12 bg-transparent border-0 border-b border-line px-0 py-3 " +
  "font-mono text-data text-strong placeholder:text-mute/60 " +
  "transition-colors duration-200 " +
  "focus:border-accent focus:outline-none focus-visible:outline-none";

function Shell({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="eyebrow">
        {label}
      </label>
      {children}
      {hint && <span className="text-small text-mute">{hint}</span>}
    </div>
  );
}

export function TextField({
  id,
  label,
  hint,
  ...rest
}: { id: string; label: string; hint?: string } & ComponentProps<"input">) {
  return (
    <Shell id={id} label={label} hint={hint}>
      <input id={id} className={control} {...rest} />
    </Shell>
  );
}

export function TextArea({
  id,
  label,
  hint,
  ...rest
}: { id: string; label: string; hint?: string } & ComponentProps<"textarea">) {
  return (
    <Shell id={id} label={label} hint={hint}>
      <textarea id={id} rows={4} className={`${control} resize-y`} {...rest} />
    </Shell>
  );
}

export function SelectField({
  id,
  label,
  hint,
  options,
  ...rest
}: {
  id: string;
  label: string;
  hint?: string;
  options: { value: string; label: string }[];
} & ComponentProps<"select">) {
  return (
    <Shell id={id} label={label} hint={hint}>
      <select id={id} className={control} {...rest}>
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-surface-2 text-strong">
            {o.label}
          </option>
        ))}
      </select>
    </Shell>
  );
}

/* Filtro a due stati: il componente che segmenta PA / Privati in home,
   sulle pagine di servizio e sulla griglia dei casi studio. */
export function SegmentedControl({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange?: (v: string) => void;
}) {
  return (
    /* w-fit e non solo inline-flex: dentro un contenitore flex in colonna
       un inline-flex viene comunque stirato a tutta larghezza. */
    <div role="radiogroup" aria-label={name} className="inline-flex w-fit border border-line">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange?.(o.value)}
            className={
              "min-h-12 px-5 font-mono text-data uppercase tracking-[0.08em] " +
              "border-r border-line last:border-r-0 transition-colors duration-200 " +
              (active ? "bg-surface-2 text-max" : "text-mute hover:text-strong")
            }
          >
            {active && <span className="mr-2 text-accent">&bull;</span>}
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
