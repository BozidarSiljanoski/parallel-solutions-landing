"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { Calendar, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";
import { normalizeCalendlyUrl } from "@/lib/calendly";
import { siteConfig } from "@/lib/site-config";

type CalendlyEmbedProps = {
  url?: string;
  minHeight?: number;
};

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
    };
  }
}

export function CalendlyEmbed({
  url = siteConfig.calendlyUrl,
  minHeight = 700,
}: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);

  const schedulingUrl = normalizeCalendlyUrl(url);

  useEffect(() => {
    const href = "https://assets.calendly.com/assets/external/widget.css";
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    if (!scriptReady || embedFailed || !containerRef.current) return;

    const parent = containerRef.current;
    parent.replaceChildren();

    const init = () => {
      if (!window.Calendly?.initInlineWidget) {
        setEmbedFailed(true);
        return;
      }

      try {
        window.Calendly.initInlineWidget({
          url: schedulingUrl,
          parentElement: parent,
        });
      } catch {
        setEmbedFailed(true);
      }
    };

    if (window.Calendly?.initInlineWidget) {
      init();
      return;
    }

    const timer = window.setTimeout(() => {
      if (window.Calendly?.initInlineWidget) init();
      else setEmbedFailed(true);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [scriptReady, schedulingUrl, embedFailed]);

  if (embedFailed) {
    return (
      <CalendlyFallback schedulingUrl={schedulingUrl} minHeight={minHeight} />
    );
  }

  return (
    <>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
        onError={() => setEmbedFailed(true)}
      />
      <div
        ref={containerRef}
        data-testid="calendly-embed"
        className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm"
        style={{ minWidth: "320px", minHeight: `${minHeight}px` }}
        aria-label="Calendly scheduling widget"
      />
      {!scriptReady && (
        <p className="mt-3 text-center text-sm text-muted-foreground">
          Loading scheduler…
        </p>
      )}
    </>
  );
}

function CalendlyFallback({
  schedulingUrl,
  minHeight,
}: {
  schedulingUrl: string;
  minHeight: number;
}) {
  return (
    <div
      data-testid="calendly-fallback"
      className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 px-6 text-center"
      style={{ minHeight: `${Math.min(minHeight, 400)}px` }}
    >
      <Calendar className="size-10 text-teal-600" />
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        The inline scheduler could not load. Open Calendly in a new tab to pick a
        time, or set <code className="text-xs">NEXT_PUBLIC_CALENDLY_URL</code> to
        your event link (e.g.{" "}
        <code className="text-xs">https://calendly.com/you/30min</code>).
      </p>
      <Button
        className="mt-6 bg-teal-600 text-white hover:bg-teal-500"
        render={
          <a
            href={schedulingUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="calendly-fallback-link"
          />
        }
      >
        Open Calendly
        <ExternalLink data-icon="inline-end" />
      </Button>
    </div>
  );
}
