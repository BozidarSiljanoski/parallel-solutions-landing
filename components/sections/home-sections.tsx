import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  LineChart,
  Search,
  Settings,
  Sparkles,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";

import { AbstractBackground } from "@/components/abstract-background";
import { CalendlyEmbed } from "@/components/calendly-embed";
import { CtaBanner } from "@/components/cta-banner";
import { ReferenceStrip } from "@/components/reference-strip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { caseStudies } from "@/lib/case-studies";
import {
  heroStats,
  services,
  siteConfig,
  testimonials,
  trustedLogos,
  whyUsPoints,
} from "@/lib/site-config";

const serviceIcons = {
  users: Users,
  settings: Settings,
  calendar: Calendar,
  sparkles: Sparkles,
  search: Search,
  trending: TrendingUp,
} as const;

export function HeroSection() {
  return (
    <AbstractBackground variant="hero" className="border-b border-border/50">
      <section
        className="mx-auto max-w-6xl px-4 pb-20 pt-16 md:px-6 md:pb-28 md:pt-24"
        data-testid="hero-section"
      >
        <Badge className="mb-6 bg-teal-500/10 text-teal-700 dark:text-teal-300">
          B2B pipeline development · SDR outsourcing
        </Badge>
        <h1 className="max-w-4xl text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          We&apos;ve got the{" "}
          <span className="bg-linear-to-r from-teal-600 to-indigo-600 bg-clip-text text-transparent">
            secret sauce
          </span>{" "}
          for your pipeline
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Whether you need SDRs, sales performance enhancement, SalesOps, or expert
          development — we build qualified meetings so your team can focus on closing.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            className="bg-teal-600 text-white hover:bg-teal-500"
            render={
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-book-call"
              />
            }
          >
            <Calendar data-icon="inline-start" />
            Book a discovery call
          </Button>
          <Button
            size="lg"
            variant="outline"
            render={<Link href="/contact" data-testid="hero-contact" />}
          >
            Request a quote
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          Trusted by growth-stage B2B companies across North America & Europe
        </p>
        <div className="mt-10">
          <ReferenceStrip compact />
        </div>
      </section>
    </AbstractBackground>
  );
}

export function StatsSection() {
  return (
    <section
      className="border-b border-border bg-muted/30 py-12 md:py-16"
      data-testid="stats-section"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 md:grid-cols-4 md:px-6">
        {heroStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold text-teal-600 dark:text-teal-400 md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TrustedBySection() {
  return (
    <section className="py-12" data-testid="trusted-by-section">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Trusted by teams building pipeline
        </p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-8">
          {trustedLogos.map((name) => (
            <li
              key={name}
              className="rounded-lg border border-dashed border-border px-4 py-2 text-sm font-medium text-muted-foreground"
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="scroll-mt-20">
    <AbstractBackground variant="section" className="py-20 md:py-28">
      <section data-testid="services-section">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our services</h2>
            <p className="mt-4 text-muted-foreground">
              Outsourced sales solutions to make growth simple — from appointment setting to
              full RevOps support.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Card
                  key={service.title}
                  className="group border-border/80 transition-shadow hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-teal-500/10 text-teal-600">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 hover:underline dark:text-teal-400"
                    >
                      Learn more <ArrowRight className="size-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <Button
              render={
                <a
                  href={siteConfig.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="services-book-call"
                />
              }
            >
              <Calendar data-icon="inline-start" />
              Discuss your motion
            </Button>
          </div>
        </div>
      </section>
    </AbstractBackground>
    </section>
  );
}

export function WhyUsSection() {
  return (
    <section
      id="why-us"
      className="scroll-mt-20 border-y border-border py-20 md:py-28"
      data-testid="why-us-section"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why us?</h2>
            <p className="mt-4 text-muted-foreground">
              Not like other sales outsourcing agencies — we build fit-to-purpose teams that
              sound like you and protect your brand on every call.
            </p>
            <Button
              className="mt-8"
              variant="outline"
              render={<Link href="/contact" data-testid="why-us-cta" />}
            >
              Get the playbook
              <ArrowRight data-icon="inline-end" />
            </Button>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {whyUsPoints.map((point) => (
              <li
                key={point}
                className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm"
              >
                <LineChart className="mt-0.5 size-4 shrink-0 text-teal-600" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const steps = [
    { n: "01", title: "Discovery", desc: "ICP workshop & pipeline audit" },
    { n: "02", title: "Build", desc: "Playbooks, data, and team ramp" },
    { n: "03", title: "Launch", desc: "Multichannel outbound goes live" },
    { n: "04", title: "Scale", desc: "Weekly SQL reviews & optimization" },
  ];

  return (
    <section className="bg-muted/20 py-20 md:py-28" data-testid="process-section">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
          How we work
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.n}
              className="relative rounded-xl border border-border bg-card p-6 animate-fade-in-up"
            >
              <span className="text-4xl font-bold text-teal-500/20">{step.n}</span>
              <h3 className="mt-2 font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CaseStudiesPreviewSection() {
  return (
    <section
      id="case-studies"
      className="scroll-mt-20 py-20 md:py-28"
      data-testid="case-studies-section"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Client success stories
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              See how we&apos;ve helped companies invigorate pipelines and exceed goals.
            </p>
          </div>
          <Button variant="outline" render={<Link href="/contact" />}>
            View all results
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {caseStudies.map((study) => (
            <Card
              key={study.slug}
              className="overflow-hidden transition-shadow hover:shadow-lg"
              data-testid={`case-study-card-${study.slug}`}
            >
              <div className="flex h-32 items-center justify-center bg-linear-to-br from-teal-900/80 to-indigo-900/80 text-4xl font-bold text-white/90">
                {study.placeholderImage}
              </div>
              <CardHeader>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl">{study.title}</CardTitle>
                <CardDescription>{study.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="link"
                  className="h-auto p-0"
                  render={
                    <Link
                      href={`/case-studies/${study.slug}`}
                      data-testid={`case-study-link-${study.slug}`}
                    />
                  }
                >
                  Read the full case study
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <ReferenceStrip />
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-20">
    <AbstractBackground variant="section" className="py-20 md:py-28">
      <section data-testid="testimonials-section">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="text-center text-3xl font-bold tracking-tight md:text-4xl">
            What our clients say
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <Card key={t.author} className="bg-card/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <div className="flex gap-0.5 text-amber-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-4 font-medium">{t.author}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </AbstractBackground>
    </section>
  );
}

export function CalendlySection() {
  return (
    <section
      id="book"
      className="scroll-mt-20 border-t border-border py-20 md:py-28"
      data-testid="calendly-section"
    >
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Book a discovery call
          </h2>
          <p className="mt-4 text-muted-foreground">
            Pick a time that works — we&apos;ll walk through your ICP, motion, and pipeline
            goals.
          </p>
        </div>
        <div className="mt-10">
          <CalendlyEmbed />
        </div>
      </div>
    </section>
  );
}

export function MidPageCta() {
  return (
    <CtaBanner
      id="mid-cta"
      title="Wave goodbye to your empty pipeline"
      description="We'll create opportunities; your sales team closes deals. Cancel anytime — no long-term lock-in."
    />
  );
}

export function FinalCta() {
  return (
    <CtaBanner
      id="final-cta"
      title="Ready to accelerate growth?"
      description="Join 200+ companies that trust Parallel Solutions for qualified pipeline development."
      primaryLabel="Schedule on Calendly"
      secondaryLabel="Contact our team"
    />
  );
}
