import { cn } from "@/lib/utils";

type AbstractBackgroundProps = {
  variant?: "hero" | "section" | "cta" | "dark";
  className?: string;
  children?: React.ReactNode;
};

export function AbstractBackground({
  variant = "section",
  className,
  children,
}: AbstractBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} data-variant={variant}>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        {variant === "hero" && (
          <>
            <div className="absolute -left-1/4 top-0 h-[520px] w-[520px] rounded-full bg-teal-500/20 blur-3xl animate-blob" />
            <div className="absolute -right-1/4 top-1/4 h-[480px] w-[480px] rounded-full bg-indigo-500/15 blur-3xl animate-blob animation-delay-2000" />
            <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-cyan-400/10 blur-3xl animate-blob animation-delay-4000" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-950/40 via-background/80 to-background" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          </>
        )}
        {variant === "section" && (
          <>
            <div className="absolute inset-0 bg-linear-to-b from-muted/50 via-background to-background" />
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
          </>
        )}
        {variant === "cta" && (
          <>
            <div className="absolute inset-0 bg-linear-to-br from-teal-900 via-slate-900 to-indigo-950" />
            <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.4),transparent_50%)]" />
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_70%_80%,rgba(99,102,241,0.5),transparent_50%)] animate-pulse-slow" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.03)_50%,transparent_52%)] bg-size-[60px_60px]" />
          </>
        )}
        {variant === "dark" && (
          <>
            <div className="absolute inset-0 bg-slate-950" />
            <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-teal-500/50 to-transparent" />
          </>
        )}
      </div>
      {children}
    </div>
  );
}
