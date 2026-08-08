import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/routes";

/* ==========================================================================
   RIMANDO DI LINGUA DALLA RADICE

   Chi arriva su `/` viene mandato nella sua lingua, in quest'ordine:

     1. la scelta che ha gia' fatto, ricordata in un cookie;
     2. la lingua del browser, se e' l'italiano;
     3. l'inglese, che e' la lingua predefinita.

   Il cookie lo scrive lo switch nell'header. Non profila nulla, non esce
   dal dominio, e serve solo a non richiedere due volte la stessa cosa.

   Nota di distribuzione: questo file gira sul server (in Next 16 la
   convenzione si chiama `proxy`, non piu` `middleware`). Se un giorno il sito
   venisse esportato come statico puro, il rimando non partirebbe — per
   quel caso c'e' la ricaduta lato client in src/app/page.tsx.
   ========================================================================== */

const COOKIE = "paloryn-lang";

function fromCookie(req: NextRequest): Locale | null {
  const v = req.cookies.get(COOKIE)?.value;
  return LOCALES.includes(v as Locale) ? (v as Locale) : null;
}

function fromHeader(req: NextRequest): Locale | null {
  const header = req.headers.get("accept-language");
  if (!header) return null;

  /* Si ordina per fattore di qualita' e si prende la prima lingua che
     conosciamo: "it-IT,it;q=0.9,en;q=0.8" deve dare italiano. */
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      return { tag: tag.trim().toLowerCase(), q: q ? Number(q.split("=")[1]) : 1 };
    })
    .filter((x) => x.tag && !Number.isNaN(x.q))
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    const base = tag.split("-")[0];
    if (LOCALES.includes(base as Locale)) return base as Locale;
  }
  return null;
}

export default function proxy(req: NextRequest) {
  const locale = fromCookie(req) ?? fromHeader(req) ?? DEFAULT_LOCALE;
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url, 307);
}

/* Solo la radice: tutto il resto ha gia' la lingua nell'indirizzo. */
export const config = { matcher: "/" };
