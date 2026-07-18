import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt={siteConfig.name} className="h-20 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline} — hand-redrawn vector artwork and embroidery
              digitizing since {siteConfig.founded}.
            </p>
          </div>

          <div>
            <h3 className="font-heading text-xs tracking-[0.2em] text-primary uppercase">
              Navigate
            </h3>
            <ul className="mt-4 space-y-2">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-xs tracking-[0.2em] text-primary uppercase">
              Reach us
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.secondaryEmail}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.secondaryEmail}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.whatsapp}`}
                  className="transition-colors hover:text-foreground"
                >
                  {siteConfig.whatsappDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          © {siteConfig.founded}–{new Date().getFullYear()} {siteConfig.legalName}.
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}
