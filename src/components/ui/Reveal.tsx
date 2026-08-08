"use client";

import type { ElementType, ReactNode } from "react";
import { useInView } from "@/lib/useInView";

/* Comparsa in ingresso di sezione. Vale la regola dichiarata in Fase 1: il
   movimento spiega, non intrattiene. Qui spiega soltanto che e' cominciato
   un blocco nuovo, quindi dura poco e non si ripete. */

export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  /** Ritardo in ms. Da usare con parsimonia: massimo tre gradini. */
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
