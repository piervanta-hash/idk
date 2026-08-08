import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Rule } from "@/components/ui/Rule";

/* ==========================================================================
   FOOTER
   Registro anagrafico: sede, partita IVA, certificazioni, note legali.
   La titolarita' resta a Cosma Alessandro, come da indicazione.
   ========================================================================== */

const CERTS = [
  { code: "ISO 9001", scope: "quality" },
  { code: "ISO/IEC 27001", scope: "information security" },
  { code: "ISO/IEC 27017", scope: "cloud security" },
  { code: "ISO/IEC 27018", scope: "personal data in cloud" },
];

const SITEMAP = [
  { href: "/en/digitization", label: "Digitization" },
  { href: "/en/anamnesis", label: "Anamnesis" },
  { href: "/en/customers", label: "Customers" },
  { href: "/en/investors", label: "Investors" },
  { href: "/en/about", label: "About" },
];

const LEGAL = [
  { href: "/en/legal/privacy", label: "Privacy" },
  { href: "/en/legal/cookie", label: "Cookie" },
  { href: "/en/legal/accessibility", label: "Accessibility" },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-line pt-16 pb-12">
      <div className="shell">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo height={28} className="text-max" />
            <p className="measure mt-6 text-body text-copy">
              Paloryn turns paper archives into structured, queryable data and connects
              them to public digital infrastructure.
            </p>
          </div>

          <nav aria-label="Sitemap" className="md:col-span-2">
            <span className="eyebrow">Site</span>
            <ul className="mt-4 space-y-2">
              {SITEMAP.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-data font-mono text-copy transition-colors hover:text-max"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <span className="eyebrow">Office</span>
            <address className="mt-4 not-italic font-mono text-data text-copy">
              Via D. Cantatore 1/3
              <br />
              73100 Lecce (LE), Italy
              <br />
              <br />
              VAT 04522160755
              <br />
              <a
                href="mailto:info@paloryn.com"
                className="transition-colors hover:text-max"
              >
                info@paloryn.com
              </a>
              <br />
              <a href="tel:+393520690071" className="transition-colors hover:text-max">
                +39 352 069 0071
              </a>
            </address>
          </div>

          <div className="md:col-span-3">
            <span className="eyebrow">Certifications</span>
            <ul className="mt-4 space-y-2">
              {CERTS.map((c) => (
                <li key={c.code} className="font-mono text-data">
                  <span className="text-strong">{c.code}</span>{" "}
                  <span className="text-mute">— {c.scope}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Rule className="mt-16" />

        <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <span className="eyebrow">
            &copy; {new Date().getFullYear()} Cosma Alessandro — all rights reserved
          </span>
          <ul className="flex flex-wrap gap-6">
            {LEGAL.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="eyebrow transition-colors hover:text-max">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
