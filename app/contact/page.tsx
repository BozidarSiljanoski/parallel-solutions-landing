import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Calendar, Mail, MapPin, Phone } from "lucide-react";

import { AbstractBackground } from "@/components/abstract-background";
import { ContactForm } from "@/components/contact-form";
import { CtaBanner } from "@/components/cta-banner";
import { ReferenceStrip } from "@/components/reference-strip";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SpinningBorder } from "@/components/ui/spinning-border";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Parallel Solutions or book a discovery call.",
};

export default function ContactPage() {
  return (
    <>
      <AbstractBackground variant="hero">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <h1
            className="text-4xl font-bold tracking-tight md:text-5xl"
            data-testid="contact-page-title"
          >
            Let&apos;s build your pipeline
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Send us a message or pick a time on our booking calendar — we typically
            respond within one business day.
          </p>
          <div className="mt-8 max-w-xl">
            <ReferenceStrip />
          </div>
        </div>
      </AbstractBackground>

      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6" data-testid="contact-page">
        <div className="grid gap-10 lg:grid-cols-2">
          <SpinningBorder>
            <Card className="border-0 ring-0 shadow-sm">
              <CardHeader>
                <CardTitle>Send a message</CardTitle>
                <CardDescription>
                  Powered by SendGrid — configure API keys in your environment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<p className="text-sm text-muted-foreground">Loading form…</p>}>
                  <ContactForm />
                </Suspense>
              </CardContent>
            </Card>
          </SpinningBorder>

          <div className="space-y-6">
            <SpinningBorder>
              <Card className="border-0 ring-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Contact details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p className="flex items-center gap-2">
                    <Mail className="size-4 text-brand" />
                    {siteConfig.contactEmail}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="size-4 text-brand" />
                    {siteConfig.phone}
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 size-4 text-brand" />
                    {siteConfig.address}
                  </p>
                </CardContent>
              </Card>
            </SpinningBorder>

            <SpinningBorder>
              <Card className="border-0 ring-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="size-5 text-brand" />
                    Prefer to book directly?
                  </CardTitle>
                  <CardDescription>
                    Choose a weekday and time on the home page calendar — we&apos;ll prefill
                    your preferred slot on this form.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full shadow-sm"
                    render={<Link href={siteConfig.bookingSectionHref} data-testid="contact-book-calendar" />}
                  >
                    <Calendar data-icon="inline-start" />
                    Open booking calendar
                  </Button>
                </CardContent>
              </Card>
            </SpinningBorder>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Still exploring?"
        description="Browse our case studies to see how we've helped similar B2B teams."
        primaryHref="/#case-studies"
        primaryLabel="View case studies"
        secondaryHref={siteConfig.bookingSectionHref}
        secondaryLabel="Book a discovery call"
      />
    </>
  );
}
