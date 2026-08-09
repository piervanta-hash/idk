"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { NAV, PAGES, href, other, type Locale, type PageKey } from "@/lib/routes";

/* ==========================================================================
   NAVIGAZIONE

   Nell'header c'e' solo il segno, senza il nome scritto. Cinque voci, sotto
   il tetto di sei fissato dal brief: i contatti vivono dentro Azienda.

   Lo switch di lingua non riporta alla home: porta alla stessa pagina
   nell'altra lingua, perche' gli indirizzi divergono (digitization →
   dematerializzazione) e mandare l'utente a ricominciare sarebbe una
   piccola scortesia.

   La scelta della lingua viene ricordata in un cookie: il rimando dalla
   radice la legge e non chiede due volte.
   ========================================================================== */

const COOKIE = "paloryn-lang";

export function Header({
  locale = "en",
  page,
}: {
  locale?: Locale;
  page?: PageKey;
}) {
  const [open, setOpen] = useState(false);

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
    <header className="sticky top-0 z-50 border-b border-line">
      <div className="relative z-10 bg-bg/85 backdrop-blur-md">
        <div className="shell flex h-16 items-center justify-between md:h-20">
          <Link
            href={href("home", locale)}
            aria-label="Paloryn"
            /* Il marchio e' alto 22px: come bersaglio da toccare era meta'
               di quanto serve, ed e' il comando piu' usato del sito (e' il
               ritorno alla home). L'area sensibile sale a 44px senza che il
               disegno cambi di un pixel. */
            className="flex min-h-11 items-center text-max transition-colors hover:text-accent"
          >
            <Logo height={22} />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV.map((key) => {
              const current = key === page;
              return (
                <Link
                  key={key}
                  href={href(key, locale)}
                  aria-current={current ? "page" : undefined}
                  className={
                    "font-mono text-data uppercase tracking-[0.08em] transition-colors " +
                    (current ? "text-max" : "text-label hover:text-max")
                  }
                >
                  {PAGES[key].label[locale]}
                </Link>
              );
            })}
            <LangSwitch locale={locale} page={page} />
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="-mr-2 flex h-12 w-12 items-center justify-center text-strong lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
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
            {NAV.map((key, i) => (
              <Link
                key={key}
                href={href(key, locale)}
                onClick={() => setOpen(false)}
                aria-current={key === page ? "page" : undefined}
                className="flex items-baseline gap-4 border-b border-line py-5"
              >
                <span className="eyebrow tabular">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-d3 font-display font-semibold text-max">
                  {PAGES[key].label[locale]}
                </span>
              </Link>
            ))}
            <div className="mt-auto py-8">
              <LangSwitch locale={locale} page={page} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function LangSwitch({ locale, page }: { locale: Locale; page?: PageKey }) {
  const target = other(locale);

  /* La scelta si ricorda per un anno. Serve solo al rimando dalla radice:
     non profila nulla e non esce dal dominio. */
  const remember = () => {
    document.cookie = `${COOKIE}=${target}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div className="flex items-center gap-2 font-mono text-data uppercase tracking-[0.08em]">
      <span aria-current="true" className="text-max">
        {locale}
      </span>
      <span className="text-line" aria-hidden="true">
        /
      </span>
      <Link
        href={href(page ?? "home", target)}
        hrefLang={target}
        onClick={remember}
        className="text-label transition-colors hover:text-max"
      >
        {target}
      </Link>
    </div>
  );
}
