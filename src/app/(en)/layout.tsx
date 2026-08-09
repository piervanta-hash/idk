import type { Metadata, Viewport } from "next";
import "../globals.css";
import { RootShell } from "@/components/layout/RootShell";
import { SITE } from "@/lib/routes";

/* Layout radice per le rotte inglesi. L'unica differenza con l'altro e' la
   lingua dichiarata su <html>: il resto dell'impalcatura e' condiviso. */

export const metadata: Metadata = {
  /* Rende assoluti canonical, hreflang e Open Graph. */
  metadataBase: new URL(SITE),
  title: "Paloryn",
  description: "Paloryn turns paper archives into queryable data: archival ordering, mass digitization, AI extraction and public-sector interoperability.",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootShell locale="en">{children}</RootShell>;
}
