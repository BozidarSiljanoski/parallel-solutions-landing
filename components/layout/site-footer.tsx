import Link from "next/link";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { navLinks, siteConfig } from "@/lib/site-config";
import { caseStudies } from "@/lib/case-studies";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/20" data-testid="site-footer">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-lg font-semibold">{siteConfig.name}</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              {siteConfig.tagline}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" />
                {siteConfig.contactEmail}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                {siteConfig.phone}
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                {siteConfig.address}
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium">Case studies</p>
            <ul className="mt-3 space-y-2 text-sm">
              {caseStudies.map((study) => (
                <li key={study.slug}>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {study.client}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}. Placeholder content for demo.
          </p>
          <a
            href={siteConfig.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400"
            data-testid="footer-book-call"
          >
            <Calendar className="size-4" />
            Schedule a discovery call
          </a>
        </div>
      </div>
    </footer>
  );
}
