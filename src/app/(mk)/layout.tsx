import type { Metadata, Viewport } from "next";
import "../globals.css";
import { RootShell } from "@/components/layout/RootShell";
import { fontsMk } from "@/lib/fonts-mk";
import { SITE } from "@/lib/routes";

/* Layout radice per le rotte macedoni. Come gli altri: cambia la lingua
   dichiarata su <html>, il resto dell'impalcatura e' condiviso. */
/* Il macedone e' l'unica lingua del sito in cirillico, e Archivo il
   cirillico non ce l'ha. Questo layout carica quindi un carattere suo:
   vedi src/lib/fonts-mk.ts. Nelle altre lingue quel file non arriva. */

export const metadata: Metadata = {
  /* Rende assoluti canonical, hreflang e Open Graph. */
  metadataBase: new URL(SITE),
  title: "Paloryn",
  description:
    "Paloryn ги претвора хартиените архиви во пребарливи податоци: архивско средување, масовна дигитализација, AI екстракција и интероперабилност со јавната администрација.",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootShell locale="mk" fonts={fontsMk}>
      {children}
    </RootShell>
  );
}
