import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react";

import { AbstractBackground } from "@/components/abstract-background";
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
import { caseStudies, getCaseStudy, getCaseStudySlugs } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site-config";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study not found" };
  return {
    title: study.title,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);

  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== slug).slice(0, 2);

  return (
    <>
      <AbstractBackground variant="dark">
        <div
          className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24"
          data-testid="case-study-hero"
        >
          <Button
            variant="ghost"
            className="mb-8 text-white/80 hover:text-white"
            render={<Link href="/#case-studies" data-testid="case-study-back" />}
          >
            <ArrowLeft data-icon="inline-start" />
            All case studies
          </Button>
          <div className="flex h-40 w-full max-w-lg items-center justify-center rounded-2xl bg-linear-to-br from-teal-600/40 to-indigo-600/40 text-6xl font-bold text-white">
            {study.placeholderImage}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-white/10 text-white">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="mt-6 max-w-3xl text-3xl font-bold text-white md:text-5xl">
            {study.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">{study.headline}</p>
          <p className="mt-2 text-sm text-white/50">
            {study.client} · {study.industry}
          </p>
        </div>
      </AbstractBackground>

      <article
        className="mx-auto max-w-6xl px-4 py-16 md:px-6"
        data-testid={`case-study-${slug}`}
      >
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-10 lg:col-span-2">
            <section>
              <h2 className="text-2xl font-semibold">Overview</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{study.summary}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">The challenge</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{study.challenge}</p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold">Our solution</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{study.solution}</p>
            </section>
            {study.testimonial && (
              <blockquote className="rounded-xl border border-teal-500/20 bg-teal-500/5 p-6">
                <p className="text-lg italic">&ldquo;{study.testimonial.quote}&rdquo;</p>
                <footer className="mt-4 text-sm">
                  <strong>{study.testimonial.author}</strong>
                  <span className="text-muted-foreground"> — {study.testimonial.role}</span>
                </footer>
              </blockquote>
            )}
          </div>

          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Results</CardTitle>
                <CardDescription>Key outcomes (placeholder metrics)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {study.results.map((r) => (
                  <div key={r.metric} className="border-b border-border pb-3 last:border-0">
                    <p className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                      {r.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{r.metric}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Button
              className="w-full bg-teal-600 text-white hover:bg-teal-500"
              render={
                <a
                  href={siteConfig.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="case-study-book-call"
                />
              }
            >
              <Calendar data-icon="inline-start" />
              Book a similar program
            </Button>
          </aside>
        </div>

        <div className="mt-16">
          <ReferenceStrip />
        </div>

        {others.length > 0 && (
          <section className="mt-16" data-testid="related-case-studies">
            <h2 className="text-xl font-semibold">More success stories</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {others.map((other) => (
                <Card key={other.slug}>
                  <CardHeader>
                    <CardTitle className="text-lg">{other.client}</CardTitle>
                    <CardDescription>{other.summary}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="link"
                      className="h-auto p-0"
                      render={<Link href={`/case-studies/${other.slug}`} />}
                    >
                      Read case study
                      <ArrowRight data-icon="inline-end" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </article>

      <CtaBanner
        title="Want results like these?"
        description="Let's design a fit-to-purpose outbound program for your team."
      />
    </>
  );
}
