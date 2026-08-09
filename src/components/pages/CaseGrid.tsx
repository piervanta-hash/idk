"use client";

import { useCallback, useMemo, useState } from "react";
import { useDialog } from "@/lib/useDialog";

/* ==========================================================================
   GRIGLIA DEI CASI STUDIO CON FILTRO A DUE STATI

   Il filtro PA / Privati e' lo stesso della home e delle pagine di servizio:
   e' il modo in cui il lavoro e' davvero diviso, e ripeterlo qui serve a
   dire che entrambe le anime servono entrambi i mercati.

   Le card restano tutte nel documento anche quando il filtro le nasconde:
   si spengono e si tolgono dal flusso, non vengono smontate. Cosi' il
   contenuto resta indicizzabile e la transizione non salta.

   Il dettaglio si apre in una scheda sovrapposta, con committente, ambito,
   volumi, tecnologie ed esito. Dove il volume non e' pubblicabile, il campo
   dichiara che non lo e' invece di sparire: una casella onesta vale piu' di
   un numero inventato.
   ========================================================================== */

type Case = {
  id: string;
  sector: string;
  index: string;
  name: string;
  client: string;
  summary: string;
  scope: string;
  volumes: string;
  tech: string;
  outcome: string;
  programme: string;
  tag: string;
};

type Labels = {
  open: string;
  close: string;
  client: string;
  scope: string;
  volumes: string;
  tech: string;
  outcome: string;
  programme: string;
  pending: string;
};

export function CaseGrid({
  cases,
  filter,
  detail,
}: {
  cases: readonly Case[];
  filter: { label: string; all: string; public: string; private: string };
  detail: Labels;
}) {
  const [sector, setSector] = useState<"all" | "public" | "private">("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const open = useMemo(() => cases.find((c) => c.id === openId) ?? null, [cases, openId]);

  /* Stabile: se cambiasse a ogni disegno, la finestra si rimonterebbe da
     sola e il fuoco tornerebbe indietro mentre e' ancora aperta. */
  const chiudi = useCallback(() => setOpenId(null), []);
  const panelRef = useDialog(!!open, chiudi);

  const options: { value: typeof sector; label: string }[] = [
    { value: "all", label: filter.all },
    { value: "public", label: filter.public },
    { value: "private", label: filter.private },
  ];

  const count = cases.filter((c) => sector === "all" || c.sector === sector).length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* IN COLONNA FINCHE' NON CI STA IN RIGA.
            "Pubblica amministrazione" e' lungo: i tre pulsanti affiancati
            misuravano 380px dentro uno schermo da 360, e la pagina dei
            clienti si scorreva di lato. In inglese ("Public sector") il
            difetto non si vedeva — motivo per cui va provato in tutte e
            due le lingue e non solo in quella in cui si lavora.
            Sotto i 640px i tre pulsanti si impilano; il bordo passa da
            destra a sotto perche' il riquadro resti chiuso in entrambi i
            versi. */}
        <div
          role="radiogroup"
          aria-label={filter.label}
          className="flex w-full flex-col border border-line sm:inline-flex sm:w-fit sm:flex-row"
        >
          {options.map((o) => {
            const on = o.value === sector;
            return (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setSector(o.value)}
                className={
                  "min-h-12 px-5 text-left font-mono text-data uppercase tracking-[0.08em] " +
                  "border-b border-line last:border-b-0 sm:border-r sm:border-b-0 sm:text-center " +
                  "transition-colors duration-200 " +
                  (on ? "bg-surface-2 text-max" : "text-label hover:text-strong")
                }
              >
                {on && <span className="mr-2 text-accent">&bull;</span>}
                {o.label}
              </button>
            );
          })}
        </div>
        <span className="eyebrow tabular">
          {String(count).padStart(2, "0")} / {String(cases.length).padStart(2, "0")}
        </span>
      </div>

      {/* Bordo su ogni cella e margini negativi a farli collassare, invece
          del solito fondo a griglia con distanza di un pixel: con cinque
          casi su tre colonne la sesta cella resterebbe un rettangolo grigio
          in mezzo alla pagina. */}
      <ul className="m-0 mt-8 ml-px grid list-none p-0 sm:grid-cols-2 lg:grid-cols-3">
        {cases.map((c) => {
          const shown = sector === "all" || c.sector === sector;
          return (
            <li
              key={c.id}
              className={
                "-mt-px -ml-px border border-line bg-bg transition-opacity duration-300 " +
                (shown ? "opacity-100" : "hidden opacity-0")
              }
            >
              <button
                type="button"
                onClick={() => setOpenId(c.id)}
                className="group flex h-full w-full flex-col p-6 text-left transition-colors hover:bg-surface-2 md:p-8"
              >
                <span className="flex items-baseline justify-between gap-4">
                  <span className="eyebrow tabular">{c.index}</span>
                  <span className="eyebrow border border-line px-2 py-1 group-hover:border-accent group-hover:text-accent">
                    {c.sector === "public" ? filter.public : filter.private}
                  </span>
                </span>
                <span className="mt-6 block text-h4 font-display font-semibold text-max">
                  {c.name}
                </span>
                <span className="mt-3 block text-body text-copy">{c.summary}</span>
                <span className="mt-8 flex items-end justify-between gap-4 border-t border-line pt-4">
                  <span className="font-mono text-data text-label">{c.tag}</span>
                  <span
                    aria-hidden="true"
                    className="text-label transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
                  >
                    &rarr;
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-bg/90 p-4 backdrop-blur-sm md:items-center md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={open.name}
          onClick={(e) => e.target === e.currentTarget && chiudi()}
        >
          <div
            ref={panelRef}
            tabIndex={-1}
            className="w-full max-w-3xl border border-line bg-bg focus:outline-none"
          >
            <div className="flex items-center justify-between gap-6 border-b border-line px-5 py-4 md:px-8">
              <span className="eyebrow tabular">
                {open.index} · {open.sector === "public" ? filter.public : filter.private}
              </span>
              <button
                type="button"
                onClick={chiudi}
                className="eyebrow inline-flex min-h-11 items-center gap-2 transition-colors hover:text-max"
              >
                {detail.close}
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="px-5 py-8 md:px-8 md:py-10">
              <h3 className="text-d3 font-display font-semibold text-max">{open.name}</h3>
              <p className="measure-wide mt-6 text-body-l text-copy">{open.scope}</p>

              <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <Row k={detail.client} v={open.client} />
                <Row k={detail.programme} v={open.programme} pending={detail.pending} />
                <Row k={detail.volumes} v={open.volumes} pending={detail.pending} />
                <Row k={detail.tech} v={open.tech} />
                <Row k={detail.outcome} v={open.outcome} full />
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({
  k,
  v,
  pending,
  full = false,
}: {
  k: string;
  v: string;
  pending?: string;
  full?: boolean;
}) {
  if (!v && !pending) return null;
  return (
    <div className={`border-t border-line pt-3 ${full ? "sm:col-span-2" : ""}`}>
      <dt className="eyebrow">{k}</dt>
      <dd className={`mt-2 text-body ${v ? "text-strong" : "text-label italic"}`}>
        {v || pending}
      </dd>
    </div>
  );
}
