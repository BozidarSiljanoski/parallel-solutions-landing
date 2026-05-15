import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function ReferenceStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="rounded-xl border border-dashed border-border/80 bg-muted/30 px-4 py-3"
      data-testid="design-references"
    >
      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Design inspiration (placeholder references)
      </p>
      <ul
        className={
          compact
            ? "mt-2 flex flex-wrap gap-2"
            : "mt-3 grid gap-2 sm:grid-cols-3"
        }
      >
        {[{name: 'what', note: 'stop', url: 'https://www.google.com'}, {name: 'what', note: 'stop', url: 'https://www.google.com'}, {name: 'what', note: 'stop', url: 'https://www.google.com'}].map((ref) => (
          <li key={ref.name}>
            <a
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-teal-600 dark:hover:text-teal-400"
              data-testid={`reference-${ref.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Badge variant="outline" className="shrink-0">
                {ref.name}
              </Badge>
              {!compact && (
                <span className="text-muted-foreground group-hover:text-inherit">
                  {ref.note}
                </span>
              )}
              <ExternalLink className="size-3.5 shrink-0 opacity-50" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
