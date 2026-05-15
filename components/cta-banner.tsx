import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";

import { AbstractBackground } from "@/components/abstract-background";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

type CtaBannerProps = {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  id?: string;
};

export function CtaBanner({
  title,
  description,
  primaryHref = siteConfig.calendlyUrl,
  primaryLabel = "Book a discovery call",
  secondaryHref = "/contact",
  secondaryLabel = "Send a message",
  id,
}: CtaBannerProps) {
  const primaryExternal = primaryHref.startsWith("http");
  const secondaryExternal = secondaryHref.startsWith("http");

  return (
    <section id={id} className="py-16 px-8 md:px-12 md:py-20" data-testid="cta-banner">
      <AbstractBackground
        variant="cta"
        className="mx-auto max-w-6xl rounded-3xl px-6 py-14 md:px-12 md:py-16"
      >
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {title}
          </h2>
          <p className="mt-4 text-base text-teal-100/90 md:text-lg">{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="min-w-[200px] bg-teal-400 text-slate-950 hover:bg-teal-300"
              render={
                primaryExternal ? (
                  <a
                    href={primaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="cta-book-call"
                  />
                ) : (
                  <Link href={primaryHref} data-testid="cta-book-call" />
                )
              }
            >
              <Calendar data-icon="inline-start" />
              {primaryLabel}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] border-white/30 bg-white/5 text-white hover:bg-white/10"
              render={
                secondaryExternal ? (
                  <a
                    href={secondaryHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="cta-contact"
                  />
                ) : (
                  <Link href={secondaryHref} data-testid="cta-contact" />
                )
              }
            >
              {secondaryLabel}
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
        </div>
      </AbstractBackground>
    </section>
  );
}
