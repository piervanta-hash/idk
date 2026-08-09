import type { ReactNode } from "react";

/* ==========================================================================
   HAIRLINE E APERTURA DI SEZIONE
   La hairline a 1px e' lo strumento principale di separazione del sito:
   niente ombre, niente riquadri arrotondati, niente fondi colorati.
   ========================================================================== */

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`h-px w-full border-0 bg-line ${className}`} />;
}

/* Il ritmo dichiarato in Fase 1:
   etichetta mono → hairline → subito la cosa concreta. Nessun paragrafo
   introduttivo fra il titolo e il contenuto. */
export function SectionHead({
  eyebrow,
  title,
  intro,
  aside,
}: {
  eyebrow: string;
  title?: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="mb-12 md:mb-16">
      <div className="flex items-baseline justify-between gap-6">
        <span className="eyebrow">{eyebrow}</span>
        {aside && <span className="eyebrow text-right">{aside}</span>}
      </div>
      <Rule className="mt-3" />
      {title && <h2 className="mt-8 text-d3 font-display font-semibold">{title}</h2>}
      {intro && <p className="measure-wide mt-6 text-body-l text-copy">{intro}</p>}
    </header>
  );
}
