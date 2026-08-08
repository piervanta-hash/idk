"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";

/* ==========================================================================
   NAVIGAZIONE
   Nell'header c'e' solo il segno, senza il nome scritto. Cinque voci, sotto
   il tetto di sei fissato dal brief: Contact vive dentro About.
   Su mobile il menu e' a tutto schermo, con tipografia grande.
   ========================================================================== */

const NAV = [
  { href: "/en/digitization", label: "Digitization" },
  { href: "/en/anamnesis", label: "Anamnesis" },
  { href: "/en/customers", label: "Customers" },
  { href: "/en/investors", label: "Investors" },
  { href: "/en/about", label: "About" },
];

export function Header({ mark = "triad" }: { mark?: "triad" | "node" }) {
  const [open, setOpen] = useState(false);

  /* Menu aperto: la pagina sotto non scorre. */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    /* La sfocatura sta su un div interno, non sull'header: `backdrop-filter`
       rende l'elemento il blocco contenitore dei figli in `position: fixed`,
       e l'overlay del menu finirebbe schiacciato dentro la barra. */
    <header className="sticky top-0 z-50 border-b border-line">
      <div className="relative z-10 bg-bg/85 backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between md:h-20">
        <Link
          href="/en"
          aria-label="Paloryn — home"
          className="text-max transition-colors hover:text-accent"
        >
          <Logo mark={mark} size={28} />
        </Link>

        {/* Desktop */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-data uppercase tracking-[0.08em] text-mute transition-colors hover:text-max"
            >
              {item.label}
            </Link>
          ))}
          <LangSwitch />
        </nav>

        {/* Mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="-mr-2 flex h-12 w-12 items-center justify-center text-strong lg:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {/* Aperto, le due linee si incrociano davvero: sovrapposte
              formerebbero un trattino, non una croce. */}
          <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true">
            <line
              x1="0"
              y1={open ? 7 : 1}
              x2="22"
              y2={open ? 7 : 1}
              stroke="currentColor"
              strokeWidth="1.5"
              transform={open ? "rotate(45 11 7)" : undefined}
              className="transition-all duration-200"
            />
            <line
              x1="0"
              y1={open ? 7 : 13}
              x2="22"
              y2={open ? 7 : 13}
              stroke="currentColor"
              strokeWidth="1.5"
              transform={open ? "rotate(-45 11 7)" : undefined}
              className="transition-all duration-200"
            />
          </svg>
        </button>
        </div>
      </div>

      {open && (
        <div
          id="menu-mobile"
          className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col bg-bg lg:hidden"
        >
          <nav aria-label="Primary mobile" className="shell flex flex-1 flex-col pt-8">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-baseline gap-4 border-b border-line py-5"
              >
                <span className="eyebrow tabular">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-d3 font-display font-semibold text-max">
                  {item.label}
                </span>
              </Link>
            ))}
            <div className="mt-auto py-8">
              <LangSwitch />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function LangSwitch() {
  return (
    <div className="flex items-center gap-2 font-mono text-data uppercase tracking-[0.08em]">
      <span aria-current="true" className="text-max">
        EN
      </span>
      <span className="text-line" aria-hidden="true">
        /
      </span>
      <Link href="/it" className="text-mute transition-colors hover:text-max">
        IT
      </Link>
    </div>
  );
}
