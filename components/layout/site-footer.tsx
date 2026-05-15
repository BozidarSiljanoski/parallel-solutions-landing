import Link from "next/link";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";

import { SiteLogo } from "@/components/layout/site-logo";
import { Separator } from "@/components/ui/separator";
import { caseStudies } from "@/lib/case-studies";
import { navLinks, siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer
      className="border-t border-border bg-muted/40"
      data-testid="site-footer"
    >
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <SiteLogo compact />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-brand" />
                {siteConfig.contactEmail}
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="size-4 shrink-0 text-brand" />
                {siteConfig.phone}
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                {siteConfig.address}
              </li>
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground transition-colors duration-200 hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
              Case studies
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {caseStudies.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="text-muted-foreground transition-colors duration-200 hover:text-brand"
                  >
                    {study.client}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <Link
            href={siteConfig.bookingSectionHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand transition-colors duration-200 hover:text-brand/80"
            data-testid="footer-book-call"
          >
            <Calendar className="size-4" />
            Schedule a discovery call
          </Link>
        </div>
      </div>
    </footer>
  );
}
