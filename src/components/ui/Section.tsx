import type { ReactNode } from "react";
import { Rule } from "@/components/ui/Rule";
import { Reveal } from "@/components/ui/Reveal";

/* Il ritmo dichiarato in Fase 1, ora in un posto solo: etichetta mono a
   sinistra, numero d'ordine a destra, hairline, e subito la cosa concreta. */

export function Section({
  id,
  eyebrow,
  aside,
  size = "md",
  children,
}: {
  id: string;
  eyebrow: string;
  aside?: string;
  size?: "md" | "lg";
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={
        "scroll-mt-24 " + (size === "lg" ? "py-24 md:py-32 lg:py-40" : "py-24 md:py-32")
      }
    >
      <Reveal as="header" className="mb-12 md:mb-16">
        <div className="flex items-baseline justify-between gap-6">
          <span className="eyebrow">{eyebrow}</span>
          {aside && <span className="eyebrow text-right">{aside}</span>}
        </div>
        <Rule className="mt-3" />
      </Reveal>
      {children}
    </section>
  );
}
