import type { Metadata, Viewport } from "next";
import { Sora, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Intro } from "@/components/brand/Intro";

/* I tre caratteri ufficiali. Nessun altro font e' ammesso.
   next/font li scarica in fase di build e li serve dal nostro dominio:
   zero richieste esterne, zero salto di layout al caricamento. */

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--ff-sora",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-archivo",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ff-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Paloryn",
  description:
    "Paloryn turns paper archives into queryable data: archival ordering, mass digitization, AI extraction and public-sector interoperability.",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${archivo.variable} ${plexMono.variable}`}
    >
      <body>
        {/* Marca la pagina come "JavaScript attivo". Le comparse in scroll si
            attivano solo da qui in poi: senza JS nulla viene mai nascosto. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        <Intro />
        {children}
      </body>
    </html>
  );
}
