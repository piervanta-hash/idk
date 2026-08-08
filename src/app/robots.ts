import type { MetadataRoute } from "next";
import { SITE } from "@/lib/routes";

/* La pagina di stile e' materiale di lavorazione: si tiene fuori
   dall'indice, come gia' dichiara nei suoi metadati. */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/styleguide" },
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
