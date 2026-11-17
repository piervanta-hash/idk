import type { Metadata, Viewport } from "next";
import "../globals.css";
import { RootShell } from "@/components/layout/RootShell";
import { fontsLatin } from "@/lib/fonts";
import { SITE } from "@/lib/routes";

/* Layout radice per le rotte serbe. Come gli altri: cambia la lingua
   dichiarata su <html>, il resto dell'impalcatura e' condiviso. */
export const metadata: Metadata = {
  /* Rende assoluti canonical, hreflang e Open Graph. */
  metadataBase: new URL(SITE),
  title: "Paloryn",
  description:
    "Paloryn pretvara papirne arhive u pretražive podatke: arhivsko sređivanje, masovna digitalizacija, AI ekstrakcija i interoperabilnost sa javnom upravom.",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <RootShell locale="sr" fonts={fontsLatin}>
      {children}
    </RootShell>
  );
}
