import Link from "next/link";

/* Segnaposto. Le pagine reali partono dalla Fase 3: qui c'e' solo il rimando
   alla pagina di stile, che e' il deliverable della Fase 2. */

export default function Home() {
  return (
    <main className="shell flex min-h-dvh flex-col justify-center py-24">
      <span className="eyebrow">Paloryn · restyling · stato</span>
      <h1 className="mt-8 text-d2 font-display font-bold text-max">
        Fase 2 — design system.
      </h1>
      <p className="measure-wide mt-6 text-body-l text-copy">
        Nessuna pagina reale del sito e&apos; ancora stata costruita, come previsto dal
        brief. Il lavoro di questa fase sta tutto nella pagina di stile.
      </p>
      <div className="mt-10">
        <Link
          href="/styleguide"
          className="inline-flex min-h-12 items-center gap-3 border border-line px-6 font-mono text-data uppercase tracking-[0.08em] text-strong transition-colors hover:border-accent hover:text-max"
        >
          Apri la pagina di stile <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </main>
  );
}
