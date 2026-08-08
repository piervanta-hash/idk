import { redirect } from "next/navigation";

/* Rimando provvisorio all'inglese, che e' la lingua predefinita. Il vero
   smistamento — lingua del browser piu' memoria della scelta — si costruisce
   in Fase 6 insieme a hreflang, sitemap e switch persistente. */

export default function RootPage() {
  redirect("/en");
}
