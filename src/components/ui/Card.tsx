import Link from "next/link";
import type { ReactNode } from "react";

/* ==========================================================================
   CARD
   Superficie #1F1F1F, hairline a 1px, spigolo vivo. L'indice numerico in
   mono e' parte del componente: ogni card e' una voce di un elenco ordinato,
   non un riquadro promozionale.
   ========================================================================== */

type CardProps = {
  index?: string;
  tag?: string;
  title: ReactNode;
  children?: ReactNode;
  href?: string;
  footer?: ReactNode;
  className?: string;
};

export function Card({ index, tag, title, children, href, footer, className = "" }: CardProps) {
  const interactive = Boolean(href);

  const body = (
    <>
      {(index || tag) && (
        <div className="mb-6 flex items-baseline justify-between gap-4">
          {index && <span className="eyebrow tabular">{index}</span>}
          {tag && (
            <span className="eyebrow border border-line px-2 py-1 group-hover:border-accent group-hover:text-accent">
              {tag}
            </span>
          )}
        </div>
      )}
      <h3 className="text-h4 font-display font-semibold text-max">{title}</h3>
      {children && <div className="mt-4 text-body text-copy">{children}</div>}
      {footer && (
        <div className="mt-8 border-t border-line pt-4 text-data font-mono text-label tabular">
          {footer}
        </div>
      )}
    </>
  );

  const shell =
    "group relative flex h-full flex-col bg-surface-2 border border-line p-6 md:p-8 " +
    "transition-colors duration-200 " +
    (interactive ? "hover:border-accent focus-within:border-accent" : "");

  if (href) {
    return (
      <Link href={href} className={`${shell} ${className}`}>
        {body}
        <span
          aria-hidden="true"
          className="mt-auto pt-8 font-mono text-data text-label transition-transform duration-200 group-hover:translate-x-1 group-hover:text-accent"
        >
          &rarr;
        </span>
      </Link>
    );
  }

  return <div className={`${shell} ${className}`}>{body}</div>;
}
