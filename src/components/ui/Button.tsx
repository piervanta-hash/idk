import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

/* ==========================================================================
   BOTTONI
   Etichetta in IBM Plex Mono maiuscolo: un bottone e' un comando, non uno
   slogan. Altezza minima 48px su ogni variante — sopra i 44px richiesti.
   L'accento compare solo al passaggio del mouse e al focus da tastiera.
   ========================================================================== */

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-3 font-mono text-data uppercase " +
  "tracking-[0.08em] whitespace-nowrap select-none " +
  "transition-[background-color,border-color,color] duration-200 ease-out " +
  "disabled:pointer-events-none disabled:text-mute disabled:border-line";

const sizes: Record<Size, string> = {
  md: "min-h-12 px-6",
  lg: "min-h-14 px-8",
};

const variants: Record<Variant, string> = {
  /* Pieno bianco: un solo bottone primario per schermata. */
  primary: "bg-max text-bg border border-max hover:bg-strong hover:border-strong",
  /* Hairline: il bordo passa all'accento al passaggio del mouse. */
  secondary:
    "bg-transparent text-strong border border-line hover:border-accent hover:text-max",
  /* Testo: nessun riquadro, solo la freccia che avanza. */
  ghost:
    "bg-transparent text-strong border border-transparent px-0 hover:text-accent [&_[data-arrow]]:transition-transform [&_[data-arrow]]:duration-200 hover:[&_[data-arrow]]:translate-x-1",
};

type ButtonOwnProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  children: ReactNode;
  className?: string;
};

function classes({ variant = "secondary", size = "md", className = "" }: ButtonOwnProps) {
  return [base, sizes[size], variants[variant], className].filter(Boolean).join(" ");
}

export function Button({
  variant = "secondary",
  size = "md",
  arrow = false,
  children,
  className,
  ...rest
}: ButtonOwnProps & ComponentProps<"button">) {
  return (
    <button className={classes({ variant, size, className, children })} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

export function ButtonLink({
  variant = "secondary",
  size = "md",
  arrow = false,
  children,
  className,
  ...rest
}: ButtonOwnProps & ComponentProps<typeof Link>) {
  return (
    <Link className={classes({ variant, size, className, children })} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

function Arrow() {
  return (
    <span data-arrow aria-hidden="true" className="inline-block">
      &rarr;
    </span>
  );
}
