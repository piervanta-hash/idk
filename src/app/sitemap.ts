export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { LOCALES, PAGES, SITE, href, type PageKey } from "@/lib/routes";

/* ==========================================================================
   SITEMAP

   Una voce per pagina e per lingua, con i riferimenti incrociati: ogni
   indirizzo dichiara il suo equivalente nell'altra lingua e il predefinito.
   E' la stessa informazione degli hreflang nella testata, ripetuta dove i
   motori la cercano per prima.

   Le due lingue sono alla pari: nessuna delle due e' una traduzione
   subordinata dell'altra, e la sitemap non le tratta diversamente.
   ========================================================================== */

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(PAGES) as PageKey[];
  const now = new Date();

  return keys.flatMap((key) =>
    LOCALES.map((locale) => ({
      url: `${SITE}${href(key, locale)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      /* L'informativa va indicizzata ma non compete con le pagine di
         servizio: e' una pagina dovuta, non una pagina che vende. */
      priority: key === "home" ? 1 : key === "privacy" ? 0.3 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l, `${SITE}${href(key, l)}`]),
        ),
      },
    })),
  );
}
